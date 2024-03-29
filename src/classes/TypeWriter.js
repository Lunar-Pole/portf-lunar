import "regenerator-runtime/runtime";
import { pathTree, MESSAGE, MY_EMAIL, MY_GITHUB } from "../utils";
import Stack from "./Stack";
import Path from "./Path";
import CustomNodeElement from "./CustomNodeElement";
import FileSystem from "./FileSystem";

export default class TypeWriter {
  constructor(wrapperElement) {
    this.WRAPPER_ELEMENT = wrapperElement || document.body;
    this.commandsStack = new Stack();
    this.pathStack = new Stack();
    this._path = new Path(this.pathStack.get());
    this.personalFrame = document.getElementById("victor");
  }

  async sleep(delay) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return this;
  }

  getPreviousNode() {
    return this.WRAPPER_ELEMENT.lastElementChild;
  }

  autoScroll(node) {
    node.scrollIntoView();
    return this;
  }

  applyContext(node, context) {
    if (context && context instanceof HTMLElement) {
      context.append(node);
    } else {
      this.WRAPPER_ELEMENT.append(node);
    }
    return node;
  }

  async constructNodeBody(node, text, cps, context) {
    let i = 0;
    const textLen = text.length;
    const currentNode = this.applyContext(node, context);
    while (i <= textLen) {
      await this.sleep(1e3 / cps);
      this.inject(currentNode, text, i);
      this.autoScroll(currentNode);
      i += 1;
    }
  }

  ls() {
    const currentPath = this._path.getCurrentPath(pathTree);
    // param folders need to be transformed to Capitalize ??
    const fileSystem = new FileSystem();
    return fileSystem.getFolderStats(currentPath);
  }

  generateStringError(error) {
    return error;
  }

  updatePathStack(pathArray) {
    if (Array.isArray(pathArray)) {
      pathArray.forEach((fragment) => {
        if (fragment === "../" || fragment === "..") {
          this.pathStack.pop();
        } else {
          this.pathStack.push(fragment);
        }
      });
    }
    return this;
  }

  rollbackPathStack(error) {
    const depthIndex = +error;
    const result = this.pathStack.getValue(depthIndex);
    if (depthIndex === 0) {
      this.pathStack.clear();
    } else {
      this.pathStack.pop();
    }
    return `Cannot find folder: ${result}`;
  }

  cd(pathName) {
    const result = this._path.getPathFragments(pathName);
    if (result instanceof Error)
      return this.generateStringError(result.message);
    this.updatePathStack(result);
    const currentPath = this._path.getCurrentPath(pathTree);
    if (!(currentPath instanceof Error)) return `Entered: ${this._path}`;
    return this.rollbackPathStack(currentPath.message);
  }

  cat(fileName) {
    if (!fileName) {
      return this.generateStringError("You must specify the filename!");
    }
    const currentPath = this._path.getCurrentPath(pathTree);
    const fileSystem = new FileSystem();
    const file = fileSystem.findFile(currentPath, fileName);
    const result = fileSystem.getFileData(file, this.cat.name);
    if (result instanceof Error) {
      return this.generateStringError(result.message);
    }
    return result;
  }

  run(fileName) {
    if (!fileName) {
      return this.generateStringError("You must specify the filename!");
    }
    const fileSystem = new FileSystem();
    const file = fileSystem.findFile(
      this._path.getCurrentPath(pathTree),
      fileName
    );
    const result = fileSystem.getFileData(file, this.run.name);
    if (result instanceof Error)
      return this.generateStringError(result.message);
    return this.performLoad(fileName);
  }

  performLoad(params) {
    const wrapperElement = new CustomNodeElement();
    wrapperElement.createElementFromTag("span");
    wrapperElement.attachClasses(["loading"]);
    const node = wrapperElement.element;
    node.innerHTML = `${params}.exe > `;
    this.WRAPPER_ELEMENT.append(node);
    return node;
  }

  clear() {
    const childrenElements = Array.from(this.WRAPPER_ELEMENT.children);
    childrenElements.forEach((e) => e.remove());
    return this;
  }

  help() {
    return MESSAGE.HELP_COMMANDS;
  }

  contact(params) {
    if (!params) {
      return MESSAGE.CONTACT;
    }
    if (params === "github") {
      window.open(MY_GITHUB, "Github");
      return "Open github";
    }
    if (params === "email") {
      navigator.clipboard.writeText(MY_EMAIL);
      return "Email address is copied to the clipboard";
    }
    return "Invalid query";
  }

  parseCommand(rawCmd) {
    this.commandsStack.push(rawCmd);

    let [cmd, ...params] = rawCmd.split(" ");
    params = params.join(" ");
    const cleanCmd = cmd.toLowerCase();
    const cleanParams = params.toLowerCase().trim();
    return this.checkCommand(cleanCmd, cleanParams);
  }

  checkCommand(cmd, params) {
    switch (cmd) {
      case "cat": {
        return this.cat(params);
      }
      case "ls": {
        return this.ls();
      }
      case "cd": {
        return this.cd(params);
      }
      case "clear": {
        this.clear();
        break;
      }

      case "help": {
        return this.help();
      }
      case "contact": {
        return this.contact(params);
      }
      case "run": {
        return this.run(params);
      }
      default: {
        return `Unknown command: [${this._path.trimQuery(cmd)}]`;
      }
    }
  }

  synchInject({ text = "", tag = "pre", classList = [] }) {
    const wrapperElement = new CustomNodeElement();
    wrapperElement.createElementFromTag(tag);
    wrapperElement.attachClasses(classList);
    const node = wrapperElement.element;
    node.innerHTML = text;
    this.WRAPPER_ELEMENT.append(node);
    return this;
  }

  adjustInput(className) {
    const MAX_INPUT_LENGTH = 30;
    const result = document.getElementsByClassName(className)[0];
    result.setAttribute("maxlength", MAX_INPUT_LENGTH);
    return result;
  }

  async loadContent() {
    await this.sleep(2000);
    this.clear();
    this.personalFrame.classList.toggle("hidden");
  }

  unLoadContent(i) {
    const input = i;
    this.personalFrame.classList.toggle("hidden");
    this.synchInject({ text: "App terminated", classList: ["command"] });
    input.removeAttribute("disabled");
    input.value = "";
  }

  handleOnEnter(event) {
    const input = event.target;
    const command = input.value;
    const result = this.parseCommand(command);
    input.value = "";
    if (result instanceof HTMLElement) {
      this.loadContent();
    } else {
      this.synchInject({
        text: this._path.trimQuery(command),
        classList: ["command"],
      });
      this.write({ text: result, cps: 200 });
    }
  }

  // EXPERIMENTAL
  listen(className) {
    const input = this.adjustInput(className);
    let historyItemInd;
    window.addEventListener("keydown", async (event) => {
      input.focus();
      if (!this.personalFrame.classList.contains("hidden")) {
        input.value = "Press [CTRL + C] to terminate current app";
        input.setAttribute("disabled", "disabled");
        if ((event.key === "c" || event.key === "C") && event.ctrlKey) {
          this.unLoadContent(input);
        }
        return;
      }
      if (event.key === "Enter") {
        this.handleOnEnter(event);
        historyItemInd = this.commandsStack.size();
      } else if (event.key === "ArrowUp") {
        if (!this.commandsStack.size()) return null;
        historyItemInd =
          typeof historyItemInd === "number"
            ? --historyItemInd
            : this.commandsStack.size() - 1;
        if (historyItemInd < 0) historyItemInd++;
        input.value = this.commandsStack.getValue(historyItemInd);
      } else if (event.key === "ArrowDown") {
        if (!this.commandsStack.size()) return null;
        historyItemInd++;
        if (historyItemInd === this.commandsStack.size()) historyItemInd--;
        input.value = this.commandsStack.getValue(historyItemInd);
      }
    });
  }

  inject(node, text, startIndex) {
    const currentNode = node;
    currentNode.innerHTML = text.substring(0, startIndex);
  }

  async write({
    text = "",
    tag = "pre",
    cps = 30,
    classNames = [],
    context = null,
  }) {
    const elementWrapper = new CustomNodeElement();
    elementWrapper.createElementFromTag(tag);
    classNames.push("typewriter");
    elementWrapper.attachClasses(classNames);
    await this.constructNodeBody(elementWrapper.element, text, cps, context);
    return this;
  }
}
