# Rachel Web Player

## Introduction

Rachel Web Player is a HTML5 Music Player based on SCM Music Player. It is a free and open source web music player, that brings a seamless music experience to your website. Support Tumblr, Blogger, Weebly, Tistory and more.

* __Continous Playback Cross Pages__ - Seamless playback throughout your website.
* __Full Featured Control__ - Play, pause, next, previous, seek, shuffle, repeat mode, volume and more.
* __Custom Skins__ - Match your look and feel. Choose or design your own skin with CSS.
* __Dynamic Playlist__ - Music from various sources: MP3, SoundCloud, Youtube, RSS in HTML5.
* __Flexible UI__ - Dockable player on top or bottom. Playlist can be toggled.
* __Setup Wizard__ - Create your Rachel Web Player without any pain.

## Usage

Normally you don't need to download anything to use Rachel Web Player. Just go to https://rwplayer.aurorafoss.org/ and get the script via Setup Wizard. But if you want to self host or customize the source code, you are free to do it, according to `LICENSE` file.

For a minimal player setup you should load `player.js` script into your web page:

```html
<script type="text/javascript" src="player.js"></script>
```

To start with, place files into your server, run __index.html__ and you will be redirected to the Setup Wizard, configured for your self hosted Rachel Web Player.

## API
Rachel Web Player provides full featured control on your music. Apart from Setup Wizard, you can also control Rachel Web Player via Javascript. The script exposes RWP to global scope with the following methods.

#### RWP.play();
Plays the current song.
#### RWP.pause();
Pause the currently playing song.
#### RWP.previous();
Loads the previous song in playlist.
#### RWP.next();
Loads the next song in playlist.
#### RWP.queue({title:'x',url:'y'});
Queue a song title x url y to the playlist.
#### RWP.play({title:'x',url:'y'});
Add a song title x url y to the playlist and play it.
#### RWP.volume(vol);
Sets the volume. Accepts an integer vol between `0` and `100`.
#### RWP.skin('x');
Change skin of Rachel Web Player, with x being the link to a custom skin css file.
#### RWP.placement(pos);
Change placement of the player bar. Accepts a string pos `"top"` or `"bottom"`
#### RWP.loadPlaylist('x');
Loads the specified playlist url x.
#### RWP.loadPlaylist([{title:'x1',url:'y1'}, {title:'x2',url:'y2'}, ...]);
Loads the specified list of songs with their title and url respectively.
#### RWP.repeatMode(no);
Set the repeat mode of playlist. Accepted values of no are:
`0` (play playlist once), `1` (repeat playlist), `2` (repeat item).
#### RWP.isShuffle(x);
Set whether playback order should be shuffled. Accepts a boolean x `true` or `false`.
#### RWP.showPlaylist(x);
Set whether playlist is being shown. Accepts a boolean x 	`true` or `false`.

## Credits
Rachel Web Player is made possible with these open source projects:

* [Soundmanager 2](http://www.schillmania.com/projects/soundmanager2/) - Javascript Sound API supporting HTML5.
* [Knockout.js](http://knockoutjs.com/) - Javascript MVVM framework does data binding and dependency tracking.
* [Require.js](http://requirejs.org/) - Javascript Module loader using AMD (Asynchronous Module Definition).
* [Underscore.js](http://underscorejs.org/) - Javascript utility library.
* [jQuery](http://jquery.com/).

## Want to contribute

You can fork the source code, report issues or feature request on our [gitlab](https://gitlab.com/aurorafossorg/). Make sure you read the `CODE_OF_CONDUCT.md` and `LICENSE` files carefully.

## FAQ

**Why this player no longer support Flash for older browsers?** Just because Adobe Flash Player doesn't meet Free Software rules and we want freedom for everyone. Also, Flash is already deprecated for almost all browsers. You can, however fork the project and make your changes.

## License

GNU General Public License Version 3, 29 June 2007

- Copyright (C) 2015 Adrian C Shum
- Copyright (C) 2018 Aurora Free Open Source Software