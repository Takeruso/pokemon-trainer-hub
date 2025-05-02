<template>
    <form @submit.prevent="onSubmit">
      <input v-model="form.name" placeholder="Site name" class="form-control mb-2" required />
      <input v-model="form.url" placeholder="https://..." class="form-control mb-2" required />
      <label>
        <input type="checkbox" v-model="form.important" /> Important
      </label>
      <button type="submit" class="btn btn-success mt-2">Save</button>
    </form>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  const props = defineProps(['initialData']);
  const emit = defineEmits(['save']);
  
  const form = reactive({ ...props.initialData });
  
  const onSubmit = () => {
    emit('save', { ...form });
  };
  </script>
  