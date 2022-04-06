import React, { useEffect, useState } from 'react';
import './CustomerTrackingPage.css';
import fireDb from '../../firebase';
import Image from '../../images/Pick-&-Go-My-Team.png';
import ParcelBoxIMG from '../../images/parcelbox.png';
import ScooterIMG from '../../images/scooter.png';
import ParcelIn from '../../images/parcelIn.png';
import ParcelOut from '../../images/parcelOut.png';

function CustomerTrackingPage() {


    const [tracking, setTracking] = useState({
        delivered: false,
        outForDelivery: false,
        riderAccept: false,
        riderPicked: false,
        sortingCenter: false,
    })

    const [orderDetails, setOrderDetails] = useState({
        recName: '',
        senderName: '',
    })


    const [trackingNumber, setTrackingNumber] = useState({});

    useEffect(() => {

        console.log(tracking);

    }, []);


    const handleClick = () => {
        console.log(trackingNumber['trackingNumber']);

        var trackNum = trackingNumber['trackingNumber'];

        fireDb.collection('order_tracking').doc(trackNum).get()
            .then(snapshot => {
                var snapdata = snapshot.data();
                setTracking({
                    ...tracking,
                    delivered: snapdata['Delivered'],
                    outForDelivery: snapdata['OutForDelivery'],
                    riderAccept: snapdata['RiderAccept'],
                    riderPicked: snapdata['RiderPicked'],
                    sortingCenter: snapdata['SortingCenter']
                })
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });


        fireDb.collection('delivery_req').doc(trackNum).get()
            .then(snapshot => {
                var snapdata = snapshot.data();
                setOrderDetails({
                    ...orderDetails,
                    recName:snapdata['recName'],
                    senderName:snapdata['cusName']
                })
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }


    const handleInput = (e) => {
        setTrackingNumber({ ...trackingNumber, [e.target.name]: e.target.value })
    }



    return (
        <div classNameName="TrackingPageContainer">


            <div className="container trackingContainerCustomer padding-bottom-3x mb-1">


                <div className="card trackingContainerCard mb-3">
                    <div className="p-4 text-center text-white text-lg bg-dark rounded-top trackingNumberContainer">

                        <div className="form-group row TrackingNumberForm">
                            <label for="TrackingNumber" id='TrackingNumberLBL' class="col-sm-3 col-form-label">Tracking Number</label>
                            <div className="col-sm-7">
                                <input type="text" class="form-control TrackingInput" name='trackingNumber' id="TrackingNumber" onChange={handleInput} placeholder="Tracking Number"></input>
                            </div>

                            <div className="col-sm-2">
                                <button type="button" class="btn btn-dark trackButton" onClick={handleClick}>Track Order</button>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Receiver Name:</span> {orderDetails.recName}</div>
                        <div className="w-100 text-center py-1 px-2"><span className="text-medium">Sender Name:</span> {orderDetails.senderName}</div>

                    </div>
                    <div className="card-body trackingCardBody">
                        <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                            <div className={tracking.riderAccept == true ? 'step completed' : 'step'}>
                                <div className="step-icon-wrap">
                                    <div className="step-icon"><i className="fa fa-motorcycle"></i></div>
                                </div>
                                <h4 className="step-title">Rider Accept</h4>
                            </div>
                            <div className={tracking.riderPicked == true ? 'step completed' : 'step'}>
                                <div className="step-icon-wrap">
                                    <div className="step-icon"><i className="peIcons pe-7s-box2"></i></div>
                                </div>
                                <h4 className="step-title">Rider Picked</h4>
                            </div>
                            <div className={tracking.sortingCenter == true ? 'step completed' : 'step'}>
                                <div className="step-icon-wrap">
                                    <div className="step-icon"><i className="fa fa-building"></i></div>
                                </div>
                                <h4 className="step-title">Sorting Center</h4>
                            </div>
                            <div className={tracking.outForDelivery == true ? 'step completed' : 'step'}>
                                <div className="step-icon-wrap">
                                    <div className="step-icon"><i className="peIcons pe-7s-way"></i></div>
                                </div>
                                <h4 className="step-title">Out For Delivery</h4>
                            </div>
                            <div className={tracking.delivered == true ? 'step completed' : 'step'}>
                                <div className="step-icon-wrap">
                                    <div className="step-icon"><i className="fa fa-check"></i></div>
                                </div>
                                <h4 className="step-title">Delivered</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerTrackingPage;
