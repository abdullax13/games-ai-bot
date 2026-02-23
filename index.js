require("dotenv").config();
const { Client, GatewayIntentBits, Events } = require("discord.js");
const OpenAI = require("openai");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.has(client.user)) return;

  await message.channel.sendTyping();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "أنت مساعد داخل بوت ديسكورد ألعاب. رد باختصار." },
        { role: "user", content: message.content }
      ],
      max_tokens: 300
    });

    await message.reply(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
    message.reply("صار خطأ في الاتصال بالذكاء الاصطناعي.");
  }
});

client.login(process.env.TOKEN);
