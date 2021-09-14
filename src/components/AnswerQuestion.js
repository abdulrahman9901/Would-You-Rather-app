import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Radio, Button, Container } from "semantic-ui-react";
import { handleAnswerQuestion } from "../actions/questions";
class AnswerQuestion extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });
  handleSubmit = (e) => {
    const { dispatch, authedUser, question_id } = this.props;
    const Answer = {
      authedUser: authedUser["id"],
      qid: question_id,
      answer: this.state.value
    };
    dispatch(handleAnswerQuestion(Answer));
  };
  render() {
    if (this.props.authedUser === null) 
    return <Redirect
      to={{ 
        pathname: "/login",
        state: { referrer: this.props.match.url }
      }}
  />;

    const { value } = this.state;
    const { optionOne, optionTwo } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Container textAlign="left">
            <Form.Field
              control={Radio}
              label={optionOne.text}
              value={"optionOne"}
              checked={value === "optionOne"}
              onChange={this.handleChange}
              style={{ padding: 10, paddingTop: 20 }}
            />
            <Form.Field
              control={Radio}
              label={optionTwo.text}
              value={"optionTwo"}
              checked={value === "optionTwo"}
              onChange={this.handleChange}
              style={{ padding: 10, paddingBottom: 20 }}
            />
          <Button
            disabled={this.state.value === undefined}
            size="tiny"
            fluid
            color="green"
          >
            Submit Answer
          </Button>
          </Container>
        </Form.Group>
      </Form>
    );
  }
}
function mapStateToProps({ authedUser }, props) {
  return {
    authedUser,
    ...props
  };
}
export default connect(mapStateToProps)(AnswerQuestion);
