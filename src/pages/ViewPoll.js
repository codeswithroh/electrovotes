// imp: ${process.env.REACT_APP_API_URL}
// imp: http://localhost:4000
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./ViewPoll.scss";
import "../index.scss";

import Button from "../components/Button";
import axios from "axios";

export default function ViewPoll({ match }) {
  const { pollId } = useParams();
  const [votedIp, setIp] = useState(null);
  const [polls, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/poll/getbyid?id=${pollId}`)
      .then((res) => {
        setPoll(res.data);
        fetchClientIpAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pollId]);

  const fetchClientIpAddress = async (pollData) => {
    const response = await fetch("https://ipapi.co/json");

    const data = await response.json();

    setIp(data.ip);
    checkIfUserVoted(pollData, data.ip);
  };

  const checkIfUserVoted = ({ voted }, userIp) => {
    const count = voted.includes(userIp);
    if (count) setVoted(true);
  };

  const vote = async (choiceId) => {
    polls.choices.forEach((choice) => {
      if (choice?.id === choiceId) {
        choice.count += 1;
      } else {
        choice.count += 0;
      }
    });
    setVoted(true);
    updatePoll(polls);
    storeIp(polls);
  };

  const storeIp = (polls) => {
    axios
      .put(`http://127.0.0.1:8000/poll/add/voteduser/${pollId}/${votedIp}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getTotalVotes = () => {
    let totalVotes = 0;

    polls.choices.forEach((choice) => {
      totalVotes += choice.count;
    });

    return totalVotes;
  };

  const getChoicePercentage = (selectedChoice) => {
    const totalVotes = getTotalVotes();

    if (totalVotes === 0) {
      return 0;
    }

    return Math.round((selectedChoice.count / totalVotes) * 100);
  };

  const updatePoll = (newPoll) => {
    axios
      .put(`http://127.0.0.1:8000/poll/update/${pollId}`, {
        id: newPoll["id"],
        title: newPoll["title"],
        choices: newPoll["choices"],
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const history = useHistory();

  const viewResultChart = () => {
    history.push(`${pollId}/result`);
  };

  return (
    <div className="view-poll container">
      <div className="view-poll__body">
        <h1 className="view-poll-header my-5 text-3xl text-center">
          Cast your vote below
        </h1>
        {polls ? (
          <div className="view-poll-container w-full max-w-3xl mx-auto bg-white shadow">
            <header className="view-poll-header-container">
              <h2 className="view-poll-title">{polls.title}</h2>
              {voted && (
                <Button onClick={() => viewResultChart()}>View Charts</Button>
              )}
            </header>
            {polls.choices.map((choice) => {
              return (
                <div
                  className="px-5 py-4 border-t border-white-400 flex justify-between items-center"
                  key={choice.id}
                >
                  <h3 className="view-poll-answers">{choice.choice}</h3>
                  {voted ? (
                    <span className="percent text-blue-500">
                      {" "}
                      {getChoicePercentage(choice)}%{" "}
                    </span>
                  ) : (
                    <Button
                      className="view-poll-button"
                      onClick={() => vote(choice.id)}
                    >
                      Vote
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
