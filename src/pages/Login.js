import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import actionEmail from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.redirecionar = this.redirecionar.bind(this);

    this.state = {
      valueEmail: '',
      valuePassword: '',
      buttonIsTrue: true,
      redirect: false,
    };
  }

  handleChange({ target: { value, name } }) {
    const MINPASSWORDLENGTH = 6;
    this.setState({ [name]: value }, () => {
      this.setState(({ valueEmail, valuePassword }) => ({
        buttonIsTrue: !(valueEmail.includes('@') && valueEmail.includes('.com')
          && valuePassword.length >= MINPASSWORDLENGTH),
      }));
    });
  }

  redirecionar() {
    this.setState({ redirect: true });
  }

  render() {
    const { buttonIsTrue, valueEmail, valuePassword, redirect } = this.state;
    const { changeSubmit } = this.props;
    return (
      <section className="login-container">
        <section className="form-container">
          <h1>img da trybe</h1>
          <form onSubmit={ (event) => changeSubmit(event, valueEmail) }>
            <input
              onChange={ this.handleChange }
              type="email"
              name="valueEmail"
              data-testid="email-input"
              value={ valueEmail }
            />
            <input
              onChange={ this.handleChange }
              type="password"
              name="valuePassword"
              data-testid="password-input"
              value={ valuePassword }
            />
            <button
              type="submit"
              disabled={ buttonIsTrue }
              onClick={ this.redirecionar }
            >
              Entrar
            </button>
            {redirect && <Redirect to="/carteira" />}
          </form>
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  changeSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (disparo) => ({
  changeSubmit: (event, value) => {
    event.preventDefault();
    disparo(actionEmail(value));
  },
});

export default connect(null, mapDispatchToProps)(Login);
