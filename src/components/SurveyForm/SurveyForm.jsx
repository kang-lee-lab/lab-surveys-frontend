import React, { useEffect, useState, useRef } from "react";
import "./SurveyForm.css";
import {
  YesNoSelections,
  AppliedSelections,
} from "../../enums/questionSelections";
import ProgressBar from "../ProgressBar/ProgressBar";

function SurveyForm(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [validResponses, setValidResponses] = useState(0);
  const totalQuestions = useRef(0);

  // // set the response object so it always has the same order
  useEffect(() => {
    const surveyQuestions = props?.questions ?? {};
    totalQuestions.current = Object.keys(surveyQuestions).length;
  }, [props?.questions]);

  // set the response object so it always has the same order
  useEffect(() => {
    const tempResponses = {};
    for (const question in props?.questions) {
      const alias = props?.questions[question]["question_alias"];
      tempResponses[alias] = null;
    }
    setResponses(tempResponses);
  }, [props?.questions]);

  // set the questions and their responses
  useEffect(() => {
    const questionsArray = [];
    for (const question in props?.questions) {
      const questionObject = props?.questions[question];
      switch (questionObject["selection_type"]) {
        case "dropdown":
          // set responses to the question
          let selectionObject;
          if (questionObject.selections === "YesNoSelections") {
            selectionObject = YesNoSelections;
          } else if (questionObject.selections === "AppliedSelections") {
            selectionObject = AppliedSelections;
          } else {
            selectionObject = questionObject.selections;
          }

          const selectionOptions = [];
          for (const key in selectionObject) {
            selectionOptions.push(
              <option key={key} value={selectionObject[key]}>
                {key}
              </option>
            );
          }
          selectionOptions.unshift(
            <option key={0} value={"dropDownText"}>
              Click to drop down
            </option>
          );
          // add question to the array
          questionsArray.push(
            <div
              className="question-container"
              key={questionObject["question_id"]}
            >
              <label className="question-label">{question}</label>
              <select
                key={questionObject["question_id"]}
                id={questionObject["question_id"]}
                onChange={(event) => {
                  if (event.target.value === "dropDownText") {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_alias"]]: null,
                    }));
                  } else {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_alias"]]: event.target.value,
                    }));
                  }
                }}
              >
                {selectionOptions}
              </select>
            </div>
          );
          break;
        case "integer":
          questionsArray.push(
            <div
              className="question-container"
              key={questionObject["question_id"]}
            >
              <label className="question-label">{question}</label>
              <input
                type="number"
                step="1"
                className="form-control"
                onChange={(event) => {
                  if (event.target.value === "") {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_alias"]]: null,
                    }));
                  } else {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_alias"]]: event.target.value,
                    }));
                  }
                }}
                required
              />
            </div>
          );
          break;
        case "float":
          questionsArray.push(
            <div
              className="question-container"
              key={questionObject["question_id"]}
            >
              <label className="question-label">{question}</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                required
                onChange={(event) => {
                  if (event.target.value === "") {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_alias"]]: null,
                    }));
                  } else {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_alias"]]: event.target.value,
                    }));
                  }
                }}
              />
            </div>
          );
          break;
        default:
          // throw an error because there should be a selection_type on every question
          // TODO create error handler component
          throw Error;
      }
    }
    setQuestions(questionsArray);
  }, [props?.questions]);

  // keep track of responses for the progress bar
  useEffect(() => {
    let valid = 0;
    for (const response in responses) {
      if (responses[response] !== null) {
        valid += 1;
      }
    }
    setValidResponses(valid);
  }, [responses]);

  return (
    <div className="survey-form-container">
      <ProgressBar
        questionsFilled={validResponses}
        totalQuestions={totalQuestions.current}
      />
      <div className="questions-container">{questions}</div>
      <button
        id="submit-survey-button"
        onClick={() => props?.submitSurvey(responses)}
      >
        Submit
      </button>
    </div>
  );
}

export default SurveyForm;
