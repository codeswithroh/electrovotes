import React from "react";
import "../pages/ViewPoll.scss";

export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="view-poll-button px-3 py-2">
      {children}
    </button>
  );
}
