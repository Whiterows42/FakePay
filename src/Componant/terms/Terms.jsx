import React, { useState } from "react";
import "./terms.css";
import { useNavigate } from "react-router-dom";

const TermsPopup = () => {
  const [page, setPage] = useState(1);
const navigate = useNavigate()
  const handleNext = () => {
    if (page < 2) setPage(page + 1);
  };
  
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleAgree = () => { 
     localStorage.setItem("termsAgreed", "true");
    navigate("/home");
   }

  return (
    <div className="terms-popup">
      <div className="terms-content">
        <h2>Terms and Conditions</h2>
        {page === 1 && (
          <div>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By using our services, you agree to comply with and be bound by
              the following terms and conditions. Please review these terms
              carefully. If you do not agree to these terms, you should not use
              our services.
            </p>
            <h3>2. Responsible Use and Conduct</h3>
            <p>
              By visiting our website and accessing the information, resources,
              services, products, and tools we provide for you, either directly
              or indirectly (hereafter referred to as "Resources"), you agree to
              use these Resources only for the purposes intended as permitted by
              (a) these Terms, (b) applicable laws, regulations, and generally
              accepted online practices or guidelines.
            </p>
            <p>
              Wherein, you understand that:
              <ul>
                <li>
                  a. In order to access our Resources, you may be required to
                  provide certain information about yourself (such as
                  identification, contact details, etc.) as part of the
                  registration process, or as part of your ability to use the
                  Resources. You agree that any information you provide will
                  always be accurate, correct, and up to date.
                </li>
                <li>
                  b. You are responsible for maintaining the confidentiality of
                  any login information associated with any account you use to
                  access our Resources. Accordingly, you are responsible for all
                  activities that occur under your account/s.
                </li>
                <li>
                  c. Accessing (or attempting to access) any of our Resources by
                  any means other than through the means we provide, is strictly
                  prohibited. You specifically agree not to access (or attempt
                  to access) any of our Resources through any automated,
                  unethical, or unconventional means.
                </li>
                <li>
                  d. Engaging in any activity that disrupts or interferes with
                  our Resources, including the servers and/or networks to which
                  our Resources are located or connected, is strictly
                  prohibited.
                </li>
              </ul>
            </p>
          </div>
        )}
        {page === 2 && (
          <div>
            <h3>3. Non-Harmful Use</h3>
            <p>
              You agree not to use our Resources to harm, abuse, harass, stalk,
              threaten, or otherwise infringe or violate the rights of any other
              party. If you violate these terms, you will be fully responsible
              for all resulting consequences, legal fees, and damages, and you
              may be banned from using our services.
            </p>
            <h3>4. Limitation of Liability</h3>
            <p>
              By using our website, you understand and agree that all Resources
              we provide are "as is" and "as available." This means that we do
              not represent or warrant to you that:
              <ul>
                <li>
                  a. The use of our Resources will meet your needs or
                  requirements.
                </li>
                <li>
                  b. The use of our Resources will be uninterrupted, timely,
                  secure, or free from errors.
                </li>
                <li>
                  c. The information obtained by using our Resources will be
                  accurate or reliable, and
                </li>
                <li>
                  d. Any defects in the operation or functionality of any
                  Resources we provide will be repaired or corrected.
                </li>
              </ul>
            </p>
            <p>
              Furthermore, you understand and agree that:
              <ul>
                <li>
                  e. Any content downloaded or otherwise obtained through the
                  use of our Resources is done at your own discretion and risk,
                  and that you are solely responsible for any damage to your
                  computer or other devices for any loss of data that may result
                  from the download of such content.
                </li>
                <li>
                  f. No information or advice, whether expressed, implied, oral,
                  or written, obtained by you from us or through any Resources
                  we provide shall create any warranty, guarantee, or conditions
                  of any kind, except for those expressly outlined in these
                  Terms.
                </li>
              </ul>
            </p>
          </div>
        )}
        <div className="terms-footer">
          <div className="page-buttons">
            <button onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
            <button onClick={handleNext} disabled={page === 2}>
              Next
            </button>
          </div>
          {page === 2 && <button onClick={handleAgree}>I Agree</button>}
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;
