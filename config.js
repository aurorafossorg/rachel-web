var requirejs = ({
	shim: {
		'underscore': {exports: '_'},
		'jquery.ui': {deps: ['jquery'],exports: 'jQuery'},
		'jquery.scrollto': {deps: ['jquery'],exports: 'jQuery'}
	},
	paths: {
		'jquery': 'https://static.aurorafoss.org/aurorafoss/pub/web/jquery/1.8.2/js/jquery.min',
		'jquery.ui': 'https://static.aurorafoss.org/aurorafoss/pub/web/jqueryui/1.8.23/js/jquery-ui.min',
		'jquery.scrollto': 'lib/jquery/jquery.scrollTo.min',
		'underscore': 'https://static.aurorafoss.org/aurorafoss/pub/web/underscore.js/1.4.1/js/underscore-min',
		'knockout':'https://static.aurorafoss.org/aurorafoss/pub/web/knockout/2.1.0/js/knockout-min',

		'text': 'lib/require/text',
		'domready': 'lib/require/domready'
	},
	config:{
		'rwp':{
			playback:{
				'youtube':'(youtube.com|youtu.be)',
				'soundcloud':'^http(s)?\:\/\/soundcloud.com',
				"exfm": "^( *)(http(s)?://)?(www.)?ex.fm",
				'soundmanager':'.*'
			},
			playlist:{
				'youtube':'(youtube.com|youtu.be)',
				'soundcloud':'^http(s)?\:\/\/soundcloud.com',
				'rss':'.*'
			}
		}
	},
	waitSeconds: 900,
	baseUrl: 'js/'
});

soundManager.preferFlash = false;
soundManager.useHTML5Audio = true;
soundManager.url = 'swf/';
soundManager.allowScriptAccess = 'always';
