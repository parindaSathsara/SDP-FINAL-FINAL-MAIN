import React, { useState, useEffect } from "react";
import "./UpdateUser.css";
import fireDb from "../../firebase";
import { Link } from "react-router-dom";
import {
  collection,
  documentId,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";

function UpdateUser() {
  const initialStateUpdate = {
    empName: "",
    empContact: "",
    empEmail: "",
    empPassword: "",
    serviceArea: "",
    empAddress: "",
    empGender: "",
    empDOB: "",
    empNic: "",
    empType: "",
    empHealthIssues: "",
  };

  const [upState, setUpState] = useState(initialStateUpdate);

  const [empData, setEmpData] = useState([]);

  const [currentId, setCurrentId] = useState("");

  const [centers, setCenters] = useState([]);

  const [updateDetails, setUpdateDetails] = useState(initialStateUpdate);

  const empCollection = collection(fireDb, "emp_details");


  const getEmps = async () => {
    const data = await getDocs(empCollection);

    setEmpData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {

    getEmps();
  }, []);


  const getEmpDataforUpdate = async () => {
    const updateData = await fireDb
      .collection("emp_details")
      .doc(currentId)
      .get();

    console.log(updateData.data());

    setUpdateDetails(updateData.data());
    console.log(updateDetails);
  };

  useEffect(() => {
    const getEmpDataforUpdate = async () => {
      const updateData = await fireDb
        .collection("emp_details")
        .doc(currentId)
        .get();

      console.log(updateData.data());

      setUpdateDetails(updateData.data());
      console.log(updateDetails);
    };

    fireDb.collection("areas").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = element.data();

        setCenters(prevArray => [...prevArray, data])
      });

    })

    getEmpDataforUpdate();
  }, [currentId]);

  const handleInputChange = (e) => {
    setUpdateDetails({ ...updateDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();


    Swal.fire({
      title: 'Are you sure?',
      text: "You want update employee details ?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Update It!'
    }).then((result) => {
      if (result.isConfirmed) {

        fireDb
          .collection("emp_details")
          .doc(currentId)
          .update(updateDetails)
          .then((res) => {
            console.log(res);
            Swal.fire(
              'Updated!',
              'User Account has been Updated.',
              'success'
            )
            setEmpData([]);
            getEmps();

          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });


      }
    })

  };

  return (
    <>
      <div className="container-fluid" id="updateuser__Container">
        <div className="row">
          <div className="col-md-12">
            <div className="updateuser__Header">
              <h4 className="updateuser__Heading">Update Exisiting User</h4>

            </div>

            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Contact Number</th>
                    <th>Email Address</th>
                    <th>Employee Type</th>
                    <th>Employee Type</th>
                  </tr>
                </thead>
                <tbody>
                  {empData.map((empUser) => {
                    return (
                      <tr key={empUser.id}>
                        <th scope="row">{empUser.id}</th>
                        <td>{empUser.empName}</td>
                        <td>{empUser.empContact}</td>
                        <td>{empUser.empEmail}</td>
                        <td>{empUser.empType}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-warning updateuser__Btn"
                            name="empBtn__Update"
                            id="empBtn__Update"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                              setCurrentId(empUser.id);
                            }}
                          >
                            <i class="bi bi-pen-fill"></i>
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

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >

        <div class="modal-dialog modal-xl">
          <div class="modal-content" id="modal__Update">
            <div class="modal-body">
              <form
                className="row g-4"
                onSubmit={handleUpdateSubmit}
                id="form_AddNewUser"
              >
                <div className="form-group col-md-6">
                  <label for="empName" className="form-label">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="empName"
                    value={updateDetails.empName || ""}
                    onChange={handleInputChange}
                    id="empName"
                    placeholder="Employee Name"
                  />
                </div>

                <div className="form-group col-md-5">
                  <label for="empContact" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="empContact"
                    placeholder="Contact Number"
                    value={updateDetails.empContact || ""}
                    onChange={handleInputChange}
                    id="empContact"
                  />
                </div>

                <div className="form-group col-md-5">
                  <label for="empEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="empEmail"
                    value={updateDetails.empEmail || ""}
                    onChange={handleInputChange}
                    placeholder="Example@abc.com"
                    id="empEmail"
                  />
                </div>

                <div className="form-group col-md-3">
                  <label for="empPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="empPassword"
                    value={updateDetails.empPassword || ""}
                    placeholder="Password"
                    onChange={handleInputChange}
                    id="empPassword"
                  />
                </div>

                <div className="form-group col-md-3">
                  <label for="serviceArea" className="form-label">
                    Service Area
                  </label>
                  <select
                    className="form-select"
                    name="serviceArea"
                    value={updateDetails.serviceArea || ""}
                    onChange={handleInputChange}
                    id="serviceArea"
                  >
                    <option selected disabled>
                      -- Select Area --
                    </option>
                    {centers.map((center) => (
                      <option value={center['area_name']}>{center['area_name']}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-md-8">
                  <label for="empAddress" className="form-label">
                    Permanent Address
                  </label>
                  <textarea
                    className="form-control"
                    name="empAddress"
                    value={updateDetails.empAddress || ""}
                    onChange={handleInputChange}
                    id="empAddress"
                  ></textarea>
                </div>

                <div className="form-group col-md-4 div__Gender">
                  <label for="empGender" className="form-label">
                    Gender
                  </label>

                  <input
                    type="radio"
                    className="form-check-input"
                    name="empGender"
                    id="empGenderMale"
                    selected
                    value="Male"
                    checked={updateDetails.empGender === "Male" || ""}
                    onChange={handleInputChange}
                  />
                  <label className="form-label male">Male</label>

                  <input
                    type="radio"
                    className="form-check-input"
                    name="empGender"
                    id="empGenderFemale"
                    value="Female"
                    checked={updateDetails.empGender === "Female" || ""}
                    onChange={handleInputChange}
                  />
                  <label className="form-label female">Female</label>
                </div>

                <div className="form-group col-md-3 div__Birth">
                  <label for="empDOB" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={updateDetails.empDOB || ""}
                    onChange={handleInputChange}
                    name="empDOB"
                    id="empDOB"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label for="empNic" className="form-label">
                    Employee NIC
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="empNic"
                    value={updateDetails.empNic || ""}
                    onChange={handleInputChange}
                    id="empNic"
                  />
                </div>

                <div className="form-group col-md-8">
                  <label for="empHealthIssues" className="form-label">
                    Special Health Issues
                  </label>
                  <textarea
                    className="form-control"
                    name="empHealthIssues"
                    value={updateDetails.empHealthIssues || ""}
                    onChange={handleInputChange}
                    id="empHealthIssues"
                  ></textarea>
                </div>

                <div className="form-group col-md-3">
                  <label for="empType" className="form-label">
                    Employee Type
                  </label>
                  <select
                    className="form-select"
                    name="empType"
                    value={updateDetails.empType || ""}
                    onChange={handleInputChange}
                    id="empType"
                  >
                    <option selected disabled>
                      -- Select Type --
                    </option>
                    <option>Rider</option>
                    <option>Driver</option>
                    <option>Customer Care</option>
                    <option>Center Manager</option>
                  </select>
                </div>

                <div className="form-group col-md-3">
                  <label for="empFullName" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="empDocID"
                    id="empDocID"
                    value={currentId}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    id="btn__UpdateClose"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    class="btn btn-danger"
                    id="btn__UpdateUpdate"
                    name="saveEmployee"
                    data-bs-dismiss="modal"
                    disabled={currentId ? false : true}
                  >
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
