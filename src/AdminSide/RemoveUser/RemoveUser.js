import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  documentId,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import fireDb from "../../firebase";
import { deleteUser } from "firebase/auth";
import Swal from "sweetalert2";

function RemoveUser() {
  const delluser = collection(fireDb, "emp_details");
  const [dellData, setDellData] = useState([]);

  const getDel = async () => {
    const data = await getDocs(delluser);
    // console.log(data)
    setDellData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    console.log(data);
  };

  useEffect(() => {


    getDel();
  }, []);

  const onDelete = async (id) => {
    if (window.confirm("Are you sure! You want to Delete this User?")) {
      await deleteDoc(doc(fireDb, "emp_details", id));
      setDellData([])
      getDel();
      Swal.fire("Use Removed successfully");
    }
  };

  return (
    <>
      <div className="container-fluid" id="updateuser__Container">
        <div className="row">
          <div className="col-md-12">
            <div className="updateuser__Header">
              <h4 className="updateuser__Heading">
                Activate & Deactivate User Accounts
              </h4>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable">
                <thead>
                  <tr>
                    <th>E-ID</th>
                    <th>Employee Name</th>
                    <th>Contact No</th>
                    <th>Email Address</th>
                    <th>Center Name</th>
                    <th>Permanent Address</th>
                    <th>NIC</th>
                    <th>Employee Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dellData.map((dellUser) => {
                    return (
                      <tr key={dellUser.id}>
                        <th scope="row">{dellUser.id}</th>
                        <td>{dellUser.empName}</td>
                        <td>{dellUser.empContact}</td>
                        <td>{dellUser.empEmail}</td>
                        <td>Colombo</td>
                        <td>{dellUser.empAddress}</td>
                        <td>{dellUser.empNic}</td>
                        <td>{dellUser.empType}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger updateuser__Btn"
                            name="empBtn__Update"
                            id="empBtn__Update"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => onDelete(dellUser.id)}
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveUser;
