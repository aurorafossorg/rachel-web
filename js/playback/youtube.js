define([
	'rwp','jquery',
	'http://www.youtube.com/iframe_api'
	],function(RWP,$){

	var id="RWPYoutube",
		callback, finishCallback, player, intervalId,
		playObserve, volumeObserve, positionObserve;

	$(document.body).prepend(
	'<div style="position:absolute;left:-1999px;right:-1999px;"><div id="'+id+'"></div></div>');

	window.onYouTubeIframeAPIReady = function(){
		player = new YT.Player(id,{
			height:'390',
			width:'640',
			events: {
				onReady:function(){
					callback({on:on,off:off});
				},
				onStateChange:stateChange,
				onError:error
			}
		});
	}

	function on(url,onFinish){
		finishCallback = onFinish;
		playObserve = RWP.isPlay.subscribe(play);
		volumeObserve = RWP.volume.subscribe(volume);
		positionObserve = RWP.seekPosition.subscribe(position);
		intervalId = setInterval(interval,100);

		var videoId = parseVideoId(url);
		player.setVolume(RWP.volume());
		if(RWP.isPlay())
			player.loadVideoById(videoId);
		else
			player.cueVideoById(videoId);
	}
	function off(){
		playObserve.dispose();
		volumeObserve.dispose();
		positionObserve.dispose();
		clearInterval(intervalId);

		//pause video as off
		play(0);
	}
	function play(value){
		if(value) player.playVideo();
		else player.pauseVideo();
	}
	function volume(value){
		player.setVolume(value);
	}
	function position(value){
		player.seekTo(value);
	}
	function interval(){
		RWP.loadedFraction(player.getVideoLoadedFraction());
		RWP.position(player.getCurrentTime());
		RWP.duration(player.getDuration());
	}
	function stateChange(e){
		switch(e.data){
			case 0:finishCallback(); break;
		}
	}
	function error(e){
		var msg = 'Youtube Error '+e.data;
		switch(e.data){
			case 5: msg += ': HTML5 Error'; break;
			case 2: msg += ': Invalid Link'; break;
			case 101: msg += ': Cannot be played in embedded player'; break;
			case 100: msg += ': Request not Found'; break;
		}
		if(e.data!=5) RWP.message(msg);
	}
	function parseVideoId(url){
		var prefix = '(v=|/v/|youtu.be/)';
		return url
			.match(new RegExp(prefix+'.*'))[0]
			.replace(new RegExp(prefix),'')
			.substr(0,11);
	}
	return {
		load:function(name, req, onLoad, config){
			callback = onLoad;
		}
	};
});

