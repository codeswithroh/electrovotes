import React from "react";
import { Link } from "react-router-dom";
import "./MainHome.scss";
import "../index.scss";
export default function MainHome() {
  return (
    <div className="homepage">
      <div className="homepage__body">
        <h1 className="homepage-heading">ElectroVote</h1>
        <h4 className="homepage-subheading">A secure online voting service</h4>
        <h3 className="homepage-description">
          You are just one step away from creating your first poll. So, what are
          you waiting for ? Just click and get started
        </h3>
        <div className="homepage__body--button">
          <Link to="/polls/create" className="homepage-button">
            Create Vote
          </Link>
          <Link to="/polls/" className="homepage-button">
            View Vote
          </Link>
        </div>
      </div>
    </div>
  );
}
