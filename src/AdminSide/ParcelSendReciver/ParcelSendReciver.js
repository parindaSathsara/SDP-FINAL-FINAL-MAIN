import React, { useEffect, useState } from 'react';
import { addDoc, collection, documentId, getDoc, getDocs, updateDoc, Firestore, query, where } from 'firebase/firestore';
import fireDb from '../../firebase'
import './ParcelSendReciver.css';
import Swal from "sweetalert2";

function ParcelSendReciver() {


    const [receivedParcels, setParcels] = useState([]);

    const [inTransitOrders, setInTransitOrders] = useState([]);

    const [centers, setCenters] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [assignVehicle, setAssignVehicle] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);


    const FetchOrderData = () => {
        fireDb.collection("sendtocenter").where('endCenter', '==', sessionStorage.getItem("center")).where('status', '==', 'Delivered').get().then((querySnapshot) => {
            querySnapshot.forEach(element => {

                var data = element.data()
                var orderNumbers = data['orderNumbers']

                orderNumbers.forEach(element => {
                    fireDb.collection('delivery_req').doc(element).get()
                        .then(snapshot => {

                            var snapdata = snapshot;
                            console.log(snapdata);

                            if (snapdata.data()['reqStatus'] == 'OutForDelivery') {
                                setParcels(prevArray => [...prevArray, snapshot])
                            }
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                });
            });
        })
    }


    const FetchIntransitOrders = () => {
        fireDb.collection("sendtocenter").where('endCenter', '==', sessionStorage.getItem("center")).where('status', '==', 'Delivered').get().then((querySnapshot) => {
            querySnapshot.forEach(element => {

                var data = element.data();
                var orderNumbers = data['orderNumbers']

                orderNumbers.forEach(element => {
                    fireDb.collection('delivery_req').doc(element).get()
                        .then(snapshot => {
                            var snapdata = snapshot;
                            console.log(snapdata);

                            if (snapdata.data()['reqStatus'] == 'InTransist') {
                                setInTransitOrders(prevArray => [...prevArray, snapshot])
                            }
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        });
                });
            });
        })
    }


    const FetchVehicleData = () => {
        fireDb.collection("vehicle_details").where('regCenter','==',sessionStorage.getItem("center")).where('vehiAvailable','==','Available').get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();

                setVehicles(prevArray => [...prevArray, data])
            });

        })
    }


    useEffect(() => {

        FetchOrderData();
        FetchIntransitOrders();

        const FetchCentersData = () => {
            fireDb.collection("areas").get().then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    var data = element.data();

                    setCenters(prevArray => [...prevArray, data])
                });

            })
        }

        FetchCentersData();
        FetchVehicleData();

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(assignVehicle)


        const dataSet = {
            vehicleID: assignVehicle,
            orderID: selectedOrder['id'],
            tracking: 'InTransist'
        }
        await addDoc(collection(fireDb, "inTransistOrders"), dataSet)
            .then((user) => {
                console.log("success")

                fireDb.collection("delivery_req").doc(selectedOrder['id']).update({
                    reqStatus: "InTransist"
                });

                fireDb.collection("order_tracking").doc(selectedOrder['id']).update({
                    OutForDelivery: true
                });

                fireDb.collection("vehicle_details").doc(assignVehicle).update({
                    vehiAvailable: 'NotAvailable'
                });

                Swal.fire(
                    'Parcel Send',
                    'Parcel Send to Receiver',
                    'success'
                )
                setParcels([])
                setVehicles([])
                setInTransitOrders([])
                FetchVehicleData()
                FetchOrderData()
                FetchIntransitOrders()

            })
            .catch((err) => {

            });
    }


    const handleChange = (e) => {
        setAssignVehicle(e.target.value)
    }





    const onClick = (e) => {
        fireDb.collection('delivery_req').doc(e.target.value).get()
            .then(snapshot => {

                var snapdata = snapshot;
                console.log(snapdata);

                setSelectedOrder(snapshot)

            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }


    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Packages to deliver to reciver</h4>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Receiver Name</th>
                                        <th>Receiver Address</th>
                                        <th>Receiver Contact</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedParcels.map((parcel) => (
                                        <tr>
                                            <td>{parcel['id']}</td>
                                            <td>{parcel.data()['recName']}</td>
                                            <td>{parcel.data()['recAddress']}</td>
                                            <td>{parcel.data()['recContact']}</td>
                                            <td><button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-danger btnCollectParcel" onClick={onClick} value={parcel['id']}>Assign Vehicle</button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                        <br></br><br></br>

                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">In Transit Orders</h4>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Receiver Name</th>
                                        <th>Receiver Address</th>
                                        <th>Receiver Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inTransitOrders.map((inTransit) => (
                                        <tr>
                                            <td>{inTransit['id']}</td>
                                            <td>{inTransit.data()['recName']}</td>
                                            <td>{inTransit.data()['recAddress']}</td>
                                            <td>{inTransit.data()['recContact']}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content" id="modal__Update">
                                    <div class="modal-body">
                                        <form className="row g-3" onSubmit={handleSubmit}>

                                            <div className='row'>
                                                <div className="form-group col-md-3">
                                                    <label for="vehicleID" className="form-label">
                                                        Vehicle
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        name="vehicleID"
                                                        id="vehicleID"
                                                        onChange={handleChange}
                                                    >
                                                        <option selected disabled>
                                                            -- Select Vehicles --
                                                        </option>
                                                        {vehicles.map((vehicle) => (
                                                            <option value={vehicle['vehiNo']}>{vehicle['vehiNo'] + '    |   ' + vehicle['vehiType']}</option>
                                                        ))}
                                                    </select>
                                                    <span className="error"></span>
                                                </div>
                                            </div>

                                            <div className="form-group col-md-12 rowContainerModel">
                                                <label for="vehicleID" className="form-label">
                                                    Receiver Name :
                                                </label>

                                                <label className='form-label'>{selectedOrder.length != 0 ? selectedOrder.data()['recName'] : "Receiver Name"}</label>
                                                <span className="error"></span>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label for="vehicleID" className="form-label">
                                                    Receiver Contact :
                                                </label>

                                                <label className='form-label'>{selectedOrder.length != 0 ? selectedOrder.data()['recContact'] : "Receiver Contact"}</label>
                                                <span className="error"></span>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label for="vehicleID" className="form-label">
                                                    Receiver Address :
                                                </label>

                                                <label className='form-label'>{selectedOrder.length != 0 ? selectedOrder.data()['recAddress'] : "Receiver Contact"}</label>
                                                <span className="error"></span>
                                            </div>



                                            {/* <div className="form-group col-md-3">
                                    <label for="nextlocation" className="form-label">
                                        End Center
                                    </label>
                                    <select
                                        className="form-select"
                                        name="nextlocation"
                                        
                                        id="nextlocation"
                                    >
                                        <option selected disabled>
                                        -- Select Next Center --
                                        </option>
                                        <option>No</option>
                                        <option>Colombo</option>
                                        <option>Kalutara</option>
                                        <option>Galle</option>
                                        <option>Matara</option>
                                        <option>Hambantota</option>
                                    </select>
                                    <span className="error"></span>
                                </div> */}



                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" id="btn__UpdateClose" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-danger" id="btn__UpdateUpdate" >Out For Delivery</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ParcelSendReciver