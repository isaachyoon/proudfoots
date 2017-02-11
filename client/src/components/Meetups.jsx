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

    const photoDivStyle = {
      width: '130px',
      float: 'left',
      'marginRight': '10px',
      'marginBottom': '10px'
    };

    const meetupItemDivs = {
      'overflowWrap': 'break-word',
      'wordWrap': 'break-word'
    };

    const radiusSelectStyle = {
      display: 'inline-block',
      float: 'right',
      marginRight: '15px',
    };

    const radiusNumbers = {
      color: 'white'
    };

    // const activeRadiusNumber = {
    //   color: 'grey'
    // };



    return (
      <div className="panel panel-default topMargin">
        <div className="panel-heading red">
          <h3 className="panel-title">
            Your Local Political and 'Movement' Meetups:
            <div style={radiusSelectStyle}>
              Search Radius (miles from home):
              <span onClick={this.fetchMeetups.bind(this, 1)} style={radiusNumbers}> 1</span>
              <span onClick={this.fetchMeetups.bind(this, 5)} style={radiusNumbers}> 5</span>
              <span onClick={this.fetchMeetups.bind(this, 10)} style={radiusNumbers}> 10</span>
              <span onClick={this.fetchMeetups.bind(this, 25)} style={radiusNumbers}> 25</span>
            </div>
          </h3>
        </div>

        <div className="panel-body topMargin">
          {this.state.localMeetups.map((meetup, index) => {
            // console.log('meetup', meetup);
            return (
              <div className="panel panel-default" key={meetup.id} >
                <div className="panel-heading" data-toggle="collapse" data-target={'#' + meetup.id}>
                  <h3 className="panel-title">{meetup.name}</h3>
                </div>

                <div id={meetup.id} className="collapse">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><a href={meetup.link} target="_blank">{meetup.link}</a></td>
                      </tr>
                      <tr>
                        <td>
                          {meetup.photos &&
                            <div style={photoDivStyle}>
                              <img style={{width: '100%', height: 'auto'}} src={meetup.photos[0].photo_link} />
                            </div>
                          }
                          <div style={meetupItemDivs}
                            dangerouslySetInnerHTML={this.createMarkup(meetup.description)}>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchMeetups(1);
  }

  fetchMeetups(searchRadius) {

    function onFetchMeetupsComplete(data, textStatus, jqXHR) {
      this.setState({
        localMeetups: data.body
      });
    }

    $.get('/getMeetups', {searchRadius: searchRadius}, onFetchMeetupsComplete.bind(this));
  }
}

module.exports = Meetups;
