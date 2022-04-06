import React from "react";
import './CardRider.css'
import { useEffect, useState } from 'react';
import fireDb from '../../firebase'
function CardRider() {

  const [totalRiders, setTotalRiders] = useState(0);

  useEffect(() => {
    fireDb.collection("emp_details").where("empType", "==", "Driver").get().then((querySnapshot) => {
      const TotalRiders = querySnapshot.size
      setTotalRiders(TotalRiders)
    })
  }, []);


  return (
    <>
      <div className="card m-2 card__Rd">
        <div className="cardRd__Header">
          <h4 className="cardRd__Heading">Delivery Riders</h4>
        </div>
        <div className="cardRd__Count">
          <h5 className="cardRd__Num">{totalRiders}</h5>
          <i class="fas fa-biking fa-4x"></i>
        </div>
      </div>
    </>
  );
}

export default CardRider;
