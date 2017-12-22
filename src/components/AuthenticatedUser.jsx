import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom"

// mobx store stuff
import { inject, observer } from "mobx-react"

// material-ui stuff for this component
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = {
  root: {
    maxWidth: 200,
  }
}
const isUser = (name) => (name && name !== null && name !== '')
/**
 * AwsUser is a text component that displays a message until
 * the app is able to authenticate to AWS.
 * The unauthenticated message is just the state of the mobx value
 */
@inject("authStore")
@withStyles(styles)
@withRouter
@observer
export default class AuthenticatedUser extends Component {

   static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleClick = () => {
    const { userName } = this.props.authStore;
    if(!isUser(userName)) {
        this.props.history.push("/login")
    } else {
        this.props.history.push('/logout')
    }
  }
  render() {
    const { inProgress, userName } = this.props.authStore;

    let value = 'Log in'
    if(inProgress) {
        value = 'Working...'
    } else {
        if( isUser(userName)) {
            value = userName
        }
    }

    return <Button id="authenticated-user" color='contrast' onClick={this.handleClick}>{value}</Button>
  }
}
