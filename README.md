# BasicBot
## A basic discord bot written in JavaScript
------------------------
### Available Commands:
- `!play (url)` Play a video/music/playlist
- ``!skip [number]`` skip a number of songs
- ``!queue`` Display the current queue
- ``!pause`` Pause music playback
- ``!resume`` Resume music playback
- ``!volume`` Adjust the playback volume between 1 and 200
- ``!leave`` Clears the song queue and leaves the channel
- ``!clearqueue`` Clears the song queue
- ``!aids`` literally aids
- ``!boobs`` some nice pictures
- ``!ass`` some nice pictures
- ``!help`` Show all commands
-------------------------------------
### Installation
Change the youtube api token and the discord bot token in the bot.js file.
Then install the following Node packages:
- discord.js
- ytdl-core
- youtube-dl
- request
- ffmpeg-binaries
- node-opus
- async-foreach

Finally run the bot.js file with: ``node bot.js``

---------------------------------------------
Parts of the music functionality are from [nexu-dev](https://github.com/nexu-dev/discord.js-music).
