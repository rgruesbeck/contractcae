var s3site = require('s3-website');

makesite(process.argv[2], process.argv[3]);

function makesite(domain_name, bucket_region) {
    var site = {
	domain: domain_name,
	region: bucket_region,
	index: 'index.html',
	error: '404.html'
    };
    var wwwsite = {
	domain: 'www.' + domain_name,
	region: bucket_region,
	redirectall: bucket_region
    };

    [site, wwwsite].forEach(function(ws) {
	s3site(ws, function(err, website) {
	    if (err) throw err;
	    console.log(website);
	});
    });
}