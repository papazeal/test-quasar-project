/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
initializeApp();

exports.subscribeToTopic = onRequest(
  { region: "asia-southeast1", cors: true },
  (req, res) => {
    const data = req.body;
    if (!data.token) {
      res.send({ error: "token not found" });
    }
    //   const data = await request.body.json()
    getMessaging()
      .subscribeToTopic(data.token, "all")
      .then((response) => {
        // Response is a message ID string.
        res.send(response);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);

exports.pushNotification = onRequest(
  { region: "asia-southeast1", cors: true },
  (req, res) => {
    const message = {
      notification: {
        title: req.body.title,
        body: req.body.body,
      },
      topic: "all",
    };
    getMessaging()
      .send(message)
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);
