import React from "react";
import { connect } from "react-redux";
import { addService } from "./ducks/actions/addService";
import { getServices } from "./ducks/actions/getServices";
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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import LayersIcon from '@material-ui/icons/Layers';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = {
    servicesList: {
        marginBottom: '20px',
    },
    alert: {
        width: '240px',
    },
    buttonProgress: {
        right: '16px',
        position: 'absolute',
    },
};

class AddService extends React.Component {
    state = {
        name: '',
    };

    componentDidMount() {
        const { services } = this.props;

        if (services.length === 0) {
            this.props.getServices();
        }
    }

    handleServiceSelect = (serviceId) => {
        this.props.addService({projectId: this.props.projectId, service_id: serviceId});
        this.props.handleClose();
    };

    render() {
        const { classes, error, isLoading, open, handleClose, services } = this.props;

        return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            {error !== null && <Snackbar open={true} autoHideDuration={600}>
                <Alert className={classes.alert} severity="error">{error.message}</Alert>
            </Snackbar>}
            <DialogTitle id="form-dialog-title">Select new service</DialogTitle>
            <DialogContent>
                {services.length === 0 && isLoading ? <CircularProgress /> : 
                services.length === 0 ? 'Need to update services by console command' : 
                <List component="nav" className={classes.servicesList}>
                {services.map((service, i) => {
                    return <ListItem key={i} button onClick={() => this.handleServiceSelect(service.id)}>
                        <ListItemAvatar>
                            <Avatar>
                                <LayersIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={service.name + ' : ' + service.version}
                            secondary={service.description}
                        />
                    </ListItem>
                })}
                </List>}
            </DialogContent>
            {/* <DialogActions>
            </DialogActions> */}
        </Dialog>;
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.addService.data,
        error: state.addService.error,
        isLoading: state.addService.isLoading,
    }
};
const mapDispatchToProps = { addService, getServices };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(AddService));
