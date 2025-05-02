<template>
    <div class="card mb-3" :class="{ 'border-warning': link.important }">
      <div class="card-body">
        <h5 class="card-title">{{ link.name }}</h5>
        <a :href="link.url" target="_blank" class="btn btn-primary">Open</a>
        <button @click="$emit('edit', link)" class="btn btn-secondary">Edit</button>
        <button @click="$emit('delete', link.id)" class="btn btn-danger">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['link']);
  defineEmits(['edit', 'delete']);
  </script>
  