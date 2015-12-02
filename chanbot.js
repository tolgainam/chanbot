//var irc = require("tmi.js");
<script src="//cdn.tmijs.org/js/0.0.24/tmi.js"></script>
var fs = require("fs");

fadeDelay = 5000, // Set to false to disable chat fade
    showChannel = true, // Show repespective channels if the channels is longer than 1
    useColor = true, // Use chatters' colors or to inherit
    showBadges = true, // Show chatters' badges
    showEmotes = true, // Show emotes in the chat
    doTimeouts = true, // Hide the messages of people who are timed-out
    doChatClears = false, // Hide the chat from an entire channel
    showHosting = true, // Show when the channel is hosting or not
    showConnectionNotices = true; // Show messages like "Connected" and "Disconnected"


var options = {
    options: {
        debug: true
    },
    connection: {
        random: "chat",
        server: "irc.twitch.tv",
        port: 6667,

        reconnect: true
    },
    identity: {
        username: "telest0",
        password: "oauth:x7wjetdwuyhadfk9qycqzo2wmf3tmh"
    },
    channels: ["#basarcos"]
};

var client = new irc.client(options);

// Connect the client to the server..
client.connect();


client.on("chat", function (channel, user, message, self) {


    // Username is a mod or username is the broadcaster..
        if (user["user-type"] === "broadcaster" || user.username === channel.replace("#", "")) {
        // User is a mod.
        console.log("BASAR GELDI");
        
        } else if(user["user-type"] === "mod" || user.username === "tolgainam") {
        
            if(message === "selam") {
                client.say(channel, "Hoşgeldin Baba !!!" );
            }
        console.log("Hello Father");
       // client.action(channel, "Selam "+ user.username + "! Naber ?");
        fs.writeFile("channelLog", user.username, function(err) {

            if(err) {
                return console.log(err);
            }
            console.log("Saved");
        })
}


});


client.on("whisper", function (username, message) {
    console.log("AM");
    client.whisper(username, "BOO !");
});

client.on("timeout", function (channel, username){
    console.log(username +" has banned on "+ channel);
    client.action(channel, " think this ban is good !! ");

})



client.on("notice", function (channel, msgid, message) {

    console.log("NOTICE >>> "+ channel, msgid, message)
})