import { addDoc, collection, documentId, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './CusDeliveryReq.css';
import fireDb from '../../firebase'

import reqValidation from './ReqValidation';

import Swal from "sweetalert2";

function CusDeliveryReq() {


    var today = new Date();

    const initialStateAdd = {

    }

    const [state, setState] = useState({
        cusName: "",
        cusAddress: "",
        cusContact: "",
        cusServiceArea: sessionStorage.getItem("center"),
        pickDate:today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
        pickTime:today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
        parcelType: "",
        reqStatus: "RiderPicked",
        recName: "",
        recServiceArea: "",
        recAddress: "",
        recContact: ""
    });

    const [delData, setDelData] = useState([]);

    const [currentId, setCurrentId] = useState('')

    const [AddDetails, setAddDetails] = useState(initialStateAdd)

    const [centers, setCenters] = useState([]);

    const delCollection = collection(fireDb, 'delivery_req');


    const getDel = async () => {
        const data = await fireDb.collection('delivery_req').where('cusServiceArea', '==', sessionStorage.getItem("center")).get().then(res => {
            setDelData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        // console.log(data)
        // setReparData(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }


    useEffect(() => {


        getDel();

        fireDb.collection("areas").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();

                setCenters(prevArray => [...prevArray, data])
            });

        })


    }, [])



    // useEffect(() => {
    //     const getEmpDataforUpdate = async () => {
    //         const updateData = await fireDb.collection('emp_details').doc(currentId).get();

    //         console.log(updateData.data())

    //         setAddDetails(updateData.data())
    //         console.log(AddDetails)
    //     }
    //     getEmpDataforUpdate();

    // }, [currentId])

    // const addOrEdit = (obj) => {

    // }

    // const handleInputChange = (e) => {
    //     setAddDetails({...AddDetails, [e.target.name]:e.target.value})
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     await fireDb.collection('delivery_req').doc(currentId).update(AddDetails).then(res => {
    //         console.log(res);
    //         toast.success("Updated Success")
    //     }).catch(err => {
    //         console.log(err)
    //         toast.error(`${err}`)
    //     })


    // }

    const { cusName, cusAddress, cusContact, cusServiceArea, parcelType, date, time, reqStatus, recName, recServiceArea, recAddress, recContact } = state;

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();




        await addDoc(collection(fireDb, "delivery_req"), state).then(delivery => {
            const deliveryID = delivery.id;


            

            fireDb.collection('order_tracking').doc(deliveryID).set({
                Delivered:false,
                OutForDelivery:false,
                RiderAccept:true,
                RiderPicked:true,
                SortingCenter:false
            })


            setDelData([]);
            getDel();
           
            Swal.fire(
                'Request Added',
                'On Call Request Added Successfully',
                'success'
            )
            setState({});
        }).catch(err => {
            console.log(err)
            Swal.fire(
                'Request Error',
                'On Call Request Not Added',
                'error'
            )
        })



    }



    return (
        <>
            <div className="container-fluid" id="updateuser__Container">
                <div className="row">

                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Add Customer Delivery Request</h4>


                        </div>
                        <div className='searchmain'>
                            <button type="button" className="btn btn-danger"
                                name="empBtn__Update" id="empBtn__Update"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Add New Request
                            </button>
                        </div>


                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>R-ID</th>
                                        <th>Customer Name</th>
                                        <th>Address</th>
                                        <th>Service Area</th>
                                        <th>Parcel Type</th>
                                        <th>Request Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        delData.map((delUser) => {
                                            return (

                                                <tr key={delUser.id}>
                                                    <th scope="row">{delUser.id}</th>
                                                    <td>{delUser.cusName}</td>
                                                    <td>{delUser.cusAddress}</td>
                                                    <td>{delUser.cusServiceArea}</td>
                                                    <td>{delUser.parcelType}</td>
                                                    <td>{delUser.reqStatus}</td>
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

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content" id="modal__Update">
                        <div class="modal-body">
                            <form className="row g-4" onSubmit={handleSubmit} id="form_CusDeliveryReq">
                                {/* <div className="form-group col-md-3">
                                <label for="reciverservearea" className="form-label">
                                    Select Request ID
                                </label>
                                <select
                                    className="form-select"
                                    name="requestid"
                                    
                                    id="requestid"
                                >
                                    <option selected disabled>
                                    -- Select Request ID --
                                    </option>
                                    <option>R00001</option>
                                    <option>R00002</option>
                                    <option>R00003</option>
                                    </select>
                                </div> */}


                                <div className="form-group col-md-6">
                                    <label for="cusName" className="form-label">
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cusName"
                                        value={state.cusName}
                                        onChange={handleInputChange}
                                        id="cusName"
                                        placeholder="Customer Name"
                                    />
                                    {/* <span className="error">{formErrors.cusName}</span> */}
                                </div>



                                <div className="form-group col-md-6">
                                    <label for="cusAddress" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cusAddress"
                                        value={state.cusAddress}
                                        onChange={handleInputChange}
                                        id="cusAddress"
                                    />
                                    {/* <span className="error"></span> */}
                                </div>

                                <div className="form-group col-md-4">
                                    <label for="cusContact" className="form-label">
                                        Contact Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cusContact"
                                        value={state.cusContact}
                                        onChange={handleInputChange}
                                        id="cusContact"
                                    />
                                    {/* <span className="error"></span> */}
                                </div>


                                <div className="form-group col-md-4">
                                    <label for="parcelType" className="form-label">
                                        Select Parcel Type
                                    </label>
                                    <select
                                        className="form-select"
                                        name="parcelType"
                                        value={state.parcelType}
                                        onChange={handleInputChange}
                                        id="parcelType"
                                    >
                                        <option selected disabled>
                                            -- Select Parcel Type --
                                        </option>
                                        <option value={"Sensitive"}>Sensitive</option>
                                        <option value={"Normal"}>Normal</option>

                                    </select>
                                </div>
                                {/* 
                                <div className="form-group col-md-3 div__Birth">
                                    <label for="date" className="form-label">
                                        Date 
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={state.date}
                                        onChange={handleInputChange}
                                        name="date"
                                        id="date"
                                    />
                                    
                                </div>

                                <div className="form-group col-md-3 div__Birth">
                                    <label for="time" className="form-label">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        value={state.time}
                                        onChange={handleInputChange}
                                        name="time"
                                        id="time"
                                    />
                                    
                                </div> */}

                                {/* <div className="form-group col-md-3">
                                    <label for="reciverservearea" className="form-label">
                                        Employee ID
                                    </label>
                                    <select
                                        className="form-select"
                                        name="empid"
                                        
                                        id="empid"
                                    >
                                        <option selected disabled>
                                        -- Select Employee ID --
                                        </option>
                                        <option>E00001</option>
                                        <option>E00002</option>
                                        
                                    </select>
                                </div> */}
                                <div className="form-group col-md-6">
                                    <label for="recName" className="form-label">
                                        Reciver Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="recName"
                                        value={state.recName}
                                        onChange={handleInputChange}
                                        id="recName"
                                    />
                                    {/* <span className="error"></span> */}
                                </div>

                                <div className="form-group col-md-6">
                                    <label for="recServiceArea" className="form-label">
                                        Reciver's Service Area
                                    </label>
                                    <select
                                        className="form-select"
                                        name="recServiceArea"
                                        value={state.recServiceArea}
                                        onChange={handleInputChange}
                                        id="recServiceArea"
                                    >
                                        <option selected disabled>
                                            -- Select Area --
                                        </option>
                                        {centers.map((center) => (
                                            <option value={center['area_name']}>{center['area_name']}</option>
                                        ))}
                                    </select>
                                    {/* <span className="error"></span> */}
                                </div>


                                <div className="form-group col-md-6">
                                    <label for="recAddress" className="form-label">
                                        Reciver Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="recAddress"
                                        value={state.recAddress}
                                        onChange={handleInputChange}
                                        id="recAddress"
                                    />
                                    {/* <span className="error"></span> */}
                                </div>

                                <div className="form-group col-md-6">
                                    <label for="recContact" className="form-label">
                                        Reciver Contact
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="recContact"
                                        value={state.recContact}
                                        onChange={handleInputChange}
                                        id="recContact"
                                    />
                                    {/* <span className="error"></span> */}
                                </div>


                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" id="btn__UpdateClose" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-danger" id="btn__UpdateUpdate" data-bs-dismiss="modal">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CusDeliveryReq;
