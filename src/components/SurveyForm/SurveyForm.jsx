import React, { useEffect, useState, useRef } from "react";
import "./SurveyForm.css";
import ProgressBar from "../ProgressBar/ProgressBar";

function SurveyForm(props) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [validResponses, setValidResponses] = useState(0);
  const totalQuestions = useRef(0);

  // // set the response object so it always has the same order
  useEffect(() => {
    const surveyQuestions = props?.data?.questions ?? [];
    totalQuestions.current = surveyQuestions.length;
  }, [props?.data?.questions]);

  // set the response object so it always has the same order
  useEffect(() => {
    const tempResponses = {};
    for (const question in props?.data?.questions) {
      const questionId = props?.data?.questions[question]["question_id"];
      tempResponses[questionId] =
        props?.data?.questions[question]["question"]["default_value"] ?? null;
    }
    setResponses(tempResponses);
  }, [props?.data?.questions]);

  // set the questions and their responses
  useEffect(() => {
    const questionsArray = [];
    for (const question of props?.data?.questions) {
      const questionObject = question;
      switch (questionObject["question"]["type"]) {
        case "single_select_dropdown":
          // set responses to the question
          const selectionObject = questionObject.question.choices;
          const selectionOptions = [];
          for (let i in selectionObject) {
            selectionOptions.push(
              <option
                key={selectionObject[i].id + 1}
                value={selectionObject[i].value}
              >
                {selectionObject[i].text}
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
              <label className="question-label">
                {questionObject.question_text}
              </label>
              <select
                key={questionObject["question_id"]}
                id={questionObject["question_id"]}
                onChange={(event) => {
                  if (event.target.value === "dropDownText") {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_id"]]: null,
                    }));
                  } else {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_id"]]: event.target.value,
                    }));
                  }
                }}
              >
                {selectionOptions}
              </select>
            </div>
          );
          break;
        case "number":
          questionsArray.push(
            <div
              className="question-container"
              key={questionObject["question_id"]}
            >
              <label className="question-label">{question.question_text}</label>
              <input
                type="number"
                step={questionObject.question.step}
                min={questionObject.question.min}
                max={questionObject.question.max}
                value={responses[questionObject["question_id"]] ?? 0}
                className="form-control"
                onChange={(event) => {
                  if (event.target.value === "") {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_id"]]: null,
                    }));
                  } else {
                    setResponses((oldResponses) => ({
                      ...oldResponses,
                      [questionObject["question_id"]]: event.target.value,
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
        case "select":
          let selectionArrayTwo;
          selectionArrayTwo = questionObject.selections;
          const selectionOptionsTwo = selectionArrayTwo.map((selection) => {
            return (
                <option key={selection} value={selection}>
                  {selection}
                </option>
            );
          });
          questionsArray.push(
              <div
                  className="question-container"
                  key={questionObject["question_id"]}
              >
                <label className="question-label">{question} (Press Ctrl to select multiple options)</label>
                <select
                    key={questionObject["question_id"]}
                    id={questionObject["question_id"]}
                    multiple={true}
                    onChange={(event) => {
                      if (event.target.value === "selectionText") {
                        setResponses((oldResponses) => {
                          const newData = { ...oldResponses };
                          delete newData[question];
                          return newData;
                        });
                      } else {
                        setResponses((oldResponses) => ({
                          ...oldResponses,
                          [questionObject["question_alias"]]: event.target.value,
                        }));
                      }
                    }}

                >
                  {selectionOptionsTwo}
                </select>
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
  }, [props?.data?.questions, responses]);

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
        <span>Submit</span>
      </button>
    </div>
  );
}

export default SurveyForm;
