const TelegramBot = require('node-telegram-bot-api');

const token = '8733762026:AAFzU80lC-SiDMRRZO9NY7tMOWrfG0xiGrY';

const bot = new TelegramBot(token, {
 polling: true
});

const users = {};

bot.onText(/\/start/, (msg) => {

 const chatId = msg.chat.id;

 if(!users[chatId]){
   users[chatId] = {
     plan: "Free",
     balance: 0
   };
 }

 bot.sendMessage(chatId,
`🎬 Welcome to MyFlix

Choose an option below.`,
{
 reply_markup:{
   keyboard:[
     ["🔍 Search","👤 Account"],
     ["💳 Payment","📝 Waitlist"],
     ["🆘 Help","📜 Terms & Privacy"]
   ],
   resize_keyboard:true
 }
});

});

bot.on('message',(msg)=>{

 const chatId = msg.chat.id;
 const text = msg.text;

 if(text === "👤 Account"){

   bot.sendMessage(chatId,
`👤 Account

💎 Plan: ${users[chatId].plan}
💰 Balance: ₹${users[chatId].balance}`);
 }

 if(text === "💳 Payment"){

   bot.sendMessage(chatId,
`💳 Choose Plan`,
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
`📝 Send movie request to:

@MyflixO`);
 }

 if(text === "🆘 Help"){

   bot.sendMessage(chatId,
`🎧 Support:
@MyflixO`);
 }

 if(text === "📜 Terms & Privacy"){

   bot.sendMessage(chatId,
`📜 Terms

• No refund after activation
• Uploads may take time
• Sharing accounts may cause restriction`);
 }

 if(text === "🔍 Search"){

   bot.sendMessage(chatId,
`🔎 Use:

/movie movie-name`);
 }

});

bot.onText(/\/movie (.+)/,(msg,match)=>{

 const chatId = msg.chat.id;

 const movie = match[1];

 bot.sendMessage(chatId,
`❌ "${movie}" not available currently.

Use waitlist:
@MyflixO`);

});

bot.on("callback_query",(query)=>{

 const chatId = query.message.chat.id;
 const data = query.data;

 let amount = 0;

 if(data === "pay20") amount = 20;
 if(data === "pay50") amount = 50;
 if(data === "pay100") amount = 100;

 if(amount > 0){

   bot.sendMessage(chatId,
`💳 Confirm Payment

Plan ₹${amount}/month`,
{
 reply_markup:{
   inline_keyboard:[
     [
       {text:"❌ Cancel",callback_data:"cancel"},
       {text:"✅ Confirm",callback_data:`confirm_${amount}`}
     ]
   ]
 }
});

 }

 if(data.startsWith("confirm_")){

   const amt = data.split("_")[1];

   bot.sendMessage(chatId,
`📱 Pay ₹${amt}

Send screenshot after payment to:
@MyflixO`);
 }

 if(data === "cancel"){

   bot.sendMessage(chatId,
   "❌ Payment Cancelled");
 }

});

console.log("MyFlix Bot Running...");


