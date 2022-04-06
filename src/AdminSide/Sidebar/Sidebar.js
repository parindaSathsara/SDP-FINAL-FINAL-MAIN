import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import Logo from '../../images/Pick-&-Go-My-Team.png'

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="logo">
            <img src={Logo} className="topbar__Logo" alt="logo" width="200" />
          </div>
          <div className="sidebarMenu">
            <ul className="sidebarList">
              <li className="sidebarListItem" id="sidebar_heading">
                <NavLink to="/adminmasterpage/dashboard" className="NavLink" activeClassName="active">
                  <i className="bi bi-house-door-fill mx-2"></i>
                  Admin Dashboard
                </NavLink>
              </li>
              <hr></hr>
              <li className="sidebarListItem" id="sidebar_heading">
                
                  <i className="bi bi-people-fill mx-2"></i>
                  Users
                  
                
              </li>
              <div className="list-container" id="list_box">
                <NavLink to="/adminmasterpage/addnewuser" className="NavLink">
                  <i class="bi bi-person-plus"> </i>
                   Add New Employee
                </NavLink>

                <NavLink to="/adminmasterpage/updateuser" className="NavLink">
                <i class="bi bi-pencil-square"> </i>
                  Update Employee Detail
                </NavLink>

                <NavLink to="/adminmasterpage/removeeuser" className="NavLink">
                <i class="bi bi-person-x"> </i>
                  Deativate Employee Account
                </NavLink>

                <NavLink to="/adminmasterpage/customerdetails" className="NavLink">
                <i class="bi bi-person-check"> </i>
                  Registered Customer Detail
                </NavLink>
              </div>

              <hr></hr>

              <li className="sidebarListItem" id="sidebar_heading">
                <NavLink to="#" className="NavLink" id="">
                  <i className="bi bi-gear-fill mx-2"></i>
                  Parcel Management
                </NavLink>
              </li>
              <div className="list-container" id="">

                <NavLink to="/adminmasterpage/cusdeliveryreq" className="NavLink">
                  Delivery Request From Customers
                </NavLink>
              
                <NavLink to="/adminmasterpage/collectedparcelcus" className="NavLink">
                  Collect Parcels From Riders
                </NavLink>
                
                <NavLink to="/adminmasterpage/collectedparcelcenter" className="NavLink">
                  Recived Parcel From Another Center
                </NavLink>

                <NavLink to="/adminmasterpage/parcelsentanothercenter" className="NavLink">
                  Send Parcel To Another Center
                </NavLink>

                <NavLink to="/adminmasterpage/parcelsendreciver" className="NavLink">
                  Distribute Parcels To Receivers
                </NavLink>

                <NavLink to="/adminmasterpage/viewallorders" className="NavLink">
                  View All Parcel Details
                </NavLink>

                <NavLink to="/adminmasterpage/completeddilivery" className="NavLink">
                  Completed Delivery Parcels
                </NavLink>
              </div>

              <hr></hr>

              <li className="sidebarListItem" id="sidebar_heading">
                <NavLink to="#" className="NavLink" id="">
                  <i className="bi bi-cash mx-2"></i>
                  Vehicle Management
                </NavLink>
              </li>

              <div className="list-container" id="">

                <NavLink to="/adminmasterpage/registervehicle" className="NavLink">
                  Register Vehicles
                </NavLink>

                <NavLink to="/adminmasterpage/releasevehicles" className="NavLink">
                  Release/Return Vehicles
                </NavLink>
                
                {/* <NavLink to="#" className="NavLink">
                  Assign Vehicle Roots
                </NavLink> */}

              </div>

              

              <hr></hr>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
