import React from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Logo } from "../../Logo/Logo.jsx";
import "./Footer.css";
import config from "../../../config.json";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <h3>Contact informations:</h3>
        <p>Adress:{config.adress}</p>
        <p>Phone:{config.phoneNumber}</p>
        <p>Email:{config.email}</p>

        <iframe
          title="location"
          src={config.googleMapUrl}
          className="map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="social-media">
        <ul>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaPhone />
          </li>
          <li>
            <MdOutlineEmail />
          </li>
        </ul>
      </div>
      <p>&copy; Second-hand-com. All Rights reserved</p>
      <Logo />
    </footer>
  );
};
