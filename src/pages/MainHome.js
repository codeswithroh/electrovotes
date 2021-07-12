import React from "react";
import { Link } from "react-router-dom";
import './MainHome.css';
import '../index.css';
export default function MainHome() {
  return (
    <div className='homepage'>
      <h1 className="homepage-heading">ElectroVote</h1>
      <h4 className="homepage-subheading">A secure online voting service</h4>
      <h3 className="homepage-sub-subheading">
        You are just one step away from creating your first poll. So, what are
        you waiting for ? Just click and get started
      </h3>
      <Link to="/polls/create" className="homepage-button">Create Vote</Link>
    </div>
  );
}
