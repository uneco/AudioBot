import { ActionDefinition } from "./client";
import { play, stop, next, resume, pause } from "./actions";

const Options: ActionDefinition[] = [
  {
    command: "play",
    comment: "play [niconico, youtube, mp3]",
    action: play
  },
  {
    command: "stop",
    comment: "再生リストを削除して停止させます",
    action: stop
  },
  {
    command: "next",
    comment: "次の曲に飛びます",
    action: next
  },
  {
    command: "resume",
    comment: "一時停止した曲を再開させます",
    action: resume
  },
  {
    command: "pause",
    comment: "曲を一時させます",
    action: pause
  }
];

export default Options;
