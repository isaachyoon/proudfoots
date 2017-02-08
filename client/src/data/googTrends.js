
var googleTrends = require('google-trends-api');

var queryGoogle = (query, callback) => {
	console.log('entered queryGoogle function');

	var params = {
		geo: 'US',
		// date:
		keywords: query,
		category: 'politics'
	}

	googleTrends.hotTrendsDetail(options)
	.then(function(result){
		console.log(result);
		callback(result);
	}).catch(function(err){
		console.log('error detected', err);
	})
}

export default queryGoogle;