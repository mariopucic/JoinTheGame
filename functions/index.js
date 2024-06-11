const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteTermin = functions.https.onCall(async (data, context) => {
   
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can delete events.');
    }

    const terminId = data.terminId;
    const userId = context.auth.uid; 
   
    const terminRef = admin.firestore().doc(`termini/${terminId}`);
    const doc = await terminRef.get();

    if (!doc.exists) {
        throw new functions.https.HttpsError('not-found', 'Termin not found');
    }

    const termin = doc.data();

    
    if (termin.userId !== userId) {
        throw new functions.https.HttpsError('permission-denied', 'You can only delete your own events');
    }

    
    await terminRef.delete();
    return { message: 'Termin je uspješno obrisan.' };
});
