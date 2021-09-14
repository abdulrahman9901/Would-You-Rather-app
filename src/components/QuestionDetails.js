import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Icon,
  Label,
  Header,
  Progress,
  Button
} from "semantic-ui-react";

function VoteLabel() {
  return (
    <Label attached="top right" color="orange">
      Your vote
      <Icon
        name="check circle outline"
        className="compact"
        style={{ paddingLeft: 5 }}
      />
    </Label>
  );
}

function SegmentProducer(props) {
  const { voted, optionVotes, totalVotes, optionText } = props;
  const color = voted ? "green" : "grey";
  return (
    <Segment color={color}>
      {voted && <VoteLabel />}
      <Header as="h3" content={optionText} />
      <Progress
        color={color}
        percent={((optionVotes / totalVotes) * 100).toFixed(2)}
        progress
      >
        <span>
          {optionVotes} of {totalVotes} votes
        </span>
      </Progress>
    </Segment>
  );
}
class QuestionDetails extends Component {
  state = {
    redirect: false
  };
  handleClick = () => {
    this.setState({
      redirect: true
    });
  };
  render() {
    if (this.props.authedUser === null) 
    return <Redirect
      to={{ 
        pathname: "/login",
        state: { referrer: this.props.match.url }
      }}
  />;


    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { answers, optionOne, optionTwo, question_id } = this.props;
    const takenOption = answers[question_id];
    return (
      <Fragment>
        <Header
          style={{ paddingTop: 10 }}
          content="Results :"
          as="h3"
          textAlign="center"
        />
        <SegmentProducer
          optionVotes={optionOne["votes"].length}
          totalVotes={optionOne["votes"].length + optionTwo["votes"].length}
          optionText={optionOne["text"]}
          voted={takenOption === "optionOne"}
        />
        <SegmentProducer
          optionVotes={optionTwo["votes"].length}
          totalVotes={optionOne["votes"].length + optionTwo["votes"].length}
          optionText={optionTwo["text"]}
          voted={takenOption === "optionTwo"}
        />
        <Button
          size="small"
          color="grey"
          floated="right"
          onClick={this.handleClick}
        >
          Back
        </Button>
      </Fragment>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(QuestionDetails);
