import React from "react";
import "./DataColSurveys.css";
import psychologySurveys from "../../data/psychology-surveys.json";
import SurveyCards from "../../components/SurveyCards/SurveyCards";
import physiologySurveys from "../../data/physiology-surveys.json";
import physicalSurveys from "../../data/physical-surveys.json";

function DataColSurveys(){
    return(
        <div className="datacolsurveys-container">
            <div className="description-container">
                <h2>Surveys for Data Collection</h2>
                <p>
                    Kang Lee Lab has conducted research in a variety of areas including:
                    deception in children and adults, racial bias, bias reduction in
                    children, and fraud among senior citizens. Our studies have also
                    focused on understanding brain development and brain processes of
                    infants and adults using neuroimaging technology called functional
                    Near-Infrared Spectroscopy (fNIRS). We have also conducted research
                    using transdermal optical imaging technology to measure physiological
                    changes such as heart rate and blood pressure from a person's face.
                </p>

                <p>
                    By taking part in the surveys below, your data will be collected for research purposes.
                    Your data will be kept confidential and anonymized to protect your privacy.
                    Your participation is completely voluntary, and you have the right to withdraw at any time without any consequences.
                    If you have any questions about this process, or about your rights as a participant in the study, please contact the [insert contact here].
                </p>
            </div>
            <div className="survey-card-containers">
                <div className="psychology-survey-container">
                    <h2>Psychology Surveys for Data Collection</h2>
                    {psychologySurveys.map((item) => (
                        <SurveyCards survey={item} key={item.key} />
                    ))}
                </div>
                <div className="physiology-survey-container">
                    <h2>Physiology Surveys</h2>
                    {physiologySurveys.map((item) => (
                        <SurveyCards survey={item} key={item.key} />
                    ))}
                </div>
                <div className="physical-survey-container">
                    <h2>Physical Surveys</h2>
                    {physicalSurveys.map((item) => (
                        <SurveyCards survey={item} key={item.key} />
                    ))}
                </div>
            </div>
        </div>
        )

}

export default DataColSurveys;