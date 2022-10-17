import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ReservationList from "./ReservationList";
import ErrorAlert from "../layout/ErrorAlert";
import { retrieveAllReservations } from "../utils/api";
import { useHistory } from "react-router";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationList, setReservationList] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const query = useQuery();
  date = query.get("date") || date;
  

  useEffect(loadDashboard, [date]);

  useEffect(() => {
    const abortController = new AbortController();
    retrieveAllReservations(abortController.signal)
        .then(setReservationList)
        .then(console.log("reservationsasdasd: ", reservations))
    console.log(reservationList)
    return () => abortController.abort()
  },[])

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      //.then(console.log("reservations: ", reservations))
      .catch(setReservationsError)
      
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push(`/dashboard?date=${today()}`)}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => history.push(`/dashboard?date=${next(date)}`)}
          >
            Next
          </button>

        </div>
        <ReservationList reservations={reservations} />
        
    </main>
  );
}

export default Dashboard;
