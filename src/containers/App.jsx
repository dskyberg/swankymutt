import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router'

import { withStyles } from 'material-ui/styles';
import Fade from 'material-ui/transitions/Fade'
import AppBar from '../components/AppBar'
import Drawer from '../components/Drawer'
import routes, {createRoute} from '../routes'

const styles = theme => ({
    '@global': {
        html: {
          background: theme.palette.background.default,
          WebkitFontSmoothing: 'antialiased', // Antialiasing.
          MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        },
        body: {
          margin: 0,
        },
      },
        root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
          height: 'calc(100% - 64px)',
          marginTop: 64,
        },
    },
})


@withStyles(styles)
export default class App extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
        }
    }


    render() {
        const { classes } = this.props

        return (
            <div id="app" className={classes.root}>
                <div id="app-frame" className={classes.appFrame}>
                <AppBar />
                <Drawer />
                <main id="app-main" className={classes.content} >
                    <Fade in timeout={{enter:500, exit:500}}>
                    <Switch>
                        {
                            routes.map((route, idx) => {return createRoute(route, idx)})
                        }
                    </Switch>
                    </Fade>
                </main>
            </div>
          </div>
        )
    }
}

