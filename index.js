
// =========================
// REQUIRED PACKAGES
// =========================

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs
} = require("firebase/firestore");

const app = express();
const firebaseConfig = {
  apiKey: "AIzaSyBqWwfapX_rvJLeYFA7ikzl-hvfnabp6Z8",
  authDomain: "myfilx-635aa.firebaseapp.com",
  projectId: "myfilx-635aa",
  storageBucket: "myfilx-635aa.firebasestorage.app",
  messagingSenderId: "759079187430",
  appId: "1:759079187430:web:05f9480cecb84f1712dc27",
  measurementId: "G-XPYJS7PTWD"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const lastVideo = {};
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { webHook: true });

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

// =========================
// SAMPLE ANIME DATABASE
// Replace file IDs yourself
// =========================
bot.on("video",(msg)=>{

  lastVideo[msg.chat.id] =
    msg.video.file_id;

});


// =========================
// USER SYSTEM
// =========================
async function ensureUser(chatId) {
  const ref = doc(db, "users", String(chatId));
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, { plan: "Free", balance: 0, expiry: null });
  }
}

async function getUser(chatId) {
  const ref = doc(db, "users", String(chatId));
  const snap = await getDoc(ref);
  return snap.data();
}

async function checkExpiry(chatId) {
  const ref = doc(db, "users", String(chatId));
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const user = snap.data();
  if (user.expiry && Date.now() > user.expiry) {
    await setDoc(ref, { ...user, plan: "Free", expiry: null });
  }
}
bot.onText(
/\/saveanime (.+)/,
async (msg,match)=>{

  if(msg.chat.id !== ADMIN_ID){
    return;
  }

  const fileId =
    lastVideo[msg.chat.id];

  if(!fileId){

    return bot.sendMessage(
      msg.chat.id,
`❌ Upload a video first`
    );

  }

  const args =
    match[1].split("|");

  if(args.length < 3){

    return bot.sendMessage(
      msg.chat.id,
`❌ Format:

/saveanime anime|season|language`
    );

  }

  const anime =
    args[0].trim().toLowerCase();

  const season =
    args[1].trim().toLowerCase();

  const language =
    args[2].trim().toLowerCase();

  const epRef = collection(
    db,
    "anime",
    anime,
    "seasons",
    season,
    "languages",
    language,
    "episodes"
  );

  const snap =
    await getDocs(epRef);

  let nextEpisode = 1;

  if(!snap.empty){

    nextEpisode =
      snap.size + 1;

  }

  await setDoc(

    doc(
      db,
      "anime",
      anime,
      "seasons",
      season,
      "languages",
      language,
      "episodes",
      "ep" + nextEpisode
    ),

    {
      episode:nextEpisode,
      file_id:fileId
    },

    { merge:true }

  );

  bot.sendMessage(
    msg.chat.id,
`✅ Episode ${nextEpisode} saved`
  );

});


// =========================
// PLAN ACCESS SYSTEM
// =========================

function canUseAnime(plan) {
  return (plan === "20" || plan === "50" || plan === "100");
}

function canUseMovie(plan) {
  return (plan === "100");
}

function canUseWebseries(plan) {
  return (plan === "50" || plan === "100");
}

// =========================
// PLAN BENEFITS
// =========================

function getPlanBenefits(plan) {
  if (plan === "20") {
    return `
🍿 ₹20 Anime Basic

✅ Anime Access
✅ Hindi Dubbed
✅ 480p Quality
✅ Downloads`;
  }

  if (plan === "50") {
    return `
🎬 ₹50 Anime + WebSeries

✅ Anime Access
✅ WebSeries Access
✅ 720p HD
✅ Hindi + Some English`;
  }

  if (plan === "100") {
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

// =========================
// START
// =========================
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  await ensureUser(chatId);
  await checkExpiry(chatId);

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
      reply_markup: {
        keyboard: [
          ["🔍 Search", "👤 Account"],
          ["📝 Waitlist", "🆘 Support"],
          ["📜 Terms & Privacy"]
        ],
        resize_keyboard: true
      }
    }
  );
});

// =========================
// MAIN MESSAGE HANDLER
// =========================
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  await ensureUser(chatId);
  await checkExpiry(chatId);

  // =========================
  // SEARCH
  // =========================

  if (text === "🔍 Search") {
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

/webseries series-name`
    );
  }

  // =========================
  // ACCOUNT MENU
  // =========================

  if (text === "👤 Account") {
    bot.sendMessage(chatId, `👤 MyFlix Account Center`,
      {
        reply_markup: {
          keyboard: [
            ["💎 Plans", "💳 Payment"],
            ["👤 Account Info", "🔙 Back"]
          ],
          resize_keyboard: true
        }
      }
    );
  }

  // =========================
  // ACCOUNT INFO
  // =========================

  if (text === "👤 Account Info") {
    const user = await getUser(chatId);

    bot.sendMessage(chatId,
      `👤 MyFlix Premium Account

━━━━━━━━━━━━━━
📌 Account Details
━━━━━━━━━━━━━━

🆔 User ID:
${chatId}

💎 Current Plan:
${user.plan}

💰 Wallet Balance:
₹${user.balance}

📅 Plan Expiry:
${user.expiry ? new Date(user.expiry).toLocaleDateString() : "No Active Plan"}

━━━━━━━━━━━━━━
🎁 Plan Benefits
━━━━━━━━━━━━━━

${getPlanBenefits(user.plan)}

━━━━━━━━━━━━━━
🆘 Support
━━━━━━━━━━━━━━

👉 @MyflixO`
    );
  }

  // =========================
  // PLANS
  // =========================

  if (text === "💎 Plans") {
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
✅ Hindi + English`
    );
  }

  // =========================
  // PAYMENT
  // =========================

  if (text === "💳 Payment") {
    bot.sendMessage(chatId,
      `💳 MyFlix Payment Center

👤 Name:
Garming hack king

💰 UPI:
viramdevraj20@fam

Select your plan below 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🍿 ₹20 Plan", callback_data: "pay20" }],
            [{ text: "🎬 ₹50 Plan", callback_data: "pay50" }],
            [{ text: "🔥 ₹100 Plan", callback_data: "pay100" }]
          ]
        }
      }
    );
  }

  // =========================
  // WAITLIST
  // =========================

  if (text === "📝 Waitlist") {
    bot.sendMessage(chatId,
      `📝 MyFlix Advanced Waitlist System

━━━━━━━━━━━━━━━━━━
🎬 About Waitlist System
━━━━━━━━━━━━━━━━━━

Can't find your favorite Anime, Movie, or WebSeries?

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

Thank you for helping improve MyFlix Premium 🎬`
    );
  }

  // =========================
  // SUPPORT
  // =========================

  if (text === "🆘 Support") {
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

Thank you for supporting MyFlix Premium 🎬`
    );
  }

  // =========================
  // TERMS
  // =========================

  if (text === "📜 Terms & Privacy") {
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

Thank you for using MyFlix Premium 🎬`
    );
  }

  // =========================
  // BACK
  // =========================

  if (text === "🔙 Back") {
    bot.sendMessage(chatId, `🎬 Back To Main Menu`,
      {
        reply_markup: {
          keyboard: [
            ["🔍 Search", "👤 Account"],
            ["📝 Waitlist", "🆘 Support"],
            ["📜 Terms & Privacy"]
          ],
          resize_keyboard: true
        }
      }
    );
  }

});

// =========================
// ANIME COMMAND
// =========================
bot.onText(/\/anime (.+)/i, async (msg, match) => {
  const chatId = msg.chat.id;

  await ensureUser(chatId);
  await checkExpiry(chatId);

  const user = await getUser(chatId);

  if (!canUseAnime(user.plan)) {
    return bot.sendMessage(chatId, `⚠️ Buy a premium plan to access Anime.`);
  }

  const input = match[1].toLowerCase();

  let language = "hindi";
  if (input.includes("english")) {
    language = "english";
  }

  const cleaned = input
    .replace("english", "")
    .replace("hindi", "")
    .trim();

  const parts = cleaned.split("season");

  if (parts.length < 2) {
    return bot.sendMessage(chatId,
      `❌ Correct Format:\n\n/anime anime-name season 1\n/anime anime-name season 1 english`
    );
  }

  const animeName = parts[0].trim();
  const season = "season " + parts[1].replace(/\s+/g, " ").trim();

  const epRef = collection(
  db,
  "anime",
  animeName,
  "seasons",
  season,
  "languages",
  language,
  "episodes"
);
  const snap = await getDocs(epRef);

  if (snap.empty) {
    return bot.sendMessage(chatId, `❌ Anime or language not found.`);
  }

  const episodes = [];
  snap.forEach(doc => {
    episodes.push(doc.data());
  });

  episodes.sort((a, b) => a.episode - b.episode);

  bot.sendMessage(chatId,
    `🎌 Sending ${animeName} ${season}\n\n🌐 Language:\n${language}`
  );

  const sentMessages = [];

  for (const ep of episodes) {
    try {
      console.log("Sending Episode:", ep.episode);

      const sent = await bot.sendVideo(chatId, ep.file_id, {
        caption:
          `🎌 ${animeName.toUpperCase()}\n📀 ${season.toUpperCase()}\n\n🎬 Episode ${ep.episode}\n\n━━━━━━━━━━━━━━━━━━\n⚡ Powered By MyFlix\n━━━━━━━━━━━━━━━━━━`
      });

      sentMessages.push(sent.message_id);

      await new Promise(r => setTimeout(r, 3000));

    } catch (err) {
      console.log("Episode Failed:", ep.episode);
      console.log(err);
    }
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
━━━━━━━━━━━━━━━━━━`
  );

  setTimeout(async () => {
    try {
      for (const msgId of sentMessages) {
        await bot.deleteMessage(chatId, msgId);
      }
      await bot.deleteMessage(chatId, warning.message_id);
      await bot.sendMessage(chatId,
        `🗑 Episodes expired successfully.\n\nUse search again anytime.`
      );
    } catch (err) {
      console.log(err);
    }
  }, 30 * 60 * 1000);
});

// =========================
// MOVIE COMMAND
// =========================
bot.onText(/\/movie (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  await ensureUser(chatId);
  await checkExpiry(chatId);

  const user = await getUser(chatId);

  if (!canUseMovie(user.plan)) {
    return bot.sendMessage(chatId, `⚠️ ₹100 Premium Plan required for Movies.`);
  }

  bot.sendMessage(chatId,
    `🎬 Movie system ready.\n\nAdd your own movie database.`
  );
});

// =========================
// WEBSERIES COMMAND
// =========================
bot.onText(/\/webseries (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;

  await ensureUser(chatId);
  await checkExpiry(chatId);

  const user = await getUser(chatId);

  if (!canUseWebseries(user.plan)) {
    return bot.sendMessage(chatId, `⚠️ Upgrade to ₹50 or ₹100 plan for WebSeries.`);
  }

  bot.sendMessage(chatId,
    `📺 WebSeries system ready.\n\nAdd your own webseries database.`
  );
});

// =========================
// PAYMENT BUTTONS
// =========================

bot.on("callback_query", (query) => {
  bot.answerCallbackQuery(query.id);
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "pay20") {
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
      }
    );
  }

  if (data === "pay50") {
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
      }
    );
  }

  if (data === "pay100") {
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
      }
    );
  }
});

// =========================
// ADMIN PLAN ACTIVATION
// =========================

bot.onText(/\/setplan (.+) (.+)/, async (msg, match) => {
  if (msg.chat.id !== ADMIN_ID) {
    return;
  }

  const userId = match[1];
  const plan   = match[2];

  await ensureUser(userId);

  await setDoc(
    doc(db, "users", String(userId)),
    {
      plan,
      balance: 0,
      expiry: Date.now() + (30 * 24 * 60 * 60 * 1000)
    }
  );

  bot.sendMessage(userId,
    `✅ Subscription Activated

💎 Active Plan:
₹${plan}/month

📅 Validity:
30 Days

Thank you for subscribing to MyFlix Premium 🎬`
  );

  bot.sendMessage(msg.chat.id, `✅ User subscription updated successfully.`);
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
