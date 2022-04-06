import React from 'react';
import {Switch, Redirect ,Route} from 'react-router-dom';
import routes from '../../routes/routes'
import CustomerSideBar from '../CustomerSideBar/CustomerSideBar';
import TopNavCustomer from '../TopNavCustomer/TopNavCustomer';
import './MasterPageCustomer.css';

function MasterPageCustomer() {
    return (
        <>
            <TopNavCustomer/>
            <div className="conatiner-fluid MasterPageContainer">
                <div className="row">
                    <div className="col-md-2 admin__Sidebar">
                        <CustomerSideBar/>
                    </div>

                    <div className="col-md-10 master__Content">
                        <Switch>
                            {routes.map((route,idx) => {
                                return(
                                    route.component && (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={(props) => (
                                        <route.component {...props}/>
                                    )}/>)
                                )
                            })}
                            <Redirect from="/adminmasterpage" to="/adminmasterpage/dashboard"/>
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MasterPageCustomer
