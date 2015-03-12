'use strict';

var React = require('react');
var _ = require('underscore');
var mui = require('material-ui');
var AppCanvas = mui.AppCanvas;
var AppBar = mui.AppBar;
var FloatingActionButton = mui.FloatingActionButton;
var Paper = mui.Paper;

var List = require('../List/View');
var action = require('./action');
var Avatar = require('../Avatar/View');

var ListView = React.createClass({
  propTypes: {
    accounts: React.PropTypes.array.isRequired,
  },

  onTouchTapItem: function() {
    action.tapItem();
  },

  onTouchTapAddExpense: function(event) {
    event.preventDefault();
    action.tapAddExpense();
  },

  render: function () {
    var self = this;

    return <AppCanvas predefinedLayout={1}>
      <AppBar title="My accounts" showMenuIconButton={false}>
      </AppBar>
      <div className="mui-app-content-canvas">
        {_.map(this.props.accounts, function (account) {
          var left = <Avatar contacts={[{displayName:'tt'}]} />;

          return <Paper key={account._id} zDepth={1} onTouchTap={self.onTouchTap} rounded={false} >
              <List left={left}>
                {account.name}
              </List>
            </Paper>;
        })}
        <div id="main-button">
          <FloatingActionButton
            iconClassName="md-add"
            secondary={true}
            onTouchTap={this.onTouchTapAddExpense} />
        </div>
      </div>
    </AppCanvas>;
  }
});

module.exports = ListView;
