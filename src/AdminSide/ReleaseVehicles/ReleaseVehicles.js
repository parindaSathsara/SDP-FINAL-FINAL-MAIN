import React, { useState, useEffect } from 'react';
import './ReleaseVehicles.css'
import fireDb from '../../firebase'
import { collection, documentId, getDoc, getDocs } from 'firebase/firestore';
import Swal from "sweetalert2";

function ReleaseVehicles() {


    const [assignedVehicles, setAssignedVehicles] = useState([])
    const [inTransitVehicles, setInTransitVehicles] = useState([])

    const getAssignedVehicles = async () => {
        await fireDb.collection('sendtocenter').where("startCenter", "==", sessionStorage.getItem('center')).where("status", "==", "NotDelivered").get().then(res => {

            setAssignedVehicles(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }).catch(err => {
            console.log(err)
        })
    }

    const getInTransitVehicles = async () => {
        await fireDb.collection('vehicle_details').where('regCenter','==',sessionStorage.getItem('center')).where("vehiAvailable", "==", "NotAvailable").get().then(res => {
            setInTransitVehicles(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }).catch(err => {
            console.log(err)
        })
    }



    useEffect(() => {

        getAssignedVehicles()
        getInTransitVehicles()

    }, [])



    const handleOnClick = (e) => {
        e.preventDefault();
        console.log(e.target.data)

        Swal.fire({
            title: 'Are you sure?',
            text: "You want release this vehicle ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Release It!'
        }).then((result) => {
            if (result.isConfirmed) {

                fireDb.collection('sendtocenter').doc(e.target.value).get()
                    .then(snapshot => {
                        fireDb.collection("vehicle_details").doc(snapshot.data()['vehicle']).update({
                            vehiAvailable: "NotAvailable"
                        });

                        fireDb.collection("sendtocenter").doc(e.target.value).update({
                            status: "InTransist"
                        });
                        setAssignedVehicles([])
                        getAssignedVehicles()
                    })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });

                Swal.fire(
                    'Released!',
                    'Vehicle has been Released.',
                    'success'
                )
            }
        })
    }


    const handleOnClickInTransit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You want return this vehicle ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Return It!'
        }).then((result) => {
            if (result.isConfirmed) {

                fireDb.collection("vehicle_details").doc(e.target.value).update({
                    vehiAvailable: "Available"
                });

                setInTransitVehicles([])
                getInTransitVehicles()

                Swal.fire(
                    'Returned!',
                    'Vehicle has been Returned.',
                    'success'
                )
            }
        })
    }



    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Release Assigned Vehicles</h4>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Vehicle ID</th>
                                        <th>Send Date</th>
                                        <th>End Center</th>
                                        <th>Release Vehicle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        assignedVehicles.map((vehicle) => {
                                            return (
                                                <tr key={vehicle.id}>
                                                    <td>{vehicle.vehicle}</td>
                                                    <td>{vehicle.sendDate}</td>
                                                    <td>{vehicle.endCenter}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={handleOnClick} value={vehicle.id}>Release Vehicle</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <div className="row" id="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Return In Transit Vehicles</h4>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Vehicle ID</th>
                                        <th>Vehicle Name</th>
                                        <th>Release Vehicle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inTransitVehicles.map((inTransitVehicles) => {
                                            return (
                                                <tr key={inTransitVehicles.id}>
                                                    <td>{inTransitVehicles.vehiNo}</td>
                                                    <td>{inTransitVehicles.vehiType}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={handleOnClickInTransit} value={inTransitVehicles.id}>Return Vehicle</button></td>
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

export default ReleaseVehicles;
