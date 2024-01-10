import { App } from 'vue';
import { firebaseApp, firestore } from './firebaseConfig';

const firebasePlugin = {
    install(app: App) {
        app.provide('firebase', firebaseApp);
        app.provide('firestore', firestore);
    },
};

export default firebasePlugin;
