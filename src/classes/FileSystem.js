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
    if (Array.isArray(path)) {
      return path.find((fileObject) => fileObject.name === fileName);
    }
    return undefined;
  }

  getFileData(file) {
    if (!file) return new Error("No such file found!");
    if (file.type !== "txt")
      return new Error("You cannot read this file! Try [run] instead");
    return file.data;
  }
}
