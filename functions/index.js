/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
admin.initializeApp();
const db = admin.firestore();

exports.createShortUrl = functions.https.onRequest(async (req, res) => {
    const longUrl = req.body.url;
    const shortId = uuidv4().slice(0, 5);
    await db.collection('myurl').doc(shortId).set({ longUrl });
    const shortUrl = `${req.protocol}://${req.get('host')}/${shortId}`;
    res.json({ shortUrl });
});

exports.redirect = functions.https.onRequest(async (req, res) => {
    const shortId = req.path.split('/')[1];
    const doc = await db.collection('myurl').doc(shortId).get();
    if (doc.exists) {
        const longUrl = doc.data().longUrl;
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

