import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction } from 'discord.js'

type SlashCommand = SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
type Execution = (interaction: BaseCommandInteraction) => Promise<void>

export class Command {
  info: SlashCommand
  execute: Execution

  constructor(_info: SlashCommand, _execute: Execution) {
    this.info = _info
    this.execute = _execute
  }
}