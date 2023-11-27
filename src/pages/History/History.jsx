import React , { useEffect, useState } from "react";
import "./History.css";
import axios from 'axios';

function History() {
    const [data, setData] = useState([]);
    const split = window.location.pathname.split("/");
    const surveyName = split[2];

    useEffect(() => {
        const getData = async () => {
            const responseType = surveyName.replaceAll("-", "_");
            const response = await axios.get(
                `${process.env.REACT_APP_API_ADDRESS}/history/${responseType}/`
            );
            setData(response.data);
        };
        getData();
    }, [surveyName]);

    const history_data = data?.map((data, i) =>
    <tr key={i}>
        <td>{data.id}</td>
        <td>{data.response_type}</td>
        <td>{data.response_answers}</td>
        <td>{data.response_results}</td>
        <td>{data.response_time}</td>
    </tr>
    );

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/surveys/history')
    //         .then(response => {
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);
    //
    // const filteredData = data.filter(item => item.response_type === 'test');
    //
    // const history_data = filteredData.map((data, i) =>
    //     <tr key={i}>
    //         <td>{data.id}</td>
    //         <td>{data.response_type}</td>
    //         <td>{data.response_answers}</td>
    //         <td>{data.response_results}</td>
    //         <td>{data.response_time}</td>
    //     </tr>
    // );

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

    return (
        <div className="history-container">
            <h1>History</h1>
            <button onClick={handleDownload}>Download CSV</button>
            <br/>
            <br/>
            <table>
            <tr>
                <th>ID</th>
                <th>Response Type</th>
                <th>Response Answers</th>
                <th>Response Results</th>
                <th>Response Time</th>
            </tr>
            {history_data}
            </table>


        </div>
    );
}

export default History;