var requirejs = ({
	shim: {
		'underscore': {exports: '_'},
		'jquery.ui': {deps: ['jquery'],exports: 'jQuery'},
		'jquery.scrollto': {deps: ['jquery'],exports: 'jQuery'}
	},
	paths: {
		'jquery': 'https://static.aurorafoss.org/aurorafoss/pub/web/jquery/3.3.1/js/jquery.min',
		'jquery.ui': 'https://static.aurorafoss.org/aurorafoss/pub/web/jqueryui/1.12.1/jquery-ui.min',
		'jquery.scrollto': 'https://static.aurorafoss.org/aurorafoss/pub/web/jquery-scrollTo/2.1.2/js/jquery.scrollTo.min',
		'underscore': 'https://static.aurorafoss.org/aurorafoss/pub/web/underscore.js/1.9.1/js/underscore-min',
		'knockout':'https://static.aurorafoss.org/aurorafoss/pub/web/knockout/3.4.2/js/knockout-min',
		'text': 'https://static.aurorafoss.org/aurorafoss/pub/web/require-text/2.0.12/js/text.min',
		'domready': 'https://static.aurorafoss.org/aurorafoss/pub/web/require-domReady/2.0.1/domReady.min'
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
