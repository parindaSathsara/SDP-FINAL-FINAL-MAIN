import React from "react";
import './CardOrder.css'
import { useEffect, useState } from 'react';
import fireDb from '../../firebase'
function CardOrder() {

  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    fireDb.collection("delivery_req").where("cusServiceArea", "==", sessionStorage.getItem("center")).where('reqStatus','==','Delivered').get().then((querySnapshot) => {
      const TotalCustomers = querySnapshot.size
      setTotalOrders(TotalCustomers)
    })
  }, []);


  return (
    <>
      <div className="card m-2 card__Od">
        <div className="cardOd__Header">
          <h4 className="cardOd__Heading">Completed Orders</h4>
        </div>
        <div className="cardOd__Count">
          <h5 className="cardOd__Num">{totalOrders}</h5>
          <i class="fas fa-boxes fa-4x"></i>
        </div>
      </div>
    </>
  );
}

export default CardOrder;
