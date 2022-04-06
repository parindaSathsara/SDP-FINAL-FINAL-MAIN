import React from "react";
import './CardCustomer.css'
import { useEffect, useState } from 'react';
import fireDb from '../../firebase'

function CardCustomer() {
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    fireDb.collection("customer_details").where("serviceArea", "==", sessionStorage.getItem("center")).get().then((querySnapshot) => {
      const TotalCustomers = querySnapshot.size
      setTotalCustomers(TotalCustomers)
    })
  }, []);


  return (
    <>
      <div className="card m-2">
        <div className="cardCx__Header">
          <h4 className="cardCx__Heading">Total Customers</h4>
        </div>
        <div className="cardCx__Count">
          <h5 className="cardCx__Num">{totalCustomers}</h5>
          <i class="fas fa-users fa-4x"></i>
        </div>
      </div>
     

    </>
  );
}

export default CardCustomer;
