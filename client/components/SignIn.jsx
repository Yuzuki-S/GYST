import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/login';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit
  },
  input: {
    marginBottom: '30px'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      classes: this.props.classes
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username: username.trim(),
      password: password.trim()
    };
    this.props.loginUser(creds);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={this.state.classes.layout}>
          <Paper className={this.state.classes.paper}>
            <Avatar className={this.state.classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <p style={{ color: 'red' }}>{this.props.state.errorMessage}</p>
            <ValidatorForm
              onSubmit={this.handleClick}
              name="Login"
              action="/api/v1/auth/login"
              method="POST"
              className={this.state.classes.form}
            >
              <InputLabel htmlFor="username">User name</InputLabel>
              <TextValidator
                autoFocus={true}
                className={this.state.classes.input}
                fullWidth
                onChange={this.handleChange}
                id="username"
                name="username"
                value={this.state.username || ''}
                validators={['required']}
                errorMessages={['this field is required']}
              />
              <InputLabel htmlFor="password">Password</InputLabel>
              <TextValidator
                validators={['required', 'matchRegexp:^([A-Za-z0-9]){4,20}$']}
                fullWidth
                errorMessages={[
                  'this field is required',
                  'minimum 4 characters - no special characters'
                ]}
                onChange={this.handleChange}
                name="password"
                type="password"
                id="password"
                value={this.state.password || ''}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={this.state.classes.submit}
              >
                Sign in
              </Button>
            </ValidatorForm>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              onClick={this.props.toggleRegister}
              className={this.state.classes.submit}
            >
              Register
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: creds => {
      return dispatch(loginUser(creds));
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignIn)
);
