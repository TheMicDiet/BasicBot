const forEach = require('async-foreach').forEach
const Client = require("discord.js").Client
const client = new Client()
const request = require("request")
const YoutubeDL = require('youtube-dl')
const ytdl = require('ytdl-core')
const options = require('./config.json')
    //options for the bot
    //-->prefix for the commands
const prefix = options.prefix
const max_queue_size = options.max_queue_size
let default_volume = options.default_volume
const youtube_api_token = options.youtube_api_token
    //-->token of the bot
const token = options.token

//queue for music
let queue = []

const inChannel = false


//actions on user input
client.on("message", msg => {
    const message = msg.content.trim()
    if (!message.toLowerCase().startsWith(prefix) || msg.author.bot == true) {
        return
    } else {
        //command parser
        const command = message.substring(prefix.length).split(/[ \n]/)[0].toLowerCase().trim()
        const suffix = message.substring(prefix.length + command.length).trim()

        switch (command) {
            case "aids":
                return aids(msg, suffix)
            case "help":
                return showCommands(msg, suffix)
            case "spam":
                return spam(msg, suffix)
            case "boobs":
                return boobs(msg, suffix)
            case "ass":
                return ass(msg, suffix)
            case "play":
                return play(msg, suffix)
            case "skip":
                return skip(msg, suffix)
            case "queue":
                return queueList(msg, suffix)
            case "pause":
                return pause(msg, suffix)
            case "resume":
                return resume(msg, suffix)
            case "volume":
                return volume(msg, suffix)
            case "leave":
                return leave(msg, suffix)
            case "clearqueue":
                return clearqueue(msg, suffix)
            case "kill":
                return kill(msg, suffix)
            case "suicide":
                return suicide(msg, suffix)
            case "tilt":
                return tilt(msg, suffix)
            case "kick":
                return kick(msg, suffix)
            case "ban":
                return ban(msg, suffix)
            case "setrole":
                return setRole(msg, suffix)
            case "unban":
                return unban(msg, suffix)
            case "invite":
                return invite(msg, suffix)
            case "listroles":
                return listRoles(msg, suffix)
            case "removerole":
                return removeRole(msg, suffix)
            default:
                msg.channel.send(wrap("Not a valid command!\nType !help for more information."))

        }

    }





})

//on bot start up
client.on("ready", msg => {
        console.log("Bot is running and connected.")
    })
    //login the bot
client.login(token)


//command implementation
function aids(msg, suffix) {
    if (suffix === "") {
        return msg.channel.send(wrap("Please enter a name."))
    }
    msg.channel.send(`${suffix} has Aids!`)
}

function showCommands(msg, suffix) {
    msg.channel.send(wrap('!play (url): Plays a video/music/youtube playlist\n\n' +
            '!skip [number]: Skip some number of songs.\n\n' +
            '!queue: Display the current queue.\n\n' +
            '!pause: Pause music playback.\n\n' +
            '!resume: Resume music playback.\n\n' +
            '!volume: Adjust the playback volume between 1 and 200\n\n' +
            '!leave: Clears the song queue and leaves the channel.\n\n' +
            '!clearqueue: Clears the song queue.\n\n' +
            '!aids [name]: name has aids\n\n' +
            '!spam [message]: send some spam\n\n' +
            '!kill [name]: kills name\n\n' +
            '!suicide: commit suicide\n\n' +
            '!tilt: go to the tilt channel\n\n' +
            '!boobs: （。 ㅅ  。）\n\n' +
            '!ass: (‿ˠ‿)```' +
            '!kick [name]: Kicks the given user.\n\n' +
            '!ban [name]: Bans the given user.\n\n' +
            '!listroles: Lists all available roles\n\n' +
            '!setrole [name] [role]: Sets the role of the user.\n\n' +
            '!removerole [name] [role]: Removes the role of the user.\n\n' +
            '!unban [name]: Unbans the given user.\n\n' +
            '!invite: Creates an invite for the channel.\n\n')

    )
}


function suicide(msg, suffix) {
    if (msg.author === "") {
        return msg.channel.send(wrap(`Enter a name`))
    }
    let name = msg.guild.members.find((data, key) => key == msg.author.id).displayName
    msg.channel.send(wrap(`${name} committed suicide!`))


}
//check if the user is an Admin
function checkIfAdmin(msg) {
    let user = msg.guild.members.find((data, key) => key == msg.author.id)
    if (user.hasPermission("ADMINISTRATOR")) {
        return true
    } else {
        return msg.channel.send(wrap(`You need to be admin to do this.`))
    }
}

function getUser(msg, name) {
    return msg.guild.members.find((data, key) => data.displayName === name)
}
//mutes and deafes the given user 
function kill(msg, suffix) {
    checkIfAdmin(msg)


    if (msg.author === "") {
        return msg.channel.send(wrap(`Enter a name`))
    }
    let user = msg.guild.members.find((data, key) => data.displayName === suffix)


    if (user != undefined) {
        user.setMute(true)
        user.setDeaf(true)
        msg.channel.send(wrap(`${user.displayName} got killed!`))
    } else {
        msg.channel.send(wrap("User not found."))
    }



}

function listRoles(msg, suffix) {
    let message = "Roles: \n"
    for (role of msg.guild.roles.values()) {
        message += (role.name + "\n")
    }
    console.log(message)
    msg.channel.send(message)
}


//sets the role of an user
function setRole(msg, suffix) {
    checkIfAdmin(msg)
    console.log(suffix.split(" ")[0].trim())
    console.log(suffix.split(" ")[1].trim())
    suffix.substr(0, suffix.indexOf(' ')).trim();
    suffix.substr(suffix.indexOf(' ') + 1).trim();

    let user = getUser(msg, suffix.substr(0, suffix.indexOf(' ')).trim())
    let role = msg.guild.roles.find(role => role.name === (suffix.substr(suffix.indexOf(' ') + 1).trim()))
    if (user != undefined && role != undefined) {
        try {
            user.addRole(role)
        } catch (e) {
            msg.channel.send(wrap(`No Permissions!`))
        }
        msg.channel.send(wrap(`${user.displayName} is now ${role.name}!`))
    } else if (user == undefined) {
        msg.channel.send(wrap("User not found."))
    } else {
        msg.channel.send(wrap("Role not found."))
    }
}

function removeRole(msg, suffix) {
    checkIfAdmin(msg)
    console.log(suffix.split(" ")[0].trim())
    console.log(suffix.split(" ")[1].trim())
    suffix.substr(0, suffix.indexOf(' ')).trim();
    suffix.substr(suffix.indexOf(' ') + 1).trim();

    let user = getUser(msg, suffix.substr(0, suffix.indexOf(' ')).trim())
    let role = msg.guild.roles.find(role => role.name === (suffix.substr(suffix.indexOf(' ') + 1).trim()))
    if (user != undefined && role != undefined) {
        try {
            user.removeRole(role)
        } catch (e) {
            msg.channel.send(wrap(`No Permissions!`))
        }
        msg.channel.send(wrap(`${user.displayName} is no longer ${role.name}!`))
    } else if (user == undefined) {
        msg.channel.send(wrap("User not found."))
    } else {
        msg.channel.send(wrap("Role not found."))
    }
}

function ban(msg, suffix) {
    checkIfAdmin(msg)
    let user = getUser(msg, suffix)
    if (user != undefined) {
        msg.guild.ban(user)
        msg.channel.send(wrap(`${user.displayName} got banned!`))
    } else {
        msg.channel.send(wrap("User not found."))
    }

}

function unban(msg, suffix) {
    checkIfAdmin(msg)
    let user = getUser(msg, suffix)
    if (user != undefined) {
        msg.guild.unban(user)
        msg.channel.send(wrap(`${user.displayName} got unbanned!`))
    } else {
        msg.channel.send(wrap("User not found."))
    }

}

function kick(msg, suffix) {
    checkIfAdmin(msg)
    let user = getUser(msg, suffix)
    if (user != undefined) {
        user.kick()
        msg.channel.send(wrap(`${user.displayName} got kicked!`))
    } else {
        msg.channel.send(wrap("User not found."))
    }

}

function invite(msg, suffix) {
    checkIfAdmin(msg)
    msg.channel.createInvite().then((invite) => msg.channel.send(invite.url))

}

//moves all users to the tilt channel
function tilt(msg, suffix) {
    checkIfAdmin(msg)
    const tiltchannel = msg.guild.channels.find(function(data, key) {
        return data.name === "Tilt"
    })
    if (tiltchannel == undefined) {
        msg.channel.send(wrap("Please create a Tilt channel."))
    }
    const users = msg.guild.members.filter(mem => (mem.voiceChannel != undefined))
    users.forEach(user => {

        if (user.voiceChannel != undefined) {
            user.setVoiceChannel(tiltchannel)
        }
    })
    msg.channel.send("All users have been tilted.")


}

function spam(msg, suffix) {
    for (let i = 0; i < 10; i++) {
        msg.channel.send(wrap(suffix))
    }
}

function boobs(msg, suffix) {
    if (msg.channel.name.includes("nsfw")) {
        request("http://api.oboobs.ru/boobs/0/1/random", function(error, result) {

            if (error) {
                console.log("Error:" + error)
            }
            let boob = JSON.parse(result.body)
            msg.channel.send(('http://media.oboobs.ru/' + boob[0].preview))

        })
    } else {
        msg.channel.send(wrap(`Can't do this in here.`))
    }
}

function ass(msg, suffix) {
    if (msg.channel.name.includes("nsfw")) {
        request("http://api.obutts.ru/butts/0/1/random", function(error, result) {

            if (error) {
                console.log("Error:" + error)
            }
            let boob = JSON.parse(result.body)
            msg.channel.send(('http://media.obutts.ru/' + boob[0].preview))

        })
    } else {
        msg.channel.send(wrap(`Can't do this in here.`))
    }
}

function queueList(msg, suffix) {
    if (queue.length === 0) {
        return msg.channel.send(wrap("Playlist is empty."))
    }

    msg.channel.send(wrap(`Playlist contains ${queue.length} songs:`))
    let variable = 1
    let x = ""
    queue.forEach(t => {
        if (variable <= max_queue_size) {
            x = x + variable + ". " + t.title + "\n"
            variable++
        }
    })

    msg.channel.send(x.substr(0, 2000))


}



function play(msg, suffix) {

    var video_id = get_video_id(suffix)

    if (suffix.includes("playlist")) {
        return queue_playlist(msg, suffix)
    }
    // Make sure the user is in a voice channel.
    if (msg.member.voiceChannel === undefined) return msg.channel.send(wrap('You\'re not in a voice channel.'))

    // Make sure the suffix exists.
    if (!suffix) return msg.channel.send(wrap('No video specified!'))

    // Check if the queue has reached its maximum size.
    if (queue.length >= max_queue_size) {
        return msg.channel.send(wrap('Maximum queue size reached!'))
    }

    msg.channel.send(wrap('Searching...')).then(response => {
        YoutubeDL.getInfo("https://www.youtube.com/watch?v=" + video_id, (err, info) => {
            // Verify the info.
            if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
                return response.edit(wrap('Invalid video!'))
            }

            info.requester = msg.author.id

            // Queue the video.
            response.edit(wrap('Queued: ' + info.title)).then(() => {
                if (queue.length < max_queue_size) {
                    queue.push(info)
                }
                // Play if only one element in the queue.
                if (queue.length === 1) executeQueue(msg, queue)
            }).catch(console.log)
        })
    }).catch(console.log)



}

function pause(msg, suffix) {
    // Get the voice connection.
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(wrap('No music being played.'))

    // Pause.
    msg.channel.send(wrap('Playback paused.'))
    const dispatcher = voiceConnection.player.dispatcher
    if (!dispatcher.paused) dispatcher.pause()
}

function skip(msg, suffix) {
    // Get the voice connection.
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(wrap('No music being played.'))

    // Get the number to skip.
    let toSkip = 1 // Default 1.
    if (!isNaN(suffix) && parseInt(suffix) > 0) {
        toSkip = parseInt(suffix)
    }
    toSkip = Math.min(toSkip, queue.length)

    // Skip.
    queue.splice(0, toSkip - 1)

    // Resume and stop playing.
    const dispatcher = voiceConnection.player.dispatcher
    if (voiceConnection.paused) dispatcher.resume()
    dispatcher.end()

    msg.channel.send(wrap('Skipped ' + toSkip + '!'))
}


function leave(msg, suffix) {

    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(wrap('I\'m not in any channel!.'))
        // Clear the queue.		
    queue.splice(0, queue.length)

    // End the stream and disconnect.
    voiceConnection.player.dispatcher.end()
    voiceConnection.disconnect()
}

function clearqueue(msg, suffix) {
    queue.splice(0, queue.length)
    msg.channel.send(wrap('Queue cleared!'))

}

function resume(msg, suffix) {
    // Get the voice connection.
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(wrap('No music being played.'))
        // Resume.
    msg.channel.send(wrap('Playback resumed.'))
    const dispatcher = voiceConnection.player.dispatcher
    if (dispatcher.paused) dispatcher.resume()
}

function volume(msg, suffix) {
    // Get the voice connection.
    const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
    if (voiceConnection === null) return msg.channel.send(wrap('No music being played.'))
        // Get the dispatcher
    const dispatcher = voiceConnection.player.dispatcher

    if (suffix > 200 || suffix < 0) return msg.channel.send(wrap('Volume out of range!')).then((response) => {
        response.delete(5000)
    })

    msg.channel.send(wrap("Volume set to " + suffix))
    dispatcher.setVolume((suffix / 100))
    default_volume = suffix
}

function executeQueue(msg, queue) {
    // If the queue is empty, finish.
    if (queue.length === 0) {
        msg.channel.send(wrap('Playback finished.'))
            // Leave the voice channel.
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
        if (voiceConnection !== null) return voiceConnection.disconnect()
    }

    new Promise((resolve, reject) => {
        // Join the voice channel if not already in one.
        const voiceConnection = client.voiceConnections.find(val => val.channel.guild.id == msg.guild.id)
        if (voiceConnection === null) {
            if (inChannel) {
                msg.guild.channels.find('name', inChannel).join().then(connection => {
                        resolve(connection)
                    }).catch((error) => {
                        console.log(error)
                    })
                    // Check if the user is in a voice channel.
            } else if (msg.member.voiceChannel) {
                msg.member.voiceChannel.join().then(connection => {
                    resolve(connection)
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                // Otherwise, clear the queue and do nothing.
                queue.splice(0, queue.length)
                reject()
            }
        } else {
            resolve(voiceConnection)
        }
    }).then(connection => {
        // Get the first item in the queue.
        const video = queue[0]

        console.log(video.webpage_url)

        // Play the video.
        msg.channel.send(wrap('Now Playing: ' + video.title)).then(() => {
            let dispatcher = connection.playStream(ytdl(video.webpage_url, { filter: 'audioonly' }), { seek: 0, volume: (default_volume / 100) })

            connection.on('error', (error) => {
                // Skip to the next song.
                console.log(error)
                queue.shift()
                executeQueue(msg, queue)
            })

            dispatcher.on('error', (error) => {
                // Skip to the next song.
                console.log(error)
                queue.shift()
                executeQueue(msg, queue)
            })

            dispatcher.on('end', () => {
                // Wait a second.
                setTimeout(() => {
                    if (queue.length > 0) {
                        // Remove the song from the queue.
                        queue.shift()
                            // Play the next song in the queue.
                        executeQueue(msg, queue)
                    }
                }, 1000)
            })
        }).catch((error) => {
            console.log(error)
        })
    }).catch((error) => {
        console.log(error)
    })
}

//play playlist
function queue_playlist(message, suffix, pageToken = '') {
    if (message.member.voiceChannel === undefined) return message.channel.send(wrap('You\'re not in a voice channel.'))
    let playlistId = suffix.trim().split("=").pop()
    console.log("Playlist-ID: ", playlistId)
    request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + youtube_api_token + "&pageToken=" + pageToken, (error, response, body) => {
        var json = JSON.parse(body)
        if ("error" in json) {
            return message.channel.send("An error has occurred: " + json.error.errors[0].message + " - " + json.error.errors[0].reason)
        } else if (json.items.length === 0) {
            return message.channel.send("No videos found within playlist.")
        }

        forEach(json.items, function(value, key) {
            let i = key
            if (i >= max_queue_size) {
                return message.channel.send("Max queue size reached.")
            }

            YoutubeDL.getInfo("https://www.youtube.com/watch?v=" + json.items[i].snippet.resourceId.videoId, ['--sleep-interval=1'], (err, info) => {
                // Verify the info.
                if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
                    console.log(err)
                    return
                }
                info.requester = message.author.id
                    // Queue the video.	
                if (queue.length < max_queue_size) {
                    queue.push(info)
                }
                if (queue.length === 1) executeQueue(message, queue)
            })
            let done = this.async();
            setTimeout(done, 1000)
                //play(message, 'https://www.youtube.com/watch?v=' + json.items[i].snippet.resourceId.videoId, true)

        })
        if (queue.length < max_queue_size && !json.nextPageToken == null) {
            message.channel.send("Added " + json.items.length + " songs to the queue.")
            queue_playlist(message, playlistId, json.nextPageToken)
        }
        message.channel.send("Added " + json.items.length + " songs to the queue.")


    })

}
//get video id for videos from playlist
function get_video_id(string) {
    let regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/
    let matches = string.match(regex)

    if (matches) {
        return matches[1]
    } else {
        return string
    }
}


function wrap(text) {
    return '```\n' + text.replace(/`/g, '`' + String.fromCharCode(8203)) + '\n```'
}
