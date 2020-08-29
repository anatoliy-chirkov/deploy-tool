import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { stealthLogin } from './common/auth/actions/stealthLogin';
import { signOut } from './common/auth/actions/signOut';
import SignIn from './pages/SignIn';
import Projects from './pages/Projects';
import Project from './pages/Project';
import ProjectService from './pages/ProjectService';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const styles = {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
        padding: 0,
    }
};

class App extends Component {
    componentDidMount() {
        const bearerToken = localStorage.getItem('deploy_tool:token');

        if (bearerToken !== null) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;
            this.props.stealthLogin();
        }
    }

    render() {
        const { classes, userId, signOut } = this.props;
        const loggedIn = userId !== null;

        return (
            <React.Fragment>
                <CssBaseline />
                {!loggedIn ? 
                    <Switch>
                        <Route exact path='/' component={SignIn} />
                        {/* <Route>
                            <Redirect to="/" />
                        </Route> */}
                    </Switch> 
                :
                    <>
                        <Container maxWidth="sm">
                            <Toolbar className={classes.toolbar}>
                                <Typography variant="h6" className={classes.title}>
                                    Deploy Tool
                                </Typography>
                                <Button color="inherit" onClick={() => signOut()}>Sign out</Button>
                            </Toolbar>
                        </Container>
                        <Switch>
                            {/* <Template signOut={this.props.signOut}> */}
                                <Route exact path='/' component={Projects} />
                                <Route exact path='/projects/:id' component={Project} />
                                <Route exact path='/projects/:projectId/services/:id' component={ProjectService} />
                            {/* </Template> */}
                        </Switch>
                    </>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    };
};
const mapDispatchToProps = { stealthLogin, signOut };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
