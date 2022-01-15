import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction } from 'discord.js'

export type Info = {
  name: string
  description: string
}

export type Execution = (interaction: BaseCommandInteraction) => Promise<void>

export class Command {
  info: SlashCommandBuilder
  execute: Execution

  constructor(_info: Info, _execute: Execution) {
    this.info = new SlashCommandBuilder().setName(_info.name).setDescription(_info.description)
    this.execute = _execute
  }
}