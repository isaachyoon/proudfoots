const React = require('react');
const io = require('socket.io-client')

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: ''
    };

    // this.messageHandler = this.messageHandler.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  // messageHandler (event) {
  //   this.setState({
  //     message: event.target.value
  //   });
  //   console.log(this.state.message)
  // }

  componentWillMount() {
    this.socket = io('/');
    this.socket.on('message', function(message) {
      this.setState({
        messages: [message, ...this.state.messages]
      });
    })
  }

  handleEnter (event) {
    event.preventDefault()
    const body = event.target.value;
    const user = this.props.username;
    if (event.keyCode === 13) {
      const message = {
        body,
        user
      }

      this.setState({
        messages: [message, ...this.state.messages]
      });
      console.log('enter pressed')
    event.target.value = '';
    }
    console.log(this.state.message)
  }

  render() {
    //console.log(this.props.username)
    return(
      <div className="container-fluid">
      <h3>Chat Room</h3>
        <ul id="messages">
          {this.state.messages.map((message, index) => {
            return <li key={index}>
              <b>{message.user}: </b>
              {message.body}
            </li>
          })}
        </ul>
          <form className="fixed-bottom" action="">
            <label>Discuss your thoughts:</label><br />
              <span className="input-group">
                <input id="message" className="form-control" type="text" placeholder="Enter Message" onKeyUp={this.handleEnter} autoComplete="off" />
                  <span className="input-group-btn">
                  <button type="submit" className="btn btn-default">Send</button>
                  </span>
              </span>
          </form>
      </div>
    );
  }

}

module.exports = ChatRoom;



