import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
export class NotFound extends Component {
  render() {
    if (this.props.authedUser === null) 
    return <Redirect
      to={{ 
        pathname: "/login",}}
  />;
    return (
      <Container textAlign="center">
        <Header as="h3">No Match 404 Error</Header>
        <p>Nothing to see here. Please use the menu to try again.</p>
      </Container>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(NotFound);
