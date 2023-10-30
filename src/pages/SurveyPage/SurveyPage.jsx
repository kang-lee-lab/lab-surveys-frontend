import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./SurveyPage.css";
import SurveyForm from "../../components/SurveyForm/SurveyForm";

function SurveyPage() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const submitSurvey = async (surveyResponses) => {
    const valid = validateResponses(surveyResponses);
    if (!valid) {
      console.log("You must fill out all questions of the survey.");
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}/results/`,
        {
          survey: survey.survey_id,
          mode: survey.survey_mode,
          data: surveyResponses,
        }
      );
      navigate(location.pathname + "/results", { state: response.data });
    }
  };

  const validateResponses = (surveyResponses) => {
    for (const response in surveyResponses) {
      if (surveyResponses[response] === null) {
        return false;
      }
    }
    return true;
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
