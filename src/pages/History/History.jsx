import React , { useEffect, useState } from "react";
import "./History.css";
import axios from 'axios';

function History() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/surveys/history')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const history_data = data.map((data, i) =>
        // <div className="history">
        //     <p>{data.id}</p>
        //     <p>{data.response_type}</p>
        //     <p>{data.response_answers}</p>
        // </div>
        <tr key={i}>
            <td>{data.id}</td>
            <td>{data.response_type}</td>
            <td>{data.response_answers}</td>
            <td>{data.response_time}</td>
        </tr>
    );
    return (
        <div className="history-container">
            <h1>History</h1>
            <table>
            <tr>
                <th>ID</th>
                <th>Response Type</th>
                <th>Response Answers</th>
                <th>Response Time</th>
            </tr>

            {history_data}
            </table>
        </div>
    );
}

export default History;