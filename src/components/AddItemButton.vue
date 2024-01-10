<template>
    <button class="add-item-button">
        <div
            class="add-item-button__svg"
            v-html="svgCartPlus"
            @click="emits('addItem', { name: 'Savon', quantity: 4 })"
        ></div>
    </button>
</template>

<script lang="ts" setup>
import svgCartPlus from '../assets/cart-plus.svg?raw';
import { Item } from '../types/item';

const emits = defineEmits<{
    addItem: [item: Item];
}>();
</script>

<style lang="scss" scoped>
.add-item-button {
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

    &__svg {
        width: 100%;
        height: 100%;
        color: #fff;
        fill: currentColor;
    }
}
</style>
