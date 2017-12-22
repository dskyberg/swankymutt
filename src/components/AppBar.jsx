/* eslint-disable flowtype/require-valid-file-annotation */

// General imports
import classNames from 'classnames'

// React, React-router, etc
import React, { Component } from 'react'
import PropTypes from 'prop-types'


// Material-ui components for this component
import { withStyles } from 'material-ui/styles'

import MAappBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon';
import AuthenticatedUser from './AuthenticatedUser'

// mobx store stuff
import { inject, observer } from 'mobx-react'

const drawerWidth = 240

const styles = theme => ({
    appBar: {
        position: 'absolute',
        width: '100%',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    flex: {
        flex: 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
})

@inject('commonStore')
@withStyles(styles)
@observer
export default class AppBar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }


    handleDrawer = () => {
        this.props.commonStore.toggleDrawer()
    }

    render() {
        const { classes } = this.props

        return (
            <MAappBar id="appbar" className={classNames(classes.appBar, {[classes.appBarShift]: this.props.commonStore.drawerOpen})}>
                <Toolbar id="appbar-toolbar" disableGutters={!this.props.commonStore.drawerOpen}>
                    <IconButton id="appbar-toolbar-menu-icon-button"
                        color="contrast"
                        aria-label="open drawer"
                        onClick={this.handleDrawer}
                        className={classNames(classes.menuButton, this.props.commonStore.drawerOpen && classes.hide)}
                    >
                        <Icon id="appbar-toolbar-menu-icon" className="material-icons">menu</Icon>
                    </IconButton>
                    <Typography id="appbar-toolbar-title" type="title" color="inherit" className={classes.flex}>
                        SWANKYMUTT
                    </Typography>
                    <AuthenticatedUser />
                </Toolbar>
            </MAappBar>
        )
    }
}

