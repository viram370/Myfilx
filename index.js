const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true
});

const users = {};

bot.onText(/\/start/, (msg) => {

  const chatId = msg.chat.id;

  if (!users[chatId]) {
    users[chatId] = {
      plan: "Free",
      balance: 0
    };
  }

  bot.sendMessage(chatId,
`🎬 Welcome to MyFlix Premium

Watch Anime, Movies & WebSeries directly on Telegram 📺

✨ Features:
• Fast streaming
• Download support
• Hindi dubbed content
• HD quality
• Premium anime & webseries
• Regular updates

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

  if(text === "🔍 Search"){

    bot.sendMessage(chatId,
`🔍 MyFlix Search System

Use these commands to search content:

🎌 Anime:
 /anime anime-name

🎬 Movies:
 /movie movie-name

📺 WebSeries:
 /webseries series-name

Examples:
• /anime naruto
• /movie kgf
• /webseries money heist

⚠️ Search results depend on your current subscription plan.`);
  }

  if(text === "👤 Account"){

    bot.sendMessage(chatId,
`👤 MyFlix Account Center

Manage your subscription, payments, and account details from here.

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

    bot.sendMessage(chatId,
`👤 Account Information

💎 Current Plan: ${users[chatId].plan}
💰 Wallet Balance: ₹${users[chatId].balance}
📅 Subscription Status: Active/Inactive

Upgrade your plan to unlock premium content.`);
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
• Newly released anime may take time to upload

━━━━━━━━━━━━━━
🎬 ₹50 / Month — Anime + WebSeries
━━━━━━━━━━━━━━
• Anime + WebSeries
• 720p quality
• Hindi available
• English available for selected content
• Download available

━━━━━━━━━━━━━━
🔥 ₹100 / Month — Premium HD
━━━━━━━━━━━━━━
• Anime + WebSeries + Movies
• Bollywood & Telugu Movies
• Hindi + English support
• 720p HD quality
• Fast access to trending content
• Download available

⚠️ Important:
• Popular content gets uploaded first
• Some content may take time to be added
• Old/rare content may not be available
• Use waitlist for requests

📞 Support: @MyflixO`);
  }

  if(text === "💳 Payment"){

    bot.sendMessage(chatId,
`💳 MyFlix Payment Center

Choose your preferred subscription plan below.

After payment:
✅ Send screenshot to support
✅ Verification may take a few minutes
✅ Your plan will activate after confirmation

⚠️ Do not spam payment requests.`,
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
• Newly released content may take time to upload
• Some old or rare content may not be available

━━━━━━━━━━━━━━
📌 Request Format
━━━━━━━━━━━━━━

Send details like:

🎌 Anime Name
🎬 Movie Name
📺 WebSeries Name

Optional:
• Language
• Quality
• Season/Episode

━━━━━━━━━━━━━━
🗳 Community Priority System
━━━━━━━━━━━━━━

The more users requesting the same content,
the higher the chance it gets added quickly.

━━━━━━━━━━━━━━
📩 Send Your Request
━━━━━━━━━━━━━━

👉 @MyflixO`);
  }

  if(text === "🆘 Support"){

    bot.sendMessage(chatId,
`🆘 MyFlix Support Center

Facing problems with:
• Payments
• Access issues
• Missing content
• Subscription activation
• Download problems
• Search issues

Contact official support below 👇

👤 Owner & Support:
@MyflixO

⏰ Reply time may vary depending on availability.

⚠️ Please avoid spam messages.`);
  }

  if(text === "📜 Terms & Privacy"){

    bot.sendMessage(chatId,
`📜 MyFlix Terms & Privacy

By using MyFlix, you agree to the following terms:

• Subscription fees are non-refundable after activation
• Content availability may change anytime
• Newly released content may take time to upload
• Sharing premium access/accounts may result in suspension
• Some content may only be available in selected languages
• MyFlix mainly focuses on trending and popular content
• Abuse, spam, or misuse may lead to permanent restriction

Privacy:
• User payment screenshots are only used for verification
• We do not sell personal user data
• Basic Telegram account information may be stored for subscription management

For support:
@MyflixO`);
  }

  if(text === "🔙 Back"){

    bot.sendMessage(chatId,
`🎬 Back to Main Menu`,
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

  bot.sendMessage(chatId,
`🎌 Searching Anime:
"${anime}"

⚠️ Anime not available currently or may still be uploading.

Use waitlist for faster priority:
@MyflixO`);
});

bot.onText(/\/movie (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const movie = match[1];

  bot.sendMessage(chatId,
`🎬 Searching Movie:
"${movie}"

⚠️ Movie not available currently or may still be uploading.

Use waitlist for faster priority:
@MyflixO`);
});

bot.onText(/\/webseries (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const webseries = match[1];

  bot.sendMessage(chatId,
`📺 Searching WebSeries:
"${webseries}"

⚠️ WebSeries not available currently or may still be uploading.

Use waitlist for faster priority:
@MyflixO`);
});

bot.on("callback_query", (query) => {

  const chatId = query.message.chat.id;
  const data = query.data;

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

Pay ₹${amt} using the QR code/payment method.

After payment:
✅ Send screenshot to @MyflixO
✅ Wait for verification
✅ Your plan will activate after approval

⚠️ Do not send fake screenshots.`);
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
