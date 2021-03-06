import React from "react";
import { Redirect } from "react-router-dom";
import { inject } from "mobx-react";

@inject("authStore")
export default class LogoutPage extends React.Component {
  componentWillMount() {
    this.props.authStore.logout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}