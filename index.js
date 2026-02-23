require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const { startFlagsEvent } = require("./events/flagsEvent");
const User = require("./models/User");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

mongoose.connect(process.env.MONGO_URI);

client.on("ready", () => {
  console.log("Bot ready");
});

client.on("messageCreate", async message => {

  if (message.author.bot) return;

  if (message.content.startsWith("-ايفنت")) {

    if (message.content.includes("100")) {
      startFlagsEvent(message.channel, 100);
    } else {
      startFlagsEvent(message.channel, 10);
    }
  }

  if (message.content === "-توب") {

    const top = await User.find().sort({ totalPoints: -1 }).limit(10);

    let text = "أفضل اللاعبين:\n";

    top.forEach((u, i) => {
      text += `${i + 1}- <@${u.userId}> (${u.totalPoints})\n`;
    });

    message.channel.send(text);
  }

});

client.login(process.env.TOKEN);
