import React from "react";
import './CompletedCustomerOrders.css'
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import fireDb from '../../../firebase'

function CompletedCustomerOrders() {

  const [totalCompletedOrders, setTotalCompletedOrders] = useState(0);

  const auth = getAuth();
  useEffect(() => {
    fireDb.collection("delivery_req").where("customerID", "==", sessionStorage.getItem("id")).where("reqStatus", "==", "Delivered").get().then((querySnapshot) => {
      const TotalOrders = querySnapshot.size
      setTotalCompletedOrders(TotalOrders)
    })
  }, []);


  return (
    <>
      <div className="card CustomerCompletedCards m-2">
        <div className="cardCx__Header">
          <h3 className="CustomerOrdersHeader">Completed Orders</h3>
        </div>
        <div className="cardCx__Count">
          <h5 className="cardCx__Num">{totalCompletedOrders}</h5>
          <i class="fas fa-check fa-4x"></i>
        </div>
      </div>


    </>
  );
}

export default CompletedCustomerOrders;
