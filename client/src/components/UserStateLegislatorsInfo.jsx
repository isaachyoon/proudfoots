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
    // this.getHouseRepInfo = this.getHouseRepInfo.bind(this);
    this.getSenatorsInfo = this.getSenatorsInfo.bind(this);
    // this.fetchLegislatorDataFromExternalSources = this.fetchLegislatorDataFromExternalSources.bind(this);
  }


  render() {
    let isFechingData = this.state.isFechingData;

    console.log('this.getSenatorsInfo()', this.getSenatorsInfo());
    return (
      <div>
      {(this.state.isFetchingElectoralData) &&
        <p>Fetching Data</p>
      }

      {!this.state.isFetchingElectoralData &&
        <UserStateLegislatorsInfoPresentational
          // electoralInfo={this.getElectoralInfo()}
          // houseRepInfo={this.getHouseRepInfo()}
          senatorsInfo={this.getSenatorsInfo()}
        />
      }
      </div>
    );
  }
  componentDidMount() {

    // Initiate AJAX calls to Sunlight server for legislator and district info
    // based on user supplied lat and long information
    // this.setState({
    //   // isFetchingRepData: true,
    //   isFetchingElectoralData: true
    // });

    // this.fetchLegislatorDataFromExternalSources();
    this.fetchElectoralDataFromExternalSources();
  }

  // Retrieves the User's representatives' information

  // fetchLegislatorDataFromExternalSources() {
    // let queryParameters = {
    //   lat: this.props.userLat,
    //   long: this.props.userLong
    // };

    // TEST DATA
    // userLocation: {
    //   lat: 37.795,
    //   long: -122.40
    // }

    // state legislator info:
    // http://docs.openstates.org/en/latest/api/

    // All API calls are URLs in the form https://openstates.org/api/v1/METHOD/

    // Geo Lookup
    // Lookup all legislators serving districts containing a given location.

    // Example: openstates.org/api/v1/legislators/geo/?lat=35.79&long=-78.78

    // openstates.org/api/v1/legislators/geo/?lat=37.795&long=-122.40


    // $.get('https://openstates.org/api/v1/legislators/geo', queryParameters, onLegislatorInfoFetchComplete.bind(this), 'jsonp');

    // function onLegislatorInfoFetchComplete(data, textStatus, jqXHR) {
    //   this.setState({
    //     electoralRepresentativesInfo: data.results,
    //     isFetchingRepData: false});
    // }
  // }

  // Retrieves the electrol information (Congressional District & State) for the user
  fetchElectoralDataFromExternalSources() {
    let queryParameters = {
      lat: this.props.userLat,
      long: this.props.userLong
    };

    $.get('https://openstates.org/api/v1/legislators/geo', queryParameters, onElectoralInfoFetchComplete.bind(this), 'jsonp');

    function onElectoralInfoFetchComplete(data, textStatus, jqXHR) {
      // console.log('data from onElectoralInfoFetchComplete here', data);
      // console.log('this.state', this.state);

      this.setState({
        electoralRepresentativesInfo: data,
        isFetchingElectoralData: false});
      // console.log(this.state.electoralInfo);
      // console.log('this.state', this.state);
    }
  }

  // Format the Congressional Data from the Sunlight server to a more readable format
  // getElectoralInfo() {


  //   let readableElectoralInfo = {};

  //   // Assign values from electoralInfo as default to the readableElectoralInfo
  //   readableElectoralInfo.state = this.state.electoralInfo.state;
  //   readableElectoralInfo.districtName = this.state.electoralInfo.districtName + '';

  //   // Use the State name from the House Rep instead of 2 letter symbol
  //   if (this.getHouseRepInfo() !== undefined) {
  //     readableElectoralInfo.state = this.getHouseRepInfo().state_name;
  //   }

  //   // Handle case where the state is a district 'At-large'
  //   // TODO: We need to better handle the suffix to the district number (ie. 2nd, 3rd, 21st, etc)
  //   if (this.state.electoralInfo.district === 0) {
  //     readableElectoralInfo.districtName = 'At-Large Congressional District';
  //   } else {
  //     readableElectoralInfo.districtName = this.state.electoralInfo.district + 'th Congressional District';
  //   }

  //   return readableElectoralInfo;
  // }

  // getHouseRepInfo() {
  //   // note that there is only ever one House Rep for a particular Congressional District
  //   return this.state.electoralRepresentativesInfo.filter(isHouseRep)[0];

  //   function isHouseRep(legislatorInfo) {
  //     return (legislatorInfo.chamber === 'house');
  //   }
  // }

  getSenatorsInfo() {
    // console.log('this.state.electoralRepresentativesInfo', this.state.electoralRepresentativesInfo);

    // Rep Nancy Pelosi (D)
    // Office Address: 233 Cannon House Office Building , Washington, DC 20515
    // Phone:  202-225-4965
    // Website:  http://pelosi.house.gov
    // Facebook ID:  86574174383
    // Twitter:  NancyPelosi
    // Youtube:  nancypelosi

    // return this.state.electoralRepresentativesInfo.filter(isSenator);
    return this.state.electoralRepresentativesInfo;

    // function isSenator(legislatorInfo) {
    //   return (legislatorInfo.chamber === 'senate');
    // }

  }
}

// Temporary Default Props for Testing
// UserStateLegislatorsInfo.defaultProps = {
//   userLat: 37.795,
//   userLong: -122.40
// };

// {this.props.senatorsInfo.map((senatorInfo) => {
//   return (
//     <StateLegislatorInfo info={senatorInfo} />
//   );
// })}




class UserStateLegislatorsInfoPresentational extends React.Component {
  render() {
    console.log('this.props.senatorsInfo', this.props.senatorsInfo);
    return (
      <div className="panel panel-default">
        <div className="panel-body">
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