const fs = require("fs");

class JSONFileDatabase {
  constructor(filepath) {
    this.filepath = filepath;
  }

  createHandler(resource) {
    const items = this.readFile();
    items.push(resource);
    this.writeFile(items);
    return { created: true, id: resource.id };
  }

  readAllHandler() {
    console.log(this);
    return this.readFile();
  }

  readOneHandler(id) {
    const items = this.readFile();
    const found = items.find((item) => item.id === id);
    if (!found) {
      return null;
    }
    return found;
  }

  updateHandler(id, diffObj) {
    const items = this.readFile();
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) {
      return { updated: false, updatedId: null };
    }
    items[idx] = { ...items[idx], ...diffObj };
    this.writeFile(items);
    return { updated: true, updatedId: items[idx].id };
  }

  deleteHandler(id) {
    const items = this.readFile();
    const idx = items.findIndex((item) => item.id === id);
    items.splice(idx, 1);
    this.writeFile(items);
    return { deleted: true, deletedId: id };
  }

  readFile() {
    if (fs.existsSync(this.filepath)) {
      const raw = fs.readFileSync(this.filepath);
      return JSON.parse(raw);
    } else {
      console.warn("File does not exists");
      return [];
    }
  }

  writeFile(obj) {
    fs.writeFileSync(this.filepath, JSON.stringify(obj));
  }
}

module.exports = JSONFileDatabase;
