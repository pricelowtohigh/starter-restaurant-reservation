import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import axios from "axios";


function Reservations() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  }

  const [reservationData, setReservationData] = useState({...initialFormState});
  const [errors, setErrors] = useState(null);
  
  const handleChange = ({target}) => {
    setReservationData({
      ...reservationData,
      [target.id]: target.value
    })
    console.log(reservationData)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_API_BASE_URL + `/reservations`, {
        data: reservationData,
      });
      history.push(`/dashboard?date=${reservationData.reservation_date}`);
    } catch (error) {
      setErrors(error.response.data.error);
    }
  }

  //MAKE EVERYTHING NOT-NULLABLE

    return (
        <main>
          <h1>New Reservation</h1>
          <form name="new-reservation" id="reservation" onSubmit={handleSubmit}>
            <table>
              <tr>
                <td>
                <input
                  id="first_name" 
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  form="reservation"
                  onChange={handleChange}
                  value={reservationData.first_name}
                />
              </td>
              </tr>
              <tr>
                <td>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  form="reservation"
                  onChange={handleChange}
                  value={reservationData.last_name}
                />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    id="mobile_number"
                    name="mobile_number"
                    type="number"
                    placeholder="Mobile Number"
                    form="reservation"
                    onChange={handleChange}
                    value={reservationData.mobile_number}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    id="reservation_date"
                    name="reservation_date"
                    type="date"
                    placeholder="Date of Reservation"
                    form="reservation"
                    onChange={handleChange}
                    value={reservationData.reservation_date}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    id="reservation_time"
                    name="reservation_time"
                    type="time"
                    placeholder="Time of Reservation"
                    form="reservation"
                    onChange={handleChange}
                    value={reservationData.reservation_time}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    id="people"
                    name="people"
                    type="number"
                    placeholder="Number of People"
                    form="reservation"
                    onChange={handleChange}
                    value={reservationData.people}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    id="submit"
                    name="submit"
                    type="submit"
                    form="reservation"
                  />
                  <input
                    id="cancel"
                    name="cancel"
                    type="button"
                    value="Cancel"
                    onClick={() => history.goBack()}
                  />
                </td>
              </tr>
            </table>
          </form>
        </main>
    )
}

export default Reservations;