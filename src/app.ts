import Bot from "./client";
import msgActions from "./msgActions";

import config from "./config";
import { Niconico, Mp3, Youtube } from "./adapters";

const adapters = [
  new Niconico(config.niconico.email, config.niconico.password),
  new Mp3(),
  new Youtube()
];

const bot = new Bot({ msgActions, adapters });
bot.login(config.token);
