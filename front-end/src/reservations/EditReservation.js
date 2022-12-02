import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { formatAsDate } from "../utils/date-time";

export default function EditReservation() {
  const URL = process.env.REACT_APP_API_BASE_URL;
  const { reservation_id } = useParams();
  const [existingReservation, setExistingReservation] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(`${URL}/reservations/${reservation_id}`, {
        signal: abortController.signal,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((response) =>
        setExistingReservation({
          ...response.data.data,
          reservation_date: formatAsDate(response.data.data.reservation_date),
        })
      )
      .catch(setErrors)
      .then(() => {
        console.log(errors)
      })
    return () => abortController.abort();
  }, [URL, reservation_id, errors]);

  return (
    <div>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={errors} />
      {existingReservation && (
        <ReservationForm
          existingReservation={existingReservation}
          editMode={true}
        />
      )}
    </div>
  );
}