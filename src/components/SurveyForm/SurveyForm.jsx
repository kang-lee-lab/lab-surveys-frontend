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
  const totalQuestions = useRef(Object.keys(props.questions).length);

  useEffect(() => {
    const questionsArray = [];
    for (const question in props.questions) {
      const questionObject = props.questions[question];
      switch (questionObject["selectionType"]) {
        case "dropdown":
          // set responses to the question
          let selectionArray;
          if (questionObject.selections === "YesNoSelections") {
            selectionArray = YesNoSelections;
          } else if (questionObject.selections === "AppliedSelections") {
            selectionArray = AppliedSelections;
          } else {
            selectionArray = questionObject.selections;
          }
          const selectionOptions = selectionArray.map((selection) => {
            return (
              <option key={selection} value={selection}>
                {selection}
              </option>
            );
          });
          // add question to the array
          questionsArray.push(
            <div className="question-container" key={questionObject["id"]}>
              <label className="question-label">{question}</label>
              <select
                key={questionObject["id"]}
                id={questionObject["id"]}
                onChange={(event) =>
                  setResponses((oldResponses) => ({
                    ...oldResponses,
                    [question]: event.target.value,
                  }))
                }
              >
                {selectionOptions}
              </select>
            </div>
          );
          break;
        case "integer":
          questionsArray.push(
            <div className="question-container" key={questionObject["id"]}>
              <label className="question-label">{question}</label>
              <input
                type="number"
                step="1"
                className="form-control"
                onChange={(event) =>
                  setResponses((oldResponses) => ({
                    ...oldResponses,
                    [question]: event.target.value,
                  }))
                }
                required
              />
            </div>
          );
          break;
        case "float":
          // TODO add default value to each float
          questionsArray.push(
            <div className="question-container" key={questionObject["id"]}>
              <label className="question-label">{question}</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                required
                onChange={(event) =>
                  setResponses((oldResponses) => ({
                    ...oldResponses,
                    [question]: event.target.value,
                  }))
                }
              />
            </div>
          );
          break;
        default:
          // throw an error because there should be a selectionType on every question
          // TODO create error handler component
          throw Error;
      }
    }
    setQuestions(questionsArray);
  }, []);
  return (
    <div className="survey-form-container">
      <ProgressBar
        questionsFilled={Object.keys(responses).length}
        totalQuestions={totalQuestions.current}
      />
      <div className="questions-container">{questions}</div>
      <button
        id="submit-survey-button"
        onClick={() => props.submitSurvey(responses)}
      >
        Submit
      </button>
    </div>
  );
}

export default SurveyForm;
