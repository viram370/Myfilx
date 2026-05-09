// =========================
// REQUIRED PACKAGES
// =========================

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token);

const PORT = process.env.PORT || 10000;

const RENDER_URL = process.env.RENDER_EXTERNAL_URL;

bot.setWebHook(`${RENDER_URL}/bot${token}`);

app.use(express.json());


// =========================
// ADMIN
// =========================

const ADMIN_ID = 6097315530;


// =========================
// USER DATABASE
// =========================

const users = {};


// =========================
// SAMPLE ANIME DATABASE
// Replace file IDs yourself
// =========================

const animeDB = {

  "anime-name": {

    "season 1": {

      hindi: [
        "EP1_FILE_ID",
        "EP2_FILE_ID"
      ],

      english: [
        "EP1_FILE_ID",
        "EP2_FILE_ID"
      ]

    }

  }

};


// =========================
// USER SYSTEM
// =========================

function ensureUser(chatId){

  if(!users[chatId]){

    users[chatId] = {
      plan: "Free",
      balance: 0,
      expiry: null
    };

  }

}


function checkExpiry(chatId){

  const user = users[chatId];

  if(
    user.expiry &&
    Date.now() > user.expiry
  ){

    user.plan = "Free";
    user.expiry = null;

  }

}


// =========================
// PLAN ACCESS SYSTEM
// =========================

function canUseAnime(plan){

  return (
    plan === "20" ||
    plan === "50" ||
    plan === "100"
  );

}

function canUseMovie(plan){

  return (
    plan === "100"
  );

}

function canUseWebseries(plan){

  return (
    plan === "50" ||
    plan === "100"
  );

}


// =========================
// PLAN BENEFITS
// =========================

function getPlanBenefits(plan){

  if(plan === "20"){
    return `
🍿 ₹20 Anime Basic

✅ Anime Access
✅ Hindi Dubbed
✅ 480p Quality
✅ Downloads`;
  }

  if(plan === "50"){
    return `
🎬 ₹50 Anime + WebSeries

✅ Anime Access
✅ WebSeries Access
✅ 720p HD
✅ Hindi + Some English`;
  }

  if(plan === "100"){
    return `
🔥 ₹100 Premium HD

✅ Anime Access
✅ Movies Access
✅ WebSeries Access
✅ 720p HD
✅ Hindi + English`;
  }

  return `
🆓 Free Plan

❌ No Premium Access`;
}


// =========================
// FILE ID LOGGER
// =========================

bot.on('photo', (msg) => {

  const photo = msg.photo;

  const fileId = photo[photo.length - 1].file_id;

  console.log("PHOTO FILE ID:");
  console.log(fileId);

});


bot.on('video', (msg) => {

  console.log("VIDEO FILE ID:");
  console.log(msg.video.file_id);

});


// =========================
// START
// =========================

bot.onText(/\/start/, (msg) => {

  const chatId = msg.chat.id;

  ensureUser(chatId);

  checkExpiry(chatId);

  bot.sendMessage(chatId,
`🎬 Welcome To MyFlix Premium

Watch Anime, Movies & WebSeries directly on Telegram 📺

━━━━━━━━━━━━━━
✨ Features
━━━━━━━━━━━━━━

• Fast streaming
• Download support
• HD quality
• Premium content
• Regular updates
• Waitlist system

Choose an option below 👇`,
{
  reply_markup:{
    keyboard:[
      ["🔍 Search","👤 Account"],
      ["📝 Waitlist","🆘 Support"],
      ["📜 Terms & Privacy"]
    ],
    resize_keyboard:true
  }
});

});


// =========================
// MAIN MESSAGE HANDLER
// =========================

bot.on('message', (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  ensureUser(chatId);

  checkExpiry(chatId);


  // =========================
  // SEARCH
  // =========================

  if(text === "🔍 Search"){

    bot.sendMessage(chatId,
`🔍 Search Commands

━━━━━━━━━━━━━━
🎌 Anime
━━━━━━━━━━━━━━

/anime anime-name season 1

Example:
• /anime anime-name season 1
• /anime anime-name season 1 english

━━━━━━━━━━━━━━
🎬 Movies
━━━━━━━━━━━━━━

/movie movie-name

━━━━━━━━━━━━━━
📺 WebSeries
━━━━━━━━━━━━━━

/webseries series-name`);
  }


  // =========================
  // ACCOUNT MENU
  // =========================

  if(text === "👤 Account"){

    bot.sendMessage(chatId,
`👤 MyFlix Account Center`,
{
  reply_markup:{
    keyboard:[
      ["💎 Plans","💳 Payment"],
      ["👤 Account Info","🔙 Back"]
    ],
    resize_keyboard:true
  }
});

  }


  // =========================
  // ACCOUNT INFO
  // =========================

  if(text === "👤 Account Info"){

    bot.sendMessage(chatId,
`👤 MyFlix Premium Account

━━━━━━━━━━━━━━
📌 Account Details
━━━━━━━━━━━━━━

🆔 User ID:
${chatId}

💎 Current Plan:
${users[chatId].plan}

💰 Wallet Balance:
₹${users[chatId].balance}

📅 Plan Expiry:
${
 users[chatId].expiry
 ? new Date(users[chatId].expiry).toLocaleDateString()
 : "No Active Plan"
}

━━━━━━━━━━━━━━
🎁 Plan Benefits
━━━━━━━━━━━━━━

${getPlanBenefits(users[chatId].plan)}

━━━━━━━━━━━━━━
🆘 Support
━━━━━━━━━━━━━━

👉 @MyflixO`);
  }


  // =========================
  // PLANS
  // =========================

  if(text === "💎 Plans"){

    bot.sendMessage(chatId,
`💎 MyFlix Premium Plans

━━━━━━━━━━━━━━
🍿 ₹20 / Month
━━━━━━━━━━━━━━

✅ Anime Only
✅ Hindi Dubbed
✅ 480p Quality

━━━━━━━━━━━━━━
🎬 ₹50 / Month
━━━━━━━━━━━━━━

✅ Anime + WebSeries
✅ 720p HD
✅ Hindi + English

━━━━━━━━━━━━━━
🔥 ₹100 / Month
━━━━━━━━━━━━━━

✅ Anime + Movies + WebSeries
✅ Premium HD
✅ Hindi + English`);
  }


  // =========================
  // PAYMENT
  // =========================

  if(text === "💳 Payment"){

    bot.sendMessage(chatId,
`💳 MyFlix Payment Center

👤 Name:
Garming hack king

💰 UPI:
viramdevraj20@fam

Select your plan below 👇`,
{
  reply_markup:{
    inline_keyboard:[
      [{text:"🍿 ₹20 Plan",callback_data:"pay20"}],
      [{text:"🎬 ₹50 Plan",callback_data:"pay50"}],
      [{text:"🔥 ₹100 Plan",callback_data:"pay100"}]
    ]
  }
});

  }


  // =========================
  // WAITLIST
  // =========================

  if(text === "📝 Waitlist"){

    bot.sendMessage(chatId,
`📝 MyFlix Waitlist

Request:
🎌 Anime
🎬 Movies
📺 WebSeries

Popular requests may upload faster.

👉 @MyflixO`);
  }


  // =========================
  // SUPPORT
  // =========================

  if(text === "🆘 Support"){

    bot.sendMessage(chatId,
`🆘 Official Support

Issues:
• Payments
• Missing content
• Activation problems

👉 @MyflixO`);
  }


  // =========================
  // TERMS
  // =========================

  if(text === "📜 Terms & Privacy"){

    bot.sendMessage(chatId,
`📜 Terms & Privacy

• Subscription fees are non-refundable
• Content may take time to upload
• Sharing accounts may result in suspension
• Abuse may result in restriction`);
  }


  // =========================
  // BACK
  // =========================

  if(text === "🔙 Back"){

    bot.sendMessage(chatId,
`🎬 Back To Main Menu`,
{
  reply_markup:{
    keyboard:[
      ["🔍 Search","👤 Account"],
      ["📝 Waitlist","🆘 Support"],
      ["📜 Terms & Privacy"]
    ],
    resize_keyboard:true
  }
});

  }

});


// =========================
// ANIME COMMAND
// =========================

bot.onText(/\/anime (.+)/i, async (msg, match) => {

  const chatId = msg.chat.id;

  ensureUser(chatId);

  checkExpiry(chatId);

  if(!canUseAnime(users[chatId].plan)){

    return bot.sendMessage(chatId,
`⚠️ Buy a premium plan to access Anime.`);
  }

  const input = match[1].toLowerCase();

  let language = "hindi";

  if(input.includes("english")){
    language = "english";
  }

  const cleaned = input
    .replace("english","")
    .replace("hindi","")
    .trim();

  const parts = cleaned.split("season");

  if(parts.length < 2){

    return bot.sendMessage(chatId,
`❌ Correct Format:

/anime anime-name season 1
/anime anime-name season 1 english`);
  }

  const animeName = parts[0].trim();

  const season = "season " + parts[1].trim();

  const anime = animeDB[animeName];

  if(!anime){

    return bot.sendMessage(chatId,
    `❌ Anime not found.`);
  }

  if(!anime[season]){

    return bot.sendMessage(chatId,
    `❌ Season not found.`);
  }

  const episodes = anime[season][language];

  if(!episodes){

    return bot.sendMessage(chatId,
    `❌ ${language} language not available.`);
  }

  bot.sendMessage(chatId,
`🎌 Sending ${animeName} ${season}

🌐 Language:
${language}`);

  for(const ep of episodes){

    await bot.sendVideo(chatId, ep);

    await new Promise(r => setTimeout(r,1500));

  }

});


// =========================
// MOVIE COMMAND
// =========================

bot.onText(/\/movie (.+)/, (msg, match) => {

  const chatId = msg.chat.id;

  ensureUser(chatId);

  checkExpiry(chatId);

  if(!canUseMovie(users[chatId].plan)){

    return bot.sendMessage(chatId,
`⚠️ ₹100 Premium Plan required for Movies.`);
  }

  bot.sendMessage(chatId,
`🎬 Movie system ready.

Add your own movie database.`);
});


// =========================
// WEBSERIES COMMAND
// =========================

bot.onText(/\/webseries (.+)/, (msg, match) => {

  const chatId = msg.chat.id;

  ensureUser(chatId);

  checkExpiry(chatId);

  if(!canUseWebseries(users[chatId].plan)){

    return bot.sendMessage(chatId,
`⚠️ Upgrade to ₹50 or ₹100 plan for WebSeries.`);
  }

  bot.sendMessage(chatId,
`📺 WebSeries system ready.

Add your own webseries database.`);
});

// =========================
// PAYMENT BUTTONS
// =========================

bot.on("callback_query",(query)=>{

 const chatId = query.message.chat.id;
 const data = query.data;

 if(data === "pay20"){

   bot.sendPhoto(chatId,
   "AgACAgUAAxkBAAICJWn_BX9bvt0HOVooXrS_Y7VwpOngAAIQEGsbf1P4V02Yna5OBauhAQADAgADeAADOwQ",
   {
     caption:
`🍿 ₹20 Anime Basic Plan

━━━━━━━━━━━━━━
💰 Payment Details
━━━━━━━━━━━━━━

👤 Name:
Garming hack king

💳 UPI ID:
viramdevraj20@fam

━━━━━━━━━━━━━━
📌 Plan Benefits
━━━━━━━━━━━━━━

✅ Anime Access
✅ Hindi Dubbed
✅ 480p Quality
✅ Download Support
✅ 30 Days Validity

━━━━━━━━━━━━━━
⚠️ Important
━━━━━━━━━━━━━━

📩 Send payment screenshot to:
@MyflixO

⚠️ Fake screenshots may result in permanent ban.`
   });

 }

 if(data === "pay50"){

   bot.sendPhoto(chatId,
   "AgACAgUAAxkBAAICJGn_BUqfwwN0FHe7EzRRfhGHb8n2AAIPEGsbf1P4V4ijMEK46jkNAQADAgADeAADOwQ",
   {
     caption:
`🎬 ₹50 Anime + WebSeries Plan

━━━━━━━━━━━━━━
💰 Payment Details
━━━━━━━━━━━━━━

👤 Name:
Garming hack king

💳 UPI ID:
viramdevraj20@fam

━━━━━━━━━━━━━━
📌 Plan Benefits
━━━━━━━━━━━━━━

✅ Anime Access
✅ WebSeries Access
✅ 720p HD Quality
✅ Hindi + Some English
✅ Download Support
✅ 30 Days Validity

━━━━━━━━━━━━━━
⚠️ Important
━━━━━━━━━━━━━━

📩 Send payment screenshot to:
@MyflixO

⚠️ Fake screenshots may result in permanent ban.`
   });

 }

 if(data === "pay100"){

   bot.sendPhoto(chatId,
   "AgACAgUAAxkBAAICI2n_BMY4S8rRS53FvZ9B71iSeybAAAIOEGsbf1P4V3jkTRZMtrsZAQADAgADeAADOwQ",
   {
     caption:
`🔥 ₹100 Premium HD Plan

━━━━━━━━━━━━━━
💰 Payment Details
━━━━━━━━━━━━━━

👤 Name:
Garming hack king

💳 UPI ID:
viramdevraj20@fam

━━━━━━━━━━━━━━
📌 Plan Benefits
━━━━━━━━━━━━━━

✅ Anime Access
✅ Movies Access
✅ WebSeries Access
✅ 720p HD Streaming
✅ Hindi + English
✅ Download Support
✅ 30 Days Validity

━━━━━━━━━━━━━━
⚠️ Important
━━━━━━━━━━━━━━

📩 Send payment screenshot to:
@MyflixO

⚠️ Fake screenshots may result in permanent ban.`
   });

 }

});


// =========================
// ADMIN PLAN ACTIVATION
// =========================

bot.onText(/\/setplan (.+) (.+)/,(msg,match)=>{

 if(msg.chat.id !== ADMIN_ID){
   return;
 }

 const userId = match[1];
 const plan = match[2];

 ensureUser(userId);

 users[userId].plan = plan;

 users[userId].expiry =
   Date.now() + (30 * 24 * 60 * 60 * 1000);

 bot.sendMessage(userId,
`✅ Subscription Activated

💎 Active Plan:
₹${plan}/month

📅 Validity:
30 Days

Thank you for subscribing 🎬`);

 bot.sendMessage(msg.chat.id,
`✅ User plan updated.`);
});


// =========================
// WEBHOOK
// =========================

app.post(`/bot${token}`, (req, res) => {

  bot.processUpdate(req.body);

  res.sendStatus(200);

});


app.get('/', (req, res) => {
  res.send('MyFlix Bot Running');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
