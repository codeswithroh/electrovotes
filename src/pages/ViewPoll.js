// imp: ${process.env.REACT_APP_API_URL}
// imp: http://localhost:4000
import React, { useEffect, useState } from "react";
import './ViewPoll.css';
import '../index.css';

import Button from "../components/Button";

export default function ViewPoll({ match }) {
  const [ip, setIp] = useState(null);
  const [poll, setPoll] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      const response = await fetch(
        `https://electrovoteapp.herokuapp.com/polls/${match.params.poll}`
      );

      const data = await response.json();

      setPoll(data);
    };
    fetchPoll();
  }, [voted])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchClientIpAddress = async () => {
      const response = await fetch("https://ipapi.co/json");

      const data = await response.json();

      setIp(data.ip);
    };
    fetchClientIpAddress();
  }, []);

  const vote = async (choice) => {
    await fetch(`https://electrovoteapp.herokuapp.com/polls/${match.params.poll}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ip,
        choice,
      }),
    });

    setVoted(true);
  };

  const getTotalVotes = () => {
    let totalVotes = 0;

    poll.choices.forEach((choice) => {
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

  return (
    <div className='view-poll container mx-auto mt-16 px-5'>
      <h1 className='view-poll-heading my-5 text-3xl text-center'>
        Welcome to ElectroVote
      </h1>

      {poll ? (
        <div className='view-poll-container w-full max-w-3xl mx-auto bg-white shadow'>
          <header className='px-5 py-4 flex justify-between items-center'>
            <h2 className="view-poll-title">{poll.title}</h2>

            {voted && <span style={{fontSize:'1.2rem'}}>{getTotalVotes()} votes</span>}

            <Button onClick={() => setVoted(true)}>View results</Button>
          </header>

          {poll.choices.map((choice) => {
            return (
              <div
                className='px-5 py-4 border-t border-white-400 flex justify-between items-center'
                key={choice._id}
              >
                <h3 className="view-poll-answers">{choice.name}</h3>

                {voted ? (
                  <span className='percent text-blue-500'>
                    {" "}
                    {getChoicePercentage(choice)}%{" "}
                  </span>
                ) : (
                  <Button className="view-poll-button" onClick={() => vote(choice._id)}>Vote</Button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
