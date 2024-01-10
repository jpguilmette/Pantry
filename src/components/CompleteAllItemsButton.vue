<template>
    <button class="complete-all-items-button">
        <div
            class="complete-all-items-button__button-content"
            @click="emits('completeAllItems')"
        >
            <div>Cocher tous</div>
            <div
                class="complete-all-items-button__svg"
                v-html="svgCartCheck"
            ></div>
        </div>
    </button>
</template>

<script lang="ts" setup>
import svgCartCheck from '../assets/cart-check.svg?raw';

const emits = defineEmits<{
    completeAllItems: [];
}>();
</script>

<style lang="scss" scoped>
.complete-all-items-button {
    border-radius: 40px;

    &__button-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #fff;
    }

    &__svg {
        height: 2rem;
        width: 2rem;
    }
}
</style>
