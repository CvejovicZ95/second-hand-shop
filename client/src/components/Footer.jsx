import { FaInstagram } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Logo from "./Logo";


const Footer=()=>{
  return(
    <footer className="footer">
      <div className="contact-info">
        <h3>Contact informations:</h3>
        <p>Adress:Surrey Hills Residential Park</p>
        <p>Phone:417-279-1102</p>
        <p>Email:secondhand@gmail.com</p>

        <iframe
        title="location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13722.481386782627!2d-0.2902702486470954!3d51.25781137243945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875e6a83379fd87%3A0x229adbb9738506a6!2sSurrey%20Hills%20Residential%20Park%2C%20Boxhill%20Rd%2C%20Box%20Hill%2C%20Tadworth%20KT20%207LZ%2C%20UK!5e0!3m2!1sen!2srs!4v1710155102963!5m2!1sen!2srs"
        className="map"
        //width="100%"
        //height="400px"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      </div>
      <div className="social-media">
        <ul>
          <li><FaInstagram /></li>
          <li><FaPhone /></li>
          <li><MdOutlineEmail /></li>
        </ul>
      </div>
      <p>&copy; Second-hand-com. All Rights reserved</p>
      <Logo/>
    </footer>
  )
}

export default Footer