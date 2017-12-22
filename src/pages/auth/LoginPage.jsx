import React from "react"
import { withRouter } from "react-router-dom"

import { inject, observer } from "mobx-react"
import { action } from 'mobx'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

const styles = theme => ({
    container: {
    },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    },
})

@inject( "authStore" )
@withStyles(styles)
@withRouter
@observer
export default class LoginPage extends React.Component {

  @action('Login.handleChange')
  handleChange = field => e => {
      if(field === 'username') {
          this.props.authStore.userName = e.target.value
      }
      else if(field === 'password') {
        this.props.authStore.password = e.target.value
      }
      else {
          console.log('Login.handleChange: unknown field:', field)
      }
  };


  handleSubmitForm = e => {
    e.preventDefault();
    this.props.authStore.login().then(() => this.props.history.replace("/"));
  };

  render() {
    const { classes } = this.props
    const { inProgress, userName, password } = this.props.authStore;

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <section >
                <TextField
                    id="username"
                    label="User Name"
                    defaultValue={userName}
                    className={classes.textField}
                    type="username"
                    onChange={this.handleChange('username')}
                    margin="normal"
                    autoFocus
                />
                <TextField
                    id="password"
                    label="Password"
                    defaultValue={password}
                    className={classes.textField}
                    type="password"
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
            </section>
            <section>
            <Button
                raised
                color="primary"
                disabled={inProgress}
                onClick={this.handleSubmitForm}
                type="submit"
            >
                Login
            </Button>
          </section>
        </form>
    )
  }
}