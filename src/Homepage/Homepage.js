import "./homepage.css";
import image1 from "../images/Image2.png";
import image2 from "../images/Image3.png";
import image3 from "../images/Image4.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const user = false;
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 Home">
            <nav className="navbar">
              <div className="topcenter">
                <ul className="toplist">

                  
                  <NavLink to="/login" className="topListItem">
                    Login
                  </NavLink>


                  <li className="topListItem">
                    <a>Login</a>
                  </li>


                  <li className="topListItem">
                    <a>Admin Dashboard</a>
                  </li>

                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid about-us">
        <div className="col-md-12">
          <div className="row aboutus">
            <div>
              <h1>About Us</h1>
              <p1>
                Pick & GO is a package delivery service provider establish in Sri
                Lanka where they provide goods delivery island wide. They
                have several operational service centers at all districts and
                number of staff employed vary according to the general capacity of
                business operations.
              </p1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12" id="slider">
            <h1>Services</h1>
            <div class="col-md-4 text-center">
              <img src={image1} alt="images1" />
              <p>Safe and Easy</p>
              <p3>No surge charges and easy to use</p3>
            </div>
            <div class="col-md-4 text-center">
              <img src={image2} alt="images2" />
              <p>Experienced Drivers</p>
              <p3>
                Our drivers have gone through proper screening <br></br>and
                training
              </p3>
            </div>
            <div class="col-md-4 text-center">
              <img src={image3} alt="images3" />
              <p>Remote Booking</p>
              <p3>
                Customer can book a taxi on behalf of <br></br>someone
              </p3>
            </div>
          </div>
        </div>

        <br></br><br></br><br></br>
      </div>

      <footer class="text-center text-lg-start bg-light text-muted">
        <section
          id="footer"
          class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        >
          <div class="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="me-4 text-reset">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </section>

        <div class="text-center p-4">
          © 2022 Copyright:
          <a class="text-reset fw-bold" href="#">
            pickandgo.com
          </a>
        </div>
      </footer>
    </>
  );
};

export default Homepage;
