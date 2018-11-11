define(["rwp","knockout","underscore"],function(RWP,ko,_){

var skin = ko.observable('skins/tunes/skin.css'),
  isSelf = location.host.match(/(localhost|rwplayer\.aurorafoss\.org)/);
	placement = ko.observable('top'),
	showPlaylist = ko.observable(false),
	display = ko.computed(function(){
		return RWP.message() || RWP.current().title();
	}),
  showAd = ko.computed(function(){
    return isSelf && showPlaylist();
  });
	timer = (function(){
		function timeNo(no){
			no = parseInt(no);
			if (no < 10) return "0" + no;
			else return no;
		}
		return ko.computed(function(){
			var p = RWP.position();
			var d = RWP.duration();
			return timeNo(p / 60) + ":" + timeNo(p % 60) + 
				"|" + timeNo(d / 60) + ":" + timeNo(d % 60);
		});
	})(),
	togglePlaylist = function(){
		showPlaylist(!showPlaylist());
	};

	_.extend(RWP,{
		skin:skin, 
		placement:placement, 
		showPlaylist:showPlaylist,
		togglePlaylist:togglePlaylist,
		display:display,
		timer:timer,
    showAd:showAd
	});

	RWP.config = function(data){
		_.extend(data,data.playback);
		if('skin' in data) RWP.skin(data.skin);
		if('volume' in data) RWP.volume(parseInt(data.volume));
		if('autoplay' in data) RWP.autoPlay(data.autoplay!='false' && data.autoplay);
		if('autostart' in data) RWP.autoPlay(data.autostart!='false' && data.autostart);
		if('shuffle' in data) RWP.isShuffle(data.shuffle!='false' && data.shuffle);
		if('repeat' in data) RWP.repeatMode(data.repeat);

		if('placement' in data) RWP.placement(data.placement);
		if('showplaylist' in data) RWP.showPlaylist(data.showplaylist!='false' && data.showplaylist);

		if('playlist' in data) RWP.loadPlaylist(data.playlist);
	};

});
