import React, { useState, useEffect } from 'react';
import './CustomerDetails.css'
import fireDb from '../../firebase'
import { collection, documentId, getDoc, getDocs } from 'firebase/firestore';

function CustomerDetails() {
    const [cusUser, setCusUser] = useState([]);

    const cusCollection = collection(fireDb, 'customer_details');

    useEffect(() => {
        const getCus = async () => {
            const data = await getDocs(cusCollection);
            console.log(data)
            setCusUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getCus();
    }, [])

    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Registered Customers</h4>

                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Cus-ID</th>
                                        <th>Customer Name</th>
                                        <th>Contact Number</th>
                                        <th>Email Address</th>
                                        <th>Permanent Address</th>
                                        <th>NIC</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cusUser.map((cusUser) => {
                                            return (
                                                <tr key={cusUser.id}>
                                                    <th scope="row">{cusUser.id}</th>
                                                    <td>{cusUser.fullName}</td>
                                                    <td>{cusUser.contactNumber}</td>
                                                    <td>{cusUser.email}</td>
                                                    <td>{cusUser.permanentAddress}</td>
                                                    <td>{cusUser.Nic}</td>
                                                </tr>
                                            )
                                        })
                                    }



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CustomerDetails;
