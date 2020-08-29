import React from "react";
import { connect } from "react-redux";
import { createProject } from "./ducks/actions/createProject";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
    verticalForm: {
        display: 'grid',
        gridRowGap: '20px',
        width: '100%',
        gridTemplateRows: '1fr 1fr 1fr',
        gridTemplateColumns: 'minmax(240px, 260px)',
        justifyContent: 'center',
    },
    alert: {
        width: '240px',
    },
    buttonProgress: {
        right: '16px',
        position: 'absolute',
    },
};

class CreateProject extends React.Component {
    state = {
        name: '',
    };

    componentDidUpdate(prevProps) {
        const { error, isLoading, handleClose } = this.props;

        if (prevProps.isLoading === true && isLoading === false && error === null) {
            handleClose();
        }
    }

    handleInput = (e) => {
        const inputName = e.target.name;
        this.setState({[inputName]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProject({name: this.state.name});
    };

    render() {
        const { classes, error, isLoading, open, handleClose } = this.props;
        const isNameError = error !== null && error.stack !== null && error.stack.name !== undefined;

        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {error !== null && error.stack === null && <Snackbar open={true} autoHideDuration={600}>
                <Alert className={classes.alert} severity="error">{error.message}</Alert>
            </Snackbar>}
            <DialogTitle id="form-dialog-title">Create project</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Will be created project directory, and then you can configure virtual containers with services, 
                    for example: Nginx, Mysql, PHP
                </DialogContentText>
                <form className={classes.verticalForm} onSubmit={this.handleSubmit}>
                    <TextField
                        error={isNameError}
                        helperText={isNameError && error.stack.name[0]}
                        required
                        label="Project name"
                        name="name"
                        type="text"
                        onChange={this.handleInput}
                        value={this.state.name}
                        variant="outlined"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        color="primary"
                    >
                        Create
                        {isLoading && <CircularProgress size={28} className={classes.buttonProgress} />}
                    </Button>
                </form>
            </DialogContent>
            {/* <DialogActions>
            </DialogActions> */}
        </Dialog>;
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.createProject.error,
        isLoading: state.createProject.isLoading,
    }
};
const mapDispatchToProps = { createProject };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(CreateProject));
