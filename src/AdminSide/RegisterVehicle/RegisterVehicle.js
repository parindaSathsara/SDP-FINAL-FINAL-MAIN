import { addDoc, collection, deleteDoc  } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './RegisterVehicle.css';
import Swal from "sweetalert2";
import fireDb from '../../firebase'

// import addNewVehicleValidate from './AddVehicleValidation'

function RegisterVehicle() {

    const [values, setValues] = useState({
        vehiNo: '',
        regCenter: sessionStorage.getItem("center"),
        vehiType: '',
        vehiAvailable: 'Available'
    })


    const [vehicleDetails, setVehicles] = useState([]);
    const [centers, setCenters] = useState([]);
    
    const FetchVehicleData = () => {
        fireDb.collection("vehicle_details").where('regCenter','==',sessionStorage.getItem("center")).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {

                setVehicles(prevArray => [...prevArray, element])
            });
        })
    }



    const handleInputChange = (e) => {
        e.persist();
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        fireDb.collection("vehicle_details").doc(values.vehiNo).set(values).then(res => {

            setVehicles([])
            FetchVehicleData()

            Swal.fire(
                'Vehicle Added',
                'Vehicle Added Successfully',
                'success'
            )
        });
    }

    const handleOnClick=(e)=>{
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            text: "You want delete vehicle ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update It!'
          }).then((result) => {
            if (result.isConfirmed) {
           
                fireDb.collection('vehicle_details').doc(e.target.value).delete();
                setVehicles([])
                FetchVehicleData()
            }
          })

        fireDb.collection('vehicle_details').doc(e.target.value).delete();
    }


    useEffect(() => {
        FetchVehicleData()
    }, [])



    return (
        <>
            <div className="container-fluid" id="updateuser__Container">

                <div className="row">
                    <div className="card mt-2 card__Vehicle">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Vehicle Registration</h4>
                        </div>
                        <hr></hr>
                        <div className="card__FormVehicle">
                            <form className="row g-4" onSubmit={handleSubmit} id="addVehicle">
                                <div className="form-group col-md-6">
                                    <label for="vehiNo">Vehicle Number</label>
                                    <input type="text" className="form-control" name="vehiNo"
                                        id="vehiNo" placeholder="AB-0000"
                                        value={values.vehiNo}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* <div className="form-group col-md-6">
                                    <label for="regCenter">Registerd Center</label>
                                    <select className="form-select" name="regCenter"
                                        id="regCenter"
                                        value={values.vehiNo}
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected>--Select Regional Center--</option>
                                        <option value="Kalutara">Kalutara</option>
                                        <option value="Gampaha">Gampaha</option>
                                        <option value="Colombo">Colombo</option>
                                    </select>
                                </div> */}

                                <div className="form-group col-md-6">
                                    <label for="vehiType">Vehicle Type</label>
                                    <select className="form-select" name="vehiType"
                                        id="vehiType"
                                        value={values.vehiType}
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected>--Select Vehicle Type--</option>
                                        <option value="Lorry">Lorry</option>
                                        <option value="Motor Bike">Motor Bike</option>
                                        <option value="Van">Van</option>
                                    </select>
                                </div>

                                {/* <div className="form-group col-md-6">
                                    <label for="vehiAvailable">Vehicle Availability</label>
                                    <select className="form-select" name="vehiAvailable"
                                        id="vehiAvailable"
                                        value={values.vehiAvailable}
                                        onChange={handleInputChange}
                                    >
                                        <option disabled selected>--Select Vehicle Availability--</option>
                                        <option value="Available">Available</option>
                                        <option value="NotAvailable">Not Available</option>
                                    </select>
                                </div> */}

                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-danger">Save Vehicle Details</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="updateuser__Header">
                            <h4 className="updateuser__Heading">Recived Parcels From Centers</h4>


                        </div>

                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable">
                                <thead>
                                    <tr>
                                        <th>Vehicle ID</th>
                                        <th>Availability</th>
                                        <th>Vehicle Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicleDetails.map((vehiclesD) => (
                                        <tr>
                                            <td>{vehiclesD['id']}</td>
                                            <td>{vehiclesD.data()['vehiAvailable']}</td>
                                            <td>{vehiclesD.data()['vehiType']}</td>
                                            <td><button type="button" className="btn btn-danger btnCollectParcel" value={vehiclesD['id']} onClick={handleOnClick}>Delete</button></td>
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

export default RegisterVehicle