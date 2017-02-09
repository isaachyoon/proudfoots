////////////////////////////////////////////////////////////////////////////////
// UserStateLegislatorsInfo.jsx
// --------------------------
//
// BASED ON:
//
// This is the "Legislation Side Panel" component that include the user's
// congress and senate representatives based on their location (lat/long)
// information.
//
// It is responsible for the AJAX call to the Sunlight API to retrieve the
// relevant legislator information.
//
// BECOMES:
// the state equivalent, based on calls to sunlight api
// other project at: openstates.org
////////////////////////////////////////////////////////////////////////////////

const React = require('react');

const StateLegislatorInfo = require('./StateLegislatorInfo.jsx');

class UserStateLegislatorsInfo extends React.Component {
  constructor(props) {
    super(props);

    // Default State
    this.state = {
      isFetchingElectoralData: true,
      electoralRepresentativesInfo: undefined,
      electoralInfo: undefined
    };

    this.render = this.render.bind(this);
  }


  render() {
    let isFechingData = this.state.isFechingData;

    return (
      <div>
      {(this.state.isFetchingElectoralData) &&
        <p>Fetching Data</p>
      }

      {!this.state.isFetchingElectoralData &&
        <UserStateLegislatorsInfoPresentational
          senatorsInfo={this.state.electoralRepresentativesInfo}
        />
      }
      </div>
    );
  }
  componentDidMount() {

    // do we need this?

    // this.setState({
    //   isFetchingElectoralData: true
    // });

    this.fetchElectoralDataFromExternalSources();
    this.fetchGovernorInfoFromWikipedia();
  }

    // TEST DATA
    // userLocation: {
    //   lat: 37.795,
    //   long: -122.40
    // }


  fetchElectoralDataFromExternalSources() {
    let queryParameters = {
      lat: this.props.userLat,
      long: this.props.userLong
    };

    $.get('https://openstates.org/api/v1/legislators/geo', queryParameters, onElectoralInfoFetchComplete.bind(this), 'jsonp');

    function onElectoralInfoFetchComplete(data, textStatus, jqXHR) {

      this.setState({
        electoralRepresentativesInfo: data,
        isFetchingElectoralData: false});
    }
  }

  fetchGovernorInfoFromWikipedia() {
    $.get('https://en.wikipedia.org/w/api.php?action=query&titles=List%20of%20current%20United%20States%20governors&prop=revisions&rvprop=content&origin=*&format=json', onFetchGovernorInfoFromWikipediaComplete.bind(this), 'json');

    function onFetchGovernorInfoFromWikipediaComplete(data, textStatus, jqXHR) {
      console.log(data.query.pages[653038].revisions[0]['*']);

      // this.setState({
      //   electoralRepresentativesInfo: data,
      //   isFetchingElectoralData: false});
    }
  }
}

// Temporary Default Props for Testing
// UserStateLegislatorsInfo.defaultProps = {
//   userLat: 37.795,
//   userLong: -122.40
// };

class UserStateLegislatorsInfoPresentational extends React.Component {
  render() {
    return (
        <div className="panel panel-default topMargin">
        <div className="panel-heading red">
          <h3 className="panel-title">Your Local Representatives:</h3>
        </div>
        <div className = "panel-body reduceTop">
          <h3>State Legislators</h3>
          {this.props.senatorsInfo.map((senatorInfo, index) => {
            return (
              <StateLegislatorInfo key={index} info={senatorInfo} />
            );
          })}
        </div>
      </div>
    );
  }
}

module.exports = UserStateLegislatorsInfo;