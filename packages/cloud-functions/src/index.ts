import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { info } from 'firebase-functions/logger';
import { auth } from 'firebase-functions/v1';
import { https } from 'firebase-functions/v2';

initializeApp();
const db = getFirestore();

export const onCreateUser = auth.user().onCreate((user) => {
  info('user created', user);
  const firstName = user.displayName
    ? user.displayName.split(' ')[0]
    : user.displayName;
  return db.collection('users').doc(user.uid).set({
    id: user.uid,
    avatar: user.photoURL,
    firstName,
    displayName: user.displayName,
    email: user.email,
  });
});

export const demoGetItemRequest = https.onRequest(async (request, response) => {
  if (!request.query?.id) {
    response.status(400).send('id query param is required');
    return;
  }

  const itemRef = db.collection('items').doc(request.query?.id as string);
  try {
    const doc = await itemRef.get();
    if (doc.data()) {
      const data = { ...doc.data(), id: doc.id };
      response.json(data);
    } else {
      response.status(404).send('There is no item with that ID');
    }
  } catch (error) {
    console.error('Error retrieving item:', error);
    response.status(500).send('Internal Server Error');
  }
});
