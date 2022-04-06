import React from "react";
import "./TopNavCustomer.css";
import { getAuth } from 'firebase/auth';
import { useHistory } from "react-router-dom";

function TopNavCustomer() {

  const auth = getAuth();
  const history = useHistory();


  const handleOnClick=()=>{

    sessionStorage.clear()
    history.push('/login');
    
  }


  return (
    <>
      <div className="topbar topnavBarCustomer">
      <div className="topbarWrapper">
          
          <div className="topseprator">
            <div className="navslog">
              <span> Hello {sessionStorage.getItem("displayName")} !</span>
            </div>
          </div>
            <button type="button" class="btn btn-dark btnLogout" onClick={handleOnClick}><i className="bi bi-box-arrow-right"> </i>Logout</button>

        </div>
      </div>
    </>
  );
}

export default TopNavCustomer;
