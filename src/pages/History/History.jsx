import React, {useEffect, useState} from "react";
import "./History.css";
import axios from 'axios';

function History() {
    const [data, setData] = useState([]);
    const split = window.location.pathname.split("/");
    const surveyName = split[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseType = surveyName.replaceAll("-", "_");
                const response = await axios.get(
                    `${process.env.REACT_APP_API_ADDRESS}/history/${responseType}/`
                );
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [surveyName]);

    // const history_data = data?.map((data, i) =>
    // <tr key={i}>
    //     <td>{data.id}</td>
    //     <td>{JSON.stringify(data.response_answers)}</td>
    //     <td>{JSON.stringify(data.response_results)}</td>
    //     <td>{data.response_time}</td>
    // </tr>
    // );

    const formatJsonToTable = (jsonObject) => {
        return (
            <table className="nested-table">
                <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(jsonObject).map(([key, value]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{typeof value === 'object' ? formatJsonToTable(value) : value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const formattedDateTime = new Date(dateTimeString).toLocaleString('en-US', options);
        return formattedDateTime;
    };

    const formatDecimalPlaces = (object) => {
        return Object.entries(object).map(([key, value]) => (
            <div key={key}>
                <strong>{key}:</strong> {typeof value === 'number' ? value.toFixed(2) : value}
            </div>
        ));
    };


    const formatAnswers = (answers, questions) => {
        const formattedAnswers = [];
        Object.entries(answers).forEach(([key, value]) => {
            const questionInfo = questions.find(q => q.question_id === key);
            if (questionInfo) {
                const unit = questionInfo.question.unit || '';
                formattedAnswers.push({
                    question: questionInfo.question_text,
                    value: `${value} ${unit}`,
                });
            }
        });
        return formattedAnswers;
    };

    const formatResults = (results) => {
        const formattedResults = [];
        Object.entries(results).forEach(([key, value]) => {
            formattedResults.push({
                question: key,
                value: value,
            });
        });
        return formattedResults;
    }
    const formatTable = (formattedAnswers) => {
        return (
            <table className="nested-table">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedAnswers.map((answer, index) => (
                        <tr key={index}>
                            <td>{answer.question}</td>
                            <td>{answer.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const history_data = data?.map((entry, i) => {
        const answers = JSON.parse(entry.response_answers);
        const questions = entry.questions || [];

        const formattedAnswers = formatAnswers(answers, questions);
        const formattedResults = formatResults(JSON.parse(entry.response_results));
        return (
            <tr key={i}>
                <td>{entry.id}</td>
                <td>{formatTable(formattedAnswers)}</td>
                <td>{formatTable(formattedResults)}</td>
                <td>{entry.response_date}</td>
                <td>{entry.response_time}</td>
                <td>{entry.response_duration}</td>
            </tr>
        );
    });
    
    const handleDownload = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/surveys/download-csv');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading CSV:', error);
        }
    };

    const responseType = surveyName.replaceAll("-", "_");

    return (
        <div className="history-container">
            <h1> {responseType} History</h1>
            <button onClick={handleDownload}>Download CSV</button>
            <br/>
            <br/>
            <table className="main-table">
            <tr>
                <th>ID</th>
                <th>Response Answers</th>
                <th>Response Results</th>
                <th>Response Date</th>
                <th>Response Time</th>
                <th>Response Duration</th>
            </tr>
            {history_data}
            </table>


        </div>
    );
}

export default History;