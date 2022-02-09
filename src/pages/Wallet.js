import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormsAddGasto from '../components/FormsAddGasto';
import { actionCurrency, attGastos, DELETE_GASTO_TYPE, ATT_GASTO_TYPE } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.addStore = this.addStore.bind(this);
    this.attItem = this.attItem.bind(this);

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

  render() {
    const { Gastos, deleItem } = this.props;
    const { editGatos } = this.state;

    return (
      <section>
        <Header />
        <section>
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
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
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
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{exchangeRates[currency].name.split('/')[0]}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      id={ id }
                      data-testid="edit-btn"
                      type="button"
                      onClick={ ({ target }) => {
                        const select = (Gastos[target.id]);
                        this.setState({ editGatos: {
                          editando: true,
                          issEdit: { ...select, idEdid: target.id },
                        } });
                      } }
                    >
                      Editar
                    </button>
                    <button
                      id={ id }
                      type="button"
                      data-testid="delete-btn"
                      onClick={ ({ target }) => deleItem(target.id) }
                    >
                      Deletar
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
