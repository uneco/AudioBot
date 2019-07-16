import axios from "axios";
import { Message } from "discord.js";

async function isValidURL(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (err) {
    return false;
  }
}

export default async function play(message: Message): Promise<void> {
  if (message.content === "") {
    message.reply("urlも書いて！");
    return;
  }
  if (!(await isValidURL(message.content))) {
    message.reply("接続できるURL書いて");
    return;
  }
  console.log("play", message.content);
  const plugin = switchPlugin(message.content);
  const stream = plugin && plugin.httpStream(message.content);
  stream && streamList.push(stream);
  if (dispatcher) {
    console.log(`status: speaking\nmessage: ${message.content}`);
    return;
  }
  if (!message.guild) return undefined;
  else if (message.member.voiceChannel) {
    const conn = await message.member.voiceChannel.join();
    playAudio(conn);
  } else {
    message.reply("ルームに入ると良さそう");
  }
}
