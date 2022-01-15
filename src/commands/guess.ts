import { SlashCommandBuilder } from '@discordjs/builders';
import * as checkWord from 'check-word';
import { Command } from '../@types/commands';

const dictionary = checkWord('en')

const word = 'seven'

const command: Command = new Command(
  new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Make a guess')
    .addStringOption(option => option.setName('guess').setDescription('Your 5-letter guess').setRequired(true)), // not sure how to get the command to show the guess parameter :/

  // may want to extract this into a separate function since it might get quite big
  async interaction => {
    let guess = interaction.options.get('guess').value

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

    if (guess === word)
      return await interaction.reply({ content: 'Correct!', ephemeral: true })

    const letters = word.split('') // we split it so we can remove letters as we go (so extra letters in the guess don't count already counted letters)
    const response = guess.split('').reduce((acc, letter, i) => {
      if (letters[i] === letter) {
        letters[i] = ''
        return acc + '🟩' // for now we copy Wordle's style of green square, yellow square, black square...
        // Potentially we could use the canvas to draw the guessed word on top of coloured squares? https://discordjs.guide/popular-topics/canvas.html#adding-in-text
      }
      if (letters.includes(letter)) {
        letters[letters.indexOf(letter)] = ''
        return acc + '🟨'
      }
      return acc + '⬛'
    }, '')

    // gross response right now, can come up with better :)
    return await interaction.reply({ content: `${guess.toUpperCase()}\n${response}`, ephemeral: true })
  }
)

export default command