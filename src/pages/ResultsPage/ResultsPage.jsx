import React from "react";
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
console.log(cleanData)
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
        <div>
          <h1>Your likelihood of being positive in each condition is: </h1>
          <table className="table" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th style={{ textAlign: "left" }}>Condition</th>
                <th style={{ textAlign: "left" }}>Likelihood</th>
              </tr>
              <tr>
                <td>Depression (DT)</td>
                <td>{(cleanData.find(item => item.name === 'DT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Hypochondriasis (HsT)</td>
                <td>{(cleanData.find(item => item.name === 'HsT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Hysteria (HyT)</td>
                <td>{(cleanData.find(item => item.name === 'HyT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Psychopathic Deviate (PdT)</td>
                <td>{(cleanData.find(item => item.name === 'PdT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Masculinity (MfT)</td>
                <td>{(cleanData.find(item => item.name === 'MfT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Paranoia (PaT)</td>
                <td>{(cleanData.find(item => item.name === 'PaT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Psychasthenia (PtT)</td>
                <td>{(cleanData.find(item => item.name === 'PtT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Schizophrenia (ScT)</td>
                <td>{(cleanData.find(item => item.name === 'ScT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Hypomania (MaT)</td>
                <td>{(cleanData.find(item => item.name === 'MaT').x * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Social Introversion (SiT)</td>
                <td>{(cleanData.find(item => item.name === 'SiT').x * 100).toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
          <p>
          Displayed below is a graph depicting your likelihood of being positive in each condition of the MMPI.
          </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <RadarChart height={500} width={500} outerRadius="80%" data={cleanData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar dataKey="x" stroke="grey" fill="grey" fillOpacity={0.5} />
          </RadarChart>
        </div>
        </div>
      )}
      {surveyId === "childbmi" && (
        <div>
          <h4>At age {data.age_to_predict}, </h4>
          <h4>The child's predicted height is {(data.pred_height).toFixed(2)} cm.</h4>
          <h4>The child's predicted weight is {(data.pred_weight).toFixed(2)} kg.</h4>
            <h4>The child's predicted BMI is {(data.pred_bmi.toFixed(2))} kg/m<sup>2</sup>.</h4>
          <p>
            Displayed is your children's future height, weight, and BMI given
            their current physical measurements. This is calculated through a
            machine learning model trained using patient data.
          </p>
        </div>
      )}
      {surveyId === "asq" && (
        <div>
          <h1>Your iHRV is {data.asq_result}. </h1>
          <p>
            Lower HRV measures are related to higher risk of cardiovascular
            disease. If your iHRV fell within ranges classified as shades of
            green, it signals good heart health. If your iHRV fell within ranges
            classified as yellow, orange, or red, you may wish to examine your
            HRV measures further. Please consult a medical professional with any
            health concerns. Your iHRV is reflect multiple underlying HRV
            measures. The table below can be used to interpret your score.
          </p>
          <table className="table" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th style={{ textAlign: "left" }}>iHRV Range</th>
                <th style={{ textAlign: "left" }}>Underlying HRV Measures</th>
              </tr>
              <tr>
                <td>80 and over</td>
                <td>Extremely Low</td>
              </tr>
              <tr>
                <td>70-79</td>
                <td>Low</td>
              </tr>
              <tr>
                <td>60-69</td>
                <td>Slightly Low</td>
              </tr>
              <tr>
                <td>41-59</td>
                <td>Average</td>
              </tr>
              <tr>
                <td>31-40</td>
                <td>Slightly High</td>
              </tr>
              <tr>
                <td>21-30</td>
                <td>High</td>
              </tr>
              <tr>
                <td>20 and below</td>
                <td>Extremely High</td>
              </tr>
            </tbody>
          </table>

          <p>
            Displayed below are your Heart Rate Variability of dimensions 1-6
            (HRV-D1-6). Each reflect an orthogonal dimension underlying your HRV
            measures.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <RadarChart
              height={500}
              width={500}
              outerRadius="80%"
              data={cleanData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar dataKey="x" stroke="grey" fill="grey" fillOpacity={0.5} />
            </RadarChart>
          </div>
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
