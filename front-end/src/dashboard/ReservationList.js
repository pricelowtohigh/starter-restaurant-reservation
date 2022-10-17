import React from "react";
import { Link } from "react-router-dom";


function ReservationList ({reservations}) {

    const list = reservations.map((reservation, index) => {
        return (
            <tr key={index}>
                <td style={{padding: "10px"}}>{reservation.first_name}</td>
                <td style={{padding: "10px"}}>{reservation.last_name}</td>
                <td style={{padding: "10px"}}>{reservation.mobile_number}</td>
                <td style={{padding: "10px"}}>{reservation.reservation_time}</td>
                <td style={{padding: "10px"}}>{reservation.people}</td>
            </tr>
        )
    })

    return (
        <div>
      <table>
        <thead>
          <tr>
            <th style={{padding: "10px"}}>First Name</th>
            <th style={{padding: "10px"}}>Last Name</th>
            <th style={{padding: "10px"}}>Mobile Number</th>
            <th style={{padding: "10px"}}>Time</th>
            <th style={{padding: "10px"}}># of People</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
    )

}

export default ReservationList