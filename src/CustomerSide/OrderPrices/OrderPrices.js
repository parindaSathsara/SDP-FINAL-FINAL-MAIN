import './OrderPrices.css';

import React, { useEffect, useState } from 'react';
import { addDoc, collection, documentId, getDoc, getDocs, updateDoc, Firestore, query, where } from 'firebase/firestore';
import fireDb from '../../firebase'
import { getAuth } from 'firebase/auth';

function OrderPrices() {

    const [allOrders, setAllOrders] = useState([])
    const [orderPricingDet, setOrderPricing] = useState([])
    const auth = getAuth();
    useEffect(() => {

        const getPendingOrders = async () => {
            await fireDb.collection('delivery_req').where("customerID", "==", sessionStorage.getItem("id")).get().then(res => {
                setAllOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                res.forEach(element => {
                    fireDb.collection('order_pricing').where("orderID", "==", element.id).get().then(res => {
                        res.forEach(element => {
                            setOrderPricing(prevArray => [...prevArray, element])
                        });
                    }).catch(err => {
                        console.log(err)
                    })
                });
            }).catch(err => {
                console.log(err)
            })
            // console.log(data)
            // setReparData(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        }

        getPendingOrders();

    }, [])


    return (

        <div className="row" id="row">
            <div className="col-xl-12 mx-auto mt-4">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Order Pricing
                        </h5>
                    </div>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Tracking ID</th>
                                <th scope="col">Weight</th>
                                <th scope="col">Total Charge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderPricingDet.map((allOrders) => {
                                return (
                                    <tr key={allOrders['id']}>
                                        <td scope="row">{allOrders.data()['orderID']}</td>
                                        <td>{allOrders.data()['orderWeight']}kg</td>
                                        <td>{allOrders.data()['totalPrice']}/=</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

}

export default OrderPrices;
