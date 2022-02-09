// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_VALUE_TYPE, DELETE_GASTO_TYPE, ATT_GASTO_TYPE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [
    'USD',
    'CAD',
    'EUR',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
  ],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_VALUE_TYPE:
    return {
      ...state, expenses: [...state.expenses, action.payload],
    };
  case DELETE_GASTO_TYPE:
    return {
      ...state, expenses: state.expenses.filter((f) => f.id !== Number(action.payload)),
    };
  case ATT_GASTO_TYPE:
    state.expenses[action.payload.id] = action.payload;
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default walletReducer;
