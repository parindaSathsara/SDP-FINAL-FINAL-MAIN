// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import Masterpage from './AdminSide/Masterpage/Masterpage';
import Landing from './Homepage/Homepage';
import Login from './LoginPage/login';
import Signup from './SignUp/signup';
import TrackingPage from './TrackingPage/TrackingPage'
import MasterPageCustomer from './CustomerSide/MasterPage/MasterPageCustomer';
import landing from './LandingPage/landing';
import AdminLogin from './AdminLoginPage/AdminLogin';


function App() {
  return (
    <div className="App">
      <landing></landing>
      <Router>
        <Switch>
            {/* <Route exact path="/" component={Login}></Route> */}
            <Route exact path="/" component={landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/tracking" component={TrackingPage}></Route>
            <Route exact path="/landing" component={landing}></Route>
            <Route exact path="/admlogin" component={AdminLogin}></Route>

            <Route path="/adminmasterpage" name="Admin" render={(props) => <Masterpage {...props}/>}></Route>

            <Route path="/customermasterpage" name="Customer" render={(props) => <MasterPageCustomer {...props}/>}></Route>

        </Switch>
      </Router>
    </div> 
  );
}

export default App;
