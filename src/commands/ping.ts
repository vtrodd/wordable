import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../@types/commands'

const command: Command = new Command(
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),

  async interaction => {
    await interaction.reply({ content: 'Pong!', ephemeral: true })
  }
)

export default command