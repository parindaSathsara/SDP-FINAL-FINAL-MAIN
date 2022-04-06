import React from 'react';
import CustomerOrders from '../CustomerCards/CustomerOrders/CustomerOrders';
import CompletedCustomerOrders from '../CustomerCards/CompletedCustomerOrders/CompletedCustomerOrders';
import PendingCustomerOrders from '../CustomerCards/PendingCustomerOrders/PendingCustomerOrders';
import CustomerPendingOrders from '../CustomerPendingOrders/CustomerPendingOrders';
import CustomerAllOrders from '../CustomerAllOrders/CustomerAllOrders';
import CustomerCompletedOrders from '../CustomerCompletedOrders/CustomerCompletedOrders';

import './CustomerDashboard.css'

function CustomerDashboard() {
    return (
        <>
            <div className="row" id="row">
                <div className="col-md-4">
                    <CustomerOrders/>
                </div>

                <div className="col-md-4">
                    <CompletedCustomerOrders/>
                </div>

                <div className="col-md-4">
                    <PendingCustomerOrders/>
                </div>

            </div>

            <div className="row" id="row">
                <CustomerPendingOrders></CustomerPendingOrders>
                <CustomerCompletedOrders></CustomerCompletedOrders>
            </div>

            <div className="row" id="row">
                <CustomerAllOrders></CustomerAllOrders>
                
            </div>
        </>
    )
}

export default CustomerDashboard
