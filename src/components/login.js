import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import {
  Dropdown,
  Button,
  Image,
  Segment,
  Header,
  Form
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";

function optionGenerator(users) {
  const friendOptions = users.map((user) => ({
    key: user["name"],
    text: user["name"],
    value: user["id"],
    image: { avatar: true, src: user["avatar"] }
  }));
  return friendOptions;
}
class Login extends Component {
  state = {};
  handleChange = (e, { value }) => {
    console.log(value);
    this.setState({ value });
  };
  handleSubmit = (e) => {
    console.log(this.props);
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.value));
  };
  render() {
    if (this.props.authedUser !== null) {
      return <Redirect to="/" />;
    }
    return (
      <Segment textAlign="center">
        <Header block>
          <p>
            Welcome to the Would You Rather App!
            <br />
            Please sign in to continue
          </p>
        </Header>
        <Image
          src={"/images/mainpic.jpg"}
          height="350"
          width="300"
          centered
        />
        <Form onSubmit={this.handleSubmit}>
          <Dropdown
            onChange={this.handleChange}
            style={{ marginTop: 20 }}
            placeholder="Select Friend"
            fluid
            selection
            options={optionGenerator(this.props.usersOptions)}
          />
          <Button
            disabled={this.state.value === undefined}
            style={{ marginTop: 20 }}
            positive
            type="submit"
          >
            Sign in
          </Button>
        </Form>
      </Segment>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  const usersOptions = Object.values(users).map((user) => {
    return {
      name: user["name"],
      id: user["id"],
      avatar: user["avatarURL"]
    };
  });
  return { usersOptions, authedUser };
}
export default connect(mapStateToProps)(Login);
