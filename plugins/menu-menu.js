import fs from 'fs'
import translate from '@vitalets/google-translate-api'
import moment from 'moment-timezone'
import ct from 'countries-and-timezones'
import { parsePhoneNumber } from 'libphonenumber-js'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const {levelling} = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import chalk from 'chalk'

let handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, command}) => {
if (m.fromMe) return
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}

const commandsConfig = [
{
comando: (bot.restrict ? 'off ' : 'on ') + 'restringir , restrict',
descripcion: bot.restrict ? '✅ ' + 'Activado' : '❌ ' + 'Desactivado',
contexto: 'Permisos del Inframundo',
showPrefix: true
},
{
comando: (bot.antiCall ? 'off ' : 'on ') + 'antillamar , anticall',
descripcion: bot.antiCall ? '✅ ' + 'Activado' : '❌ ' + 'Desactivado',
contexto: 'Silencio absoluto (No llamadas)',
showPrefix: true
},
{
comando: (bot.antiSpam ? 'off ' : 'on ') + 'antispam',
descripcion: bot.antiSpam ? '✅ ' + 'Activado' : '❌ ' + 'Desactivado',
contexto: 'Anti-Spam Goth',
showPrefix: true
},
{
comando: (global.opts['self'] ? 'on ' : 'off ') + 'publico , public',
descripcion: global.opts['self'] ? '❌' + 'Privado' : '✅' + 'Público',
contexto: 'Modo de visibilidad',
showPrefix: true
}
]

try {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch((_) => ({}))) || {}
let {exp, limit, level, role} = global.db.data.users[m.sender]
let {min, xp, max} = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date() + 3600000)
let locale = 'es'
let week = d.toLocaleDateString(locale, {weekday: 'long'})
let date = d.toLocaleDateString(locale, {day: 'numeric', month: 'long', year: 'numeric'})
let time = d.toLocaleTimeString(locale, {hour: 'numeric', minute: 'numeric', second: 'numeric'})
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length
let totalreg = Object.keys(global.db.data.users).length

let taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
let formatDate = date.charAt(0).toUpperCase() + date.slice(1)

const numberToEmoji = {0: '0️⃣', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣'}
let lvl = level
let emojiLvl = Array.from(lvl.toString()).map((digit) => numberToEmoji[digit] || '❓').join('')

let margen = '`*·················································*`'

let menu = `
🖤 𝐆𝐎𝐓𝐇 𝐊𝐈𝐓𝐓𝐘 𝐁𝐎𝐓 💀 
${user.genero === 'Mujer 🚺' ? '🖤' : '💀'} *Holi, ${user.registered === true ? user.name : taguser}*

> 🦇 *_${formatDate}_*
> 🦇 *_${time}_*

${margen}

🥀  *𝐄𝐒𝐓𝐀𝐃𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀* 🥀

⛓️ *Usuarios:* \`\`\`${totalreg}\`\`\`
⛓️ *Actividad:* \`\`\`${uptime}\`\`\`
⛓️ *Versión:* \`\`\`2.0 (Goth Edition)\`\`\`
⛓️ *Modo:* \`${global.opts['self'] ? 'Privado' : 'Público'}\`

${margen}

🎀  *𝐏𝐄𝐑𝐅𝐈𝐋 𝐆𝐎𝐓𝐇* 🎀

🖤 *Nivel:* ${emojiLvl}
🖤 *Rango:* ${role}
🖤 *Registro:* ${user.registered === true ? '✅ Goth Verified' : '❌ Sin Registro'}
🖤 *Estado:* ${typeof user.miestado !== 'string' ? 'Desconocido' : '_' + user.miestado + '_'}

${margen}

💀  *𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈Ó𝐍* 💀
${generateCommand(commandsConfig, usedPrefix).replace(/≡/g, '⛓️')}

${margen}

🔮  *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈Ó𝐍* 🔮
${generateCommand(commandsInfo, usedPrefix)}

${margen}

🕯️  *𝐒𝐄𝐑 𝐁𝐎𝐓 (𝐉𝐀𝐃𝐈𝐁𝐎𝐓)* 🕯️
${generateCommand(commandsJadiBot, usedPrefix)}

${margen}

🕸️  *𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒* 🕸️
✓ \`${usedPrefix}imagen\`
✓ \`${usedPrefix}play\`
✓ \`${usedPrefix}tiktok\`
✓ \`${usedPrefix}instagram\`
✓ \`${usedPrefix}facebook\`

${margen}

🦇  *𝐉𝐔𝐄𝐆𝐎𝐒 / 𝐀𝐙𝐀𝐑* 🦇
${generateCommand(commandsGames, usedPrefix)}

${margen}

💀  *𝐄𝐍𝐓𝐈𝐃𝐀𝐃 𝐈.𝐀.* 💀
${generateCommand(commandsAI, usedPrefix)}

${margen}

🖤 *Propiedad de Carmen Caparros* 🖤
`

await conn.sendFile(m.chat, gataVidMenu, 'gata.mp4', menu.trim(), fkontak, false, {
contextInfo: {
externalAdReply: {
title: '𝐆𝐎𝐓𝐇 𝐊𝐈𝐓𝐓𝐘 𝐁𝐎𝐓 🖤🎀',
body: 'Bajo el control de Frecuencia Viral',
thumbnail: imagen4,
sourceUrl: redesMenu
}}})

} catch (e) {
console.log(e)
}}

handler.command = /^(menucompleto|allmenu|\?)$/i
handler.register = true
export default handler

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':')
}

function generateCommand(commandsArray, usedPrefix) {
return commandsArray
.map((command) => {
const prefix = command.showPrefix ? usedPrefix : ''
return `✓ \`${prefix}${command.comando}\`\n  ≡ _${command.contexto}_`
}).join('\n')
}

const commandsInfo = [
{comando: 'cuentas', contexto: 'Redes oficiales Goth Kitty', showPrefix: true},
{comando: 'velocidad', contexto: 'Ping del Bot', showPrefix: true},
{comando: 'creadora', contexto: 'Info de mi dueña', showPrefix: true}
]

const commandsJadiBot = [
{comando: 'serbot', contexto: 'Conviértete en Sub-Bot', showPrefix: true},
{comando: 'detener', contexto: 'Apagar Sub-Bot', showPrefix: true}
]

const commandsGames = [
{comando: 'ppt', contexto: 'Piedra, papel o tijera', showPrefix: true},
{comando: 'slot', contexto: 'Apuesta en el casino', showPrefix: true},
{comando: 'love', contexto: 'Calcula el amor', showPrefix: true}
]

const commandsAI = [
{comando: 'ia', contexto: 'Habla con ChatGPT', showPrefix: true},
{comando: 'dalle', contexto: 'Genera imágenes mágicas', showPrefix: true},
{comando: 'gemini', contexto: 'IA de Google', showPrefix: true}
]
