export default class FileSystem {
  constructor() {
    this.totalBytes = 0;
    this.totalFiles = 0;
    this.structuredTable = "";
  }

  getFolderStats(path) {
    this.constructFilesTable(path);
    const width = this.getContentWidth(this.structuredTable);
    this.structuredTable += `${"-".repeat(width)}\n${
      this.totalFiles
    } files(s) in total, ${this.totalBytes} byte(s)`;
    return this.structuredTable;
  }

  constructFilesTable(path) {
    Object.values(path).forEach((file) => {
      const name = file.name.toUpperCase();
      const type = file.type.toUpperCase();
      const bytes = this.getSizeInBytes(file);
      this.totalBytes += bytes;
      this.totalFiles += 1;
      this.structuredTable += `${name}\t[${type}]\t${bytes} \n`;
    });
  }

  getSizeInBytes(fileObj) {
    let file;
    if (fileObj.type === "exe") {
      file = document.getElementById(fileObj.name);
    } else {
      file = fileObj.data;
    }
    return new Blob([file || ""]).size;
  }

  getContentWidth(table) {
    return table.split("\n")[0].length + 8; // 8 == characters in [\t\t];
  }

  findFile(path, fileName) {
    let result;
    if (Array.isArray(path)) {
      result = path.find((fileObject) => fileObject.name === fileName);
    }
    return result || new Error("File was not found");
  }

  getFileData(arg, cmdName) {
    if (arg instanceof Error) return arg;
    switch (cmdName) {
      case "cat": {
        if (arg.type !== "txt")
          return new Error("You cannot cat this file! Try [run] instead");
        return arg.data;
      }
      case "run": {
        if (arg.type !== "exe")
          return new Error("You cannot run this file! Try [cat] instead");
        return arg.data;
      }
      default: {
        return undefined;
      }
    }
  }
}
