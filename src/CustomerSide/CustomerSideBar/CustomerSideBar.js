import React from "react";
import "./CustomerSideBar.css";
import { NavLink } from "react-router-dom";
import Logo from '../../images/Pick-&-Go-My-Team.png'

function CustomerSideBar() {
  return (
    <>
      <div className="sidebar sideBarCustomer">
        <div className="sidebarWrapper">
          <div className="logo">
            <img src={Logo} className="topbar__Logo" alt="logo" width="200" />
          </div>
          <div className="sidebarMenu">
            <ul className="sidebarList">

              <hr></hr>
              <li className="sidebarListItem" id="sidebar_heading">
                <NavLink to="/customermasterpage/customerdashboard" className="NavLink" activeClassName="active">
                  <i className="bi bi-person-fill mx-2"></i>
                  Customer Portal
                </NavLink>
              </li>
              <div className="list-container" id="list_box">
                <NavLink to="/customermasterpage/trackingPage" className="NavLink">
                  <i class="bi bi-geo-fill"> </i>
                  Order Tracking
                </NavLink>

                <NavLink to="/customermasterpage/orderprices" className="NavLink">
                  <i class="bi bi-cash-stack"> </i>
                  Order Prices
                </NavLink>

                <NavLink to="/customermasterpage/updateuseraccount" className="NavLink">
                  <i class="bi bi-pencil-square"> </i>
                  Update User Account
                </NavLink>

              </div>
              <hr></hr>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerSideBar;
