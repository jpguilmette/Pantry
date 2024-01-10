<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="closeModal">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-xl"
                        >
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                                    >
                                        <DialogTitle
                                            as="h2"
                                            class="text-base font-semibold leading-2 text-gray-900"
                                        >
                                            Ajouter un élément à la liste
                                        </DialogTitle>
                                        <div class="mt-4 sm:col-span-4">
                                            <label
                                                for="name"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Nom
                                                <sup
                                                    class="text-red-600 font-large"
                                                >
                                                    *
                                                </sup>
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    autocomplete="name"
                                                    required="true"
                                                    v-model="name"
                                                    class="block sm:w-full w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    :class="{
                                                        'ring-red-600':
                                                            nameFieldError,
                                                    }"
                                                    @focus="
                                                        nameFieldError = false
                                                    "
                                                    @keydown.enter="onSave"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="mt-4 sm:col-span-4 max-w-16"
                                        >
                                            <label
                                                for="quantity"
                                                class="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Quantité
                                            </label>
                                            <div class="mt-2">
                                                <input
                                                    id="quantity"
                                                    name="quantity"
                                                    type="number"
                                                    min="0"
                                                    autocomplete="quantity"
                                                    v-model="quantity"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    :class="{
                                                        'ring-red-600':
                                                            quantityFieldError,
                                                    }"
                                                    @focus="
                                                        quantityFieldError = false
                                                    "
                                                    @keydown.enter="onSave"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                            >
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                    @click="onSave"
                                >
                                    Enregistrer
                                </button>
                                <button
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="onCancel"
                                    ref="cancelButtonRef"
                                >
                                    Annuler
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts" setup>
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import { defineModel, ref } from 'vue';
import { Item } from '../types/item';

const open = defineModel('open', { type: Boolean, default: false });

const emits = defineEmits<{
    save: [item: Item];
}>();

const name = ref('');
const quantity = ref(0);
const nameFieldError = ref(false);
const quantityFieldError = ref(false);

const onCancel = () => {
    closeModal();
};

const onSave = () => {
    if (!validateFields()) return;

    const item = {
        name: name.value,
        ...(quantity.value > 0 && { quantity: quantity.value }),
    };
    emits('save', item);
    closeModal();
};

const closeModal = () => {
    name.value = '';
    quantity.value = 0;
    open.value = false;
};

const validateFields = (): boolean => {
    nameFieldError.value = name.value === '';
    quantityFieldError.value = quantity.value < 0;

    return !(nameFieldError.value || quantityFieldError.value);
};
</script>
