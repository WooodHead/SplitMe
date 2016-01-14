import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import EventListener from 'react-event-listener';
import {connect} from 'react-redux';
import DocumentTitle from 'react-document-title';

import polyglot from 'polyglot';
import BottomButton from 'Main/BottomButton';
import CanvasHead from 'Main/Canvas/Head';
import CanvasBody from 'Main/Canvas/Body';
import modalActions from 'Main/Modal/actions';
import expenseActions from 'Main/Expense/actions';
import ExpenseDetail from 'Main/Expense/Detail';
import ExpenseAddHeader from 'Main/Expense/AddHeader';

const ExpenseAdd = React.createClass({
  propTypes: {
    account: React.PropTypes.instanceOf(Immutable.Map),
    accounts: React.PropTypes.instanceOf(Immutable.List).isRequired,
    dispatch: React.PropTypes.func.isRequired,
    expense: React.PropTypes.instanceOf(Immutable.Map),
    pageDialog: React.PropTypes.string.isRequired,
  },
  mixins: [
    EventListener,
    PureRenderMixin,
  ],
  getInitialState() {
    return {
      showBottom: true,
    };
  },
  componentDidMount() {
    this.props.dispatch(expenseActions.fetchAdd());
  },
  listeners: {
    document: {
      backbutton: 'handleBackButton',
    },
    window: {
      'native.keyboardshow': 'onKeyBoardShow',
      'native.keyboardhide': 'onKeyBoardHide',
    },
  },
  onKeyBoardShow() {
    // Only apply when we edit an expense
    if (this.props.expense.get('_id')) {
      this.setState({
        showBottom: false,
      });
    }
  },
  onKeyBoardHide() {
    // Only apply when we edit an expense
    if (this.props.expense.get('_id')) {
      this.setState({
        showBottom: true,
      });
    }
  },
  handleBackButton() {
    this.props.dispatch(expenseActions.navigateBack());
  },
  handleTouchTapClose(event) {
    event.preventDefault();

    setTimeout(() => {
      this.props.dispatch(expenseActions.close());
    }, 0);
  },
  handleTouchTapSave(event) {
    event.preventDefault();

    setTimeout(() => {
      this.props.dispatch(expenseActions.tapSave());
    }, 0);
  },
  handleTouchTapDelete() {
    this.props.dispatch(modalActions.show(
      [
        {
          textKey: 'cancel',
        },
        {
          textKey: 'delete',
          dispatchAction: expenseActions.tapDelete,
        },
      ],
      'expense_confirm_delete'
    ));
  },
  render() {
    const {
      account,
      accounts,
      expense,
      pageDialog,
    } = this.props;

    let title = '';
    let bottom;
    let style;

    if (expense) {
      if (expense.get('_id')) {
        title = polyglot.t('expense_edit');

        if (this.state.showBottom) {
          style = {
            paddingBottom: 50,
          };
          bottom = <BottomButton onTouchTap={this.handleTouchTapDelete} />;
        }
      } else {
        title = polyglot.t('expense_new');
      }
    }

    return (
      <div>
        {process.env.PLATFORM === 'browser' && <DocumentTitle title={title} />}
        <CanvasHead>
          <ExpenseAddHeader title={title} onTouchTapClose={this.handleTouchTapClose}
            onTouchTapSave={this.handleTouchTapSave}
          />
        </CanvasHead>
        <CanvasBody style={style}>
          {expense &&
            <ExpenseDetail account={account} accounts={accounts}
              expense={expense} pageDialog={pageDialog}
            />
          }
        </CanvasBody>
        {bottom}
      </div>
    );
  },
});

function mapStateToProps(state) {
  return {
    account: state.get('accountCurrent'),
    accounts: state.get('accounts'),
    expense: state.get('expenseCurrent'),
    pageDialog: state.getIn(['screen', 'dialog']),
  };
}

export default connect(mapStateToProps)(ExpenseAdd);
