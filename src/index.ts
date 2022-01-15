'use strict'

import * as Discord from 'discord.js'
import * as config from '../config.json'
import useCommand from './handlers/useCommand'

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', useCommand)

client.login(config.token)

