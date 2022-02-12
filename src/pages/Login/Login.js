import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionEmail } from '../../actions';
import Input from '../../components/Input';
import './index.css';
import walletImg from '../../images/wallet.png';
import titleImg from '../../images/title.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      valueEmail: '',
      valuePassword: '',
      buttonIsTrue: true,
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

  render() {
    const { buttonIsTrue, valueEmail, valuePassword } = this.state;
    const { changeSubmit, history } = this.props;
    return (
      <section className="login-container">
        <section className="form-container">
          <section className="logos">
            <div>
              <img className="titleIMG" src={ titleImg } alt="logo wallet" width="100%" />
            </div>
            <div className="walletIMG">
              <img src={ walletImg } alt="logo wallet" width="100%" />
            </div>
          </section>
          <form className="form-login">
            <h1 className="welcome">
              BEM VINDO
              {' '}
              <span role="img" aria-label="Duck">🦆</span>
            </h1>
            <Input
              inputPlacehold="Email"
              inputType="email"
              testId="email-input"
              inputName="valueEmail"
              inputId="valueEmail"
              inputValue={ valueEmail }
              handleChange={ this.handleChange }
            />
            <Input
              inputPlacehold="Senha"
              inputType="password"
              testId="password-input"
              inputName="valuePassword"
              inputId="valuePassword"
              inputValue={ valuePassword }
              handleChange={ this.handleChange }
            />
            <button
              className="btn-login"
              type="submit"
              disabled={ buttonIsTrue }
              onClick={ (e) => {
                changeSubmit(e, valueEmail);
                history.push('/carteira');
              } }
            >
              Entrar
            </button>
          </form>
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  changeSubmit: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired, // By Petzinger
  // history: PropTypes.shape({
  //   action: PropTypes.string,
  //   block: PropTypes.func,
  //   createHref: PropTypes.func,
  //   go: PropTypes.func,
  //   goBack: PropTypes.func,
  //   goForward: PropTypes.func,
  //   length: PropTypes.number,
  //   listen: PropTypes.func,
  //   location: PropTypes.objectOf(PropTypes.string),
  //   push: PropTypes.func,
  //   replace: PropTypes.func,
  // }).isRequired,
};

const mapDispatchToProps = (disparo) => ({
  changeSubmit: (event, value) => {
    event.preventDefault();
    disparo(actionEmail(value));
  },
});

export default connect(null, mapDispatchToProps)(Login);
