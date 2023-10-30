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
