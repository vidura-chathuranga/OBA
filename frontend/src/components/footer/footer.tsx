import React from "react";
import "./footer.css";
import facebook from "../../assets/facebook.png";
import instergram from "../../assets/instagram.png";
import linkdin from "../../assets/linkedin.png";
import twitter from "../../assets/twitter.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          
          <div className="sb_footer-links_div">
            <h4>Resources</h4>
            <a href="/resource">
              <p>School Website</p>
            </a>
            <a href="/resource">
              <p>OBA</p>
            </a>
            <a href="/resource">
              <p>Library</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Partners</h4>
            <a href="/employer">
              <p>SensusHub</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>School</h4>
            <a href="/about">
              <p>About</p>
            </a>
            <a href="/press">
              <p>Press</p>
            </a>
            <a href="/career">
              <p>sports</p>
            </a>
            <a href="/contact">
              <p>Contact</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Coming Soon on</h4>
            <div className="socialmedia">
              <p>
                <img src={facebook} alt="" />
              </p>
              <p>
                <img src={twitter} alt="" />
              </p>
              <p>
                <img src={linkdin} alt="" />
              </p>
              <p>
                <img src={instergram} alt="" />
              </p>
            </div>
          </div>
        </div>

        <hr></hr>
        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              @{new Date().getFullYear()} SensusHub All right reserved.
            </p>
          </div>
          <div className="sb_footer-below-links">
            <a href="/terms"><div><p>Terms & Conditions</p></div></a>
            <a href="/privacy"><div><p>Privacy</p></div></a>
            <a href="/security"><div><p>Security</p></div></a>
            <a href="/cookie"><div><p>Cokie Declaration</p></div></a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
