import React, { useState, useEffect, useRef } from "react";
import "./SurveyPage.css";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function SurveyPage() {
  const [description, setDescription] = useState([]);
  const split = window.location.pathname.split("/");
  const totalQuestions = useRef(0);
  const surveyName = split[2];
  let survey;
  try {
    survey = require(`../../data/surveys/${surveyName}.json`);
    totalQuestions.current = Object.keys(survey.questions).length;
  } catch {
    survey = "not-found";
  }

  // TODO implement this after backend
  const submitSurvey = (surveyResponses) => {
    console.log(surveyResponses);
    console.log("submitting survey...");
  };

  useEffect(() => {
    if (survey !== "not-found") {
      const descriptionSplit = survey.description.split("<br>");
      const paragraphs = descriptionSplit.map((paragraph) => {
        return <p>{paragraph}</p>;
      });
      setDescription(paragraphs);
    }
  }, [survey]);

  if (survey === "not-found") {
    return (
      <div className="survey-page-container">
        <h3>404. Not Found.</h3>
      </div>
    );
  } else {
    return (
      <div className="survey-page-container">
        <h3>Welcome to the {survey.title} interactive webpage.</h3>
        <div className="description-container">{description}</div>

        <div className="survey-container">
          <SurveyForm
            questions={survey.questions}
            key={survey.title}
            submitSurvey={submitSurvey}
          />
        </div>
      </div>
    );
  }
}

export default SurveyPage;
