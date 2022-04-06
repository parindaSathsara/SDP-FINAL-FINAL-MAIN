import './login.css';
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useHistory } from "react-router-dom";
import fireDb from '../firebase'
import Swal from "sweetalert2"


function Login() {

  const auth = getAuth();
  const history = useHistory();

  const [loginInput, setLogin] = useState({
    email: '',
    password: ''
  });


  const handleInput = (e) => {

    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value })

  }


  const loginSubmit = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginInput.email, loginInput.password)
      .then((userCredential) => {

        const user = userCredential.user;

        fireDb.collection('customer_details').doc(user.uid).get()
          .then(snapshot => {
            sessionStorage.setItem("id", snapshot.id)
            sessionStorage.setItem("displayName", snapshot.data()['fullName'])
            sessionStorage.setItem("center", snapshot.data()['serviceArea'])
            sessionStorage.setItem("empType", "Customer")
          })

        history.push('/customermasterpage/customerdashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire(
          'Error While Login',
          errorMessage,
          'error'
        )
    
      });
  }



  return (
    <div className="container-fluid bgcontainerlogin">
      <div className="row px-3">
        <div id='cardContent' className="col-lg-10 col-xl-9 card cardcontent flex-row mx-auto px-0">
          <div className="img-left-login d-none d-md-flex"></div>

          <div className="card-body clbody">
            <h4 className="title titleMainSides text-center mt-4">
              Login into account
            </h4>
            <form className="form-box px-3" onSubmit={loginSubmit}>
              <div className="form-input">
                <span><i className="fa fa-envelope-open-text"></i></span>
                <input type="email" name="email" onChange={handleInput} placeholder="Email Address" tabindex="10" required></input>
              </div>
              <div className="form-input">
                <span><i className="fa fa-key"></i></span>
                <input type="password" name="password" onChange={handleInput} placeholder="Password" required></input>
              </div>
              <div className="mb-3 text-center mb-2">
                <button type="submit" className="btn btn-block text-uppercase loginBtn">
                  Login
                </button>
              </div>
              <hr className="my-4"></hr>

              <div className="text-center mb-2">
                Don't have an account? {' '}
                <Link to='/signup' className="register-link">
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
