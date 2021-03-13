// Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

let atk_button = 0;

   const cron = require('node-cron')
   
   cron.schedule('1 0 * * *', () => {
     bot.channels.forEach(channel=>{
       if(channel.id === "645410403685498891"){
         channel.send("::login")
       }
     })
   })//login機構

if(atk_button === 1){
     cron.schedule('1 * * * * *', () => {
     bot.channels.forEach(channel=>{
       if(channel.id === "645410403685498891"){
         channel.send("::atk")
       }
     })
   })//login機構
}

// Discord bot implements
const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');

bot.on('ready', message =>{
  function atk_long(){
    bot.channels.forEach(channel =>{
      if(channel.name === "tao-3"){
        channel.sned("::atk")
      }
    })
    setTimeout(atk_long, 10000)
  }
	console.log('bot is ready!');
});

bot.on('message', message =>{
  
if(message.author.id === "502816456052834314"){
  
  if(message.content == "とまれ"){
  process.exit();
  }
  
  if(message.content == "on"){
    atk_button = 1;
  }
  
  if(message.content == "off"){
    atk_button = 0;
  }
  
  if(message.content == "oatk"){
    message.channel.send("::atk")
  }
  
    
  if(message.content === "::atk"){
    setTimeout(function(){message.channel.send("::atk")}, 2000)
  }
  
if(message.content.indexOf(config.prefix) !== 0)return;
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
  
  if(!message.author.id === "502816456052834314")return
  
  if(command === "sjoin") {
    message.channel.send(
        {embed:{
          title:'bot導入サーバー',
           color: 3066993,
          description: (bot.guilds.map(g => g.name).join("\n")),
          fields: [{
            name: "導入サーバー数",
            value: `${bot.guilds.size}サーバー` },
          ]
        }
      }
      );
  }

  
  if(command === "say"){
    message.delete()
    if(args[1] == undefined){
    message.channel.send(args[0])
    }else message.channel.send(args[0] + " " + args[1])
  }
  
  
  console.log(message.content)
}
});


bot.on('message', (message) => {
  
  if(message.author.id === bot.user.id)return
  if(!message.channel.id === "668320607208734760")return
  
  
  if(atk_button === 1){
  
  if(message.content.includes('! ' + bot.user.tag + 'は')){
    message.channel.startTyping()
    setTimeout(function(){message.channel.send("::i e")}, Math.random()*( 2000 - 1000 )+1000)
    setTimeout(function(){message.channel.send("::atk")}, Math.random()*( 4500 - 3000 )+3000)
    message.channel.stopTyping()
  }else if(message.content.includes(bot.user.tag + 'の攻撃！')){
    message.channel.startTyping()
    setTimeout(function(){message.channel.send("::atk")}, Math.random()*( 2000 - 2000 )+2000)
    message.channel.stopTyping()
  }
  
  if(message.content.includes('<@686840858787708950>これでいいの？')){
    setTimeout(function(){message.channel.send("ok"); message.channel.send("<@502816456052834314> ぺっと")}, Math.random()*( 2000 - 500 )+500)
  }
    
    
  }//button
  console.log(message.content)
  
})



bot.on('message', async message => {
  const { inspect } = require('util');
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'eval') {
    // Put your userID here
    if (message.author.id !== '502816456052834314', '502816456052834314') {

    let evaled;
    try {
      evaled = await eval(args.join(' '));
      message.channel.send(inspect(evaled));
      console.log(inspect(evaled));
    }
    catch (error) {
      console.error(error);
      message.channel.send(error.message);
    }
  }else message.channel.send("```あなたは開発者ではありません```")
  .then(message.console)
  }
});//evalコマンド

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('トークンを入力してください');
	process.exit(0);
}

bot.login( process.env.DISCORD_BOT_TOKEN );
