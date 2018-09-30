//external imports
import React from 'react';
import GoogleLogin from 'react-google-login';
var superagent = require('superagent'),
  request = superagent;
//material UI imports
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

//react component with information in state
class Gmail2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '', idToken: '', profileId: '', unread: '...' };
    this.emails = this.emails.bind(this);
  }

  emails() {
    request
      //get request for the gmail labels endpoint
      .get(`https://www.googleapis.com/gmail/v1/users/me/labels/UNREAD`)
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        this.setState({ unread: res.body.messagesUnread });
      })
      .catch();
  }

  render() {
    //logging the response and setting it in state
    const responseGoogle = response => {
      this.setState({
        token: response.accessToken,
        idToken: response.tokenId,
        profileId: response.profileObj.googleId
      });
    };
    const { classes } = this.props;

    //google button
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Unread Emails: {this.state.unread}
          </Typography>
          <GoogleLogin
            style={{
              variant: 'contained',
              size: 'large',
              color: 'primary'
            }}
            clientId="693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            scope="https://www.googleapis.com/auth/gmail.labels"
          />

          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.emails}
            >
              Check Email
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.emails}
            >
              Check Email
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

Gmail2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gmail2);
