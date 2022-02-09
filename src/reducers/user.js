// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL_LOGIN_TYPE } from '../actions/index';

const INITIAL_STATE = {
  email: 'usuario@email.com',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_LOGIN_TYPE:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
