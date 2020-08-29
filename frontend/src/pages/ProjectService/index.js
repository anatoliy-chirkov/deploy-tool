import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getEnvVars } from './ducks/actions/getEnvVars';
import { updateEnvVar } from './ducks/actions/updateEnvVar';
import { getVolumes } from './ducks/actions/getVolumes';
import { createVolume } from './ducks/actions/createVolume';
import { updateVolume } from './ducks/actions/updateVolume';
import { deleteVolume } from './ducks/actions/deleteVolume';
import { publish } from './ducks/actions/publish';

import EditEnvVar from './components/EditEnvVar';
import CreateVolume from './components/CreateVolume';
import EditVolume from './components/EditVolume';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const styles = {
    subHeading: {
        marginTop: '20px',
    },
    buttonRow: {
        marginTop: '10px',
    },
};

class ProjectService extends React.Component {
    state = {
        editableEnvVar: null,
        editableVolume: null,
        editingEnvVar: false,
        creatingVolume: false,
        editingVolume: false,
    };

    componentDidMount() {
        this.props.getEnvVars({
            projectId: this.props.match.params.projectId,
            serviceId: this.props.match.params.id
        });
        this.props.getVolumes({
            projectId: this.props.match.params.projectId,
            serviceId: this.props.match.params.id
        });
    }

    render() {
        const { editingEnvVar, creatingVolume, editingVolume, editableEnvVar, editableVolume } = this.state;
        const { classes, envVars, volumes, deleteVolume, publish } = this.props;
        const projectId = this.props.match.params.projectId;
        const serviceId = this.props.match.params.id;

        return <>
            {editingEnvVar && 
                <EditEnvVar
                    projectId={projectId}
                    item={editableEnvVar}
                    open={editingEnvVar}
                    handleClose={() => this.setState({editingEnvVar: false})}
                />
            }
            {creatingVolume && 
                <CreateVolume
                    projectId={projectId}
                    serviceId={serviceId}
                    open={creatingVolume}
                    handleClose={() => this.setState({creatingVolume: false})}
                />
            }
            {editingVolume && 
                <EditVolume
                    projectId={projectId}
                    item={editableVolume}
                    open={editingVolume}
                    handleClose={() => this.setState({editingVolume: false})}
                />
            }

            <Container maxWidth="sm">
                <Typography component="h1" variant="h5" >Service settings</Typography>
                <div className={classes.buttonRow}>
                    <Button variant="outlined" size="small" onClick={() => this.props.publish({projectId: this.props.match.params.projectId, serviceId: this.props.match.params.id})}>Publish</Button>
                </div>

                <Typography variant="h6" className={classes.subHeading}>Environment variables</Typography>
                {envVars.isLoading ? <CircularProgress /> : envVars.data.length === 0 ? 'No one' : <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {envVars.data.map((envVar, i) => (
                                <TableRow key={i}>
                                    <TableCell>{envVar.var.name}</TableCell>
                                    <TableCell>{envVar.var.description}</TableCell>
                                    <TableCell>{envVar.value}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => this.setState({editingEnvVar: true, editableEnvVar: envVar})}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>}

                <Typography variant="h6" className={classes.subHeading}>Volumes</Typography>
                {volumes.isLoading ? <CircularProgress /> : volumes.data.length === 0 ? 'No one' : <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {volumes.data.map((volume, i) => (
                                <TableRow key={i}>
                                    <TableCell>{volume.local_path}</TableCell>
                                    <TableCell>{volume.container_path}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => this.setState({editingVolume: true, editableVolume: volume})}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => this.props.deleteVolume({id: volume.id, projectId: this.props.match.params.projectId, serviceId: this.props.match.params.id})}>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>}
                <div className={classes.buttonRow}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.setState({creatingVolume: true})}
                    >
                        Add volume
                    </Button>
                </div>

                {/* <Typography variant="h6" className={classes.subHeading}>Actions</Typography>
                <div className={classes.buttonRow}>
                    <Button variant="outlined" size="small">Publish</Button>
                </div> */}
            </Container>
        </>;
    }
}

const mapStateToProps = (state) => {
    return state.projectService;
};
const mapDispatchToProps = { getEnvVars, updateEnvVar, getVolumes, createVolume, updateVolume, deleteVolume, publish };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(ProjectService));
