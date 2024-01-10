import { Firestore } from 'firebase/firestore';
import { inject } from 'vue';

export const useFirestore = () => {
    const firestore = inject<Firestore>('firestore');

    if (!firestore) {
        throw new Error('Firestore not found');
    }

    return firestore;
};
