import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import { en as enDefault, es as esDefault } from './lib/multi-language/_default.js'
import { ar, en, es, id, pt } from './lib/idiomas/total-idiomas.js'

// 🖤 CONFIGURACIÓN DE DUEÑA 🎀
global.owner = [
  ['18293716667', 'Goth Kitty Owner 🖤', true] 
]

global.mods = []
global.prems = []

global.gataJadibts = true
global.isBaileysFail = false
global.obtenerQrWeb = 0 
global.keepAliveRender = 0 
global.botNumberCode = '' 
global.confirmCode = '' 

// 🌐 IDIOMA
global.lenguajeGB = es
global.mid = esDefault
global.version_language = '1.0 (MID-GB)'

// 🔑 APIS Y LIBRERIAS
global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://api.delirius.store'
global.APIs = {
  lolhuman: {url: 'https://api.lolhuman.xyz/api', key: 'GataDiosV3'},
  stellar: {url: 'https://api.stellarwa.xyz', key: 'GataDios'},
  fgmods: {url: 'https://api.fgmods.xyz/api', key: 'elrebelde21'}
}

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

// 🎀 IDENTIDAD DEL BOT 💀
global.official = [
  ['18293716667', 'Goth Kitty Bot 🎀', 1]
]

global.packname = '𝔊𝔬𝔱𝔥 𝔎𝔦𝔱𝔱𝔶 𝔅𝔬𝔱 🎀💀'
global.author = ' ╭ 𝔊𝔬𝔱𝔥 𝔎𝔦𝔱𝔱𝔶 🎀 \n | \n » 𝔒𝔴𝔫𝔢𝔯: \n | Kitty Mua 🖤 \n ╰ —————— '

global.vs = '1.7.0'
global.gt = '𝔊𝔬𝔱𝔥 𝔎𝔦𝔱𝔱𝔶 𝔅𝔬𝔱'
global.wm = '𝔊𝔬𝔱𝔥 𝔎𝔦𝔱𝔱𝔶 : 𝔎𝔦𝔱𝔱𝔶 𝔐𝔲𝔞 🖤'
global.igfg = 'Goth Kitty Bot'
global.nomorown = '18293716667'

// 💀 MENSAJES DE ESTADO 🖤
global.rg = '╰⊱🖤⊱ *𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊* ⊱💀⊱╮\n\n'
global.resultado = rg
global.ag = '╰⊱🕷️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼* ⊱🕸️⊱╮\n\n'
global.advertencia = ag
global.iig = '╰⊱🎀⊱ *𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊́𝙉* ⊱🎀⊱╮\n\n'
global.informacion = iig
global.fg = '╰⊱⚰️⊱ *𝙀𝙍𝙍𝙊𝙍* ⊱⚰️⊱╮\n\n'
global.fallo = fg
global.eg = '╰⊱🖤⊱ *𝙀́𝙓𝙄𝙏𝙊* ⊱🖤⊱╮\n\n'
global.exito = eg

// 🎮 EMOJIS GOTHIC-KITTY
global.cmenut = '⛓️––––––『'
global.cmenub = '🖤✦ '
global.cmenuf = '╰━═┅═━––––––🎀\n'
global.htki = '*🦇•̩̩͙⊱•••• 🖤*'
global.htka = '*🖤 ••••̩̩͙⊰•🦇*'
global.comienzo = '• • 💀════'
global.fin = ' • •'

global.botdate = `⫹⫺ 𝔇𝔞𝔱𝔢 : ${moment.tz('America/Santo_Domingo').format('DD/MM/YY')}`
global.bottime = `𝔗𝔦𝔪𝔢 : ${moment.tz('America/Santo_Domingo').format('HH:mm:ss')}`

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
