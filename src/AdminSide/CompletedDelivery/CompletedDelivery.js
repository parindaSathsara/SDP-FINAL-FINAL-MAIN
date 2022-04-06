
import React, { useEffect, useState } from 'react';
import fireDb from '../../firebase'

function CompletedDelivery() {


    const [completeDelivery, setCompleteDelivery] = useState([]);

    useEffect(() => {

        const getOrderData = async () => {
            const data = await fireDb.collection('delivery_req').where('reqStatus', '==', 'Delivered').where('cusServiceArea','==',sessionStorage.getItem('center')).get().then(res => {
                setCompleteDelivery(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
            // console.log(data)
            // setReparData(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        }

        getOrderData();

    }, [])



    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Completed Delivery</h4>


                        </div>



                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>

                                        <th>R-ID</th>
                                        <th>Sender Name</th>
                                        <th>Receiver Name</th>
                                        <th>Receiver Contact</th>
                                        <th>Receiver Service Area</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {completeDelivery.map((delivery) => (
                                        <tr>
                                            <td>{delivery.id}</td>
                                            <td>{delivery.cusName}</td>
                                            <td>{delivery.recName}</td>
                                            <td>{delivery.recContact}</td>
                                            <td>{delivery.recServiceArea}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}

export default CompletedDelivery