import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import fireDb from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import "./AddNewUser.css";
import Swal from "sweetalert2";
import newUserValidation from "./AddNewUserValidation";

function AddNewUser() {
  const auth = getAuth();

  const empCollection = collection(fireDb, "emp_details");

  const initialState = {
    empName: "",
    empContact: "",
    empEmail: "",
    empPassword: "",
    serviceArea: "",
    empAddress: "",
    destributionCenter: "",
    empGender: "",
    empDOB: "",
    empNic: "",
    empType: "",
    empHealthIssues: "",
  };

  const [state, setState] = useState(initialState);
  const [centers, setCenters] = useState([]);
  const [empData, setEmpData] = useState({});

  useEffect(() => {
    const getEmps = async () => {
      const data = await getDocs(empCollection);

      setEmpData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      console.log(data);
    };


    fireDb.collection("areas").get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        var data = element.data();

        setCenters(prevArray => [...prevArray, data])
      });

    })

    getEmps();
    newUserValidation();
  }, []);

  const {
    empName,
    empContact,
    empEmail,
    empPassword,
    serviceArea,
    empAddress,
    destributionCenter,
    empGender,
    empDOB,
    empNic,
    empType,
    empHealthIssues,
  } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      state.empEmail,
      state.empPassword
    ).then((userCred) => {
      const user = userCred.user;

      fireDb.collection("emp_details").doc(user.uid).set(state).then(res => {
        Swal.fire(
          'Employee Created',
          'Employee Created Successfully',
          'success'
        )
      });


    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message)
      });
  };

  return (
    <>
      <div className="container-fluid col-md-12" id="addnewuser__Container">
        <div className="row">
          <div className="card mt-2 card__User">
            <div className="card__Header">
              <h4 className="card__Heading">New User Registration</h4>
            </div>
            <div className="card__Form">
              <form
                className="row g-4"
                onSubmit={handleSubmit}
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
                    value={state.empName}
                    onChange={handleInputChange}
                    id="empName"
                    placeholder="Employee Name"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="empContact" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="empContact"
                    placeholder="Contact Number"
                    value={state.empContact}
                    onChange={handleInputChange}
                    id="empContact"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label for="empEmail" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="empEmail"
                    value={state.empEmail}
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
                    value={state.empPassword}
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
                    value={state.serviceArea}
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

                <div className="form-group col-md-9">
                  <label for="empAddress" className="form-label">
                    Permanent Address
                  </label>
                  <textarea
                    className="form-control"
                    name="empAddress"
                    value={state.empAddress}
                    onChange={handleInputChange}
                    id="empAddress"
                  ></textarea>
                </div>

                <div className="form-group col-md-3 div__Gender">
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
                    checked={state.empGender === "Male"}
                    onChange={handleInputChange}
                  />
                  <label className="form-label male">Male</label>

                  <input
                    type="radio"
                    className="form-check-input"
                    name="empGender"
                    id="empGenderFemale"
                    value="Female"
                    checked={state.empGender === "Female"}
                    onChange={handleInputChange}
                  />
                  <label className="form-label female">Female</label>
                </div>

                <div className="form-group col-md-4 div__Birth">
                  <label for="empDOB" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={state.empDOB}
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
                    value={state.empNic}
                    onChange={handleInputChange}
                    id="empNic"
                  />
                </div>

                <div className="form-group col-md-4">
                  <label for="empType" className="form-label">
                    Employee Type
                  </label>
                  <select
                    className="form-select"
                    name="empType"
                    value={state.empType}
                    onChange={handleInputChange}
                    id="empType"
                  >
                    <option selected disabled>
                      -- Select Type --
                    </option>
                    <option value="Rider">Rider</option>
                    <option value="Driver">Driver</option>
                    <option value="Customer Care">Customer Care</option>
                    <option value="Center Manager">Center Manager</option>
                  </select>
                </div>

                <div className="form-group col-md-8">
                  <label for="empHealthIssues" className="form-label">
                    Special Health Issues
                  </label>
                  <textarea
                    className="form-control"
                    name="empHealthIssues"
                    value={state.empHealthIssues}
                    onChange={handleInputChange}
                    id="empHealthIssues"
                  ></textarea>
                </div>

                <div className="form-group col-md-8">
                  <button
                    type="submit"
                    className="btn btn-danger saveBtn"
                    name="saveEmployee"
                  >
                    Save New User
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

export default AddNewUser;
