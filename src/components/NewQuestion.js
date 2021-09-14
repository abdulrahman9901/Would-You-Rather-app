import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Form,
  Button,
  Header,
  Divider,
  Segment,
  Grid
} from "semantic-ui-react";
import { handleAddQuestion } from "../actions/questions";
class NewQuestion extends Component {
  state = {
    firstOption: "",
    secondOption: "",
    redirect: false
  };
  handleChangeInput = (e, { name }) => {
    this.setState((prevState) => ({
      [name]: e.target.value
    }));
  };
  handleSubmit = (e) => {
    const { firstOption, secondOption } = this.state;
    const { dispatch, authedUser } = this.props;
    const info = {
      author: authedUser,
      optionOneText: firstOption,
      optionTwoText: secondOption
    };
    dispatch(handleAddQuestion(info));
    this.setState({
      firstOption: "",
      secondOption: "",
      redirect: true
    });
  };
  render() {
    if (this.props.authedUser === null) 
    return <Redirect
      to={{ 
        pathname: "/login",
        state: { referrer: "/add" }
      }}
  />;

    const { firstOption, secondOption, redirect } = this.state;
    const isdisabled = firstOption === "" || secondOption === "";
    if (redirect) {
      return <Redirect exact to="/" />;
    }
    return (
      <Segment.Group>
        <Header block as="h3" textAlign="left" attached="top">
          Create a New Poll
        </Header>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <p>Complete the question:</p>
              <p>
                <strong>Would you rather...</strong>
              </p>
              <Form success onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  name="firstOption"
                  placeholder="First option"
                  value={firstOption}
                  onChange={this.handleChangeInput.bind(this)}
                />
                <Divider horizontal>Or</Divider>
                <Form.Input
                  fluid
                  name="secondOption"
                  placeholder="Second option"
                  value={secondOption}
                  onChange={this.handleChangeInput}
                />
                <Button fluid positive type="submit" disabled={isdisabled}>
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(NewQuestion);
