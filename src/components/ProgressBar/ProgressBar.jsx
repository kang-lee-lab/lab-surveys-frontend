import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

function ProgressBar(props) {
  const [progressStyle, setProgressStyle] = useState({});

  useEffect(() => {
    const percentage = Math.round(
      (props.questionsFilled / props.totalQuestions) * 100
    );
    setProgressStyle({
      height: "100%",
      width: `${percentage}%`,
      backgroundColor: "#32a852",
      textAlign: "right",
    });
  }, [props]);

  return (
    <div className="progress-bar">
      <div className="filled-progress" style={progressStyle}>
        {`${props.questionsFilled}/${props.totalQuestions}`}
      </div>
    </div>
  );
}

export default ProgressBar;
