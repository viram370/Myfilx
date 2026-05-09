const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token);

const PORT = process.env.PORT || 10000;

const RENDER_URL = process.env.RENDER_EXTERNAL_URL;

bot.setWebHook(`${RENDER_URL}/bot${token}`);

app.use(express.json());

const ADMIN_ID = 6097315530;

const users = {};

function ensureUser(chatId){

  if(!users[chatId]){

    users[chatId] = {
      plan: "Free",
      balance: 0
    };

  }

}

function getPlanBenefits(plan){

  if(plan === "20"){
    return `
🍿 ₹20 Anime Basic Plan

✅ Anime Only
✅ Hindi Dubbed Anime
✅ 480p Streaming
✅ Download Available
✅ Popular Anime Access`;
  }

  if(plan === "50"){
    return `
🎬 ₹50 Anime + WebSeries Plan

✅ Anime + WebSeries
✅ 720p HD Quality
✅ Hindi Content
✅ Some English Content
✅ Download Available`;
  }

  if(plan === "100"){
    return `
🔥 ₹100 Premium HD Plan

✅ Anime + WebSeries + Movies
✅ Bollywood & Telugu Movies
✅ Hindi + English Support
✅ 720p HD Streaming
✅ Premium Access
✅ Download Available`;
  }

  return `
🆓 Free Plan

❌ No Premium Access
❌ Limited Features`;
}


// =========================
// GET FILE ID SYSTEM
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

  bot.sendMessage(chatId,
`🎬 Welcome To MyFlix Premium

Watch Anime, Movies & WebSeries directly on Telegram 📺

━━━━━━━━━━━━━━
✨ Features
━━━━━━━━━━━━━━

• Fast streaming
• Download support
• Hindi dubbed content
• HD quality
• Premium anime & webseries
• Regular updates
• Waitlist system
• Trending uploads

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
// MESSAGE HANDLER
// =========================

bot.on('message', (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  ensureUser(chatId);

  if(text === "🔍 Search"){

    bot.sendMessage(chatId,
`🔍 MyFlix Search System

━━━━━━━━━━━━━━
🎌 Anime Search
━━━━━━━━━━━━━━

/anime anime-name

━━━━━━━━━━━━━━
🎬 Movie Search
━━━━━━━━━━━━━━

/movie movie-name

━━━━━━━━━━━━━━
📺 WebSeries Search
━━━━━━━━━━━━━━

/webseries series-name

⚠️ Search results depend on your subscription plan.`);
  }


  if(text === "👤 Account"){

    bot.sendMessage(chatId,
`👤 MyFlix Account Center

Manage your subscription and account here.`,
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


  if(text === "👤 Account Info"){

    const userPlan = users[chatId].plan;

    bot.sendMessage(chatId,
`👤 MyFlix Premium Account

━━━━━━━━━━━━━━
📌 Account Details
━━━━━━━━━━━━━━

🆔 User ID: ${chatId}
💎 Current Plan: ${userPlan}
💰 Wallet Balance: ₹${users[chatId].balance}
📅 Subscription Status: Active / Inactive

━━━━━━━━━━━━━━
🎁 Your Plan Benefits
━━━━━━━━━━━━━━

${getPlanBenefits(userPlan)}

━━━━━━━━━━━━━━
🆘 Support
━━━━━━━━━━━━━━

👉 @MyflixO`);
  }


  if(text === "💎 Plans"){

    bot.sendMessage(chatId,
`💎 MyFlix Premium Plans

━━━━━━━━━━━━━━
🍿 ₹20 / Month
━━━━━━━━━━━━━━
• Anime only
• Hindi dubbed
• 480p quality

━━━━━━━━━━━━━━
🎬 ₹50 / Month
━━━━━━━━━━━━━━
• Anime + WebSeries
• 720p quality
• Hindi + Some English

━━━━━━━━━━━━━━
🔥 ₹100 / Month
━━━━━━━━━━━━━━
• Anime + Movies + WebSeries
• HD quality
• Hindi + English

📞 Support:
@MyflixO`);
  }


  if(text === "💳 Payment"){

    bot.sendMessage(chatId,
`💳 MyFlix Payment Center

━━━━━━━━━━━━━━
👤 Payment Details
━━━━━━━━━━━━━━

🏷 Name:
Garming hack king

💰 UPI ID:
viramdevraj20@fam

━━━━━━━━━━━━━━
📌 Select Plan
━━━━━━━━━━━━━━`,
{
  reply_markup:{
    inline_keyboard:[
      [{text:"🍿 Buy ₹20 Plan",callback_data:"pay20"}],
      [{text:"🎬 Buy ₹50 Plan",callback_data:"pay50"}],
      [{text:"🔥 Buy ₹100 Plan",callback_data:"pay100"}]
    ]
  }
});

  }


  if(text === "📝 Waitlist"){

    bot.sendMessage(chatId,
`📝 MyFlix Waitlist System

Request your favorite:
🎌 Anime
🎬 Movies
📺 WebSeries

Popular requests may be uploaded faster.

Send request to:
👉 @MyflixO`);
  }


  if(text === "🆘 Support"){

    bot.sendMessage(chatId,
`🆘 MyFlix Support Center

Issues:
• Payments
• Missing content
• Activation problems
• Download issues

👤 Official Support:
👉 @MyflixO`);
  }


  if(text === "📜 Terms & Privacy"){

    bot.sendMessage(chatId,
`📜 MyFlix Terms & Privacy

• Subscription fees are non-refundable
• Content may take time to upload
• Sharing accounts may result in suspension
• Abuse or spam may result in restriction

🔒 User data is not sold.`);
  }


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
// SEARCH COMMANDS
// =========================

bot.onText(/\/anime (.+)/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
`🎌 Anime search currently unavailable.

Use waitlist:
👉 @MyflixO`);
});


bot.onText(/\/movie (.+)/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
`🎬 Movie search currently unavailable.

Use waitlist:
👉 @MyflixO`);
});


bot.onText(/\/webseries (.+)/, (msg, match) => {

  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
`📺 WebSeries search currently unavailable.

Use waitlist:
👉 @MyflixO`);
});


// =========================
// PAYMENT BUTTONS
// =========================

bot.on("callback_query",(query)=>{

 const chatId = query.message.chat.id;
 const data = query.data;

 if(data === "pay20"){

   bot.sendPhoto(chatId,
   "ADD_20_RS_QR_FILE_ID",
   {
     caption:
`🍿 ₹20 Anime Basic Plan

💰 UPI:
viramdevraj20@fam

👤 Name:
Garming hack king

📩 Send payment screenshot to:
@MyflixO`
   });

 }

 if(data === "pay50"){

   bot.sendPhoto(chatId,
   "ADD_50_RS_QR_FILE_ID",
   {
     caption:
`🎬 ₹50 Anime + WebSeries Plan

💰 UPI:
viramdevraj20@fam

👤 Name:
Garming hack king

📩 Send payment screenshot to:
@MyflixO`
   });

 }

 if(data === "pay100"){

   bot.sendPhoto(chatId,
   "ADD_100_RS_QR_FILE_ID",
   {
     caption:
`🔥 ₹100 Premium HD Plan

💰 UPI:
viramdevraj20@fam

👤 Name:
Garming hack king

📩 Send payment screenshot to:
@MyflixO`
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

 bot.sendMessage(userId,
`✅ Subscription Activated

💎 Active Plan: ₹${plan}/month

Thank you for subscribing to MyFlix Premium 🎬`);

 bot.sendMessage(msg.chat.id,
`✅ User plan updated successfully.`);
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
