import {
    DocumentData,
    QueryDocumentSnapshot,
    QuerySnapshot,
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { firestore } from '../firebaseConfig';
import { Item } from '../types/item';

export interface State {
    items: Item[];
    charging: boolean;
}

export const usePantryStore = defineStore('pantry', () => {
    const items = ref<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();
    const charging = ref(true);

    const pantryItems = computed(
        () =>
            items.value
                ?.map((item) => {
                    const data = item.data();
                    return {
                        id: item.id,
                        name: data.name,
                        quantity: data.quantity,
                        completed: data.completed,
                        dateCreated: data.dateCreated,
                        dateCompleted: data.dateCompleted,
                    } as Item;
                })
                .sort((a, b) => a.name.localeCompare(b.name))
    );

    const getItems = async () => {
        const querySnapshot: QuerySnapshot = await getDocs(
            query(
                collection(firestore, 'items'),
                where('completed', '==', false)
            )
        );
        items.value = querySnapshot.docs;
    };

    const addItem = async (item: Item) => {
        try {
            await addDoc(collection(firestore, 'items'), {
                ...item,
                completed: false,
                dateCreated: new Date().toISOString(),
            });
            getItems();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error adding document: ', e);
        }
    };

    const updateItem = async (item: Item) => {
        try {
            const { id, ...localItem } = item;
            const itemRef = items.value?.find((item) => item.id === id)?.ref;

            if (!itemRef) {
                throw new Error('Item not found');
            }

            const cleanedLocalItem = Object.fromEntries(
                Object.entries(localItem).filter(
                    ([_, value]) => value !== undefined
                )
            );

            await updateDoc(itemRef, cleanedLocalItem);

            getItems();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error updating document: ', e);
        }
    };

    const completeAllItems = async () => {
        try {
            const updatePromises: Promise<void>[] = [];

            items.value?.forEach((item) => {
                const itemRef = item.ref;
                updatePromises.push(
                    updateDoc(itemRef, {
                        completed: true,
                        dateCompleted: new Date().toISOString(),
                    })
                );
            });

            await Promise.all(updatePromises);

            getItems();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error updating all documents: ', e);
        }
    };

    const clearAllItems = async () => {
        try {
            const querySnapshot: QuerySnapshot = await getDocs(
                collection(firestore, 'items')
            );

            querySnapshot?.forEach((item) => {
                void deleteDoc(doc(firestore, 'items', item.id));
            });

            getItems();
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error deleting all documents: ', e);
        }
    };

    return {
        items,
        charging,
        pantryItems,
        getItems,
        addItem,
        updateItem,
        completeAllItems,
        clearAllItems,
    };
});
