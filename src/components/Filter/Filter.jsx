 import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './Filter.module.css';
import phonebookActions from '../../redux/phonebook/phonebook-actions';


function Filter({ value, onChange }) {
  return (
    <label className={s.filter}>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps= state => ({
  value: state.contacts.filter,
})

const mapPropsToDispatch = dispath => ({
  onChange: event => dispath(phonebookActions.filterContacts(event.target.value)),
})

export default connect(mapStateToProps,mapPropsToDispatch)(Filter);