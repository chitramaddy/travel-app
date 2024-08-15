import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TRIP } from '../../utils/mutations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '../../utils/auth';

const AddTrip = () => {
  const [userFormState, setFormState] = useState({
    location: '',
    journalEntry: '',
    tripDate: new Date(),
  });

  const { data: { username } } = Auth.getProfile();

  const [addTrip, { loading, error, data }] = useMutation(ADD_TRIP);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...userFormState,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormState({
      ...userFormState,
      tripDate: date,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { location, journalEntry, tripDate } = userFormState;
      console.log(location, journalEntry, tripDate, username);

      const response = await addTrip({
        variables: { location, journalEntry, tripDate, username },
      });

      setFormState({
        location: '',
        journalEntry: '',
        tripDate: new Date(),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h4>Add Trip</h4>
      {loading ? <div>Loading...</div> : null}
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Location of trip"
            name="location"
            type="text"
            value={userFormState.location}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="Journal entry"
            name="journalEntry"
            type="text"
            value={userFormState.journalEntry}
            onChange={handleChange}
          />
          <DatePicker
            selected={userFormState.tripDate}
            onChange={handleDateChange}
            className="form-input"
          />
          <button style={{ cursor: 'pointer' }} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrip;
