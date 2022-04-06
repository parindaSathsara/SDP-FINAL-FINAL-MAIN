import React from "react";
import './CardVehicle.css'
import { useEffect, useState } from 'react';
import fireDb from '../../firebase'


function CardVehicle() {

  const [totalVehicles, setTotalVehicles] = useState(0);

  useEffect(() => {
    fireDb.collection("vehicle_details").where("regCenter", "==", sessionStorage.getItem("regCenter")).get().then((querySnapshot) => {
      const TotalVehicles = querySnapshot.size
      setTotalVehicles(TotalVehicles)
    })
  }, []);


  return (
    <>
      <div className="card m-2 card__Vh">
        <div className="cardVh__Header">
          <h4 className="cardVh__Heading">Registered Vehicles</h4>
        </div>
        <div className="cardVh__Count">
          <h5 className="cardVh__Num">{totalVehicles}</h5>
          <i class="fas fa-truck-moving fa-4x"></i>
        </div>
      </div>
    </>
  );
}

export default CardVehicle;
