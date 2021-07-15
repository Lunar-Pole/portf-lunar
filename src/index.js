import "./styles/index.css";

import TypeWriter from "./classes/TypeWriter";
import { MESSAGE } from "./utils";

const typer = new TypeWriter(document.getElementById("wrapper"));
const consoleEl = document.getElementById("console");
const dateEl = document.getElementById("date");

typer
  .write({ text: MESSAGE.INITIALIZE, context: dateEl })
  .then((t) => t.write({ text: MESSAGE.COPYRIGHT, context: dateEl }))
  // .then(t => t.write(MESSAGE.MEM_CHECK, "p", 50))
  // .then(t => t.write("", "p", 0, false, "loading"))
  // .then(t => {
  //     t.write("", "span", 0, false, "memloading")
  //     t.write("FUCK ITDDDDDDDDDDDDDDDDDDDDASSSSSSSSSSSSSS", "pre", 30);
  //     return t;
  // })
  // .then(t => t.sleep(2000))
  // .then(t => t.write(MESSAGE.PERIPHERALS, "p", 150))
  // .then(t => t.write("#######", "p", 10))
  // .then(t => t.sleep(2000))
  // .then(t => t.write(MESSAGE.WELCOME, "pre", 300, false, [], welcomeEl))
  .then((t) => t.write({ text: MESSAGE.HELP, classNames: ["text-center"] }))
  .then((t) =>
    t.write({
      tag: "span",
      cpm: 310,
      classNames: ["command"],
      context: consoleEl,
    })
  )
  .then((t) =>
    t.write({
      tag: "input",
      cpm: 310,
      classNames: ["input"],
      context: consoleEl,
    })
  )
  .then((t) => t.listen("input"));
