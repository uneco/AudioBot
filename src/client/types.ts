import { Message, StreamDispatcher } from "discord.js";
import { Readable } from "stream";

export interface ActionOptions {
  adapters: MediaAdapter[];
}

export interface ActionDefinition {
  command: string;
  comment?: string;
  action: (message: Message, state: BotState, options: ActionOptions) => void;
}

export interface MediaAdapter {
  fetchStream: (url: string) => Promise<Readable>;
  isHandleableUrl: (url: string) => boolean;
}

export interface BotState {
  currentDispatcher?: StreamDispatcher;
  currentQueue: MediaQueue;
}

export interface BotOptions {
  msgActions: ActionDefinition[];
  adapters: MediaAdapter[];
}

export type MediaQueue = (() => Promise<Readable>)[];
