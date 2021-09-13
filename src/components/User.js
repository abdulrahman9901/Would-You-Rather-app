import React, { Component } from "react";
import {
  Grid,
  Image,
  Divider,
  Header,
  Segment,
  Label
} from "semantic-ui-react";

class User extends Component {
  render() {
    const trophyColor = ["yellow", "gray", "orange"];
    const { name, avatar, answersNum, questionsNum } = this.props.user;
    const { position } = this.props;
    return (
      <Segment.Group>
        {position <= 2 && (
          <Label corner="left" icon="trophy" color={trophyColor[position]} />
        )}
        <Grid padded>
          <Grid.Row divided>
            <Grid.Column width={4} verticalAlign="middle">
              <Image src={avatar} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header a="h3">{name}</Header>
              <Grid>
                <Grid.Row style={{ paddingBottom: 0, paddingTop: 30 }}>
                  <Grid.Column width={12}>Answered questions</Grid.Column>
                  <Grid.Column width={4}>{answersNum}</Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row style={{ paddingTop: 0 }}>
                  <Grid.Column width={12}>Created questions</Grid.Column>
                  <Grid.Column width={4}>{questionsNum}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={4} textAlign="center">
              <Segment.Group>
                <Header block as="h5" content="Score" />
                <Segment>
                  <Label color="green" circular size="big">
                    {answersNum + questionsNum}
                  </Label>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}
export default User;
