const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');

let requestsChannelID = "606315102458740777"
let memberID = ""
let guildX = undefined
let checks = 0
let name = ""
let team = ""
let grade = ""

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ambassador"
})

function _do() {
  sql_connect()
}

function sql_connect() {
  con.connect(function(err) {
    setInterval(function() {
      if(err) throw err;
      //console.log("Connected to the Local MySQL Database!")
      var sql1 = "SELECT * FROM logs WHERE checked = 0"
      var sql2 = "UPDATE logs SET checked = 1 WHERE checked = 0"
      con.query(sql1, function (err, result) {
        if (err) throw err;
        con.query(sql2, function(err1, result1) {
          if (err1) throw err1;
        });
        //console.log(content);

        var string=JSON.stringify(result);
        //console.log('>> string: ', string );
        discordSend(string)
      });
    }, 10000);
  })
}

function discordSend(content) {
  let name = "", team = "", grade = "", id = "", discordid = ""
  let message = ""
  //console.log(content)
  for(x = 0; x < content.length; x++) {
    if(content[x] === '}') {
      // Process data

      // Name
      name = resToName(message)
      // Team
      team = resToTeam(message)
      // grade
      grade = resToGrade(message)
      // ID
      id = resToID(message)
      // Discord // ID
      discordid = resToDiscordID(message)

      try {
        const form = new Discord.RichEmbed()
        	.setColor('#fc2403')
        	.setTitle('User Form')
        	.addField('Name', name, true)
          .addField('Team', team)
          .addField('Grade', grade)
          .addField('ID', id)
          .addField('Discord', `<@${discordid}>`)
        	.setTimestamp()
        	.setFooter('Validation Request sent at', '');
       //client.channels.get(requestsChannelID).send(form)
       client.channels.get(requestsChannelID).send({embed: form}).then(embedMessage => {
          embedMessage.react("✅");
          embedMessage.react("❌");
       });
      } catch(err) {
        console.log("ERROR EMBED: FORM")
      }

      console.log("SENT")
      message = ""
    } else {
      message += content[x]
    }
  }
}

function resToName(message) {
  let name = ""
  let nCheck = false
  for(n = 0; n < message.length; n++) {
    if(message[n] === ':' && nCheck === false) {
      nCheck = true
    }
    if(nCheck) {
      name += message[n]
      if(message[n] === ',') {
        break
      }
    }
  }
  name = name.substring(0, name.length - 2)
  name = name.substring(2)
  return name
}

function resToTeam(message) {
  let first = message.indexOf("team")
  let second = message.indexOf(",\"grade", first)
  let newStr = message.substring(first + 1, second)
  newStr = newStr.substring(5)
  return newStr
}

function resToGrade(message) {
  let first = message.indexOf("grade")
  let second = message.indexOf(",\"id", first)
  let newStr = message.substring(first + 1, second)
  newStr = newStr.substring(6)
  return newStr
}

function resToID(message) {
  let first = message.indexOf("id")
  let second = message.indexOf(",\"discordid", first)
  let newStr = message.substring(first + 1, second)
  newStr = newStr.substring(3)
  return newStr
}

function resToDiscordID(message) {
  let first = message.indexOf("discordid")
  let second = message.indexOf(",\"checked", first)
  let newStr = message.substring(first + 1, second - 1)
  newStr = newStr.substring(11)
  return newStr
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  guildX = client.guilds.get("600789431548641280")
  _do()
});

//-------------------------------------------- For the reaction listener
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id) || await user.createDM();

    if (channel.messages.has(data.message_id)) return;

    const message = await channel.fetchMessage(data.message_id);
    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    client.emit(events[event.t], reaction, user);
});
//------------------------------------------

new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'] });

client.on('messageReactionAdd', async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message
  // You should account for any errors while fetching, it could return API errors if the resource is missing
  if (reaction.message.partial) await reaction.message.fetch();
  // Now the message has been cached and is fully available:
  //console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
  //console.log(reaction)
  if(user.id != '604025119702122512') {
    if(reaction.message.author == '<@604025119702122512>') {
      if(reaction.emoji.name === '✅') {
        checks = 0
        let arr = reaction.message.embeds
        memberID = String(user.id)
        arr.forEach(ext)
        reaction.message.delete(1000)
      }

      if(reaction.emoji.name === '❌') {
        reaction.message.delete(1000)
        //reaction.message.embeds.delete(1000)
      }
    }
  }
});

function ext(embed) {
  let arr = embed.fields
  arr.forEach(ext1)
}

function ext1(field) {
  checks++
  let value = field.value

  let myRole1 = guildX.roles.find(role => role.name === "Team 1");
  let myRole2 = guildX.roles.find(role => role.name === "Team 2");
  let myRole3 = guildX.roles.find(role => role.name === "Team 3");
  let myRole4 = guildX.roles.find(role => role.name === "Team 4");

  let myRole9 = guildX.roles.find(role => role.name === "2023");
  let myRole10 = guildX.roles.find(role => role.name === "2022");
  let myRole11 = guildX.roles.find(role => role.name === "2021");
  let myRole12 = guildX.roles.find(role => role.name === "2020");

  let myRole = guildX.roles.find(role => role.name === "Member");


  switch(checks) {
    case 1:
      console.log("Name: " + value)
      if(value.length > 4) {
        name = value
      }
      break
    case 2:
      console.log("Team: " + value)
      if(value === "1" || value === "2" || value === "3" || value === "4") {
        team = value
      }
      break
    case 3:
      console.log("Grade: " + value)
      if(value === "9" || value === "10" || value === "11" || value === "12") {
        grade = value
      }
      break
    case 4:
      console.log("ID: " +  value)
      break
    case 5:
      console.log("Discord: " + value)

      let discordid = value
      let idx = ""
      discordid = discordid.substring(2)
      for(x = 0; x < discordid.length; x++) {
        if(x < 18) {
          idx += discordid[x]
        }
      }
      console.log(idx)

      let memberx = guildX.members.get(idx);

      if(team === '1') {
        memberx.addRole(myRole1).catch(console.error);
      }
      if(team === '2') {
        memberx.addRole(myRole2).catch(console.error);
      }
      if(team === '3') {
        memberx.addRole(myRole3).catch(console.error);
      }
      if(team === '4') {
        memberx.addRole(myRole4).catch(console.error);
      }

      if(grade === '9') {
        memberx.addRole(myRole9).catch(console.error);
      }
      if(grade === '10') {
        memberx.addRole(myRole10).catch(console.error);
      }
      if(grade === '11') {
        memberx.addRole(myRole11).catch(console.error);
      }
      if(grade === '12') {
        memberx.addRole(myRole12).catch(console.error);
      }
      memberx.addRole(myRole).catch(console.error);

      memberx.setNickname(name)
      break
  }
}

client.on('guildMemberAdd', member => {
  let url = 'http://192.99.152.150/?id=' + member.id
  const pmEmbed = new Discord.RichEmbed()
  	.setColor('#e5eb34')
  	.setTitle('DBTI Validation')
  	.setDescription('Please click on your unique url to start the validation process(Once the validation process is complete, your info will be send to the Leaders. Which they will then confirm/deny your roles). If you are a leader, DM Jericho for the time being for roles. (click on the DBTI Validation or the single link)')
  	.setURL(url)
  	.setTimestamp()
  	.setFooter('If you have any issues please message a Leader', '');
  member.send(pmEmbed)
  member.send("Link: " + url)
});




client.on('error', err => console.log(err))

client.login('NjA0MDI1MTE5NzAyMTIyNTEy.XTn8TA.-0Lg3L_jHf-rvaLF5iZPFHvvO_g');
