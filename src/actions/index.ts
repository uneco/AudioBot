import { Message, VoiceConnection } from "discord.js";
import axios from "axios";
import { ActionOptions, BotState } from "../client";
import { Readable } from "stream";

async function playAudio(
  conn: VoiceConnection,
  state: BotState
): Promise<void> {
  console.log(state.currentQueue.length);
  const media = state.currentQueue.shift();
  if (!media) {
    return;
  }
  state.currentDispatcher = conn.playStream(await media());
  state.currentDispatcher.on("end", (): void => {
    playAudio(conn, state);
  });
}

async function isValidURL(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (err) {
    return false;
  }
}

export async function play(
  message: Message,
  state: BotState,
  options: ActionOptions
): Promise<void> {
  if (message.content === "") {
    message.reply("urlも書いて！");
    return;
  }
  if (!(await isValidURL(message.content))) {
    message.reply("接続できるURL書いて");
    return;
  }
  console.log("play", message.content);
  const adapter = options.adapters.find((a): boolean =>
    a.isHandleableUrl(message.content)
  );
  if (!adapter) {
    message.reply("対応してないよ");
    return;
  }
  const media = (): Promise<Readable> => {
    return adapter.fetchStream(message.content);
  };
  state.currentQueue.push(media);
  if (state.currentDispatcher) {
    console.log(`status: speaking\nmessage: ${message.content}`);
    return;
  }
  if (!message.guild) return undefined;
  else if (message.member.voiceChannel) {
    const conn = await message.member.voiceChannel.join();
    playAudio(conn, state);
  } else {
    message.reply("ルームに入ると良さそう");
  }
}

export function stop(message: Message, state: BotState): void {
  console.log("stop", message.content);
  state.currentQueue = [];
  if (state.currentDispatcher) {
    state.currentDispatcher.end();
    state.currentDispatcher = undefined;
  } else message.reply("今再生してないよ");
}

export function next(message: Message, state: BotState): void {
  console.log("next", message.content);
  if (state.currentDispatcher) {
    state.currentDispatcher.end();
    state.currentDispatcher = undefined;
  } else message.reply("次ないよ");
}

export function resume(message: Message, state: BotState): void {
  console.log("resume", message.content);
  if (state.currentDispatcher) state.currentDispatcher.resume();
  else message.reply("今なんもしてないよ");
}

export function pause(message: Message, state: BotState): void {
  console.log("pause", message.content);
  if (state.currentDispatcher) state.currentDispatcher.pause();
  else message.reply("今再生してないよ");
}
