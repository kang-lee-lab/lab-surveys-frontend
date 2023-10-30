import React from "react";
import "./ResultsPage.css";
import { useLocation } from "react-router-dom";
import {
  PieChart,
  Pie,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { getCleanSurveyData } from "../../utils/helper";

function ResultsPage() {
  // get the data from SurveyPage component
  const location = useLocation();
  // location.state holds result data sent from the backend
  const data = location.state;
  const surveyId = data.metadata.survey_id;
  // format survey data specific to what graph is being used
  const cleanData = getCleanSurveyData(surveyId, data);

  return (
    <div className="survey-page-container">
      <h3>
        Welcome to the results page for the {data.metadata.full_name} survey.
      </h3>
      {(surveyId === "dass" || surveyId === "nafld") && (
        <PieChart width={800} height={400}>
          <Legend
            height={36}
            layout="vertical"
            verticalAlign="middle"
            iconSize={0}
          />
          <Pie
            data={cleanData}
            cx={120}
            cy={200}
            innerRadius={90}
            outerRadius={120}
            paddingAngle={0}
            dataKey="value"
          ></Pie>
        </PieChart>
      )}
      {surveyId === "mmpi" && (
        <RadarChart height={500} width={500} outerRadius="80%" data={cleanData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar dataKey="x" stroke="green" fill="green" fillOpacity={0.5} />
        </RadarChart>
      )}
      {surveyId === "childbmi" && (
        <div>
          <h4>At age {data.age_to_predict}, </h4>
          <h4>The child's predicted height is {data.pred_height} cm.</h4>
          <h4>The child's predicted weight is {data.pred_weight} kg.</h4>
          <h4>The child's predicted BMI is {data.pred_bmi} kg/m2.</h4>
          <p>
            Displayed is your children's future height, weight, and BMI given
            their current physical measurements. This is calculated through a
            machine learning model trained using patient data.
          </p>
        </div>
      )}
      <p>
        *This webpage does not contain medical/health advice. This tool is
        intended for informational and educational purposes only, and should not
        be taken as a substitute for professional advice. Reliance on any
        information on the webpage is solely at your own risk.
      </p>
    </div>
  );
}

export default ResultsPage;
