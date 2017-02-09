
var googleTrends = require('google-trends-api');

var queryGoogle = (query, callback) => {
	console.log('entered queryGoogle function');

	var params = {
		geo: 'US',
		// date:
		keywords: ['politics','trump', query],
		category: 'politics'
	}

	googleTrends.hotTrendsDetail(params)
	.then(function(result){
		callback(result.rss.channel[0].item);
		// console.log(result.rss.channel[0].item);
		// callback(result);
	}).catch(function(err){
		console.log('error detected', err);
	})

}

export default queryGoogle;