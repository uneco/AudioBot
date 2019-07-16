import { Client, Message } from "discord.js";
import { ActionDefinition, BotOptions, MediaAdapter, BotState } from "./types";
export * from "discord.js";
export * from "./types";

export default class BotClient extends Client {
  public client: Client;
  public msgActions: ActionDefinition[];
  public adapters: MediaAdapter[];
  public state: BotState = {
    currentDispatcher: undefined,
    currentQueue: []
  };

  public constructor(options: BotOptions) {
    super();
    this.client = new Client();
    this.msgActions = options.msgActions;
    this.adapters = options.adapters;
    this.registerEvent();
    this.readyMsg();
  }

  public login(token: string): Promise<string> {
    return this.client.login(token);
  }

  private registerEvent(): void {
    this.client.on("message", (message: Message): void => {
      const [command, ...content] = message.content.split(" ");
      message.content = content.join(" ");
      this.help(command, message);
      const commandAction = this.msgActions.find(
        (a): boolean => a.command === command
      );
      if (commandAction) {
        commandAction.action(message, this.state, {
          adapters: this.adapters
        });
      }
    });
  }

  private readyMsg(): void {
    this.client.on("ready", (): void => {
      console.log("start bot");
    });
  }

  private help(command: string, message: Message): void {
    if (command === "!!help") {
      const helpMsg = this.msgActions
        .map((action: ActionDefinition): string => {
          return `${action.command}: ${
            action.comment ? action.comment : "説明ないわ～"
          }`;
        })
        .join("\n");
      message.reply("\n" + helpMsg);
    }
  }
}
