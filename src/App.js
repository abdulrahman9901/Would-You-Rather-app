import "./styles.css";
import { Grid } from "semantic-ui-react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewQuestion from "./components/NewQuestion";
import LeaderBoard from "./components/LeaderBoard";
import PollContainer from "./components/PollContainer";
import Nav from "./components/Nav";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import React, { Component } from "react";
import { Segment, Loader, Image } from "semantic-ui-react";
import Login from "./components/login";
import NotFound from "./components/404";
class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }
  render() {
    const { users, questions } = this.props;
    if (Object.keys(users).length <= 0 || Object.keys(questions).length <= 0) {
      return (
        <Segment>
          <Loader active size="massive" />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    }
    return (
      <Router>
        {this.props.authedUser ? <Nav /> : ""}
        <div className="App">
          <Wrapper>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/add" component={NewQuestion} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/questions/bad_id" component={NotFound} />
              <Route path="/questions/:question_id" component={PollContainer} />
            </Switch>
          </Wrapper>
        </div>
      </Router>
    );
  }
}
const Wrapper = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);
function mapSteteToProps({ users, questions, authedUser }) {
  return {
    users,
    questions,
    authedUser
  };
}
export default connect(mapSteteToProps)(App);
