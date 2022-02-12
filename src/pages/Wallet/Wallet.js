import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import FormsAddGasto from '../../components/FormsAddGasto';

import {
  actionCurrency,
  attGastos,
  DELETE_GASTO_TYPE,
  ATT_GASTO_TYPE,
} from '../../actions';
import './index.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.addStore = this.addStore.bind(this);
    this.attItem = this.attItem.bind(this);
    this.editItem = this.editItem.bind(this);

    this.state = {
      editGatos: {
        editando: false,
        issEdit: {
          valueInput: '',
          descriptionInput: '',
          currencyInput: 'USD',
          methodInput: 'Dinheiro',
          tagInput: 'Alimentação',
          exchangeRates: [],
        },
      },
    };
  }

  addStore(dadosDoGasto) {
    const { addItem } = this.props;
    addItem(dadosDoGasto);
  }

  attItem(gastoEditado) {
    const { attItem } = this.props;
    const { editGatos } = this.state;
    gastoEditado.exchangeRates = editGatos.issEdit.exchangeRates;
    gastoEditado.id = Number(gastoEditado.id);
    attItem(gastoEditado);
    this.setState({ editGatos: { ...editGatos, editando: false } });
  }

  editItem(target, Gastos) {
    const targetId = target.id ? target.id : target.parentElement.id;
    const select = (Gastos[targetId]);
    this.setState({ editGatos: {
      editando: true,
      issEdit: { ...select, idEdid: targetId },
    } });
  }

  render() {
    const { Gastos, deleItem } = this.props;
    const { editGatos } = this.state;

    return (
      <section className="wallet-container">
        <section
          style={ {
            background: `${editGatos.editando ? '#3886b2' : '#2d2d2d'}`,
            borderRadius: '5px',
            transition: 'all 0.3s',
          } }
        >
          {!editGatos.editando && (
            <FormsAddGasto attStoreCallBack={ this.addStore } />
          )}
          {editGatos.editando && (
            <FormsAddGasto
              attStoreCallBack={ this.attItem }
              valueInput={ editGatos.issEdit.value }
              descriptionInput={ editGatos.issEdit.description }
              currencyInput={ editGatos.issEdit.currency }
              methodInput={ editGatos.issEdit.method }
              tagInput={ editGatos.issEdit.tag }
              idEdid={ editGatos.issEdit.idEdid }
            />
          )}
        </section>
        <table
          style={ { width: '100%',
            textAlign: 'center',
            height: 'fit-content',
            color: '#2d2d2d' } }
        >
          <thead>
            <tr>
              <th style={ { width: '260px' } }>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {Gastos
              .map(({ id, description, tag, method, value, currency, exchangeRates }) => (
                <tr className="test" key={ id }>
                  <td className="item-list">{description}</td>
                  <td className="item-list">{tag}</td>
                  <td className="item-list">{method}</td>
                  <td className="item-list">{Number(value).toFixed(2)}</td>
                  <td className="item-list">
                    {exchangeRates[currency].name.split('/')[0]}
                  </td>
                  <td className="item-list">
                    {Number(exchangeRates[currency].ask).toFixed(2)}

                  </td>
                  <td className="item-list">
                    {(value * exchangeRates[currency].ask).toFixed(2)}
                  </td>
                  <td className="item-list">Real</td>
                  <td className="item-list">
                    <button
                      className="edit-btn"
                      id={ id }
                      data-testid="edit-btn"
                      type="button"
                      onClick={ ({ target }) => this.editItem(target, Gastos) }
                    >
                      <FaEdit
                        id={ id }
                      />
                    </button>
                    <button
                      className="edit-btn delete-btn"
                      id={ id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ ({ target }) => deleItem(target.id) }
                    >
                      <FaTrashAlt id={ id } />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Wallet.propTypes = {
  Gastos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  attItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Gastos: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleItem: (id) => dispatch(attGastos(DELETE_GASTO_TYPE, id)),
  addItem: (gastos) => dispatch(actionCurrency(gastos)),
  attItem: (attItem) => dispatch(attGastos(ATT_GASTO_TYPE, attItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
