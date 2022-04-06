import React from "react";
import './CustomerOrders.css'

import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import fireDb from '../../../firebase'


function CustomerOrders() {
  const [totalOrders, setTotalOrders] = useState(0);

  const auth = getAuth();
  useEffect(() => {
    fireDb.collection("delivery_req").where("customerID", "==", sessionStorage.getItem("id")).get().then((querySnapshot) => {
      const TotalOrders = querySnapshot.size
      setTotalOrders(TotalOrders)
    })
  }, []);

  return (
    <>
      <div className="card CustomerCard m-2">
        <div className="cardCx__Header">
          <h3 className="CustomerOrdersHeader">Total Orders</h3>
        </div>
        <div className="cardCx__Count">
          <h5 className="cardCx__Num">{totalOrders}</h5>
          <i class="fas fa-th fa-4x"></i>
        </div>
      </div>
     

    </>
  );
}

export default CustomerOrders;
