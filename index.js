/**
 * @package		ui-prototype
 * @subpackage
 * @version		v.0.2
 * @author		PanosOA <p.hapsides@live.com>
 */


const config = {
	ports: {
		dev: {
			http: 1035,
			https: 1036
		},
		staging: {
			http: 80,
			https: 443
		}
	},
	app: {
		name: {
			package: 'UI Prototype',
			simple: 'CD UI Prototype',
			brand: 'Currencies Direct - UI Prototype for Whitelabel'
		},
		data: {
			user: {
				firstName: 'Alberto', //'Grace',
				lastName: 'Gonzales', //'Hopper', 
				id: 10007430
			},
			recipients: [
				{
					firstName: 'Captain',
					lastName: 'America',
					id: 12345670
				},
				{
					firstName: 'Harry',
					lastName: 'Potter',
					id: 12345670
				},
			]
		}
	}
};

const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const ejs = require('ejs');
const colors = require('colors');
const morgan = require('morgan');

if (process.env.NODE_ENV == 'heyday_studio_server') {
	const privateKey  = fs.readFileSync('/root/ssl/heyday.studio.key', 'utf8');
	const certificate = fs.readFileSync('/root/ssl/heyday-ssl-bundle.crt', 'utf8');
	const credentials = { key: privateKey, cert: certificate };
}

// Note: suseinstance has had port 443 open up, yay!
/*else if (process.env.NODE_ENV == 'cd_suse_instance') {
	const privateKey  = fs.readFileSync('/root/ssl/server.key', 'utf8');
	const certificate = fs.readFileSync('/root/ssl/server.crt', 'utf8');
	const credentials = { key: privateKey, cert: certificate };
}*/

const express = require('express');
const app = express();


/**
/**
 * Basic HTTP Authentication
 */
if (process.env.NODE_ENV == 'heyday_studio_server' || process.env.NODE_ENV == 'cd_suse_instance') {
	const auth = require('http-auth');
	const basic = auth.basic ({
		realm: 'CD Incubation - Prototype',
		}, (username, password, callback) => {
			callback((username === 'australasia' || username === 'australia') && password === 'CR7MrLrs2VqD');
		}
	);
	app.use(auth.connect(basic));
}



/**
 * Configuration
 */
app.use(cors());
app.use(methodOverride());


// Logging
app.use(morgan('dev'));


// Templating
app.engine('.html', require('ejs').__express)

app.locals.pretty = true

app.set('views', __dirname + '/views')
app.set('view engine', 'html')


// GET/POST data
app.use(bodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));
app.use('/resources/core/', express.static(__dirname + '/public'));




/**
 * Time Helper (move to controller)
 */

const moment = require('moment')
exports.index = function(req, res) {
	res.render('index', { moment: moment })
}




/**
 * Routes
 */




app.use(function(req, res, next) {
	res.locals.query = req.query
	res.locals.url = req.orginalUrl
	next()
})





// Robots
app.get('/robots.txt', function(req, res) {
	res.send('User-agent: *\nDisallow: /');
})



// Index
app.get('/', function(req, res) {
	res.render(
		'index', {
			app: config.app
		}
	)
})



// //
// Registration/KYC pages
// //
app.get('/whitelabel/registration/1/', function(req, res) {
	res.render(
		'pages/registration-screen-01', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/2/', function(req, res) {
	res.render(
		'pages/registration-screen-02', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/3/', function(req, res) {
	res.render(
		'pages/registration-screen-03', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/4/', function(req, res) {
	res.render(
		'pages/registration-screen-04', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/5/', function(req, res) {
	res.render(
		'pages/registration-screen-05', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/6/', function(req, res) {
	res.render(
		'pages/registration-screen-06', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/7/', function(req, res) {
	res.render(
		'pages/registration-screen-07', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/8/', function(req, res) {
	res.render(
		'pages/registration-screen-08', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/9/', function(req, res) {
	res.render(
		'pages/registration-screen-09', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/10/', function(req, res) {
	res.render(
		'pages/registration-screen-10', {
			app: config.app
		}
	)
})
app.get('/whitelabel/registration/11/', function(req, res) {
	res.render(
		'pages/registration-screen-11', {
			app: config.app
		}
	)
})

app.get('/whitelabel/registration/12/', function(req, res) {
	res.render(
		'pages/registration-screen-12', {
			app: config.app
		}
	)
})



// //
// Activation pages
// //
app.get('/whitelabel/account-activation/', function(req, res) { 
	res.render('pages/account-activation', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/account-activation-sent/', function(req, res) { 
	res.render('pages/account-activation-sent', { app: config.app, query: res.locals.query } ) 
})


// //
// Login/Reset pages
// //
app.get('/whitelabel/', function(req, res) { 
	res.render('pages/login', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/pin/', function(req, res) { 
	res.render('pages/pin', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/security-questions/', function(req, res) { 
	res.render('pages/security-questions', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/password/forgotten/', function(req, res) { 
	res.render('pages/password-forgotten', { app: config.app, query: res.locals.query } )	
})
app.get('/whitelabel/password/forgotten-check-email/', function(req, res) { 
	res.render('pages/password-forgotten-check-email', { app: config.app, query: res.locals.query } )	
})
app.get('/whitelabel/password-forgotten-security-questions/', function(req, res) { 
	res.render('pages/password-forgotten-security-questions', { app: config.app, query: res.locals.query } )	
})
app.get('/whitelabel/password/forgotten/update/', function(req, res) { 
	res.render('pages/password-forgotten-update', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/password/reset/', function(req, res) { 
	res.render('pages/password-reset', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/password/update/', function(req, res) { 
	res.render('pages/update', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/password/reset/pin/', function(req, res) { 
	res.render('pages/password-reset-pin', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/password/fivetries/', function(req, res) { 
	res.render('pages/password-fivetries', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/login-denied/', function(req, res) { 
	res.render('pages/login-denied', { app: config.app, query: res.locals.query } ) 
})



// //
// Dashboard pages
// //
app.get(
	'/whitelabel/dashboard/', 
	function(req, res, next) {
		//var clientId = req.query.client ? '?client=' + req.query.client : ''
		res.redirect('/whitelabel/dashboard/full-state/')
	}
)
app.get(
	'/whitelabel/dashboard/full-state/', 
	function(req, res, next) { 
		res.render('pages/dashboard-full-state', { app: config.app, query: res.locals.query } ) 
	}
)
app.get(
	'/whitelabel/dashboard/empty-state/', 
	function(req, res) { 
		res.render('pages/dashboard-empty-state', { app: config.app, query: res.locals.query } ) 
	}
)



// //
// Manage Recipients pages
// //
app.get('/whitelabel/recipients/manage/', function(req, res) {
	res.render('pages/recipients-manage', { app: config.app, query: res.locals.query } )
})
// Manage Recipients - Empty State
app.get('/whitelabel/recipients/manage-empty/', function(req, res) {
	res.render('pages/recipients-manage-empty', { app: config.app, query: res.locals.query } )
})
// Manage Recipients - View Edit
app.get('/whitelabel/recipients/manage/view-edit/', function(req, res) {
	res.render('pages/recipients-manage-view-edit', { app: config.app, query: res.locals.query } )
})
// Manage Recipients - View Edit - Bank Details - Please remove
app.get('/whitelabel/recipients/manage/view-edit/bank-details/', function(req, res) {
	res.render('pages/recipients-manage-view-edit-bank-details', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/recipients/manage/view-edit/additional-details/', function(req, res) {
	res.render('pages/recipients-manage-view-edit-additional-details', { app: config.app, query: res.locals.query } )
})
// Manage Recipients - Add
app.get('/whitelabel/recipients/manage/add/', function(req, res) {
	res.render('pages/recipients-manage-add', { app: config.app, query: res.locals.query } )
})
// Manage Recipients - Add Bank Details
app.get('/whitelabel/recipients/manage/add/bank-details/', function(req, res) {
	res.render('pages/recipients-manage-add-bank-details', { app: config.app, query: res.locals.query } )
})
// Manage Recipients - Add Additional Details
app.get('/whitelabel/recipients/manage/add/additional-details/', function(req, res) {
	res.render('pages/recipients-manage-add-additional-details', { app: config.app, query: res.locals.query } )
})

app.get('/whitelabel/recipients/manage/add-2/', function(req, res) {
	res.render('pages/recipients-manage-add-2', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/recipients/manage/add/bank-details-2/', function(req, res) {
	res.render('pages/recipients-manage-add-bank-details-2', { app: config.app, query: res.locals.query } )
})



/**
 * Rate Alerts pages
*/
app.get('/whitelabel/rate-alerts/management/empty/', function(req, res) {
	res.render('pages/rate-alerts-empty', { app: config.app, query: req.query } )
})
app.get('/whitelabel/rate-alerts/management/', function(req, res) {
	res.render('pages/rate-alerts-screen-01', { app: config.app, query: req.query } )
})
app.get('/whitelabel/rate-alerts/management/view-edit/', function(req, res) {
	res.render('pages/rate-alerts-view-edit', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/rate-alerts/management/new/', function(req, res) {
	res.render('pages/rate-alerts-new-alert', { app: config.app, query: res.locals.query } )
})



/**
 * Transactions/Transfers
 */
// Make Transfer
app.get('/whitelabel/transactions/make-transfer/0/', function(req, res) {
	res.render('pages/transactions-make-transfer-step-00', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/make-transfer/1/', function(req, res) {
	res.render('pages/transactions-make-transfer-step-01', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/make-transfer/2/', function(req, res) {
	res.render('pages/transactions-make-transfer-step-02', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/make-transfer/3/', function(req, res) {
	res.render('pages/transactions-make-transfer-step-03', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/make-transfer/4/', function(req, res) {
	res.render('pages/transactions-make-transfer-step-04', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/make-transfer/confirmation/', function(req, res) {
	res.render('pages/transactions-make-transfer-confirmation', { app: config.app, query: res.locals.query } )
})



/**
 * Buy Currency pages
*/
app.get('/whitelabel/transactions/buy-currency/1/', function(req, res) {
	res.render('pages/transactions-buy-currency-step-01', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/top-up-currency/', function(req, res) {
	res.render('pages/transactions-top-up-currency', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/buy-currency/2/', function(req, res) {
	res.render('pages/transactions-buy-currency-step-02', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/buy-currency/3/', function(req, res) {
	res.render('pages/transactions-buy-currency-step-03', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/buy-currency/3/', function(req, res) {
	res.render('pages/transactions-buy-currency-step-03', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/buy-currency/confirmation/', function(req, res) {
	res.render('pages/transactions-buy-currency-confirmation', { app: config.app, query: res.locals.query } )
})



/**
 * Transfer Pre-bought Currency 
*/ 
app.get('/whitelabel/transactions/currency/empty/', function(req, res) {
	res.render('pages/transfer-pre-bought-currency-screen-0', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pre-bought-currency/1/', function(req, res) {
	res.render('pages/transfer-pre-bought-currency-screen-01', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pre-bought-currency/2/', function(req, res) {
	res.render('pages/transfer-pre-bought-currency-screen-02', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pre-bought-currency/3/', function(req, res) {
	res.render('pages/transfer-pre-bought-currency-screen-03', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pre-bought-currency/confirmation/', function(req, res) {
	res.render('pages/transfer-pre-bought-currency-screen-confirmation', { app: config.app, query: res.locals.query } )
})


app.get('/whitelabel/dashboard-transfer-currency-screen/1/', function(req, res) {
	res.render('pages/dashboard-transfer-currency-screen-01', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/dashboard-transfer-currency-screen/2/', function(req, res) {
	res.render('pages/dashboard-transfer-currency-screen-02', { app: config.app, query: res.locals.query } )
})


/**
 * Pay Offline Contract
*/
app.get('/whitelabel/transactions/pay-contract/0/', function(req, res) {
	res.render('pages/pay-contract-screen-0', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pay-contract/1/', function(req, res) {
	res.render('pages/pay-contract-screen-01', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pay-contract/2/', function(req, res) {
	res.render('pages/pay-contract-screen-02', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pay-contract/3/', function(req, res) {
	res.render('pages/pay-contract-screen-03', { app: config.app, query: res.locals.query } )
})
app.get('/whitelabel/transactions/pay-contract/confirmation/', function(req, res) {
	res.render('pages/pay-contract-screen-confirmation', { app: config.app, query: res.locals.query } )
})



/**
 * Profile Management pages
*/
app.get('/whitelabel/profile/check-login/', function(req, res) {
	res.render('pages/profile', { app: config.app, query: res.locals.query } ) 
})
app.get('/whitelabel/profile/', function(req, res) {
	res.render('pages/profile-page-container', { app: config.app, query: res.locals.query } )
})



/**
 * Legal Pages
*/
// Terms and Conditions
app.get('/CustomerPortal/termsAndCondition.htm', function(req, res) {
	res.render('pages/terms-and-conditions', { app: config.app, query: res.locals.query } )
})
// Privacy policy
app.get('/CustomerPortal/privacyPolicy.htm', function(req, res) {
	res.render('pages/privacy-policy', { app: config.app, query: res.locals.query } )
})
// Cookies
app.get('/CustomerPortal/cookies.htm', function(req, res) {
	res.render('pages/cookies', { app: config.app, query: res.locals.query } )
})
// Regulatory information
app.get('/CustomerPortal/regulatoryInformation.htm', function(req, res) {
	res.render('pages/regulatory-information', { app: config.app, query: res.locals.query } )
})



/**
 * Help pages
*/
// FAQ
app.get('/whitelabel/faq/', function(req, res) {
	res.render('pages/faq', { app: config.app, query: res.locals.query } )
})
// Help
app.get('/whitelabel/help/', function(req, res) {
	res.render('pages/help', { app: config.app, query: res.locals.query } )
})



// //
// Activity History
// //
app.get('/whitelabel/activity-history/', function(req, res) {
	res.render('pages/activity-history', { app: config.app, query: res.locals.query } )
})



/** 
 * Miscellaneous
*/
// Refer and Earn
app.get('/whitelabel/refer-and-earn/', function(req, res) {
	res.render('pages/refer-and-earn', { app: config.app, query: res.locals.query } )
})

app.get('/whitelabel/down/', function(req, res) {
	res.render('pages/down', { app: config.app, query: res.locals.query } )
})




app.get('/whitelabel/profile/account-details/new-card/', function(req, res) {
	res.render('pages/profile-add-new-card', { app: config.app, query: res.locals.query } ) 
})












// Index
app.get('/developers/', function(req, res) {
	res.render(
		'index-developers', {
			app: config.app
		}
	)
})






/**
 * Library
 */

app.get('/library/', function(req, res) {
	res.render(
		'library/index', {
			app: config.app
		}
	);
})

app.get('/library/live-code-editor', function(req, res) {
	res.render(
		'library/live-code-editor', {
			app: config.app
		}
	);
})





/**
 * Debug - Because it's allowed
 */
app.get('/debug/000/', function(req, res) {
	res.render(
		'pages/000-template-test-000', {
			app: config.app
		}
	)
})










/**
 * Lab
 */
app.get('/lab/testingtesting123/', function(req, res) { res.render('lab/testing', { app: config.app, query: res.locals.query } ) })
app.get('/lab/form/', function(req, res) { res.render('lab/form', { app: config.app, query: res.locals.query } ) })








/**
 * Force users to visit "staging" via HTTPS
 */
if (process.env.NODE_ENV == 'heyday_studio_server') {
	// HTTPS version (Hey Day)
	var httpsServer = https.createServer(credentials, app)
	httpsServer.listen(config.ports.dev.https)
}
else if (process.env.NODE_ENV == 'cd_suse_instance') {
	// Currencies Direct AWS SUSE Instance
	var httpServer = http.createServer(app)
	httpServer.listen(config.ports.staging.http)
}
else {
	var httpServer = http.createServer(app)
	httpServer.listen(config.ports.dev.http)
}