module.exports = class Queue {
  constructor() {
    this.data = [];
  }

  addClient(item) {
    return this.data.push(item);
  }
};
