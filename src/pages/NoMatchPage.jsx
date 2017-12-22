/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'


import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styles = {
  root: {
    textAlign: 'center',
  },
}

@withStyles(styles)
export default class NoMatchPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography type="display1">Oops!</Typography>
        <Typography type="title">Bad page request</Typography>
      </div>
    )
  }
}
