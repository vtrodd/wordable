import { Command } from '../@types/commands'
import ping from './ping'
import guess from './guess'

const commands: Command[] = [
  ping,
  guess
]

export default commands