// TODO: take the ip of the user and make it as the id of the poll

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./CreatePoll.scss";
import "../index.scss";

export default function CreatePoll() {
  const [title, setTitle] = useState("");
  const [choiceText, setChoiceText] = useState([""]);
  const choices = [];

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const addAnswer = () => {
    if (choiceText.length < 4) setChoiceText([...choiceText, ""]);
    else alert("You can only add 4 choices");
  };

  const removeChoice = (index) => {
    if (choiceText.length > 1) {
      const newChoices = choiceText.filter((choice, choiceIndex) => {
        return choiceIndex !== index;
      });

      setChoiceText(newChoices);
    } else {
      alert("You can't remove all the choices");
    }
  };

  const onChoiceChange = (index, value) => {
    const newChoices = choiceText.map((choice, choiceIndex) => {
      if (choiceIndex === index) {
        return value;
      }
      return choice;
    });
    setChoiceText(newChoices);
  };

  const createPoll = () => {
    choiceText.map((choice, choiceIndex) => {
      choices.push({ id: choiceIndex, choice: choice, count: 0 });
      return choices;
    });

    addChoicesToDatabase(choices);
  };

  const addChoicesToDatabase = (choices) => {
    const id = Date.now();
    if (!!title && choiceText.length > 1) {
      axios
        .post("http://127.0.0.1:8000/poll/add", {
          id: id,
          title: title,
          choices: choices,
        })
        .then((res) => {
          console.log(res);
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (choiceText.length < 2)
      alert("There should be at least two choices");
    else alert("Title is required");
  };

  return (
    <div className="create-poll container">
      <div className="create-poll-container w-full max-w-3xl mx-auto rounded shadow-md bg-white">
        {success.pollId ? (
          <header className="border-b border-white-400 success-poll-header">
            Poll Created Successfully
          </header>
        ) : (
          <header className="border-b border-white-400 create-poll-header">
            Create poll
          </header>
        )}

        {success ? (
          <div className="py-5 px-8">
            <Link to={`/polls/`}>
              <div className="success-text w-full mb-2 bg-green-100 text-green-500 border border-green-500 rounded py-3 px-2">
                Click here to view the poll
              </div>
            </Link>
          </div>
        ) : null}

        <div className="py-5 px-8">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="text-sm mb-2 inline-block poll-title"
            >
              Enter the title of the poll
            </label>
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              name="title"
              id="title"
              type="text"
              required
              className="poll-title-input w-full py-2 border border-gray-400 rounded px-4"
            />
          </div>

          <div className="mb-3">
            <label className="text-sm mb-2 inline-block poll-answers">
              Enter all the options for this poll
            </label>
            {choiceText.map((choice, index) => (
              <div key={index} className="w-full flex items-center mb-2">
                <input
                  onChange={(event) =>
                    onChoiceChange(index, event.target.value)
                  }
                  key={index}
                  type="text"
                  value={choice}
                  required
                  maxLength={50}
                  className="poll-answers-input w-full py-2 border border-gray-400 rounded px-4"
                />
                <button
                  onClick={() => removeChoice(index)}
                  className="poll-remove-button py-2 ml-2 px-3"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addAnswer}
            className="poll-add-button text-white px-3 py-2"
          >
            Add choice
          </button>

          <div className="mt-12 mb-6 text-center">
            <button
              onClick={createPoll}
              className="poll-create-button text-white px-3 py-2 "
            >
              Create Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
