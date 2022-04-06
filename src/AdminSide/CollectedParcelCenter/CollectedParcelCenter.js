import React from 'react';
import './CollectedParcelCenter.css';
import { useEffect, useState } from 'react';
import fireDb from '../../firebase'
import Swal from "sweetalert2";

function CollectedParcelCenter() {


    const [receivedParcels, setParcels] = useState([]);
    const [centers, setCenters] = useState([]);
    
    const FetchOrderData = () => {
        fireDb.collection("sendtocenter").where('endCenter', '==', sessionStorage.getItem('center')).where('status', '==', 'InTransist').get().then((querySnapshot) => {
            querySnapshot.forEach(element => {

                var data = element.data();
                var orderNumbers = data['orderNumbers'];


                setParcels(prevArray => [...prevArray, element])

                // orderNumbers.forEach(element => {
                //     fireDb.collection('delivery_req').doc(element).get()
                //         .then(snapshot => {

                //             var snapdata = snapshot;
                //             console.log(snapdata);

                //             setParcels(prevArray => [...prevArray, snapdata])

                //         })
                //         .catch(err => {
                //             console.log('Error getting documents', err);
                //         });
                // });
            });



        })
    }


    const handleOnClick = (e) => {

        var delivery_reqStUpdate = fireDb.collection("sendtocenter").doc(e.target.value);

        return delivery_reqStUpdate.update({
            status: "Delivered"
        })
            .then(function () {
                Swal.fire(
                    'Bulk Collected',
                    'Bulk Collected Successfully',
                    'success'
                )

                setParcels([])
                FetchOrderData()

            })
    }


    useEffect(() => {

        FetchOrderData();

        fireDb.collection("areas").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();

                setCenters(prevArray => [...prevArray, data])
            });

        })

    }, []);


    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Recived Parcels From Centers</h4>


                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Bulk ID</th>
                                        <th>Send Date</th>
                                        <th>Send Time</th>
                                        <th>Vehicle Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedParcels.map((parcel) => (
                                        <tr>
                                            <td>{parcel['id']}</td>
                                            <td>{parcel.data()['sendDate']}</td>
                                            <td>{parcel.data()['sendTime']}</td>
                                            <td>{parcel.data()['vehicle']}</td>
                                            <td><button type="button" className="btn btn-danger btnCollectParcel" value={parcel['id']} onClick={handleOnClick}>Collect Bulk</button></td>
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

export default CollectedParcelCenter;
