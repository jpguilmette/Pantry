<template>
    <div class="container">
        <header>
            <h1>Liste d'achat</h1>
            <AddItemButton @add-item="onAddItem" />
        </header>
        <ListItems :items="store.pantryItems" @completed="onCompleted" />
        <footer>
            <CompleteAllItemsButton @complete-all-items="completeAllItems" />
        </footer>
        <AddItemModal v-model:open="openAddItemModal" @save="addItem" />
        <!-- <button @click="store.clearAllItems">Clear all items</button> -->
    </div>
    <div class="background"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import AddItemButton from './components/AddItemButton.vue';
import AddItemModal from './components/AddItemModal.vue';
import CompleteAllItemsButton from './components/CompleteAllItemsButton.vue';
import ListItems from './components/ListItems.vue';
import { usePantryStore } from './store/store';
import { Item } from './types/item';

const store = usePantryStore();
const openAddItemModal = ref(false);

onMounted(async () => {
    await store.getItems();
});

const onAddItem = () => {
    openAddItemModal.value = true;
};

const addItem = (item: Item) => {
    store.addItem(item);
};

const completeAllItems = () => {
    store.completeAllItems();
};

const onCompleted = (item: Item) => {
    item.completed = !item.completed;
    store.updateItem(item);
};
</script>

<style scoped>
.background {
    position: fixed;
    top: -20px;
    left: -20px;
    width: 120%;
    height: 120%;
    background: linear-gradient(#a1d6e2, #1995ad, #a1d6e2);
    filter: blur(15px);
    z-index: -1;
}

.container {
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 0.5rem;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

footer {
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 1rem;
}
</style>
