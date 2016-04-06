var waterfall = require('async-waterfall');
var s3site = require('s3-website');

var domain_name = process.argv[2];

waterfall([
    function(cb){
      s3site({
	domain: domain_name,
	region: 'us-west-2',
	index: 'index.html',
	error: 'error.html'
      }, function(err, website) {
	  if (err) cb(err);
	  console.log(website);
	  cb(null, website); 
      });
    },
    function(err, cb) {
      s3site({
	domain: 'www.' + domain_name,
	region: 'us-west-2',
	redirectall: domain_name
      }, function(err, website) {
	  if (err) cb(err);
	  cb(null, website); 
      });
    }
  ], function(err, result){
    if (err) throw err;
    console.log(result);
});