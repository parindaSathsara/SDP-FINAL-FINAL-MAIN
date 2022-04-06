import React, { useEffect, useState } from 'react';
import { addDoc, collection, documentId, getDoc, getDocs, updateDoc, Firestore, query, where } from 'firebase/firestore';
import fireDb from '../../firebase'

import './CollectedParcelCus.css'

import Swal from "sweetalert2"

function CollectedParcelCus() {

    const [reparData, setReparData] = useState([]);
    const [currentId, setCurrentId] = useState('')

    const [orderPrice, setOrderPrice] = useState(0.00)
    const [orderWeight, setOrderWeight] = useState(0.00)
    const [orderDistance, setOrderDistance] = useState(0.00)
    const [allOrders, setAllOrders] = useState([])


    const [orderPricingDet,setOrderPricing]=useState([])

    const getTotalOrders = async () => {
        await fireDb.collection('delivery_req').where('recServiceArea','==',sessionStorage.getItem('center')).get().then(res => {
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





    const [updateDetails, setUpdateDetails] = useState({
        currentId: '',
        pickDate: '',
        pickTime: '',
        status: '',
        sendType: '',
        centerId: '',
    })

    var weight = 0.00;
    var distance = 0.00;
    var finalPrice = 0.00;

    var weightRate = 0.00;
    var distanceRate = 0.00;

    const handleWeightInput = (e) => {
        weight = e.target.value

        if (weight >= 10) {
            weightRate = 10.0
        }
        if (weight >= 30) {
            weightRate = 15.0
        }
        if (weight >= 50) {
            weightRate = 25.0
        }
        if (weight <= 10) {
            weightRate = 5.0
        }

        finalPrice = (distance * distanceRate) + (weight * weightRate)
        setOrderWeight(weight)
        setOrderPrice(finalPrice)
    }

    const handleDistanceInput = (e) => {
        distance = e.target.value

        if (distance >= 5) {
            distanceRate = 20.0
        }
        if (distance >= 15) {
            distanceRate = 10.0
        }
        if (distance >= 25) {
            distanceRate = 18.0
        }
        if (distance >= 50) {
            distanceRate = 15.0
        }
        if (distance >= 100) {
            distanceRate = 5.0
        }
        if (distance >= 200) {
            distanceRate = 4.0
        }
        if (distance <= 10) {
            distanceRate = 40.0
        }

        finalPrice = ((distance * distanceRate) + (weight * weightRate))
        setOrderDistance(distance)
        setOrderPrice(finalPrice)
    }


    const getRepar = async () => {
        const data = await fireDb.collection('delivery_req').where('reqStatus', '==', 'RiderPicked').where('cusServiceArea', '==', sessionStorage.getItem("center")).get().then(res => {
            setReparData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        // console.log(data)
        // setReparData(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }


    useEffect(() => {

        getRepar();

        getTotalOrders();

    }, [])



    // const addOrEdit = (obj) => {

    // }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        console.log(e.target.value)


        const dataSet = {
            orderID: currentId,
            orderWeight: orderWeight,
            orderDistance: orderDistance,
            totalPrice: orderPrice,
        }


        await addDoc(collection(fireDb, "order_pricing"), dataSet)
            .then((orderPricing) => {
                console.log("success")

                fireDb.collection("delivery_req").doc(currentId).update({
                    reqStatus: "InSortingCenter"
                });

                fireDb.collection("order_tracking").doc(currentId).update({
                    SortingCenter: true
                });

                Swal.fire(
                    'Order Pricing Success',
                    'Successfully Priced the Order',
                    'success'
                )

                setReparData([]);
                setOrderPricing([]);
                getRepar();
                getTotalOrders();


            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    }




    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Collected Parcels From Customers</h4>


                        </div>
                        <div className="table-responsive">

                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Req-ID</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Reciver's Service Area</th>
                                        <th>Reciver's Address</th>
                                        <th>Recive Confirmatrion</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reparData.map((delUser) => {
                                            return (
                                                <tr key={delUser.id}>
                                                    <td scope="row">{delUser.id}</td>
                                                    <td>{delUser.pickDate}</td>
                                                    <td>{delUser.pickTime}</td>
                                                    <td>{delUser.recServiceArea}</td>
                                                    <td>{delUser.recAddress}</td>
                                                    <td><button type="button" className="btn btn-danger btnCollectParcel"
                                                        name="empBtn__Update" id="empBtn__Update"
                                                        data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => { setCurrentId(delUser.id) }}>
                                                        Confirm Recived
                                                    </button>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <br></br><br></br><br></br>
                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Collected Parcels Details</h4>


                        </div>
                        <div className="table-responsive">

                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Pricing ID</th>
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
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content" id="modal__Update">

                        <div class="modal-body">
                            <form className="row g-4" id="form_Confirm_ceter_recived_items" onSubmit={handleUpdateSubmit}>

                                <div className='row'>
                                    <div className="form-group col-md-6">
                                        <label for="weight" className="form-label">
                                            Weight
                                        </label>
                                        <input type="number"
                                            className="form-control"
                                            name="weight"
                                            id="weight"
                                            onChange={handleWeightInput}
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label for="distance" className="form-label">
                                            Distance
                                        </label>
                                        <input type="number"
                                            className="form-control"
                                            name="distance"
                                            id="distance"
                                            onChange={handleDistanceInput}
                                        />
                                    </div>
                                </div>

                                <div className='row rowContainerModel'>
                                    <div className="form-group col-md-6">
                                        <label for="finalPrice" className="form-label">
                                            Final Price
                                        </label>
                                        <input type="number"
                                            className="form-control"
                                            name="finalPrice"
                                            id="finalPrice"
                                            value={orderPrice}
                                        />
                                    </div>
                                </div>


                                {/* <div className="form-group col-md-4">
                                                <label for="officerid" className="form-label">
                                                    My ID
                                                </label>
                                                <input
                                                    value={"Sanju"}
                                                    type="text"
                                                    className="form-control"
                                                    name="officerid"
                                                    
                                                    id="officerid"
                                                    disabled
                                                />
                                                
                                            </div> */}

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="btn__UpdateClose" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-danger" id="btn__UpdateUpdate" name='saveEmployee' data-bs-dismiss="modal">Set Price</button>
                                </div>

                            </form>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}

export default CollectedParcelCus;
