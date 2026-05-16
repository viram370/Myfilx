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

  "jujutsu kaisen": {

    "season 1": {

      hindi: [

        {
          episode:1,
          file_id:"BAACAgEAAxkBAAICLmn_C6Xz_hEo5HbIZM6mVt7imam8AAKsAwACjQUhRn2hNbdSJ8rKOwQ"
        },

        {
          episode:2,
          file_id:"BAACAgQAAxkBAAICL2n_C6UvGntFdoprJcWh1qPwAAG7NQACnA8AAtZOIFLBpVkEBEH9pzsE"
        },

        {
          episode:3,
          file_id:"BAACAgIAAxkBAAICMGn_C6U4-lsJjul3RsLm9E_NoiqVAALTKwACdS8pSl7e2L9r0wr0OwQ"
        },

        {
          episode:4,
          file_id:"BAACAgIAAxkBAAICMWn_C6X6jmiJ-zeh-c2QWwFYAyz7AALCLgACDo9hSjCJSJvDLRd2OwQ"
        },

        {
          episode:5,
          file_id:"BAACAgIAAxkBAAICMmn_C6XgoC0_eG3tuQbFI-35uzu7AALNLgACDo9hSt8cmCFInLN2OwQ"
        },

        {
          episode:6,
          file_id:"BAACAgEAAxkBAAICM2n_C6U8vonsVhIko02S21WwUR3KAAK0BgACbSVpRh2PUyL3-549OwQ"
        },

        {
          episode:7,
          file_id:"BAACAgEAAxkBAAICZGn_S1ro3zIIyF4v2eptZalBZVhyAAJBAgACcSCxRuXV3OGqSu3pOwQ"
        },

        {
          episode:8,
          file_id:"BAACAgEAAxkBAAICZWn_S1oKMRxeTgc08hMjJn-gqNzrAAJCAgACcSCxRtTZRtEfefoVOwQ"
        },

        {
          episode:9,
          file_id:"BAACAgUAAxkBAAICZmn_S1o-NUvL4pebWH_fAAHeck-wbwACPw4AAkdxqVb8mF5jYp7p7zsE"
        },

        {
          episode:10,
          file_id:"BAACAgUAAxkBAAICZ2n_S1riRSjWfaclM9bpHu_r5J7LAAL8DAACHVX5Vj3t7cD59xg9OwQ"
        },

        {
          episode:11,
          file_id:"BAACAgUAAxkBAAICaGn_S1pdRTc1fjZjg63Eb4nzOMv_AAL9DAACHVX5Vq0_g75N_Ze9OwQ"
        },

        {
          episode:12,
          file_id:"BAACAgUAAxkBAAICaWn_S1q2wU6gIYEZdHmuKfzWsM3QAAL-DAACHVX5VvbhbTnaCvyPOwQ"
        },

        {
          episode:13,
          file_id:"BAACAgQAAxkBAAICamn_S1rVW29t87cQykyvVhzuZ30JAAJiDQACBwABQFNA5-nT4LOS4jsE"
        },

        {
          episode:14,
          file_id:"BAACAgUAAxkBAAICa2n_S1oJeYrZYeUPSGpZDJo8sSXPAALeCgACTNJAV21RvbJBNqtLOwQ"
        },

        {
          episode:15,
          file_id:"BAACAgEAAxkBAAICbGn_S1rDYBxuBNWfe03VfzMCodMYAAL_AgACBclAR2ccdDya0dBGOwQ"
        },

        {
          episode:16,
          file_id:"BAACAgEAAxkBAAICbWn_S1pM3sbpQjPwrof4KadW8nxQAAKLAwACujSQR_ue1mnCOc3hOwQ"
        },

        {
          episode:17,
          file_id:"BAACAgUAAxkBAAICbmn_S1o1MrfnWRorKxEcTyCAZ7e0AAL4CgACvwWIV1iAKmrNE4MAATsE"
        },

        {
          episode:18,
          file_id:"BAACAgUAAxkBAAICb2n_S1p6xzDw8xiGiHULr-RoB9ZrAAJVCgACTLqRV-lRyG4kAAF7jzsE"
        },

        {
          episode:19,
          file_id:"BAACAgUAAxkBAAICcGn_S1psiRAEEAJ22J2EyZ_BY6a9AALVCwAC0OzYV-8ymIrSe23kOwQ"
        },

        {
          episode:20,
          file_id:"BAACAgUAAxkBAAICcWn_S1qR1G2VKOuJRp2twsBP8tiBAAKxCgACc-DRVx2Tjo780z-GOwQ"
        },

        {
          episode:21,
          file_id:"BAACAgUAAxkBAAICcmn_S1qOGJCbz_a2H0Gj9uRoS8GPAALXCwAC0OzYV-rKzovU8PHzOwQ"
        },

        {
          episode:22,
          file_id:"BAACAgIAAxkBAAICc2n_S1oNacGvKZANC1QiVwABe0QOhAACSjEAAi-BIEhrfMHMFuR3vjsE"
        },

        {
          episode:23,
          file_id:"BAACAgIAAxkBAAICdGn_S1pXZWUaa7QWfVF52oFn6AeOAAIvMgACL4EgSBHR3iPzJNhxOwQ"
        },

        {
          episode:24,
          file_id:"BAACAgIAAxkBAAICdWn_S1pt6noy2jDItroaB47OT01GAAKzMQACL4EgSH6AbdSlAvcROwQ"
        }

      ]

    },
    "season 2": {

  hindi: [

    {
      episode:1,
      file_id:"BAACAgUAAxkBAAFJqyNqBtXvMu5LeVDK3F8AAc3J24lM0zsAAtgKAAJhsGhUQI4zjDJGTGA7BA"
    },

    {
      episode:2,
      file_id:"BAACAgEAAxkBAAFJqyRqBtXvJz978bki1GAPxS5GfHiHSQACKAQAAlIesUTR93zWrtvZYTsE"
    },

    {
      episode:3,
      file_id:"BAACAgUAAxkBAAFJqyVqBtXvfbCqmcfAQEmhQOHT4A643AACggwAArTc-FQypaWKaEdCAAE7BA"
    },

    {
      episode:4,
      file_id:"BAACAgUAAxkBAAFJqyZqBtXvodY_7WWMK-UVhnePOJiK8gACAg0AAlalSVXFswZDUlAG5TsE"
    },

    {
      episode:5,
      file_id:"BAACAgUAAxkBAAFJqydqBtXvVOeicMQhJRS2xbkM7kMTtAACbAoAAtGwkVUG_gGqWT2UmTsE"
    },

    {
      episode:6,
      file_id:"BAACAgQAAxkBAAFJqyhqBtXvVns1Y5-qpZZ97E3zO04GNwAC6A4AAt040VP0H1dl4kXyWDsE"
    },

    {
      episode:7,
      file_id:"BAACAgUAAxkBAAFJqylqBtXvvQ-HJr6ANqI6J8DmIYCmEQACSQsAAk_fIFZ-_R5TgVI7PzsE"
    },

    {
      episode:8,
      file_id:"BAACAgUAAxkBAAFJqypqBtXvFLQyZ6Ya-xsfGvbsUIaxuwACdAwAAnbScVbF1VHLMdACfzsE"
    },

    {
      episode:9,
      file_id:"BAACAgUAAxkBAAFJqytqBtXvZqSeAfy1_xY5z347JZTL4AACgA0AAmq-sVaxBgWXheP3ZDsE"
    },

    {
      episode:10,
      file_id:"BAACAgUAAxkBAAFJqyxqBtXvjcaRdBcl3ke1WM5G_RlgjwACYQsAAnZNAVeAcJ7uBOX5zDsE"
    },

    {
      episode:11,
      file_id:"BAACAgEAAxkBAAFJqy1qBtXvF6Y369TVIpb-DeDstWuSjgACsgMAApbuSUezHeoTtJgyBTsE"
    },

    {
      episode:12,
      file_id:"BAACAgUAAxkBAAFJqy5qBtXv7f5OL0efe94Rr1HzPAtJKgAC_Q0AAoc8kVf4uYvo5WJpajsE"
    },

    {
      episode:13,
      file_id:"BAACAgUAAxkBAAFJqy9qBtXvqxHFI615x3SDQfh-yiuMZQACjg0AAk7B4FdYkMiaaPOPFTsE"
    },

    {
      episode:14,
      file_id:"BAACAgUAAxkBAAFJqzBqBtXv6XAwZRbCCEZ7hNzgkuSpMQACuQsAAnSFKFT0ZUN9SuLN5jsE"
    },

    {
      episode:15,
      file_id:"BAACAgUAAxkBAAFJqzFqBtXvI2at7ae2N1VGoJfK1P9YewACjgsAAgdBeFREkeW8TZhjqDsE"
    },

    {
      episode:16,
      file_id:"BAACAgUAAxkBAAFJqzJqBtXv_BNZMncg10XEQ5SvqDMFaQACjgwAAlXzuFQSL3A6Tt7YEDsE"
    },

    {
      episode:17,
      file_id:"BAACAgUAAxkBAAFJqzNqBtXvji4zRRVzESdg2pfmWF0BbQACdQ0AAqMVAVXpD6yfwdD3fjsE"
    },

    {
      episode:18,
      file_id:"BAACAgUAAxkBAAFJqzRqBtXvNgKh1Qe4xxgmuairyeTp_AACfQ0AAoj7UFUd4Q_nUjxN_TsE"
    },

    {
      episode:19,
      file_id:"BAACAgUAAxkBAAFJqzVqBtXvjmRjxz8DiT4qJv_6QXFvRgACUQ0AAqjpmFUNSvH93aX8GzsE"
    },

    {
      episode:20,
      file_id:"BAACAgQAAxkBAAFJqzZqBtXv5nJp-HP_NbXcBHFyleih5gACLRQAAmk-4VGZlvE71o_4zDsE"
    },

    {
      episode:21,
      file_id:"BAACAgQAAxkBAAFJqzdqBtXvHKYdAghgBCMqWM6TLvGW6gAC1A4AAuO2MFJQhTJ3pTVZNzsE"
    },

    {
      episode:22,
      file_id:"BAACAgUAAxkBAAFJqzhqBtXvEYz7vd1zTFbPrtYDk7xVwAAC1AoAA31wVv_QOsrWcCzeOwQ"
    },

    {
      episode:23,
      file_id:"BAACAgUAAxkBAAFJqzlqBtXv6EV4R_J-Figj1hTRPRe0GgACag4AAkIYwVbDS59HoAwfEjsE"
    }

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

// PHOTO
bot.on('photo', (msg) => {

  const photo = msg.photo;

  const fileId = photo[photo.length - 1].file_id;

  console.log("PHOTO FILE ID:");
  console.log(fileId);

});


// VIDEO
bot.on('video', (msg) => {

  console.log("VIDEO FILE ID:");
  console.log(msg.video.file_id);

});


// DOCUMENT VIDEO
bot.on('document', (msg) => {

  console.log("DOCUMENT FILE ID:");
  console.log(msg.document.file_id);

});


// ANY MESSAGE DEBUG
bot.on('message', (msg) => {

  console.log(JSON.stringify(msg,null,2));

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
`📝 MyFlix Advanced Waitlist System

━━━━━━━━━━━━━━━━━━
🎬 About Waitlist System
━━━━━━━━━━━━━━━━━━

Can’t find your favorite Anime, Movie, or WebSeries?

No problem.

MyFlix uses an advanced waitlist request system where users can request content directly for future upload priority.

━━━━━━━━━━━━━━━━━━
🔥 How It Works
━━━━━━━━━━━━━━━━━━

1️⃣ User requests content

2️⃣ Requests are monitored by popularity

3️⃣ Highly requested content receives upload priority

4️⃣ Premium users may receive faster upload priority

━━━━━━━━━━━━━━━━━━
📌 You Can Request
━━━━━━━━━━━━━━━━━━

🎌 Anime
🎬 Movies
📺 WebSeries

━━━━━━━━━━━━━━━━━━
🌐 Request Details
━━━━━━━━━━━━━━━━━━

Please include:

• Anime/Movie/WebSeries Name
• Language Preference
• Season Number
• Episode Number
• Preferred Quality

Example:

Jujutsu Kaisen Season 2 Hindi 720p

━━━━━━━━━━━━━━━━━━
⚡ Priority System
━━━━━━━━━━━━━━━━━━

🔥 Trending Requests
→ Uploaded Faster

💎 Premium User Requests
→ Higher Priority

📈 Multiple User Requests
→ Better Upload Chance

━━━━━━━━━━━━━━━━━━
⚠️ Important Information
━━━━━━━━━━━━━━━━━━

• Newly released content may take time
• Some old content may not be available
• Availability depends on source quality
• Certain languages may not exist

━━━━━━━━━━━━━━━━━━
📩 Send Waitlist Request
━━━━━━━━━━━━━━━━━━

👉 @MyflixO

Thank you for helping improve MyFlix Premium 🎬`);
  }


  // =========================
  // SUPPORT
  // =========================

  if(text === "🆘 Support"){

    bot.sendMessage(chatId,
`🆘 MyFlix Premium Support Center

━━━━━━━━━━━━━━━━━━
🎬 Welcome To Official Support
━━━━━━━━━━━━━━━━━━

Need help with your subscription, payment, streaming, downloads, or account?

Our support system is available to assist users with all MyFlix related issues and premium services.

━━━━━━━━━━━━━━━━━━
📌 Support Available For
━━━━━━━━━━━━━━━━━━

✅ Payment Verification
✅ Subscription Activation
✅ Anime Access Issues
✅ Movie Playback Problems
✅ WebSeries Not Found
✅ Waitlist Requests
✅ Plan Upgrade Assistance
✅ Download Problems
✅ Technical Errors
✅ Account Questions

━━━━━━━━━━━━━━━━━━
⚡ Premium Features
━━━━━━━━━━━━━━━━━━

• HD Streaming Support
• Fast Telegram Delivery
• Download Enabled Content
• Hindi Dubbed Anime
• Premium WebSeries
• Bollywood & Telugu Movies
• Trending Upload Priority

━━━━━━━━━━━━━━━━━━
📩 Official Support Contact
━━━━━━━━━━━━━━━━━━

👤 Owner & Support:
👉 @MyflixO

⏰ Support reply time may vary depending on request volume.

━━━━━━━━━━━━━━━━━━
⚠️ Important Notice
━━━━━━━━━━━━━━━━━━

• Avoid spam messages
• Fake payment screenshots may result in permanent restriction
• Newly released content may take time to upload
• Some requested content may enter waitlist system first

Thank you for supporting MyFlix Premium 🎬`);
  }


  // =========================
  // TERMS
  // =========================

  if(text === "📜 Terms & Privacy"){

    bot.sendMessage(chatId,
`📜 MyFlix Terms & Privacy Policy

━━━━━━━━━━━━━━━━━━
📌 Terms Of Service
━━━━━━━━━━━━━━━━━━

By using MyFlix Premium services, users agree to follow all subscription rules, account policies, and platform guidelines.

━━━━━━━━━━━━━━━━━━
💎 Subscription Terms
━━━━━━━━━━━━━━━━━━

• Subscription validity is limited to purchased duration
• Most plans are valid for 30 days
• Expired subscriptions automatically return to Free plan
• Subscription fees are non-refundable
• Premium features depend on active plan

━━━━━━━━━━━━━━━━━━
⚠️ User Responsibilities
━━━━━━━━━━━━━━━━━━

Users must avoid:

❌ Sharing account access
❌ Spam activity
❌ Fake payment screenshots
❌ Abuse of premium services
❌ Unauthorized redistribution

Violation may result in:
🚫 Temporary restriction
🚫 Permanent suspension

━━━━━━━━━━━━━━━━━━
🎬 Content Information
━━━━━━━━━━━━━━━━━━

• Newly released content may take time to upload
• Some requested content may enter waitlist system
• Availability may vary by language or quality
• Older content may not always be available

━━━━━━━━━━━━━━━━━━
🔒 Privacy Policy
━━━━━━━━━━━━━━━━━━

MyFlix may temporarily store:

• Telegram User ID
• Subscription Details
• Payment Verification Information

Your personal data is not sold to third parties.

━━━━━━━━━━━━━━━━━━
🆘 Official Support
━━━━━━━━━━━━━━━━━━

👉 @MyflixO

Thank you for using MyFlix Premium 🎬`);
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

const sentMessages = [];

for(const ep of episodes){

  const sent = await bot.sendVideo(
    chatId,
    ep.file_id,
    {
      caption:
`🎌 ${animeName.toUpperCase()}
📀 ${season.toUpperCase()}

🎬 Episode ${ep.episode}

━━━━━━━━━━━━━━━━━━
⚡ Powered By MyFlix
━━━━━━━━━━━━━━━━━━`
    }
  );

  sentMessages.push(sent.message_id);

  await new Promise(r => setTimeout(r,1500));

}


const warning = await bot.sendMessage(chatId,
`⚠️ Important Download Notice

━━━━━━━━━━━━━━━━━━
📥 Save Your Episodes Now
━━━━━━━━━━━━━━━━━━

All uploaded episodes will automatically disappear from this chat after 30 minutes.

To avoid losing access:

✅ Save videos to Saved Messages
✅ Forward episodes to your private chat
✅ Download videos to your device

━━━━━━━━━━━━━━━━━━
⚡ Important Information
━━━━━━━━━━━━━━━━━━

• Expired videos cannot be restored instantly
• Re-upload requests may take time
• Premium users should save important episodes immediately

━━━━━━━━━━━━━━━━━━
🎬 Thank You For Using MyFlix Premium
━━━━━━━━━━━━━━━━━━`);

setTimeout(async () => {

  try{

    for(const msgId of sentMessages){

      await bot.deleteMessage(chatId,msgId);

    }

    await bot.deleteMessage(chatId,warning.message_id);

    await bot.sendMessage(chatId,
`🗑 Episodes expired successfully.

Use search again anytime.`);

  }catch(err){

    console.log(err);

  }

},30 * 60 * 1000);
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
