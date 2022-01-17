import { Command, Execution } from "../@types/commands"
import * as checkWord from 'check-word'
import { SlashCommandBuilder } from "@discordjs/builders"
import { Guild } from "../@types/guild"

const dictionary = checkWord('en')

const guilds = new Map<string, Guild>()

const execute: Execution = async interaction => {
  const guess = interaction.options.get('guess').value

  // guess constraints:
  // must be a string
  if (typeof guess !== 'string')
    return await interaction.reply({ content: 'Not a word', ephemeral: true })
  // must be 5 letters long
  if (guess.length !== 5)
    return await interaction.reply({ content: 'Word should be 5 letters long', ephemeral: true })
  // must be a word in the dictionary (might be worth looking into the reliability of this)
  if (!dictionary.check(guess.toLowerCase()))
    return await interaction.reply({ content: 'Not in word list', ephemeral: true })

  // if the guild has not yet started playing, it is created here
  if (!guilds.has(interaction.guild.id))
    guilds.set(interaction.guild.id, new Guild())
  const guild = guilds.get(interaction.guild.id)

  // if the user has not yet started playing in this guild, their game state is created here
  if (!guild.games.has(interaction.user.id))
    guild.newGame(interaction.user.id)
  const game = guild.games.get(interaction.user.id)

  switch (game.gameStatus) { // I'll put nicer messages here later dw
    case 'won':
      return await interaction.reply({ content: 'You already won', ephemeral: true })
    case 'lost':
      return await interaction.reply({ content: 'You already lost', ephemeral: true })
    default:
      game.guess(guess) // wonder if this should return stuff that we can use, rather than having to grab it from the game object afterwards? It could even just return the game.rows?
      return await interaction.reply({ content: '_ _', ephemeral: true, components: [game.rows[game.rowIndex - 1]] })
  }
}

const command: Command = new Command(
  new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Guess a word')
    .addStringOption(option => option.setName('guess').setDescription('Your 5-letter guess').setRequired(true)),
  execute
)

export default command