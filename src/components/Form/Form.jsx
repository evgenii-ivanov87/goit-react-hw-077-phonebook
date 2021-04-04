import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Form.module.css';
import { connect } from 'react-redux'
import phonebookActions from '../../redux/phonebook/phonebook-actions'

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  contactMatching = () => {
    const { name, number } = this.state;
    const { contacts } = this.props;
    const namesInPhonebook = contacts.reduce(
      (acc, contact) => [...acc, contact.name],
      [],
    );
    const numbersInPhonebook = contacts.reduce(
      (acc, contact) => [...acc, contact.number],
      [],
    );

    if (
      namesInPhonebook.includes(name) ||
      numbersInPhonebook.includes(number)
    ) {
      alert(`${name}${number} is already in contacts`);
      return true;
    }

    if (name === '' || number === '') {
      alert('Please enter all data');
      return true;
    }
  };

  handleSubmit = e => {
    const { name, number } = this.state;

    e.preventDefault();
    this.setState({ name: '', number: '' });
    if (this.contactMatching()) {
      return;
    }

    this.props.onSubmit(name, number);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            placeholder="Ivanov Ivan"
            onChange={this.handleChange}
            className={s.input}
          />
        </label>

        <label className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
            value={this.state.number}
            placeholder="123-12-45"
            onChange={this.handleChange}
            className={s.input}
          />
        </label>
        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}
const mapStateToProps= state => ({
  contacts: state.contacts.items, 
})

const mapDispatchToProps = dispatch => ({
  onSubmit:( name, number )=> dispatch(phonebookActions.addContact( name, number )),
})

export default connect(mapStateToProps,mapDispatchToProps)(Form);