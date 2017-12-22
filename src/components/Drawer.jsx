/* eslint-disable flowtype/require-valid-file-annotation */

// General imports
import classNames from 'classnames'

// React, React-router, etc
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// Material-ui components for this component
import { withStyles } from 'material-ui/styles'

import MDrawer from 'material-ui/Drawer'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon';

// mobx store stuff
import { inject, observer } from 'mobx-react'

import routes from '../routes'

const drawerWidth = 240

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
        height: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        height: 56,
        [theme.breakpoints.up('sm')]: {
          height: 64,
        },
    },
})

@inject('commonStore')
@withStyles(styles)
@withRouter
@observer
export default class Drawer extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

     handleDrawer = () => {
        this.props.commonStore.toggleDrawer()
    }

    render() {
        const { classes, history, commonStore } = this.props
        const { drawerOpen } = commonStore

        const list = routes.map((entry, idx) => {
            if(entry.drawer === true) {
                const itemText = drawerOpen ? <ListItemText id="app-drawer-list-item--text-refresh" primary={entry.title} /> : null
                return (
                    <ListItem id="app-drawer-list-item-refresh" key={idx} button onClick={()=>{history.push(entry.path) }} >
                        <ListItemIcon id="app-drawer-list-item--icon-refresh" >
                            <Icon id="app-drawer-list-item--icon-refresh-icon" className="material-icons">{entry.icon}</Icon>
                        </ListItemIcon>
                        { itemText }
                    </ListItem>
                )
            }
            return null
        })
        return (
            <MDrawer
                id="drawer"
                type="permanent"
                classes={{ paper: classNames(classes.drawerPaper, {[classes.drawerPaperClose]: !drawerOpen} ) }}
                open={drawerOpen}
            >
                <div id="drawer-inner" className={classes.drawerInner}>
                    <div id="drawer-inner-header" className={classes.drawerHeader}>
                        <IconButton id="drawer-inner-header-chevron-button" onClick={this.handleDrawer}>
                            <Icon id="drawer-inner-header-chevron-icon" className="material-icons">chevron_left</Icon>
                        </IconButton>
                    </div>
                    <Divider />
                    <List id="app-drawer-list" className={classes.list}>
                        {list}
                    </List>
                </div>
            </MDrawer>
        )
    }
}
