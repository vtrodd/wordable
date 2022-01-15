import { CacheType, Interaction } from 'discord.js'
import commands from '../commands'

const useCommand = async (interaction: Interaction<CacheType>) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  const command = commands.find(cmd => cmd.info.name === commandName)

  if (!command) return

  command.execute(interaction)
}

export default useCommand