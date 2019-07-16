import { MediaAdapter } from "../client";
import ytdl from "ytdl-core";
import { Readable } from "stream";
import { parse as parseURL } from "url";

export default class YoutubePlugin implements MediaAdapter {
  public fetchStream(url: string): Promise<Readable> {
    const stream = ytdl(url, {
      filter: "audioonly"
    });

    if (stream) return Promise.resolve(stream);
    else return Promise.reject();
  }
  public isHandleableUrl(url: string): boolean {
    const parsed = parseURL(url);
    if (!parsed.host) return false;
    return parsed.host.includes("youtube");
  }
}
