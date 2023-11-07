import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./SurveyPage.css";
import SurveyForm from "../../components/SurveyForm/SurveyForm";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

function SurveyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [description, setDescription] = useState([]);
  const split = window.location.pathname.split("/");
  const totalQuestions = useRef(0);
  const surveyName = split[2];
  const [survey, setSurvey] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  // error handling
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getSurveyData = async () => {
      const pythonSurveyName = surveyName.replaceAll("-", "_");
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/survey/${pythonSurveyName}`
      );
      setSurvey(response.data);
    };
    getSurveyData();
  }, [surveyName]);

  useEffect(() => {
    const surveyQuestions = survey?.questions ?? {};
    totalQuestions.current = Object.keys(surveyQuestions).length;
  }, [survey]);

  const submitSurvey = async (surveyResponses) => {
    const valid = validateResponses(surveyResponses);
    if (!valid) {
      setShowError(true);
      setErrorMessage("You must fill out all survey questions.");
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
      const paragraphs = [];
      for (const property in survey?.description) {
        paragraphs.push(<p key={property}>{survey?.description[property]}</p>);
      }
      setDescription(paragraphs);
    }
  }, [survey]);

  if (survey === "not-found") {
    return (
      <div className="survey-page-container">
        <h3>404. Not Found.</h3>
      </div>
    );
  } else if (Object.keys(survey).length === 0) {
    return (
      <div className="survey-page-container">
        <h3>Fetching survey...</h3>
      </div>
    );
  } else {
    return (
      <div className="survey-page-container">
        {showError && (
          <ErrorPopup message={errorMessage} setShowError={setShowError} />
        )}
        <h3>Welcome to the {survey?.title} interactive webpage.</h3>
        <div className="description-container">{description}</div>
        <div className="survey-container">
          <SurveyForm
            key={survey?.title}
            submitSurvey={submitSurvey}
            data={survey?.pages[currentPage]}
            page={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default SurveyPage;
