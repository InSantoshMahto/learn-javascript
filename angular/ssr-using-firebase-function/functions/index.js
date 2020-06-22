const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.universal = functions.https.onRequest(require("./dist/learn/server/main").app());
