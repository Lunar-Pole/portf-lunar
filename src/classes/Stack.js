export default class Stack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    return this.stack.push(value);
  }

  pop() {
    return this.stack.pop();
  }

  size() {
    return this.stack.length;
  }

  peek() {
    return this.stack[this.size() - 1];
  }

  getValue(index) {
    return this.stack[index];
  }

  get() {
    return this.stack;
  }

  clear() {
    let i = 0;
    const elements = this.stack.length;
    while (i < elements) {
      this.stack.pop();
      i += 1;
    }
  }
}
