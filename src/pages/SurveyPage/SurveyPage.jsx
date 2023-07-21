import React from "react";
import "./SurveyPage.css";

function SurveyPage(props) {
  return (
    <div className="survey-page-container">
      <h3>Welcome to the {props.title} interactive webpage.</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default SurveyPage;
