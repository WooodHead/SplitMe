'use strict';

const Immutable = require('immutable');
const actionTypes = require('redux/actionTypes');

function reducer(state, action) {
  if (state === undefined) {
    state = Immutable.fromJS({
      page: 'home',
      dialog: '',
    });
  }

  let page;

  switch (action.type) {
    case actionTypes.SCREEN_NAVIGATE_TO:
      state = state.set('page', action.page);
      return state;

    case actionTypes.EXPENSE_TAP_SAVE:
    case actionTypes.EXPENSE_CLOSE:
      switch (state.get('page')) {
        case 'expenseAdd':
          page = 'home';
          break;

        case 'expenseEdit':
        case 'expenseAddForAccount':
          page = 'accountDetail';
          break;

        default:
          console.error('called for nothings');
          return state;
      }

      state = state.set('page', page);
      return state;

    case actionTypes.ACCOUNT_TAP_ADD_EXPENSE:
      state = state.set('page', 'expenseAdd');
      return state;

    case actionTypes.EXPENSE_TAP_LIST:
      state = state.set('page', 'expenseEdit');
      return state;

    case actionTypes.ACCOUNT_TAP_ADD_EXPENSE_FOR_ACCOUNT:
      state = state.set('page', 'expenseAddForAccount');
      return state;

    case actionTypes.MODAL_UPDATE:
      state = state.set('dialog', 'modal');
      return state;

    case actionTypes.SCREEN_SHOW_DIALOG:
      state = state.set('dialog', action.name);
      return state;

    case actionTypes.MODAL_DISMISS:
    case actionTypes.SCREEN_DISMISS_DIALOG:
    case actionTypes.EXPENSE_CHANGE_PAID_BY:
    case actionTypes.EXPENSE_CHANGE_RELATED_ACCOUNT:
    case actionTypes.COUCHDB_TAP_IMPORTED:
      state = state.set('dialog', '');
      return state;

    case actionTypes.EXPENSE_DELETE_CURRENT:
    case actionTypes.ACCOUNT_ADD_TAP_SAVE:
    case actionTypes.ACCOUNT_TAP_LIST:
      state = state.set('page', 'accountDetail');
      return state;

    case actionTypes.ACCOUNT_ADD_CLOSE:
      switch (state.get('page')) {
        case 'accountEdit':
          page = 'accountDetail';
          break;

        case 'accountAdd':
          page = 'home';
          break;

        default:
          console.error('called for nothings');
          return state;
      }

      state = state.set('page', page);
      return state;

    case actionTypes.ACCOUNT_NAVIGATE_HOME:
    case actionTypes.ACCOUNT_DELETE_CURRENT:
      state = state.set('page', 'home');
      return state;

    case actionTypes.ACCOUNT_TAP_SETTINGS:
      state = state.set('page', 'accountEdit');
      return state;

    case actionTypes.COUCHDB_TAP_IMPORT:
      state = state.set('dialog', 'import');
      return state;

    case actionTypes.COUCHDB_TAP_EXPORT:
      state = state.set('dialog', 'export');
      return state;

    case actionTypes.EXPENSE_PICK_CONTACT:
      if (action.useAsPaidBy) {
        state = state.set('dialog', '');
      }
      return state;

    case actionTypes.ACCOUNT_TAP_ADD_ACCOUNT:
      state = state.set('page', 'accountAdd');
      return state;

    default:
      return state;
  }
}

module.exports = reducer;
