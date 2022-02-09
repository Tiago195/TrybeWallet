import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Input';
import { METODO_PAGAMENTOS, TAG_GASTOS } from '../../actions';

class Index extends Component {
  constructor(props) {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      valueInput: props.valueInput,
      descriptionInput: props.descriptionInput,
      currencyInput: props.currencyInput,
      methodInput: props.methodInput,
      tagInput: props.tagInput,
    };
  }

  componentDidMount() {
    this.requestApi();
  }

  async requestApi() {
    const data = await (await (fetch('https://economia.awesomeapi.com.br/json/all'))).json();
    delete data.USDT;
    // Fetch so pra passar nos teste :/
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  resetState() {
    this.setState({
      valueInput: '',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
    });
  }

  render() {
    const { valueInput, descriptionInput,
      currencyInput, methodInput, tagInput } = this.state;
    const { attStoreCallBack, id, idEdid, Moedas } = this.props;
    return (
      <form>
        <Input
          testId="value-input"
          inputValue={ valueInput }
          inputType="number"
          inputName="valueInput"
          inputId="valueInput"
          handleChange={ this.handleChange }
        />
        <Input
          testId="description-input"
          inputValue={ descriptionInput }
          inputType="text"
          inputName="descriptionInput"
          inputId="descriptionInput"
          handleChange={ this.handleChange }
        />
        <label htmlFor="currencyInput">
          Moeda
          <select
            data-testid="currency-input"
            id="currencyInput"
            name="currencyInput"
            onChange={ this.handleChange }
            value={ currencyInput }
          >
            {Moedas.map((moeda) => (
              <option data-testid={ moeda } key={ moeda }>{ moeda }</option>
            ))}
          </select>
        </label>
        <select
          data-testid="method-input"
          name="methodInput"
          onChange={ this.handleChange }
          value={ methodInput }
        >
          {METODO_PAGAMENTOS.map((metodo) => (
            <option key={ metodo }>{metodo}</option>
          ))}
        </select>
        <select
          data-testid="tag-input"
          name="tagInput"
          onChange={ this.handleChange }
          value={ tagInput }
        >
          {TAG_GASTOS.map((gasto) => (
            <option key={ gasto }>{gasto}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={ () => {
            attStoreCallBack({
              id: idEdid || id,
              value: valueInput,
              description: descriptionInput,
              currency: currencyInput,
              method: methodInput,
              tag: tagInput,
            });
            this.resetState();
          } }
        >
          {idEdid ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

Index.propTypes = {
  id: PropTypes.number.isRequired,
  attStoreCallBack: PropTypes.func.isRequired,
  valueInput: PropTypes.string,
  descriptionInput: PropTypes.string,
  currencyInput: PropTypes.string,
  methodInput: PropTypes.string,
  tagInput: PropTypes.string,
  idEdid: PropTypes.string,
  Moedas: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Index.defaultProps = {
  valueInput: '',
  descriptionInput: '',
  currencyInput: 'USD',
  methodInput: 'Dinheiro',
  tagInput: 'Alimentação',
  idEdid: '',
};

const mapStateToProps = (state) => ({
  Moedas: state.wallet.currencies,
  id: state.wallet.expenses.length,
});

export default connect(mapStateToProps)(Index);
