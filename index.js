const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  }
});

bot.deleteWebHook({ drop_pending_updates: true });

bot.on("polling_error", (error) => {
  console.log("Polling Error:", error.message);
});

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
✅ Popular Anime Access
⚠️ Newly Released Anime May Take Time`;
  }

  if(plan === "50"){
    return `
🎬 ₹50 Anime + WebSeries Plan

✅ Anime + WebSeries
✅ 720p HD Quality
✅ Hindi Content
✅ Some English Content
✅ Download Available
✅ Trending Upload Priority`;
  }

  if(plan === "100"){
    return `
🔥 ₹100 Premium HD Plan

✅ Anime + WebSeries + Movies
✅ Bollywood & Telugu Movies
✅ Hindi + English Support
✅ 720p HD Streaming
✅ Premium Content Access
✅ Trending Content Priority
✅ Download Available`;
  }

  return `
🆓 Free Plan

❌ No Premium Access
❌ Limited Features

Upgrade your plan to unlock premium content.`;
}

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
• Advanced waitlist system
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

Examples:
• /anime naruto
• /anime one piece

━━━━━━━━━━━━━━
🎬 Movie Search
━━━━━━━━━━━━━━

/movie movie-name

Examples:
• /movie kgf
• /movie avengers

━━━━━━━━━━━━━━
📺 WebSeries Search
━━━━━━━━━━━━━━

/webseries series-name

Examples:
• /webseries money heist
• /webseries stranger things

⚠️ Search results depend on your subscription plan.`);
  }

  if(text === "👤 Account"){

    bot.sendMessage(chatId,
`👤 MyFlix Account Center

Manage your subscription, plans, payments, and account details here.

Select an option below 👇`,
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
⚠️ Important Information
━━━━━━━━━━━━━━

• Content availability depends on plan
• Newly released content may take time
• Some content may require waitlist request
• Sharing account access may result in restriction

━━━━━━━━━━━━━━
🆘 Need Help?
━━━━━━━━━━━━━━

Official Support:
👉 @MyflixO`);
  }

  if(text === "💎 Plans"){

    bot.sendMessage(chatId,
`💎 MyFlix Premium Plans

━━━━━━━━━━━━━━
🍿 ₹20 / Month — Anime Basic
━━━━━━━━━━━━━━

• Anime only
• Hindi dubbed
• 480p quality
• Download available
• Newly released anime may take time

━━━━━━━━━━━━━━
🎬 ₹50 / Month — Anime + WebSeries
━━━━━━━━━━━━━━

• Anime + WebSeries
• 720p quality
• Hindi available
• Some English content
• Download available

━━━━━━━━━━━━━━
🔥 ₹100 / Month — Premium HD
━━━━━━━━━━━━━━

• Anime + WebSeries + Movies
• Bollywood & Telugu Movies
• Hindi + English support
• 720p HD quality
• Trending content priority
• Download available

⚠️ Important:
• Popular content uploaded first
• Old content may not be available
• Use waitlist for requests

📞 Support:
@MyflixO`);
  }

  if(text === "💳 Payment"){

    bot.sendMessage(chatId,
`💳 MyFlix Payment Center

Choose your preferred subscription plan below.

━━━━━━━━━━━━━━
📌 Payment Information
━━━━━━━━━━━━━━

✅ Send screenshot after payment
✅ Verification may take a few minutes
✅ Plan activates after confirmation

⚠️ Fake payment screenshots may result in restriction.`,
{
  reply_markup:{
    inline_keyboard:[
      [{text:"₹20 / Month",callback_data:"pay20"}],
      [{text:"₹50 / Month",callback_data:"pay50"}],
      [{text:"₹100 / Month",callback_data:"pay100"}]
    ]
  }
});

  }

  if(text === "📝 Waitlist"){

    bot.sendMessage(chatId,
`📝 MyFlix Advanced Waitlist System

Can’t find your favorite Anime, Movie, or WebSeries?

━━━━━━━━━━━━━━
🔥 How It Works
━━━━━━━━━━━━━━

• Users can request any Anime, Movie, or WebSeries
• Popular requests may get uploaded faster
• Trending content gets higher priority
• Community requested content may be added first

━━━━━━━━━━━━━━
📌 Request Format
━━━━━━━━━━━━━━

Send:
🎌 Anime Name
🎬 Movie Name
📺 WebSeries Name

Optional:
• Language
• Quality
• Season/Episode

━━━━━━━━━━━━━━
🗳 Community Priority
━━━━━━━━━━━━━━

The more users requesting the same content,
the higher chance it gets uploaded quickly.

━━━━━━━━━━━━━━
📩 Send Request
━━━━━━━━━━━━━━

👉 @MyflixO`);
  }

  if(text === "🆘 Support"){

    bot.sendMessage(chatId,
`🆘 MyFlix Support Center

Facing issues with:
• Payments
• Missing content
• Subscription activation
• Download problems
• Search problems
• Account access

━━━━━━━━━━━━━━
📩 Official Support
━━━━━━━━━━━━━━

👤 Owner & Support:
@MyflixO

⏰ Reply time may vary.

⚠️ Avoid spam messages.`);
  }

  if(text === "📜 Terms & Privacy"){

    bot.sendMessage(chatId,
`📜 MyFlix Terms & Privacy

━━━━━━━━━━━━━━
📌 Terms Of Service
━━━━━━━━━━━━━━

• Subscription fees are non-refundable
• Content availability may change
• Newly released content may take time
• Sharing accounts may result in suspension
• Abuse or spam may result in restriction

━━━━━━━━━━━━━━
🔒 Privacy Policy
━━━━━━━━━━━━━━

• Payment screenshots used only for verification
• Telegram account information may be stored
• User data is not sold

━━━━━━━━━━━━━━
🆘 Support
━━━━━━━━━━━━━━

👉 @MyflixO`);
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

bot.onText(/\/anime (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const anime = match[1];

  ensureUser(chatId);

  bot.sendMessage(chatId,
`🎌 Searching Anime:
"${anime}"

⚠️ Anime not available currently or still uploading.

Use waitlist for faster priority:
👉 @MyflixO`);
});

bot.onText(/\/movie (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const movie = match[1];

  ensureUser(chatId);

  bot.sendMessage(chatId,
`🎬 Searching Movie:
"${movie}"

⚠️ Movie not available currently or still uploading.

Use waitlist for faster priority:
👉 @MyflixO`);
});

bot.onText(/\/webseries (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const webseries = match[1];

  ensureUser(chatId);

  bot.sendMessage(chatId,
`📺 Searching WebSeries:
"${webseries}"

⚠️ WebSeries not available currently or still uploading.

Use waitlist for faster priority:
👉 @MyflixO`);
});

bot.on("callback_query", (query) => {

  const chatId = query.message.chat.id;
  const data = query.data;

  ensureUser(chatId);

  let amount = 0;

  if(data === "pay20") amount = 20;
  if(data === "pay50") amount = 50;
  if(data === "pay100") amount = 100;

  if(amount > 0){

    bot.sendMessage(chatId,
`💳 Confirm Payment

Selected Plan: ₹${amount}/month

Click confirm to continue payment.`,
{
  reply_markup:{
    inline_keyboard:[
      [
        {text:"❌ Cancel",callback_data:"cancel"},
        {text:"✅ Confirm Payment",callback_data:`confirm_${amount}`}
      ]
    ]
  }
});

  }

  if(data.startsWith("confirm_")){

    const amt = data.split("_")[1];

    bot.sendMessage(chatId,
`📱 Payment Instructions

Pay ₹${amt} using your payment method.

After payment:
✅ Send screenshot to @MyflixO
✅ Wait for verification
✅ Your plan activates after approval

⚠️ Fake screenshots may result in restriction.`);
  }

  if(data === "cancel"){

    bot.sendMessage(chatId,
`❌ Payment Cancelled

You can purchase anytime from Account → Payment.`);
  }

});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('MyFlix Bot Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("MyFlix Bot Running...");
