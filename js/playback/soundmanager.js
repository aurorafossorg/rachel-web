define(['rwp','jquery'],function(RWP,$){
	var sound, playObserve, volumeObserve, positionObserve;

	function on(url,finishCallback){
		sound = soundManager.createSound({
			id:'RWPSoundManager',
			url:url,
			autoPlay:RWP.isPlay(),
			volume:RWP.volume(),
			whileloading:loading,
			whileplaying:playing,
			onfinish:finishCallback,
			onload:function(success){
				if(!success && !sound.bytesTotal)
					RWP.message('Error: Request not Found');
			}
		});
		playObserve = RWP.isPlay.subscribe(play);
		volumeObserve = RWP.volume.subscribe(volume);
		positionObserve = RWP.seekPosition.subscribe(position);

	}
	function off(){
		playObserve.dispose();
		volumeObserve.dispose();
		positionObserve.dispose();

		sound.destruct();
	}
	function play(value){
		if(value) sound.play();
		else sound.pause();
	}
	function volume(value){
		sound.setVolume(value);
	}
	function position(value){
		sound.setPosition(value*1000);
	}
	function loading(){
		RWP.loadedFraction(
			sound.bytesTotal>0 ? 
			sound.bytesLoaded/sound.bytesTotal : 0
		);
	}
	function playing(){
		RWP.position(sound.position/1000);
		RWP.duration(sound.durationEstimate/1000);
	}

	return {
		load:function(name, req, callback, config){
			soundManager.setup({
				onready:function(){
					callback({on:on, off:off});
				}
			});
		}
	};
});
