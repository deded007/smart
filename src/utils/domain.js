import Const from "/src/const";

export function serviceLevel2Color(level) {
  return Const["color" + level.toUpperCase()];
}
