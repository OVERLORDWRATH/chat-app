import { Notification as Toast } from 'rsuite';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isLocalhost } from './helpers';

const config = {
  apiKey: 'AIzaSyCJN1eIiCYmJILr-Wr7jyNKQ_nPN71j5Fw',
  authDomain: 'chat-app-a62e4.firebaseapp.com',
  databaseURL: 'https://chat-app-a62e4-default-rtdb.firebaseio.com',
  projectId: 'chat-app-a62e4',
  storageBucket: 'chat-app-a62e4.appspot.com',
  messagingSenderId: '640458975927',
  appId: '1:640458975927:web:7a568e3acd4668f5ebfb32',
};

export const fcmVapidKey =
  'BHOp-rV-uKFXHNcOOkRBX0rpwGtwP-glT0uEbtS0eEIRkSVjCeeVz-8QjB0Y0PtrUxdQEDCzpY9u5SFCNah9utY';

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');

export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
