import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class index extends Component {
  render() {
    const { labelText, inputType, testId, inputName,
      inputId, inputValue, handleChange, inputPlacehold } = this.props;
    return (
      <label htmlFor={ inputId } className="label">
        <h4>{labelText}</h4>
        <input
          placeholder={ inputPlacehold }
          className="input"
          type={ inputType }
          name={ inputName }
          id={ inputId }
          data-testid={ testId }
          value={ inputValue }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

index.propTypes = {
  labelText: PropTypes.string,
  inputPlacehold: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

index.defaultProps = {
  labelText: '',
  inputPlacehold: '',
};
