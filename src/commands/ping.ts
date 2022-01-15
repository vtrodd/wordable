import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, Interaction } from "discord.js";
import { Command, Info } from "../@types/commands";

const info: Info = {
  name: "ping",
  description: "Replies with pong!"
}

const ping: Command = new Command(info, async interaction => {
  await interaction.reply('Pong!')
})

export default ping