/*
                                   / _|
  __ _ _   _ _ __ ___  _ __ __ _  | |_ ___  ___ ___
 / _` | | | | '__/ _ \| '__/ _` | |  _/ _ \/ __/ __|
| (_| | |_| | | | (_) | | | (_| | | || (_) \__ \__ \
 \__,_|\__,_|_|  \___/|_|  \__,_| |_| \___/|___/___/

Copyright (C) 2015 Adrian C Shum
Copyright (C) 2018 Aurora Free Open Source Software.

This file is part of the Aurora Free Open Source Software. This
organization promote free and open source software that you can
redistribute and/or modify under the terms of the GNU General Public
License Version 3 as published by the Free Software Foundation or (at your
option) any later version approved by the Aurora Free Open Source Software
Organization. The license is available in the package root path as
'LICENSE' file. Please review the following information to ensure the GNU
General Public License requirements will be met:
https://www.gnu.org/licenses/gpl-3.0.html .

NOTE: All products, services or anything associated to trademarks and
service marks used or referenced on this file are the property of their
respective companies/owners or its subsidiaries. Other names and brands
may be claimed as the property of others.

For more info about intellectual property visit: aurorafoss.org or
directly send an email to: contact (at) aurorafoss.org .
*/

(function ()
{
	var hasFrame = window.parent != window,
		scripts = document.getElementsByTagName('script'),
		current = scripts[scripts.length - 1],
		config = current.getAttribute('data-config'),
		head = document.getElementsByTagName("head")[0],
		dest = location.href.replace(/rachelplayer\=true/g, 'rwplayer=false'),
		destHost = dest.substr(0, dest.indexOf('/', 10)),
		scm = current.getAttribute('src').replace(/player\.js.*/g, 'player.html') + '#' + dest,
		scmHost = scm.substr(0, scm.indexOf('/', 10)),
		isOutside = !hasFrame || location.href.indexOf("rwplayer=true") > 0,
		postMessage = function (msg)
		{
			return window.top.document.getElementById('rwpframe').contentWindow.postMessage(msg, scmHost);
		},
		postFactory = function (obj, keys)
		{
			var keys = keys.split(','),
				post = function (key)
				{
					return function (arg)
					{
						var argStr = '';
						if (typeof (arg) != 'undefined')
							argStr = (key.match(/(play|queue)/) ? 'new Song(' : '(') +
							JSON.stringify(arg) + ')';
						postMessage('RWP.' + key + '(' + argStr + ')');
					}
				};
			for (var i = 0; i < keys.length; i++)
			{
				var key = keys[i];
				obj[key] = post(key);
			}
		},
		postConfig = function (config)
		{
			if (!isOutside)
				postMessage('RWP.config(' + config + ')');
		},
		addEvent = function (elm, evType, fn)
		{
			if (elm.addEventListener)
				elm.addEventListener(evType, fn);
			else if (elm.attachEvent)
				elm.attachEvent('on' + evType, fn);
			else
				elm['on' + evType] = fn;
		},
		isIE = (function ()
		{
			var undef, v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');
			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
			return v > 4 ? v : undef;
		})(),
		isMobile = navigator.userAgent.match(/iPad|iPhone|Android|Blackberry/i),
		isIPad = navigator.userAgent.match(/iPad/i),
		init = function ()
		{
			if (!document.body)
			{
				setTimeout(init, 10);
				return;
			}
			if (isOutside) outside();
			else inside();
		},
		outside = function ()
		{
			var css = 'html,body{overflow:hidden;} body{margin:0;padding:0;border:0;} img,a,embed,object,div,address,table,iframe,p,span,form,header,section,footer{ display:none;border:0;margin:0;padding:0; }  #tumblr_controls{display:none;} #rwpframe{display:block; background-color:transparent; position:fixed; top:0px; left:0px; width:100%; height:100%; z-index:1667;} ';
			var style = document.createElement('style');
			style.type = 'text/css';
			style.id = 'scmcss';
			if (style.styleSheet) style.styleSheet.cssText = css;
			else style.appendChild(document.createTextNode(css));
			head.appendChild(style);
			var rwpframe = document.createElement('iframe');
			rwpframe.frameBorder = 0;
			rwpframe.id = "rwpframe";
			rwpframe.allowTransparency = true;
			rwpframe.src = scm;
			document.body.insertBefore(rwpframe, document.body.firstChild);
			var resize = function ()
			{
				rwpframe.style.height = (function ()
				{
					if (typeof (window.innerHeight) == 'number')
						return window.innerHeight;
					else if (document.documentElement && document.documentElement.clientHeight)
						return document.documentElement.clientHeight;
					else if (document.body && document.body.clientHeight)
						return document.body.clientHeight;
				})();
			};
			addEvent(window, 'load', function ()
			{
				setTimeout(function ()
				{
					while (document.body.firstChild != rwpframe)
						document.body.removeChild(document.body.firstChild);
					while (document.body.lastChild != rwpframe)
						document.body.removeChild(document.body.lastChild);
					resize();
				}, 0);
			});
			addEvent(window, 'resize', resize);
			var getPath = function ()
				{
					return location.href.replace(/#.*/, '');
				},
				path = getPath(),
				hash = location.hash;
			setInterval(function ()
			{
				if (getPath() != path)
				{
					path = getPath();
					window.rwpinside.location.replace(path);
				}
				if (location.hash != hash)
				{
					hash = location.hash;
					window.rwpinside.location.hash = hash;
				}
			}, 100);
		},
		inside = function ()
		{
			window.top.document.title = document.title;
			var filter = function (host)
			{
				host = host.replace(/blogspot.[a-z.]*/i, 'blogspot.com');
				host = host.replace(/^(http(s)?:\/\/)?(www.)?/i, '');
				return host;
			};
			addEvent(document.body, 'click', function (e)
			{
				var tar = e.target;
				while (!tar.tagName.match(/^(a|area)$/i) && tar != document.body)
					tar = tar.parentNode;
				if (tar.tagName.match(/^(a|area)$/i) && !tar.href.match(/.(jpg|png)$/i) && !tar.href.match(/^javascript:/))
				{
					if (tar.href.indexOf('#') == 0)
					{
						if (tar.href != "#")
						{
							window.top.rwpinside = window;
							window.top.location.hash = location.hash;
							e.preventDefault();
						}
					}
					else if (tar.title.match(/^(RWP:|\[RWP\])/i))
					{
						var title = tar.title.replace(/^(RWP:|\[RWP\])( )?/i, '');
						var url = tar.href;
						RWP.play(
						{
							title: title,
							url: url
						});
						e.preventDefault();
					}
					else if (tar.href.match(/\.css$/))
					{
						window.open('//rwplayer.aurorafoss.org/#skin=' + tar.href, '_blank');
						window.focus();
						e.preventDefault();
					}
					else if (filter(tar.href).indexOf(filter(location.host)) == -1)
					{
						if (tar.href.match(/^http(s)?/))
						{
							window.open(tar.href, '_blank');
							window.focus();
							e.preventDefault();
						}
					}
					else if (history.pushState)
					{
						var url = filter(tar.href).replace(filter(destHost), '');
						window.top.rwpinside = window;
						window.top.history.pushState(null, null, url);
						e.preventDefault();
					}
				}
			});
		};
	var RWP = {};
	postFactory(RWP, 'queue,play,pause,next,previous,volume,skin,placement,' +
		'loadPlaylist,repeatMode,isShuffle,showPlaylist,' +
		'togglePlaylist,toggleShuffle,changeRepeatMode');
	if (window.RWP && window.RWPMusicPlayer) return;
	if (!isMobile)
	{
		init();
	}
	if (config) postConfig(config);
	RWP.init = postConfig;
	window.RWPMusicPlayer = window.RWPMusicPlayer || RWP;
	window.RWP = window.RWP || RWP;
})();