# BasicBot
## A basic discord bot written in JavaScript
------------------------
### Available Commands:
- `!play (url)` Play a video/music/playlist.
- ``!skip [number]`` skip a number of songs.
- ``!queue`` Display the current queue.
- ``!pause`` Pause music playback.
- ``!resume`` Resume music playback.
- ``!volume`` Adjust the playback volume between 1 and 200.
- ``!leave`` Clears the song queue and leaves the channel.
- ``!clearqueue`` Clears the song queue.
- ``!aids [name]`` Name has Aids.
- ``!boobs`` （。 ㅅ  。）
- ``!ass`` (‿ˠ‿)
- ``!help`` Show all commands.
- ``!spam [message]`` Spams the message.
- ``!kill [name]`` Mutes and deafs the given user.
- ``!suicide`` Commit suicide.
- ``!tilt`` Moves all users to a channel called "Tilt".
- ``!kick [name]`` Kicks the the given user from the server.
- ``!ban [name]`` Bans the given user from the server.
- ``!unban [name]`` Unbans the given user from the server.
- ``!listroles []`` Lists all available roles on the server.
- ``!setrole [name] [role]`` Sets the given role for the given user.
- ``!removerole [name] [role]`` Removes the given role from the given user.
- ``!invite`` Creates an invite to the channel.    

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
