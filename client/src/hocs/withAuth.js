import React, { useEffect } from "react";
import { connect } from "react-redux";

export default function withAuth(Wrapped) {
  function Authenticate(props) {
    useEffect(() => {
      if (!props.isAuthenticated) {
        props.history.push("/signin");
      }
    }, []);

    return <Wrapped {...props} />;
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.currentUser.isAuthenticated };
  }

  return connect(mapStateToProps)(Authenticate);
}
