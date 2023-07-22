import React, { useState, useEffect } from "react";
import "./SurveyPage.css";

function SurveyPage() {
  const [description, setDescription] = useState([]);
  const split = window.location.pathname.split("/");
  const surveyName = split[2];
  const survey = require(`../../data/surveys/${surveyName}.json`);

  useEffect(() => {
    const descriptionSplit = survey.description.split("<br>");
    const paragraphs = descriptionSplit.map((paragraph) => {
      return <p>{paragraph}</p>;
    });
    setDescription(paragraphs);
  }, [survey.description]);

  return (
    <div className="survey-page-container">
      <h3>Welcome to the {survey.title} interactive webpage.</h3>
      <div className="description-container">{description}</div>
    </div>
  );
}

export default SurveyPage;
