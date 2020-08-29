import React from "react";
import { connect } from "react-redux";
import { updateVolume } from "../../ducks/actions/updateVolume";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
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

class UpdateVolume extends React.Component {
    state = {
        local_path: '',
        container_path: '',
    };

    componentDidMount() {
        this.setState({local_path: this.props.item.local_path, container_path: this.props.item.container_path});
    }

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
        this.props.updateVolume(this.state);
    };

    render() {
        const { classes, error, isLoading, open, handleClose } = this.props;
        const isFieldError = error !== null && error.stack !== null;

        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {error !== null && !isFieldError && <Snackbar open={true} autoHideDuration={600}>
                <Alert className={classes.alert} severity="error">{error.message}</Alert>
            </Snackbar>}
            <DialogTitle id="form-dialog-title">Add volume</DialogTitle>
            <DialogContent>
                <form className={classes.verticalForm} onSubmit={this.handleSubmit}>
                    <TextField
                        error={isFieldError && error.stack.local_path !== undefined}
                        helperText={isFieldError && error.stack.local_path !== undefined && error.stack.local_path[0]}
                        required
                        label="Local path"
                        name="local_path"
                        type="text"
                        onChange={this.handleInput}
                        value={this.state.local_path}
                        variant="outlined"
                        disabled={isLoading}
                    />
                    <TextField
                        error={isFieldError && error.stack.container_path !== undefined}
                        helperText={isFieldError && error.stack.local_path !== undefined && error.stack.container_path[0]}
                        required
                        label="Container path"
                        name="container_path"
                        type="text"
                        onChange={this.handleInput}
                        value={this.state.container_path}
                        variant="outlined"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        color="primary"
                    >
                        Add
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
    return state.projectService.createVolume;
};
const mapDispatchToProps = { updateVolume };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(UpdateVolume));
