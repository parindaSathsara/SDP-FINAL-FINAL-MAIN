import './CustomerPendingOrders.css';

import React, { useEffect, useState } from 'react';
import { addDoc, collection, documentId, getDoc, getDocs, updateDoc, Firestore, query, where } from 'firebase/firestore';
import fireDb from '../../firebase'
import { getAuth } from 'firebase/auth';

function CustomerPendingOrders() {

    const [pendingOrders, setPendingOrders] = useState([])
    const auth = getAuth();
    useEffect(() => {

        const getPendingOrders = async () => {
            const data = await fireDb.collection('delivery_req').where("customerID", "==", sessionStorage.getItem("id")).where('reqStatus', '==', 'Pending').get().then(res => {
                setPendingOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
            // console.log(data)
            // setReparData(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        }

        getPendingOrders();

    }, [])


    return (
        <div className="col-xl-6 mx-auto mt-4">
            <div className="col-md-12 containerbox">
                <div className="containerbox-title">
                    <h5>
                        Pending Orders
                    </h5>
                </div>
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Tracking ID</th>
                            <th scope="col">Receiver Name</th>
                            <th scope="col">Receiver City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingOrders.map((pendingOrder) => {
                            return (
                                <tr key={pendingOrder.id}>
                                    <td scope="row">{pendingOrder.id}</td>
                                    <td>{pendingOrder.recName}</td>
                                    <td>{pendingOrder.recServiceArea}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default CustomerPendingOrders;
