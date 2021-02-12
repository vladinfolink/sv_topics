import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <Link to="/signup" className="btn btn-warning">
          Sign up
        </Link>
      </div>
    );
  }
  return (
    <div>
      <MessageTimeline
        username={currentUser.user.username}
      />
    </div>
  );
};

export default Homepage;
