export default class Path {
  constructor(pathStack) {
    this._invalidRegex =
      /[^A-Za-z0-9\/\.]|(?:\.{3,})|(?:\/{2})|\w(?=\.)|\.(?=\w)|\/\.\//;
    this._pathDividerRegex = /(?:\.{2}\/?)|\w+/g;
    this._pathStack = pathStack;
  }

  isValidPath(path) {
    return !this._invalidRegex.test(path);
  }

  toPathArray(path) {
    return path.match(this._pathDividerRegex || "");
  }

  getCurrentPath(fileSystemTree, depth = 0) {
    if (depth === this._pathStack.length) return fileSystemTree;
    if (!fileSystemTree[this._pathStack[depth]]) return new Error(depth);
    return this.getCurrentPath(
      fileSystemTree[this._pathStack[depth]].files,
      depth + 1
    );
  }

  getPathFragments(pathName) {
    if (!this.isValidPath(pathName)) return new Error("Invalid path");
    return this.toPathArray(pathName);
  }

  trimQuery(query) {
    return query.replace(/[^A-Za-z0-9_.\/ ]/g, "#");
  }

  toString() {
    return this._pathStack.reduce(
      (pathString, pathCrumb) => `${pathString}${pathCrumb}/`,
      "/"
    );
  }
}
