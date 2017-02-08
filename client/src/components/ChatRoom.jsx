const React = require('react');

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'GOOD MORNING!!'
    };

    this.messageHandler = this.messageHandler.bind(this);
  }

  messageHandler (event) {
    event.preventDefault();
    this.setState({
      message: event.target.value
    });
    console.log(this.state.message)
  }

  render() {
    console.log(this.props.username)
    return(
      <div className="container-fluid">
      <h3>Chat Room</h3>
        <ul id="messages"></ul>
          <form action="">
            <label>Discuss your thoughts:</label><br />
              <span className="input-group">
                <input id="message" className="form-control" type="text" placeholder="Enter Message" onChange={this.messageHandler} autoComplete="off" />
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



