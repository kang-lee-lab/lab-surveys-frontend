import React, {useState} from "react";
import "./DemoConsent.css";
import {useNavigate} from "react-router-dom";

function DemoConsent(){
    const [isAgreed, setIsAgreed] = useState(false);
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    let navigate = useNavigate();

    const handleAgreeChange = (event) => {
        setIsAgreed(event.target.checked);
        setIsNextEnabled(event.target.checked);
    };

    const handleNextClick = () => {
        let path = `/survey/manga`;
        navigate(path);
    };
    return (
        <div className="demo-consent-container">
            <div className="description-container">
                <h2>Consent Form</h2>
                <p>
                    Dear Parent/Legal Guardian, <br/> <br/>

                    You and your child are invited to participate in an online study that is being conducted by
                    Dr. Kang Lee’s Development Lab at the University of Toronto. In this study, we will be examining
                    teenagers' manga reading experiences.

                    The study will involve one session which will take approximately 15 minutes of you and your child’s
                    time. Please read the following information provided to get a fuller understanding about the tasks
                    of the study and what you and your child’s role would be in our research. <br/> <br/>

                    We are conducting this study to better understand 13- to 17-year-old teenagers’ social and
                    emotional experiences in relation to reading manga. Your child is eligible for this study if they
                    fall within the age group. In addition, your child is eligible for this study if they have ever
                    read manga. <br/> <br/>

                    This study asks your child to fill out a questionnaire about their experiences with fictional
                    mediums, reading manga, and their general state. You will later be asked to fill out a questionnaire
                    regarding some demographic information, your assessment of your child’s experiences, and your own
                    reading experiences. <br/> <br/>

                    Participation in the study is completely voluntary. You and your child may withdraw from the session
                    at any time, for any reason, without loss of compensation which will be given to all participants
                    regardless of performance or completion of tasks. If you have any questions about you or your child’s
                    rights as a research participant, you may contact the Office of Research Ethics at (416) 946-3273
                    or ethics.research@utoronto.ca.  <br/> <br/>

                    All information gathered for the study will remain confidential by removing links between data and
                    you/your child’s identity, unless required for legal reasons. All collected data will be combined
                    with those of other participants, and only group results will be reported. In appreciation for your
                    child taking part in our study, your child will receive a $5 Indigo e-gift card. In appreciation for
                    you taking part in our study, you will receive a $5 Amazon e-gift card. <br/> <br/>

                    The research study you and your child are participating in may be reviewed by quality assurance to
                    make sure that the required laws and guidelines are followed. If chosen, representative(s) of the
                    Human Research Ethics Program (HREP) may access study-related data and/or consent/assent materials
                    as part of the review. All information accessed by the HREP will be upheld to the same level of
                    confidentiality that has been stated by the research team. <br/> <br/>

                    Thank you for your interest in our research. If you have any questions, concerns, or would like to
                    participate in this study, please contact us at MangaEngagement@kangleelab.ca. <br/> <br/>

                    Sincerely, <br/> <br/>
                    Dr. Kang Lee <br/> <br/>
                    Professor & Tier 1 Canada Research Chair <br/>

                    Dr. Eric Jackman Institute of Child Study <br/>

                    Applied Psychology and Human Development <br/>

                    OISE/University of Toronto <br/>

                    Phone: 416-934-4503 <br/>

                    Email: kang.lee@utoronto.ca <br/>

                    <br/>

                    <p>
                        I have read the above and consent to have my child participate in this study.
                    </p>

                    <div className={"agreeButton"}>
                        <input type="checkbox"
                               id="agree"
                               name="agree"
                               value="Agree"
                               checked={isAgreed}
                               onChange={handleAgreeChange}
                        />
                        Yes, I consent to have my child participate in this study.

                    </div>
                    <div className={"agreeButton"}>
                        <input type="checkbox"
                        />
                        No, I do not consent to have my child participate in this study.

                    </div>

                    <p>
                        I have read the above and consent to participate in this study myself.
                    </p>
                    <div className={"agreeButton"}>
                        <input type="checkbox"
                        />
                        Yes, I consent to participate in this study.
                    </div>
                    <div className={"agreeButton"}>
                        <input type="checkbox"
                        />
                        No, I do not consent to participate in this study.
                    </div>


                    <div>
                        <button
                            onClick={handleNextClick}
                            disabled={!isNextEnabled}
                            style={{ marginTop: '10px' }}
                        >
                            Next
                        </button>
                    </div>

                </p>
            </div>
        </div>
    )
}

export default DemoConsent;