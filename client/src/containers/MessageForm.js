import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewMessage } from "../store/actions/messages";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      category: "Chubby",
      deadline: new Date(),
    };
  }

  handleNewMessage = (event) => {
    event.preventDefault();
    this.props
      .postNewMessage(
        this.state.message,
        this.state.category,
        this.state.deadline
      )
      .then((res) => {
        this.setState({ message: "", category: "" });
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleNewMessage}>
          {this.props.errors.message && (
            <div className="alert alert-danger">
              {this.props.errors.message}
            </div>
          )}
          <input
            type="text"
            className="form-control"
            value={this.state.message}
            onChange={(e) => this.setState({ message: e.target.value })}
          />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Category
              </label>
            </div>
            <select
              onChange={(e) => this.setState({ category: e.target.value })}
              className="custom-select"
              id="inputGroupSelect01"
            >
              <option defaultValue="Chubby">Chubby</option>
              <option value="Cheeks">Cheeks</option>
            </select>
          </div>
          <button type="submit" className="btn btn-warning">
            Add topic
          </button>
        </form>
        <h2 className="text-warning">Deadline:</h2>{" "}
        <DatePicker
          showTimeSelect
          onChange={(deadline) => this.setState({ deadline })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
