import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Segment, Grid, Header, Button, Image } from "semantic-ui-react";

class Question extends Component {
  render() {
    console.log(this.props);
    const { author, answered, avatar, text, id } = this.props;
    return (
      <Segment.Group>
        <Header as="h5" block textAlign="left" attached="top">
          {author} asks :
        </Header>
        <Grid divided padded>
          <Grid.Column width={5} centered verticalAlign="middle">
            <Image src={avatar} />
          </Grid.Column>
          <Grid.Column width={11} textAlign="center">
            <Grid.Row>
              <Header as="h5" textAlign="left">
                Would you rather
              </Header>
            </Grid.Row>
            <Grid.Row>
              <p style={{ paddingTop: 10, paddingBottom: 15 }}>
                {text}
                <br /> or...
              </p>
              <Link to={"/questions/" + id}>
                <Button size="tiny" fluid color={answered ? "blue" : "green"}>
                  {answered ? "View Result" : "Answer Question"}
                </Button>
              </Link>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

export default Question;
