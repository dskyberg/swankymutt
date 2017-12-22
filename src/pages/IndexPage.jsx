/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { useStrict, observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Fade from 'material-ui/transitions/Fade'

import swankymutt from '../assets/swankymutt.png'
useStrict()


const styles = {
  root: {
    textAlign: 'center',
  },
}

@withStyles(styles)
@observer
export default class IndexPage extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  @observable openDialog = false

  @action('IndexPage.handleRequestClose')
  handleRequestClose = () => {
    this.openDialog = false
  }

  @action('IndexPage.handleClick')
  handleClick = () => {    console.log('clicked')
    this.openDialog = true
  }

  render() {
    return (
      <Fade in timeout={{enter:500, exit:500}}>
      <div className={this.props.classes.root}>
        <Typography type="title">Swankymutt</Typography>
        <img src={swankymutt} alt="Swankymutt logo"/>
      </div>
      </Fade>
    )
  }
}
