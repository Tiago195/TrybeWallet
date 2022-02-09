// Coloque aqui suas actions
export const EMAIL_LOGIN_TYPE = 'EMAIL_LOGIN';
export const ADD_VALUE_TYPE = 'CURRENCY_VALUE';
export const DELETE_GASTO_TYPE = 'DELETE_GASTO';
export const ATT_GASTO_TYPE = 'ATT_GASTO';

export const METODO_PAGAMENTOS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
export const TAG_GASTOS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export const actionEmail = (email) => ({ type: EMAIL_LOGIN_TYPE, email });

const resultApi = (value, exchangeRates) => ({ type: ADD_VALUE_TYPE,
  payload: { ...value, exchangeRates } });

export const actionCurrency = (value) => async (dispatch) => {
  const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
  dispatch(resultApi(value, data));
};

export const attGastos = (type, payload) => ({
  type,
  payload,
});
