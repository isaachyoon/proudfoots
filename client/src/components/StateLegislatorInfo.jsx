////////////////////////////////////////////////////////////////////////////////
// StateLegislatorInfo.jsx
// --------------------------
// This is the reusable component for display a particular legislator's info.
//
////////////////////////////////////////////////////////////////////////////////

const React = require('react');

class StateLegislatorInfo extends React.Component {
  constructor(props) {
    super(props);
  }


  // national level info output

  // Rep Nancy Pelosi (D)
  // Office Address: 233 Cannon House Office Building , Washington, DC 20515
  // Phone:  202-225-4965
  // Website:  http://pelosi.house.gov
  // Facebook ID:  86574174383
  // Twitter:  NancyPelosi
  // Youtube:  nancypelosi

  // state info available
  // too much to list, console log it again


  render() {
    return (
      <StateLegislatorInfoPresentational info={this.props.info}
      />
    );
  }
}

class StateLegislatorInfoPresentational extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let info = this.props.info;
    return (
      <div className="panel panel-default" >
        <div className="panel-heading">
          <h3 className="panel-title">{info.full_name}</h3>
        </div>

        <table className="table">
          <tbody>


            {info.fax &&
              <tr>
                <td>Fax:</td>
                <td>{info.fax}</td>
              </tr>
            }
            {info.email &&
              <tr>
                <td>Email:</td>
                <td><a href={'mailto:' + info.oc_email}>{info.oc_email}</a></td>
              </tr>
            }
            {info.url &&
            <tr>
              <td>Website:</td>
              <td><a href={info.website} target="_blank">{info.website}</a></td>
            </tr>
            }
            {info.contact_form &&
              <tr>
                <td>Contact Form:</td>
                <td><a href={info.contact_form} target="_blank">Link</a></td>
              </tr>
            }
            {info.facebook_id &&
              <tr>
                <td>Facebook ID:</td>
                <td><a href={'http://facebook.com/' + info.facebook_id} target="_blank">{info.facebook_id}</a></td>
              </tr>
            }
            {info.twitter_id &&
              <tr>
                <td>Twitter:</td>
                <td><a href={'http://twitter.com/' + info.twitter_id} target="_blank">{info.twitter_id}</a></td>
              </tr>
            }
            {info.youtube_id &&
              <tr>
                <td>Youtube:</td>
                <td><a href={'http://youtube.com/' + info.youtube_id} target="_blank">{info.youtube_id}</a></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = StateLegislatorInfo;