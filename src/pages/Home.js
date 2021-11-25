import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainHome.scss";

export default function Home() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/poll/get")
      .then((res) => {
        setPolls(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-5xl text-center my-10">Welcome to ElectroVote</h1>

      <div className="w-full max-w-3xl mx-auto bg-white shadow poll__container">
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="w-full px-4 py-4 border-b border-gray-400 flex justify-between"
          >
            {poll.title}

            <Link
              className="cursor-pointer hover:text-blue-600 text-blue-500"
              to={`/polls/${poll.id}`}
            >
              View poll
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
