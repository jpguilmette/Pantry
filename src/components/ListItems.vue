<template>
    <!-- {{ props.items }} -->
    <!-- <ul class="list-item"> -->
    <TransitionGroup name="list" tag="ul" class="list-item">
        <template v-if="props.items.length > 0">
            <li
                class="list-item__item"
                v-for="item in props.items"
                :key="item.id"
            >
                <div class="list-item__item-detail">
                    {{ item.name }}
                    {{ item.quantity ? `(${item.quantity})` : '' }}
                </div>
                <button
                    class="list-item__complete"
                    :class="{ 'list-item__button--completed': item.completed }"
                    @click="emits('completed', item)"
                >
                    <div
                        class="list-item__complete-svg"
                        v-html="svgCheck"
                    ></div>
                </button>
            </li>
        </template>
        <template v-else>
            <li class="list-item__empty">Liste vide</li>
        </template>
    </TransitionGroup>
    <!-- </ul> -->
</template>

<script lang="ts" setup>
import svgCheck from '../assets/check.svg?raw';
import { Item } from '../types/item';

const props = withDefaults(
    defineProps<{
        items: Item[];
    }>(),
    {
        items: () => [],
    }
);

const emits = defineEmits<{
    completed: [item: Item];
}>();
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}

.list-item {
    list-style: none;
    padding: 0.2rem 0;
    margin: 1rem 0;
    background-color: #bcbabe;
    font-size: 1.3rem;
    transition: all 0.5s ease;

    &__item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 1rem;
        margin: 0;
        background-color: #f1f1f2;
    }

    &__item:nth-child(even) {
        background-color: #e7e7e7;
    }

    &__item-detail {
        flex-grow: 1;
        padding: 0.5rem 0;
    }

    &__complete {
        display: flex;
        border: 1px solid #093d47;
        background: #a1d6e2;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        color: #fff;
        transition: background-color 300ms;

        &:hover {
            background-color: #1995ad;
        }
    }

    &__complete-svg {
        width: 3rem;
        height: 3rem;
        color: #093d47;
    }

    &__empty {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        margin: 0;
        background-color: #f1f1f2;
    }
}
</style>
