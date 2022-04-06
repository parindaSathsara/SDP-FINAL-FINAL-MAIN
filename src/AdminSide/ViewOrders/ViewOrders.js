import React from 'react';
import './ViewOrders.css';
import './script1.js';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fireDb from '../../firebase'
import MaterialTable from "material-table";
import tableIcons from "../../materialicons";



function ViewOrders() {

    const [allRequests, setAllRequests] = useState([])


    const FetchOrderData = () => {
        fireDb.collection("delivery_req").where('cusServiceArea', '==', sessionStorage.getItem("center")).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {

                var data = element.data();
                var orderNumbers = data['orderNumbers'];

                setAllRequests(prevArray => [...prevArray, element])
            });
        })
    }



    useEffect(() => {

        FetchOrderData();
    }, []);


    const data = {
        columns: [
            {
                title: "Request ID",
                field: "requestid",
            },

            {
                title: "Customer Name",
                field: "customername",
                // lookup: {MainService:"Main Service",OtherService:"Other Service"}
            },
            {
                title: "Receiver Name",
                field: "receivername",

            },

            {
                title: "Receiver Contact Number",
                field: "receivercontact",
            },


            {
                title: "Parcel Type",
                field: "parceltype",
            },
            {
                title: "Request Status",
                field: "requeststatus",
            },
        ],

        rows: allRequests.map(request => {
            console.log(request)
            return {
                requestid: request['id'],
                customername: request.data()['cusName'],
                receivername: request.data()['recName'],
                receivercontact: request.data()['recContact'],

                parceltype: request.data()['parcelType'],
                requeststatus: request.data()['reqStatus'],
            }
        }),
    };


    return (
        <>
            <div className="container-fluid" id="viewallorder__Container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="viewallorder__Header">
                            <h4 className="viewallorder__Heading">View All Orders</h4>
                        </div>

                        <MaterialTable
                            title={""} 
                            data={data.rows}
                            columns={data.columns}
                            icons={tableIcons}
                            options={{
                                sorting: true, search: true,
                                searchFieldAlignment: "left", searchAutoFocus: true, searchFieldVariant: "standard",
                                filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
                                paginationType: "stepped", showFirstLastPageButtons: false, paginationPosition: "both", exportButton: true,
                                exportAllData: true, exportFileName: "Services Data", addRowPosition: "first", actionsColumnIndex: -1,
                                columnsButton: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewOrders
