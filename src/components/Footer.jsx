
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
  faTiktok
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Text, Image} from '@mantine/core';
import { Link } from 'react-router-dom';

function Footer() {
  
const Atol ='../../images/footer/ATOL.png';
const LogoWhite = '../../images/footer/logowhite.png';
const MasterCard = '../../images/footer/mastercard2.png';
const Visa = '../../images/footer/visa2.png';
  return (
      <footer className="footer pb-5 mt-auto bg-dark bg-cover bg-top bg-no-repeat lg:bg-center footer-dark" style={{background: '#002b49'}}>
          <div className="container " style={{padding: '2rem 5rem 2rem 5rem'}} >
            <div className="row gx-5 flex flex-wrap w-[100%] justify-center md:gap-[40px]" style={{color: '#fff'}}>
              <div className="col-lg-3">
                <Image alt="" width={250} height={86} src={LogoWhite} className='flex justify-center' style={{marginLeft: 'auto', marginRight: 'auto'}} />
                <div className="icon-list-social mb-5 flex justify-center pt-3 gap-4">
                  <a
                    className="icon-list-social-link"
                    href="https://www.instagram.com/itravelholidays"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                  <a
                    className="icon-list-social-link"
                    href="https://www.facebook.com/itravelholidays"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>

                  <a
                    className="icon-list-social-link"
                    href="https://www.twitter.com/itravel_lesta"
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>

                  <a
                    className="icon-list-social-link"
                    href="https://www.youtube.com/@itravelholidaysuk"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>

                  <a
                    className="icon-list-social-link"
                    href="https://www.tiktok.com/@itravelholidays?_t=8j3NhXbJoQq&_r=1"
                  >
                    <FontAwesomeIcon icon={faTiktok} />
                  </a>
                </div>
              </div>
                <div className="row gx-5 flex flex-wrap justify-center md:justify-between text-center flex-grow">
                  <div className="col-lg-3 col-md-6 mb-5 mb-lg-0 ">
                    <div className="text-uppercase-expanded text-xs mb-4" style={{color: '#fff', fontWeight: '900', fontSize: '16px'}}>
                      Blogs
                    </div>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <Link href='/Weather'>Weather</Link>
                      </li>
                      <li className="mb-2">
                        <Link href='/thingstodo'>Things To Do</Link>
                      </li>
                      <li className="mb-2">
                        <Link href='/destinations'>Popular Destinations</Link>
                      </li>
                      <li className="mb-2">
                        <Link href='/searchhotels'>Hotel Offers</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-lg-0 mb-5">
                    <div className="text-uppercase-expanded mb-4 text-xs" style={{color: '#fff', fontWeight: '900', fontSize: '16px'}}>
                      Information
                    </div>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <Link href="/aboutus">About Us</Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/contact">FAQs</Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/contact">Contact Us</Link>
                      </li>
                      <li className="mb-2">
                        <a href='/whybookwithus'>Why Book With Us</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 mb-md-0 mb-5">
                    <div className="text-uppercase-expanded mb-4 text-xs" style={{color: '#fff', fontWeight: '900', fontSize: '16px'}}>
                      Legal
                    </div>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <Link href="/terms">Terms and Condition</Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/policy">Privacy Policy</Link>
                      </li>
                      <li className="mb-2">
                        <Link href="/bookingconditions">
                          Booking Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="text-uppercase-expanded mb-4 text-xs" style={{color: '#fff', fontWeight: '900', fontSize: '16px'}}>
                      Travel Protected By
                    </div>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <Image
                          alt=""
                          height={110}
                          width={110}
                          src={Atol}
                          style={{marginLeft: 'auto', marginRight: 'auto'}}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
            <hr className="my-5" />
            <div className="row gx-5" style={{color: '#fff'}}>
              <div className="mb-4 flex justify-center gap-2">
                <Image src={Visa} alt="Visa" width={50} height={20} />
                <Image src={MasterCard} alt="MasterCard" width={80} height={20} />
              </div>
            </div>
            <div className="row gx-5 align-items-center" style={{color: '#fff'}}>
              <div className="small text-center">
                Flight inclusive holiday packages and Flight Plus
                Holidays (as defined in our Terms of Business) on this
                website are financially protected by the ATOL scheme.
                The ATOL protection does not apply to all holiday and
                travel services listed on this website. Please ask us to
                confirm what protection may apply to your booking. If
                you do not receive an ATOL certificate then the booking
                will not be ATOL protected. If you do receive an ATOL
                Certificate but all the parts of your trip are not
                listed on it, those parts will not be ATOL protected.
              </div>
              <p className="text-center small">
                &nbsp;Please see our Terms of Business for information,
                or for more information about financial protection and
                the ATOL Certificate go to: http://www.atol.org.uk .
                <br /> <br />
                Golden Beach Holidays Limited t/a iTravel Holidays act
                as an agent providing a web search interface between you
                and various third party suppliers of travel products
                (e.g. flight, hotel or transfer). For flights we act as
                your agent in processing your booking with the airline;
                we are not the airline’s agent. Each product you choose
                has its own price independent of other products booked
                at the same time and creates a separate contract between
                you and the supplier of that product.
              </p>
              <div className="small text-center">
                Copyright © 2012 - 2022 iTravel Holidays. All Rights
                Reserved.
              </div>
            </div>
          </div>
        </footer>
  );
}

export default Footer;
