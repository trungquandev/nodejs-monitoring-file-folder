/**
 * Created by trungquandev.com's author on 02/07/2019.
 * server.js
 */
const ObserveClass = require("./modules/Observe");

// Init Observe object
let Observe = new ObserveClass();

// Define folder to watching, in real project, you should put it in file config or env
let targetFolder = "../laravel-example/storage/logs";

Observe.on("new-file-added", (logData) => {
  // In this step, you can do anything you want, like to push mesage to chatwork, slack...vv
  // I just print error message to console
  console.log(logData.message);
});

// Start watching foler...
Observe.watchFolder(targetFolder);
