import React from "react";
import {
  ICDiscord,
  ICFacebook,
  ICInstagram,
  ICTelegram,
  LogoL,
} from "../../../assets";
import "./footer.scss";

const Icon = ({ img }) => {
  return (
    <div className="icon-wrapper">
      <img className="icon-medsos" src={img} alt="icon" />
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div>
          <img className="logo" src={LogoL} alt="logoFooter" />
          <p className="nama-logo">Latihan Coding</p>
        </div>
        <div className="social-wrapper">
          <Icon img={ICFacebook} />
          <Icon img={ICInstagram} />
          <Icon img={ICDiscord} />
          <Icon img={ICTelegram} />
        </div>
      </div>
      <div className="copyright">
        <p>Copyright  &#169; 2022, Latihan Coding All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
