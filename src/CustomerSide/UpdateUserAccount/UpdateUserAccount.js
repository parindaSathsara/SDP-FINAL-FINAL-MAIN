import './UpdateUserAccount.css';

import React, { useEffect, useState } from 'react';
import { addDoc, collection, documentId, getDoc, getDocs, updateDoc, Firestore, query, where } from 'firebase/firestore';
import fireDb from '../../firebase'
import { getAuth, signInWithEmailAndPassword, updateEmail, updatePassword } from 'firebase/auth';
import Swal from "sweetalert2";

function UpdateUserAccount() {

    const [registerUser, setRegister] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        password: '',
        permanentAddress: '',
        nic: '',
        serviceArea: '',
        error_list: [],
    })

    const [updateUser, setUpdateUser] = useState([])

    const handleInput = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    }
    const auth = getAuth();

    const updateEmployee = (e) => {
        e.preventDefault();

        

        fireDb.collection("customer_details").doc(sessionStorage.getItem("id")).update({
            fullName: updateUser['fullName'],
            contactNumber: updateUser['contactNumber'],
            permanentAddress: updateUser['permanentAddress'],
            nic: updateUser['nic'],
        });


        Swal.fire(
            'User Updated',
            'User Updated Successfully',
            'success'
          )
    }



    useEffect(() => {

        fireDb.collection('customer_details').doc(sessionStorage.getItem("id")).get()
            .then(snapshot => {
                setUpdateUser(snapshot.data())
            })


    }, [])


    return (

        <div className="row" id="row">
            <div className="col-xl-6 mx-auto mt-4">
                <div className="col-md-12 containerbox">
                    <div className="containerbox-title">
                        <h5>
                            Update User Account
                        </h5>
                    </div>

                    <div className="col-md-12">
                        <form className="form-box px-3" id="signupform" onSubmit={updateEmployee}>

                            <div className="form-input">
                                <span className='faicon'><i className="fa fa-user"></i></span>
                                <input type="text" className="updateAccoutnInput" name="fullName" id="fullName" placeholder="Full Name" tabindex="10" onChange={handleInput} value={updateUser.fullName}></input>
                                <span className='spanerror'>{registerUser.error_list.username}</span>
                            </div>


                            <div className="form-input">
                                <span className='faicon'><i className="fa fa-phone"></i></span>
                                <input type="text" className='updateAccoutnInput' name="contactNumber" id="contactNumber" placeholder="Employee Contact" onChange={handleInput} value={updateUser.contactNumber}></input>
                                <span className='spanerror'>{registerUser.error_list.contact}</span>
                            </div>

                            <div className="form-input">
                                <span className='faicon'><i className="fa fa-home"></i></span>
                                <input type="text" className='updateAccoutnInput' name="permanentAddress" id="permanentAddress" placeholder="Permanent Address" onChange={handleInput} value={updateUser.permanentAddress}></input>
                                <span className='spanerror'>{registerUser.error_list.contact}</span>
                            </div>

                            <div className="form-input">
                                <span className='faicon'><i className="fa fa-address-card"></i></span>
                                <input type="text" className='updateAccoutnInput' name="nic" id="nic" placeholder="Customer NIC" onChange={handleInput} value={updateUser.nic}></input>
                                <span className='spanerror'>{registerUser.error_list.nic}</span>
                            </div>


                            <br></br>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-block text-uppercase updateButton">
                                    Update Details
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </div>

    );

}

export default UpdateUserAccount;
