import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import titleIMG from '../../images/logo.png';

class index extends Component {
  render() {
    const { email, Gastos } = this.props;
    const totalGasto = Gastos.reduce((a, b) => a + b, 0);
    return (
      <header
        style={ {
          display: 'flex',
          color: '#f0f0f0 ',
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#2d2d2d',
          borderBottom: '2px solid #f66a69',
          marginBottom: '10px',
          padding: '10px 0',
        } }
      >
        <img
          src={ titleIMG }
          className="title"
          alt="Logo Trybe"
          width="200px"
        />
        <section
          style={ { display: 'flex', gap: '20px' } }
        >
          <h4 data-testid="email-field">
            Email:
            {' '}
            {email}
          </h4>
          <h4>
            Despesa Total: R$
            {' '}
            <span data-testid="total-field">{totalGasto.toFixed(2)}</span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </h4>
        </section>
      </header>
    );
  }
}

index.propTypes = {
  email: PropTypes.string,
  Gastos: PropTypes.arrayOf(PropTypes.number).isRequired,
};

index.defaultProps = {
  email: 'usuario@email.com',
};

const mapStateToProps = ({ user, wallet }) => ({
  Gastos: wallet.expenses
    .map((e) => Number(e.exchangeRates[e.currency].ask) * Number(e.value)),
  email: user.email,
});

export default connect(mapStateToProps)(index);
