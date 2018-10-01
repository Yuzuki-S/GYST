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
  },
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    overflow: 'auto'
  }
});

//react component with information in state
class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
      idToken: '',
      profileId: '',
      unread: 'Please login',
      buttonVisible: true,
      msgList: '',
      individualMsg: false
    };
    this.events = this.events.bind(this);
    // this.seeEmails = this.seeEmails.bind(this);
    // this.getMessage = this.getMessage.bind(this);
  }

  //   seeEmails() {
  //     request
  //       //get request for the gmail labels endpoint
  //       .get(
  //         `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10`
  //       )
  //       .set('Authorization', `Bearer ${this.state.token}`)
  //       .then(res => {
  //         return res.body.messages.map(msg => msg.id);
  //       })
  //       .then(messageIds => {
  //         return Promise.all(
  //           messageIds.map(messageId => {
  //             return request
  //               .get(
  //                 `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`
  //               )
  //               .set('Authorization', `Bearer ${this.state.token}`)
  //               .then(res => {
  //                 return res.body;
  //               });
  //           })
  //         );
  //       })
  //       .then(allMessages => {
  //         this.setState({
  //           msgList: allMessages
  //         });
  //       });
  //   }

  events() {
    let date = new Date().toISOString();

    request
      //get request for the gmail labels endpoint
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${
          this.state.email
        }/events?maxResults=10&timeMin=${date}
      `
      )
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        console.log(res);

        this.setState({ calItems: res.body.items });
      });
  }

  //   getMessage(msg) {
  //     request
  //       //get request for the gmail labels endpoint
  //       .get(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg}`)
  //       .set('Authorization', `Bearer ${this.state.token}`)
  //       .then(res => {
  //         this.setState({
  //           individualMsgRes: res.body.snippet,
  //           individualMsg: true
  //         });
  //       })
  //       .catch();
  //   }

  render() {
    //logging the response and setting it in state
    const responseGoogle = response => {
      console.log(response);

      this.setState({
        email: response.profileObj.email,
        token: response.accessToken,
        idToken: response.tokenId,
        profileId: response.profileObj.googleId,
        buttonVisible: false,
        unread: 'Logged in'
      });
    };
    const { classes } = this.props;

    //google button
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {/* Unread Emails: {this.state.unread} */}
          </Typography>
          <Typography>
            {this.state.calItems && this.state.calItems.map(event => {})}
            {/* {this.state.msgList &&
              !this.state.individualMsg && (
                <ol>
                  {this.state.msgList.map(msg => {
                    return (
                      <li key={msg.id}>
                        <a
                          target="_blank"
                          href={`https://mail.google.com/mail/u/0/#inbox/${
                            msg.id
                          }`}
                        >
                          {msg.snippet}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              )}
            {this.state.individualMsg && <p>{this.state.individualMsgRes}</p>} */}
          </Typography>
          {this.state.buttonVisible && (
            <GoogleLogin
              clientId="693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com"
              redirectUri="http://gyst-dash.herokuapp.com"
              buttonText="Google Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              scope="https://www.googleapis.com/auth/calendar.readonly"
            />
          )}
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.events}
            >
              Check Events
            </Button>
            {/* <Button
              onClick={this.seeEmails}
              variant="contained"
              size="large"
              color="primary"
            >
              Inbox
            </Button> */}
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventList);
