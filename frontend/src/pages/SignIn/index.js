import React from "react";
import { connect } from "react-redux";
import { signIn } from "@common/auth/actions/signIn";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
    wrapper: {
        height: '100vh',
        display: 'grid',
        alignItems: 'center',
        justifyItems: 'center',
    },
    verticalForm: {
        display: 'grid',
        gridRowGap: '20px',
        width: '100%',
        gridTemplateRows: '1fr 1fr 1fr',
        gridTemplateColumns: 'minmax(240px, 260px)',
        justifyContent: 'center',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    alert: {
        width: '240px',
    },
    buttonProgress: {
        right: '16px',
        position: 'absolute',
    },
};

class SignIn extends React.Component {
    state = {
        name: '',
        password: '',
    };

    handleInput = (e) => {
        const inputName = e.target.name;
        this.setState({[inputName]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn({name: this.state.name, password: this.state.password});
    };

    render() {
        const { classes, error, isLoading } = this.props;

        return <div className={classes.wrapper}>
            <Snackbar open={error !== null} autoHideDuration={600}>
                {error && <Alert className={classes.alert} severity="error">{error.message}</Alert>}
            </Snackbar>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h3" className={classes.heading}>Deploy Tool</Typography>
                <form className={classes.verticalForm} onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        label="Username"
                        name="name"
                        type="text"
                        onChange={this.handleInput}
                        value={this.state.name}
                        variant="outlined"
                        disabled={isLoading}
                    />
                    <TextField
                        required
                        label="Password"
                        name="password"
                        type="password"
                        onChange={this.handleInput}
                        value={this.state.password}
                        variant="outlined"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                    >
                        Sign in
                        {isLoading && <CircularProgress size={28} className={classes.buttonProgress} />}
                    </Button>
                </form>
            </Container>
        </div>;
    }
}

const signInFail = (error) => {
    return {
        type: 'signIn/fail',
        payload: {error}
    };
};
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isLoading: state.auth.isLoading,
    }
};
const mapDispatchToProps = { signIn, signInFail };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(SignIn));
