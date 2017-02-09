const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

class Trends extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // }
  }


  render() {
  	var snippet = 'ht:news_item';
  	console.log('props under render', this.props.search)
  	return(
  		<div>

  			{this.props.search.map((x) => {
  				return(
  					<div>
  						 <a href = {x['ht:news_item'][0]['ht:news_item_url'][0]} >
  						 	<img src= {x['ht:picture'][0]}  />
  						 <h5>{ x['ht:news_item'][0]['ht:news_item_title'][0]} </h5>
  						 </a>
  					</div>
					)
  			})}

  		</div>
  	)
  }
}

 module.exports = Trends;