import React, { useState } from "react";
import "./GeneralConsent.css";
import { useNavigate } from "react-router-dom";

function GeneralConsent() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
    setIsNextEnabled(event.target.checked);
  };

  const handleNextClick = () => {
    let path = `/data-surveys`;
    navigate(path);
  };
  return (
    <div className="general-consent-container">
      <div className="description-container">
        <h2>Participate in Our Studies</h2>
        <p>
          You are participating in [insert study name] conducted by Kang Lee
          Lab. <br /> <br />
          <b> Purpose of the studies: </b> <br />
          lorem ipsum <br /> <br />
          <b> Risks: </b> <br />
          lorem ipsum <br /> <br />
          <b> Benefits: </b> <br />
          lorem ipsum <br /> <br />
          <b> Data Collection and Confidentiality: </b> <br />
          By participating in this study, you consent to allowing your data to
          be used for data collection. Your participation in the study is
          completely voluntary and you may choose to stop participating at any
          time. If you decide to stop participating, your data will not be used
          for data collection. All data will be anonymized and your data will be
          safely stored in a [indicate how the data will be securely stored] and
          only researchers will have access to this data. <br /> <br />
          <b> Questions about the research? </b> <br />
          If you have questions about the research in general or about your role
          in the study, please feel free to contact Dr. XXXXXX either by
          telephone at (XXX) xxx-xxxx, extension xxxxx or by e-mail
          (xxxx@utoronto.ca). This research has been reviewed and approved by
          the Human Participants Review Sub-Committee, University of Toronto’s
          Ethics Review Board and conforms to the standards of the Canadian
          Tri-Council Research Ethics guidelines. If you have any questions
          about this process, or about your rights as a participant in the
          study, please contact the [insert contact here]. <br /> <br />
          By selecting I agree, you are consenting to participate in the studies
          conducted by Kang Lee Lab. <br />
        </p>
        <div className={"agreeButton"}>
          <input
            type="checkbox"
            id="agree"
            name="agree"
            value="Agree"
            checked={isAgreed}
            onChange={handleAgreeChange}
          />
          I agree to allow my data to be collected for the purposes of academic
          research.
        </div>
        <div>
          <button
            onClick={handleNextClick}
            disabled={!isNextEnabled}
            style={{ marginTop: "10px" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeneralConsent;
