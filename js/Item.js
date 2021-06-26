class Item {
  constructor(nameInput, dateInput) {
    this.name = nameInput;
    this.date = dateInput;
    this.isCompleted = false;
    this.isTimeout = false;
    this.createTime = new Date().getTime();
  }
}
