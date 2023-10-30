const getRadarChartDataFormat = (data) => {
  const arr = [];

  for (const key in data) {
    const item = { name: key, x: data[key] };
    arr.push(item);
  }
  return arr;
};

const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// clean survey data according to their graph
export const getCleanSurveyData = (surveyId, data) => {
  if (surveyId === "dass") {
    return [
      {
        name:
          capitalizeWord(data.mode) +
          " Percentage: " +
          Number(data.positive.toFixed(5)) * 100 +
          "%",
        value: data.positive,
        fill: "#0088FE",
      },
      { name: "", value: 1 - data.positive, fill: "#ffffff00" },
    ];
  } else if (surveyId === "nafld") {
    return [
      {
        name:
          "Likelihood of NAFLD: " +
          Number(data.positive.toFixed(5)) * 100 +
          "%",
        value: data.positive,
        fill: "#0088FE",
      },
      { name: "", value: 1 - data.positive, fill: "#ffffff00" },
    ];
  } else if (surveyId === "mmpi") {
    return getRadarChartDataFormat(JSON.parse(data.results));
  }
};
