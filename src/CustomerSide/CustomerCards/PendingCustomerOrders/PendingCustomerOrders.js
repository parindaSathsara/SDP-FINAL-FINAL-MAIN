import React from "react";
import './PendingCustomerOrders.css'

import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import fireDb from '../../../firebase'

function PendingCustomerOrders() {

  const [pendingOrders, setPendingOrders] = useState(0);

  const auth = getAuth();
  useEffect(() => {
    fireDb.collection("delivery_req").where("customerID", "==", sessionStorage.getItem("id")).where("reqStatus", "==", "Pending").get().then((querySnapshot) => {
      const TotalOrders = querySnapshot.size
      setPendingOrders(TotalOrders)
    })
  }, []);


  return (
    <>
      <div className="card PendingOrders m-2">
        <div className="cardCx__Header">
          <h3 className="CustomerOrdersHeader">Pending Orders</h3>
        </div>
        <div className="cardCx__Count">
          <h5 className="cardCx__Num">{pendingOrders}</h5>
          <i class="fas fa-tasks fa-4x"></i>
        </div>
      </div>
     

    </>
  );
}

export default PendingCustomerOrders;
