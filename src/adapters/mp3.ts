import { MediaAdapter } from "../client";
import { ReadStream } from "tty";
import { parse as parseURL } from "url";

import axios from "axios";

export default class Mp3Plugin implements MediaAdapter {
  public async fetchStream(url: string): Promise<ReadStream> {
    const res = await axios.get(url, { responseType: "stream" });
    return res.data;
  }
  public isHandleableUrl(url: string): boolean {
    const parsed = parseURL(url);
    if (!parsed.pathname) return false;
    return parsed.pathname.endsWith(".mp3");
  }
}
