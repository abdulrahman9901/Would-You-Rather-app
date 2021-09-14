import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Image, Button, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };
  render() {
    const { name, avatar } = this.props;
    return (
      <Menu secondary style={{ padding: 10 }} style={{maxWidth:1000 , margin:"auto"}} >
        <Menu.Item as={NavLink} exact to={"/"} name="home" />
        <Menu.Item as={NavLink} to={"/add"} name="new question" />
        <Menu.Item as={NavLink} to={"/leaderboard"} name="leader board" />
        <Menu.Menu position="right">
          <Menu.Item>
            <span>
              <Image
                src={avatar}
                avatar
                spaced="right"
                verticalAlign="bottom"
              />
              {name}
            </span>
          </Menu.Item>
          <Menu.Item>
            <Button
              content="Logout"
              icon="log out"
              labelPosition="right"
              basic
              compact
              onClick={this.handleLogout}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
function mapSteteToProps({ users, authedUser }) {
  return {
    name: users[authedUser]["name"],
    avatar: users[authedUser]["avatarURL"]
  };
}
export default connect(mapSteteToProps)(Nav);
