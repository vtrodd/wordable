import { GameState } from './gameState'
import * as words from '../sgb-words.json'

export class Guild {
  todaysWord: string
  games: Map<string, GameState>

  constructor() {
    this.newWord()
  }

  newGame = (userId: string) => this.games.set(userId, new GameState(this.todaysWord))

  newWord = () => {
    this.todaysWord = words[Math.floor(Math.random() * words.length)]
    this.games = new Map()
  }
}