const React = require('react');

// meetup api notes:

// https://api.meetup.com/2/categories

// {
// "name": "Movements & Politics",
// "sort_name": "Movements & Politics",
// "id": 13,
// "shortname": "Movements"
// },

// https://api.meetup.com1/find/groups2?zip=11211&radius=1&category=253&order=members4

class Meetups extends React.Component {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      localMeetups: []
    };

    this.render = this.render.bind(this);
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  render() {
    // console.log(this.state.localMeetups);
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h3>Meetups</h3>
          {this.state.localMeetups.map((meetup, index) => {
            console.log('meetup', meetup);
            return <div dangerouslySetInnerHTML={this.createMarkup(meetup.description)} />;
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchMeetups();
  }

  fetchMeetups() {

    // let queryParameters = {
    //   // lat: this.props.userLat,
    //   // long: this.props.userLong
    //   format: 'json',
    //   'photo-host': 'public',
    //   zip: 94103,
    //   page: 20,
    //   'sig_id': 159286762,
    //   radius: 1,
    //   category: 13,
    //   sig: '1c6ac121a3988a353b1ebde57690c514209b0604'
    // };

    // signed url
    // probably won't work bc meetups cors implementation uses Oauth, so this is a note
    // https://api.meetup.com/find/groups?format=json&photo-host=public&zip=94103&page=20&sig_id=159286762&radius=1&category=13&sig=1c6ac121a3988a353b1ebde57690c514209b0604
    // $.get('https://api.meetup.com/find/groups', queryParameters, onFetchMeetupsComplete.bind(this));
    // $.get('https://api.meetup.com1/find/groups2?zip=11211&radius=1&category=253&order=members4', onFetchMeetupsComplete.bind(this));

    // we ping our express server and get it to make the api call
    // avoids cors complexity
    $.get('/getMeetups', onFetchMeetupsComplete.bind(this));

    function onFetchMeetupsComplete(data, textStatus, jqXHR) {

      this.setState({
        localMeetups: data.body
      });
    }
  }
}

module.exports = Meetups;
