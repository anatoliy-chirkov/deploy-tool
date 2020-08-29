import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProjects } from './ducks/actions/getProjects';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CreateProject from "./CreateProject";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';

const styles = {
    heading: {
        marginBottom: '20px',
    },
    actions: {
        marginTop: '20px',
    }
};

class Projects extends React.Component {
    state = {
        creatingProject: false,
    };

    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        const { creatingProject } = this.state;
        const { classes, projects, isLoading } = this.props;

        return <>
            <CreateProject open={creatingProject} handleClose={() => this.setState({creatingProject: false})} />
            <Container maxWidth="sm">
                <Typography component="h1" variant="h5" className={classes.heading}>Projects</Typography>
                {isLoading ? <CircularProgress /> : 
                    <>
                    {projects.length > 0 ? 
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                {projects.map((project, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">{project.name}</TableCell>
                                        <TableCell>{project.status}</TableCell>
                                        <TableCell align="right">
                                            <Link to={'/projects/' + project.id}>
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
                                onClick={() => this.setState({creatingProject: true})}
                            >
                                New
                            </Button>
                        </div>
                    </>
                }
            </Container>
        </>;
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.projects.data,
        isLoading: state.projects.isLoading,
    };
};
const mapDispatchToProps = { getProjects };
const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(withStyles(styles)(Projects));
