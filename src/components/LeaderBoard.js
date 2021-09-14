import React, { Component } from "react";
import { connect } from "react-redux";
import User from "./User";
import { List } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
class LeaderBoard extends Component {
  render() {
    if (this.props.authedUser === null) 
    return <Redirect
      to={{ 
        pathname: "/login",
        state: { referrer: "/leaderboard" }
      }}
  />;

    const users = this.props.formattedUsers;
    return (
      <div>
        <List>
          {users.map((user) => (
            <List.Item key={users.indexOf(user)}>
              <User user={user} position={users.indexOf(user)} />
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  const sortedUsers = Object.values(users).sort(
    (a, b) =>
      b["questions"].length +
      Object.keys(b["answers"]).length -
      (a["questions"].length + Object.keys(a["answers"]).length)
  );
  const formattedUsers = sortedUsers.map((user) => {
    return {
      name: user["name"],
      avatar: user["avatarURL"],
      questionsNum: user["questions"].length,
      answersNum: Object.keys(user["answers"]).length
    };
  });

  return { authedUser, formattedUsers };
}
export default connect(mapStateToProps)(LeaderBoard);
