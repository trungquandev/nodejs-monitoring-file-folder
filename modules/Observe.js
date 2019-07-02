/**
 * Created by trungquandev.com's author on 02/07/2019.
 * Observe.js
 */
const chokidar = require("chokidar");
const EventEmitter = require("events").EventEmitter;
const fsExtra = require("fs-extra");

let debug = console.log.bind(console);

class Observe extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * Function responsible for watching a folder
   * @param {string} targetFolder 
   */
  watchFolder(targetFolder) {
    try {
      debug(`[${new Date().toLocaleString()}] Watching for folder changes on: ${targetFolder}`);

      // initialize watcher
      let watcher = chokidar.watch(targetFolder, {persistent: true});

      // listen when a file has been added
      watcher.on("add", async (filePath) => {
        if (filePath.includes("error.log")) {
          debug(`[${new Date().toLocaleString()}] ${filePath} has been added.`);

          // Read content of new file
          let fileContent = await fsExtra.readFile(filePath);

          // emit an event when new file has been added
          this.emit("new-file-added", {message: fileContent.toString()});
        }
      });
    } catch (error) {
      debug(error.toString());
    }
  }
}

module.exports = Observe;
