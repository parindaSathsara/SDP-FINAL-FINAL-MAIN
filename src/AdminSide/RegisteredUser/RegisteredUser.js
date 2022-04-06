import React from 'react';
import './RegisteredUser.css'


function RegisteredUser() {
    return (
        <>
            <div className="container-fluid" id="RegisteredData__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="RegisteredData__Header">
                            <h4 className="RegisteredData__Heading">Registered Users</h4>

                            <div className="emp__Searching">
                                <form class="d-flex emp__RegisteredData">
                                    <input class="form-control me-2" type="search" placeholder="Search by Employee No"/>
                                    <button class="btn btn-outline-success" type="submit">
                                        <i class="bi bi-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="RegisteredData__Table">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>#EmpId</th>
                                        <th>Employee Name</th>
                                        <th>Contact No</th>
                                        <th>Gender</th>
                                        <th>DOB</th>
                                        <th>Center Name</th>
                                        <th>Permanent Address</th>
                                        <th>Availablity</th>
                                        <th>Employee Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>E00001</td>
                                        <td>Chathuna Samodya</td>
                                        <td>+(94) 773301672</td>
                                        <td>Male</td>
                                        <td>2000-01-20</td>
                                        <td>Colombo</td>
                                        <td>No: 206/36, Asgiriwalpola, Udugampola</td>
                                        <td>Available</td>
                                        <td>Rider</td>
                                    </tr>

                                    <tr>
                                        <td>E00002</td>
                                        <td>Sanju Dilishika</td>
                                        <td>+(94) 760770722</td>
                                        <td>Female</td>
                                        <td>2000-01-10</td>
                                        <td>Kottawa</td>
                                        <td>No: 206/36, Kottawa, Makubura</td>
                                        <td>Unavailable</td>
                                        <td>Driver</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisteredUser
