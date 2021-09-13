import React, { Component } from "react";
import ControlTap from "./ControlTap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
export class Dashboard extends Component {
  render() {
    if (this.props.authedUser === null) return <Redirect to="/login" />;

    const { users, questions, authedUser } = this.props;

    const ansId = Object.keys(users[authedUser]["answers"]);
    const answered = Object.keys(questions).filter((id) => {
      return ansId.includes(id);
    });
    const unAnswered = Object.keys(questions).filter((id) => {
      return !ansId.includes(id);
    });
    console.log("answered", answered, "unAnswered", unAnswered);
    return (
      <div>
        <ControlTap unansweredId={unAnswered} answeredId={answered} />
      </div>
    );
  }
}
function mapSteteToProps({ users, questions, authedUser }) {
  return {
    users,
    questions,
    authedUser
  };
}
export default connect(mapSteteToProps)(Dashboard);
