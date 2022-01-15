import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/rest/v9'
import { CLIENT_ID, token } from './config.json'
import commands from './src/commands'



const rest = new REST({ version: '9' }).setToken(token)

console.log('🤖 Started refreshing application commands.')
rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands.map(command => command.info.toJSON()) })
  .then(() => console.log('🤖 Successfully reloaded application commands.'))
  .catch(console.error)