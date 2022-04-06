import "./Loginpage.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import ImgAvatar from "../../Image/img_avatar2.png"



function Loginpage() {
 
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
 
//   function validateForm() {
//     return username.length > 0 && password.length > 0;
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

//   const signIn = (e) =>{
//     e.preventDefault();   
// }

  return (
      <>
      <div className="Login">
        <div className='row'>
        <div classname="login mt-5 card_User">
        <div className='login_header'>
        <h1 className='login_header'>Login</h1>
        </div>
        <div className="login_Form">
        <div class="imgcontainer">
       {/* <img src={ImgAvatar} alt="Avatar"  class="avatar"/>   */}
       </div>
        <form className="row g-4"  id="form">
        <div className="form-group col-md-6">
                  <label for="username" className="form-label">
                   User Name
                  </label>
                  <input
                    type="text"
                    variant="filled"
                     required
                    // value={username} onChange={e => setUsername(e.target.value)}
                    className="form-control"
                    name="username"
                    
                  />
                    <label for="password" className="form-label">
                   password
                  </label>
                  <input
                    type="password"
                    variant="filled"
                     required
                    // value={password} onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    name="password"
                    
                  />
                  <label class="container"> Remember me
                         <input type="checkbox"></input>
                         <span class="checkmark"></span>
                    </label>
              
                    <button 
                    // onClick={signIn}
                    type="submit"
                    // disabled={!validateForm()}
                    className="btn btn-primary"
                    name="Savelogin"
                    id="savelogin"
                >
                  LOGIN
                </button>
                <label class="container"> New User? 
                <Link  to ="/signup" style={{textDecoration:"none",color:"inherit"}}>Signup</Link>                         
                      
                    </label>
                </div>
      
        </form> 
        </div>
        </div>
        </div>
      </div>
      </>
  );
}

export default Loginpage;

