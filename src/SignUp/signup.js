import './signup.css';
import { Link } from 'react-router-dom';
import React, { Component, useEffect, useState } from 'react';

import signupValidation from './signupvalidation';
import fireDb from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2"
import { useHistory } from "react-router-dom";

function SignUp() {
  const auth = getAuth();
  const history = useHistory();

  useEffect(() => {

    const FetchCentersData = () => {
      fireDb.collection("areas").get().then((querySnapshot) => {
          querySnapshot.forEach(element => {
              var data = element.data();

              setCenters(prevArray => [...prevArray, data])
          });

      })
  }
  FetchCentersData();

  }, []);

  const [centers, setCenters] = useState([]);
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

  const handleInput = (e) => {
    setRegister({ ...registerUser, [e.target.name]: e.target.value });
  }


  

  const saveEmployee = async (e) => {
    e.preventDefault();


    await createUserWithEmailAndPassword(
      auth,
      registerUser.email,
      registerUser.password
    )
      .then((userCred) => {
        const user = userCred.user;
        console.log(user.uid)

        fireDb.collection("customer_details").doc(user.uid).set({
          fullName: registerUser.fullName,
          email: registerUser.email,
          contactNumber: registerUser.contactNumber,
          password: registerUser.password,
          permanentAddress: registerUser.permanentAddress,
          nic: registerUser.nic,
          serviceArea: registerUser.serviceArea,
        });

        Swal.fire(
          'Registration Successful',
          'Dear Customer, Thank You For Your Registration',
          'success'
        )

        history.push('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire(
          'Error While Signup',
          errorMessage,
          'error'
        )
      });
  }

  return (
    <div className="container-fluid bgcontainer">
      <div className="row px-3">
        <div id='cardContent' className="col-lg-10 col-xl-9 card cardcontent cardcontentsignup flex-row mx-auto px-0">
          <div className="img-left d-none d-md-flex"></div>

          <div className="card-body clbodysignup">
            <h4 className="title titleMainSides text-center mt-4">
              Register new account
            </h4>
            <form className="form-box px-3" id="signupform" onSubmit={saveEmployee}>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-user"></i></span>
                <input type="text" name="fullName" id="fullName" placeholder="Full Name" tabindex="10" onChange={handleInput} value={registerUser.fullName}></input>
                <span className='spanerror'>{registerUser.error_list.username}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-envelope"></i></span>
                <input type="text" name="email" id="email" placeholder="Email Address" tabindex="10" onChange={handleInput} value={registerUser.email}></input>
                <span className='spanerror'>{registerUser.error_list.email}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-phone"></i></span>
                <input type="text" name="contactNumber" id="contactNumber" placeholder="Customer Contact" onChange={handleInput} value={registerUser.contactNumber}></input>
                <span className='spanerror'>{registerUser.error_list.contact}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-home"></i></span>
                <input type="text" name="permanentAddress" id="permanentAddress" placeholder="Permanent Address" onChange={handleInput} value={registerUser.permanentAddress}></input>
                <span className='spanerror'>{registerUser.error_list.contact}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-address-card"></i></span>
                <input type="text" name="nic" id="nic" placeholder="Customer NIC" onChange={handleInput} value={registerUser.nic}></input>
                <span className='spanerror'>{registerUser.error_list.nic}</span>
              </div>

              <div className="form-input">
                <span className='faicon'><i className="fa fa-key"></i></span>
                <input type="password" name="password" id="password" placeholder="Customer Password" onChange={handleInput} value={registerUser.password}></input>
                <span className='spanerror'>{registerUser.error_list.password}</span>
              </div>


              <div className="form-input">
                <span><i className="fa fa-map-marker"></i></span>
                <select className="form-control selectOpt" id="serviceArea" name='serviceArea' onChange={handleInput} value={registerUser.serviceArea}>
                  <option selected disabled>Employee District</option>
                  {centers.map((center) => (
                    <option value={center['area_name']}>{center['area_name']}</option>
                  ))}
                </select>
                <span className='spanerror'>{registerUser.error_list.district}</span>
              </div>

              <div className="mb-3 text-center mb-2">
                <button type="submit" className="btn btn-block text-uppercase signupButton">
                  Sign up
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2">
                Already have an account?{' '}
                <Link to='/login' className="register-link">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SignUp;

