import React from 'react';
import CardCustomer from '../CardCustomer/CardCustomer';
import CardOrder from '../CardOrder/CardOrder';
import CardRider from '../CardRider/CardRider';
import CardVehicle from '../CardVehicle/CardVehicle';
import ViewOrders from '../ViewOrders/ViewOrders';
import './Dashboard.css'

function Dashboard() {
    return (
        <>
            <div className="row" id="row">
                <div className="col-md-3">
                    <CardCustomer/>
                </div>

                <div className="col-md-3">
                    <CardRider/>
                </div>

                <div className="col-md-3">
                    <CardOrder/>
                </div>

                <div className="col-md-3">
                    <CardVehicle/>
                </div>
            </div>

            <div className="row" id="rowid">
                <ViewOrders></ViewOrders>
            </div>
        </>
    )
}

export default Dashboard
