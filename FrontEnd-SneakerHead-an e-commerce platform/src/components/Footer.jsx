import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import "./FooterStyle.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="footer-content">
          {/* <h3
            style={{
              fontFamily: "Trebuchet MS",
              fontSize: "2em"
            }}
          >
            <em>SneakerHead</em>
          </h3> */}
          <p>India's Best Sneaker Buying Website !</p>
          <div className="sub">
            <div>
              <b>Company</b>
              <p><a href="/aboutus">AboutUs</a></p>
              <p><a href="/contactus">Contact Us</a></p>
            </div>
          
            <div>
              <b>For You</b>
              <p><a href="/privacypolicy">Privacy Policy</a></p>
              <p><a href="/termsandcondition">Terms & Conditions</a></p>
              <p><a href="termsofservice">Terms of Service</a></p>
            </div>
            <div>
              <b>Social links</b>
              <div>
                <AiFillFacebook />
                <AiFillTwitterCircle />
                <AiFillInstagram />
              </div>
              <div>
                <AiFillApple />
                <FaGooglePlay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Footer
