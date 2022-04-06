import logoimg from '../images/Pick-&-Go-My-Team.png'
import './landing.css';
import { Link } from 'react-router-dom';

function landing() {
  return (
    <div>
      <div className='container-fluid banner'>
        <div className='row'>
          <div className='col-md-12'>
            <nav className='navbar navbar-md' id="navbar-example2">
              <div className='navbar-brand'>
                <img className='brandimage'></img>
              </div>
              <ul className='nav manNavBar'>
                <li className='nav-item'>
                  <a className='nav-link landingNav' href='#about'>Home</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link landingNav' href='#services'>Service</a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link landingNav' href='#partners'>Partners</a>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link landingNav' to='/tracking'>Tracking</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link landingNav' to='/admlogin'>Employee Portal</Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link btn btn-danger' to='/login'>Login</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className='container-fluid pagecontent'>

        <div className='about' id="about">
          <h1>
            About <span className='secondLetter'>Pick & Go</span>
          </h1>
          <p className='description'>
            Having started In December 2020, our company EasyWay has reached the hearts of people in Galle & Matara as one of the most reliable delivery services marking a new era in the field by filling up plenty of unfilled gaps thereby making us a top budding delivery company in Sri Lanka.
            Our services include delivering grocery items, medicines, stationery and foods having partnered with the top companies selling them within the Galle and Matara region. Furthermore, we care about any other delivery requirement of the customer as long as they are within the ethics and standards of the company. Our service is renowned for fast and safe deliveries and the customer feedbacks especially on social media bears ample testimony for the nature of our service.
            Apart from them, we are proud to announce that even as a budding up company, we have been able to aid the country to eradicate unemployment by providing a reasonable number of job opportunities to the deprived youth.
            As a company trying to improve day by day and showing promising results, it would be a humongous opportunity for us if you could extend your hands to partner with us to cater to your delivery requirements thereby leading it to a win-win situation.
          </p>
        </div>

        <br></br><br></br><br></br><br></br>

      </div>

      <div className='contenteliments'>
        <div className='container-fluid footer'>
          <img src={logoimg} className='footerLogo'></img>
          {/* <img src={require('../../assets/images/fbinsta.png')} className='footersocial'></img> */}
        </div>
      </div>

    </div>

  );
}

export default landing;
