import React from "react";
import DefaultProfileImg from "../images/default-img.jpeg";

const UserAside = ({username }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img
          src={ DefaultProfileImg}
          alt={username}
          width="200"
          height="200"
          className="img-thumbnail"
        />
      </div>
    </div>
  </aside>
);

export default UserAside;
