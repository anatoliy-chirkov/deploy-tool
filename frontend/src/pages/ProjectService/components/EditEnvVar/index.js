import React from "react";
import { connect } from "react-redux";
import { updateEnvVar } from "../../ducks/actions/updateEnvVar";
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
        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: 'minmax(240px, 260px)',
        justifyContent: 'center',
        paddingBottom: '20px',
    },
    alert: {
        width: '240px',
    },
    buttonProgress: {
        right: '16px',
        position: 'absolute',
    },
};

class EditEnvVar extends React.Component {
    state = {
        value: '',
    };

    componentDidMount() {
        const value = this.props.item.value;
        this.setState({value: value === null ? '' : value});
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
        const { id, project_service_id } = this.props.item;
        this.props.updateEnvVar({...this.state, id, serviceId: project_service_id, projectId: this.props.projectId });
    };

    render() {
        const { classes, error, isLoading, open, handleClose, item } = this.props;
        const isValueError = error !== null && error.stack !== null && error.stack.value !== undefined;

        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {error !== null && !isValueError && <Snackbar open={true} autoHideDuration={600}>
                <Alert className={classes.alert} severity="error">{error.message}</Alert>
            </Snackbar>}
            <DialogTitle id="form-dialog-title">Edit {item.var.name}</DialogTitle>
            <DialogContent>
                <form className={classes.verticalForm} onSubmit={this.handleSubmit}>
                    <TextField
                        error={isValueError}
                        helperText={isValueError && error.stack.value[0]}
                        required
                        label="Value"
                        name="value"
                        type="text"
                        onChange={this.handleInput}
                        value={this.state.value}
                        variant="outlined"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        color="primary"
                    >
                        Save
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
    return state.projectService.updateEnvVar;
};
const mapDispatchToProps = { updateEnvVar };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(EditEnvVar));
