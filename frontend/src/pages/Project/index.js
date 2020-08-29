import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProject } from './ducks/actions/getProject';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import AddService from "./AddService";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    heading: {
        marginBottom: '20px',
    },
    actions: {
        marginTop: '20px',
    }
};

class Project extends React.Component {
    state = {
        creatingService: false,
    };

    componentDidMount() {
        this.props.getProject({id: this.props.match.params.id});
    }

    render() {
        const { creatingService } = this.state;
        const { classes, project, isLoading } = this.props;

        return <>
            {creatingService && <AddService projectId={this.props.match.params.id} open={creatingService} handleClose={() => this.setState({creatingService: false})} />}
            <Container maxWidth="sm">
                {isLoading ? <CircularProgress /> : <>
                    <Typography component="h1" variant="h5">{project.name}</Typography>
                    <Typography variant="body2" className={classes.heading}>{project.status}</Typography>
                    <Typography variant="h6" className={classes.heading}>Services</Typography>
                    {project.services.length > 0 ? 
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                            {project.services.map((service, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        <div>{service.service.name}</div>
                                        <Typography variant="caption">{service.key}</Typography>
                                    </TableCell>
                                    <TableCell>{service.status}</TableCell>
                                    <TableCell>{service.has_unapplied_changes}</TableCell>
                                    <TableCell align="right">
                                        <Link to={'/projects/' + project.id + '/services/' + service.id}>
                                            <IconButton color="primary">
                                                <TuneIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : 'No one'}
                    <div className={classes.actions}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.setState({creatingService: true})}
                        >
                            Add service
                        </Button>
                    </div>
                </>}
            </Container>
        </>;
    }
}

const mapStateToProps = (state) => {
    return state.project;
};
const mapDispatchToProps = { getProject };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(Project));
