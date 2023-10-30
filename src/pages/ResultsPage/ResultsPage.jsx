import React from "react";
import "./ResultsPage.css";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Legend } from "recharts";
import { objectToArray, capitalize } from "../../utils/helper";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

function ResultsPage() {
  // get the data from SurveyPage component
  const location = useLocation();
  const data = location.state;

  // declare survey specific data variables
  let mmpiData = [];
  let dassData = [];

  // clean survey data according to their graph
  if (data.metadata.survey_id === "dass") {
    dassData = [
      {
        name:
          capitalize(data.mode) +
          " Percentage: " +
          Number(data.positive.toFixed(5)) * 100 +
          "%",
        value: data.positive,
        fill: "#0088FE",
      },
      { name: "", value: 1 - data.positive, fill: "#ffffff00" },
    ];
  } else if (data.metadata.survey_id === "mmpi") {
    mmpiData = objectToArray(JSON.parse(data.results));
  }

  // location.state holds results
  return (
    <div className="survey-page-container">
      <h3>
        Welcome to the results page for the {data.metadata.full_name} survey.
      </h3>
      {data.metadata.survey_id === "dass" && (
        <PieChart width={800} height={400}>
          <Legend
            height={36}
            layout="vertical"
            verticalAlign="middle"
            iconSize={0}
          />
          <Pie
            data={dassData}
            cx={120}
            cy={200}
            innerRadius={90}
            outerRadius={120}
            paddingAngle={0}
            dataKey="value"
          ></Pie>
        </PieChart>
      )}

      {data.metadata.survey_id === "mmpi" && (
        <RadarChart height={500} width={500} outerRadius="80%" data={mmpiData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar dataKey="x" stroke="green" fill="green" fillOpacity={0.5} />
        </RadarChart>
      )}
    </div>
  );
}

export default ResultsPage;
