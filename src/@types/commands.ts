import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction } from 'discord.js'

export type SlashCommand = SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
export type Execution = (interaction: BaseCommandInteraction) => Promise<void>

export class Command {
  info: SlashCommand
  execute: Execution

  constructor(_info: SlashCommand, _execute: Execution) {
    this.info = _info
    this.execute = _execute
  }
}