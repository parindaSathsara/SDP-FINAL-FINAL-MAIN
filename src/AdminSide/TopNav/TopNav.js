import React from "react";
import "./TopNav.css";
import { useHistory } from "react-router-dom";

function TopNav() {
  const history = useHistory();

  const handleOnClick=()=>{

    sessionStorage.clear()
    history.push('/admlogin');
    
  }

  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">

          <div className="topseprator">
            <div className="navslog">
              <span> Everything at Your Door step. </span>
            </div>
          </div>
          <div className="topLeft">

            <span>{sessionStorage.getItem("displayName")}</span>
            <button type="button" class="btn btn-dark btnLogout" onClick={handleOnClick}><i className="bi bi-box-arrow-right"> </i>Logout</button>

          </div>
        </div>

      </div>
    </>
  );
}

export default TopNav;
