import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AnswerQuestion from "./AnswerQuestion";
import QuestionDetails from "./QuestionDetails";
import { Segment, Grid, Header, Image } from "semantic-ui-react";

function Dispatcher(props) {
  const { answerd, optionOne, optionTwo, question_id, authedUser } = props;
  if (!answerd) {
    return (
      <AnswerQuestion
        optionOne={optionOne}
        optionTwo={optionTwo}
        question_id={question_id}
        authedUser={authedUser}
      />
    );
  } else {
    return (
      <QuestionDetails
        optionOne={optionOne}
        optionTwo={optionTwo}
        question_id={question_id}
        answers={authedUser["answers"]}
      />
    );
  }
}
class PollContainer extends Component {
  render() {
    if (this.props.authedUser === null) return <Redirect to="/login" />;
    const { NotFound } = this.props;
    if (NotFound) {
      return <Redirect to="/questions/bad_id" />;
    }
    const {
      authorName,
      authorAvatar,
      answerd,
      optionOne,
      optionTwo,
      question_id,
      authedUser
    } = this.props;
    return (
      <Segment.Group>
        <Header as="h5" block textAlign="left" attached="top">
          {authorName} asks :
        </Header>
        <Grid divided padded>
          <Grid.Column width={5} centered verticalAlign="middle">
            <Image src={authorAvatar} />
          </Grid.Column>
          <Grid.Column width={11} textAlign="center">
            <Grid.Row>
              <Header as="h5" textAlign="left">
                Would you rather...
              </Header>
            </Grid.Row>
            <Grid.Row padded textAlign="left">
              <Dispatcher
                answerd={answerd}
                optionOne={optionOne}
                optionTwo={optionTwo}
                question_id={question_id}
                authedUser={authedUser}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}
function mapStateToProps({ authedUser, questions, users }, props) {
  const { question_id } = props.match.params;
  console.log("found", questions[question_id]);
  const question = questions[question_id];
  let NotFound = false;
  if (question === undefined) NotFound = true;
  let author = null;
  let answerd = false;
  if (authedUser === null)
    return {
      authedUser
    };
  if (!NotFound) {
    author = users[question["author"]];
    answerd = Object.keys(users[authedUser]["answers"]).includes(question_id);
  } else {
    return {
      NotFound
    };
  }
  return {
    NotFound,
    answerd,
    question_id,
    optionOne: question.optionOne,
    optionTwo: question.optionTwo,
    authorName: author["name"],
    authorAvatar: author["avatarURL"],
    authedUser: users[authedUser]
  };
}
export default connect(mapStateToProps)(PollContainer);
