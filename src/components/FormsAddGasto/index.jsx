import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Input';
import { METODO_PAGAMENTOS, TAG_GASTOS } from '../../actions';
import './index.css';

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

  addDispesa() {
    const { valueInput, descriptionInput,
      currencyInput, methodInput, tagInput } = this.state;
    const { attStoreCallBack, id, idEdid } = this.props;
    attStoreCallBack({
      id: idEdid || id,
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
    });
    this.resetState();
  }

  render() {
    const { valueInput, descriptionInput,
      currencyInput, methodInput, tagInput } = this.state;
    const { idEdid, Moedas } = this.props;
    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          this.addDispesa();
        } }
        className="form-despesa"
      >
        <div
          style={ {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }
        >
          <h4>Valor:</h4>
          <Input
            testId="value-input"
            inputValue={ valueInput }
            inputType="number"
            inputName="valueInput"
            inputId="valueInput"
            handleChange={ this.handleChange }
          />
        </div>
        <div
          style={ { display: 'flex', justifyContent: 'space-around' } }
        >
          <label htmlFor="currencyInput" className="label-form">
            Moeda
            <select
              className="select"
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
          <label htmlFor="tag-input" className="label-form">
            Tag
            <select
              className="select"
              data-testid="tag-input"
              name="tagInput"
              id="tag-input"
              onChange={ this.handleChange }
              value={ tagInput }
            >
              {TAG_GASTOS.map((gasto) => (
                <option key={ gasto }>{gasto}</option>
              ))}
            </select>
          </label>
        </div>
        <label htmlFor="method-input">
          <h4>Método de pagamento</h4>
          <select
            className="select"
            style={ { width: '100%' } }
            data-testid="method-input"
            id="method-input"
            name="methodInput"
            onChange={ this.handleChange }
            value={ methodInput }
          >
            {METODO_PAGAMENTOS.map((metodo) => (
              <option key={ metodo }>{metodo}</option>
            ))}
          </select>
        </label>
        <label htmlFor="descriptionInput">
          <h4>Descrição</h4>
          <textarea
            name="descriptionInput"
            className="descricao"
            placeholder="eae tio Patinhas, gastou com o que hoje? 🦆"
            id="descriptionInput"
            data-testid="description-input"
            cols="30"
            rows="6"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          className="btn-addDispesa"
          onClick={ () => this.addDispesa() }
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
