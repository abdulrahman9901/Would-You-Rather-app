import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Grid } from "semantic-ui-react";
import Question from "../components/Question";

const makePanes = (Answered, UnAnswered) => {
  const panes = [
    {
      menuItem: "Unanswered",
      render: () => (
        <Tab.Pane>
          {UnAnswered.map((question) => (
            <Question key={question.id} answered={false} {...question} />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: "Answered",
      render: () => (
        <Tab.Pane>
          {Answered.map((question) => (
            <Question key={question.id} answered={true} {...question} />
          ))}
        </Tab.Pane>
      )
    }
  ];
  return panes;
};
class ControlTap extends Component {
  render() {
    const { Answered, UnAnswered } = this.props;
    return (
      <Grid padded="vertically" columns={1} centered>
        <Grid.Row>
          <Grid.Column>
            <Tab
              menu={{ borderless: true, pointing: true, widths: 2 }}
              panes={makePanes(Answered, UnAnswered)}
              className="tab"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
function mapSteteToProps({ users, questions }, { answeredId, unansweredId }) {
  const Answered = answeredId.map((ansId) => {
    const question = questions[ansId];
    const user = users[question["author"]];
    return {
      author: user["name"],
      avatar: user["avatarURL"],
      text: question["optionOne"]["text"],
      id: question["id"],
      time:question['timestamp']
    };
  });
  const sortedAns=Answered.sort((a,b)=> b["time"]- a["time"])
  const UnAnswered = unansweredId.map((ansId) => {
    const question = questions[ansId];
    const user = users[question["author"]];
    return {
      author: user["name"],
      avatar: user["avatarURL"],
      text: question["optionOne"]["text"],
      id: question["id"],
      time:question['timestamp']
    };
  });
  const sortedUnAns=UnAnswered.sort((a,b)=> b["time"]- a["time"])
  return { Answered:sortedAns, UnAnswered:sortedUnAns };
}
export default connect(mapSteteToProps)(ControlTap);
