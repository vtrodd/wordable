import { SlashCommandBuilder } from '@discordjs/builders'
import * as checkWord from 'check-word'
import { Command, Execution } from '../@types/commands'
import * as words from '../sgb-words.json'

const dictionary = checkWord('en')

class GameState {
  boardState: string[]
  evaluations: string[][]
  gameStatus: 'playing' | 'won' | 'lost'
  rowIndex: number
  solution: string

  constructor(_solution: string) {
    this.boardState = []
    this.evaluations = []
    this.gameStatus = 'playing'
    this.rowIndex = 0
    this.solution = _solution
  }

  guess = (guess: string) => {
    this.boardState.push(guess)

    let evaluation: string[] = []
    if (guess === this.solution) {
      evaluation = guess.split('').map(() => '🟩')
      this.gameStatus = 'won'
    } else {
      let solution = this.solution.split('') // this is so we can remove letters once we have checked against the guess
      console.log(solution)
      evaluation = guess.split('').map((letter, i) => {
        if (letter === solution[i]) { // if the letter is in the right place
          solution[i] = ''
          return '🟩'
        }

        if (solution.includes(letter)) { // if the letter is in the solution but not in the right place
          solution[solution.indexOf(letter)] = ''
          return '🟨'
        }

        return '⬜' // if the letter is not in the solution // TODO: Light/Dark mode
      })
    }

    this.evaluations.push(evaluation)
    this.rowIndex++
  }
}

type UserId = string

class Guild {
  todaysWord: string
  users: Map<UserId, GameState>

  constructor() {
    this.todaysWord = words[Math.floor(Math.random() * words.length)]
    this.users = new Map()
  }

  newUser = (userId: UserId) => this.users.set(userId, new GameState(this.todaysWord))
}

const guilds: { [guildId: string]: Guild } = {}

const execute: Execution = async interaction => {
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

  // if the guild has not yet started playing, it is created here
  if (!guilds[interaction.guild.id])
    guilds[interaction.guild.id] = new Guild()


  // if the user has not yet started playing in this guild, their game state is created here
  if (!guilds[interaction.guild.id].users.get(interaction.user.id))
    guilds[interaction.guild.id].newUser(interaction.user.id)


  const gameInstance = guilds[interaction.guild.id].users.get(interaction.user.id)
  gameInstance.guess(guess)
  
  // Potentially we could use the canvas to draw the guessed word on top of coloured squares? https://discordjs.guide/popular-topics/canvas.html#adding-in-text
  const tiles = gameInstance.evaluations[gameInstance.rowIndex - 1].join('')

  switch (gameInstance.gameStatus) {
    case 'won':
      return await interaction.reply({ content: `${guess}\n${tiles}\nYou won!`, ephemeral: true })

    case 'lost':
      return await interaction.reply({ content: `${guess}\n${tiles}\nYou lost!`, ephemeral: true })

    default:
      return await interaction.reply({ content: `${guess}\n${tiles}\nKeep guessing! Guess number: ${gameInstance.rowIndex}`, ephemeral: true })
  }

}

const command: Command = new Command(
  new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Make a guess')
    .addStringOption(option => option.setName('guess').setDescription('Your 5-letter guess').setRequired(true)), // not sure how to get the command to show the guess parameter :/

  execute
)

export default command