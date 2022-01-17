import { MessageActionRow, MessageButton } from "discord.js"
import { MessageButtonStyles } from "discord.js/typings/enums"

export class GameState {
  boardState: string[]
  rows: MessageActionRow[]
  evaluations: ('🟩' | '🟨' | '⬛')[][]
  gameStatus: 'ongoing' | 'won' | 'lost'
  rowIndex: number
  solution: string

  constructor(_solution: string) {
    this.boardState = []
    this.rows = []
    this.evaluations = []
    this.gameStatus = 'ongoing'
    this.rowIndex = 0
    this.solution = _solution
  }

  guess = (guess: string) => {
    this.boardState.push(guess)

    if (guess === this.solution) {
      this.gameStatus = 'won'
    }

    const tiles = guess.split('').map(letter => new MessageButton().setLabel(letter.toUpperCase()))
    const evaluation: ('🟩' | '🟨' | '⬛')[] = []

    let solution = this.solution.split('')
    let chars = guess.split('')
    chars.forEach((letter, i) => {
      if (letter === solution[i]) {
        solution[i] = ''
        chars[i] = ' '
        evaluation[i] = '🟩'
        tiles[i].setStyle(MessageButtonStyles.SUCCESS).setCustomId(i.toString())
      }
    })

    chars.forEach((letter, i) => {
      if (solution.includes(letter)) {
        solution[i] = ''
        chars[i] = ' '
        evaluation[i] = '🟨'
        tiles[i].setStyle(MessageButtonStyles.PRIMARY).setCustomId(i.toString())
      } else if (chars[i] !== ' ') {
        evaluation[i] = '⬛'
        tiles[i].setStyle(MessageButtonStyles.SECONDARY).setCustomId(i.toString())
      }
    })

    this.rows.push(new MessageActionRow().setComponents(tiles))
    this.evaluations.push(evaluation)
    this.rowIndex++
  }
}