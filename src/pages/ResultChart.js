import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import "./ResultChart.scss";

function ResultChart() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [showData, setShowData] = useState(false);
  const labels = [];
  const voteNumber = [];

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/poll/getbyid?id=${pollId}`)
      .then((res) => {
        settingChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setShowData(true));
  }, [pollId]);

  const settingChartData = (pollData) => {
    pollData.choices.map((choice) => {
      labels.push(choice.choice);
      voteNumber.push(choice.count);
    });
    setPoll({
      labels: labels,
      datasets: [
        {
          label: "Result of the poll",
          data: voteNumber,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 0, 127, 0.8)",
            "rgba(5, 255, 5, 0.8)",
          ],
          borderColor: [
            "rgba(255, 0, 0, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(153, 0, 76, 1)",
            "rgba(0, 155, 0, 1)",
          ],
          borderWidth: 3,
          textWidth: 3,
        },
      ],
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="ResultChart">
      {showData && (
        <Bar className="ResultChart__data" data={poll} options={options} />
      )}
    </div>
  );
}

export default ResultChart;
