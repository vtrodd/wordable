'use strict'

import * as Discord from 'discord.js'
import * as config from '../config.json'
import useCommand from './handlers/useCommand'
import { PrismaClient } from '@prisma/client'

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] })
export const prisma = new PrismaClient()

client.once('ready', async () => {
  console.log('Connecting to Prisma...')
  try {
    await prisma.$connect()
    console.log('Connected to Prisma')
    console.log(`Ready! Logged in as ${client.user.tag}!`)
  } catch (e) {
    console.log('Failed to connect to Prisma')
    console.log(e)
    client.destroy()
    process.exit()
  }
})

client.on('interactionCreate', useCommand)

client.login(config.TOKEN)