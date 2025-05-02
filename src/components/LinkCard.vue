<template>
  <div class="card mb-3" :class="{ 'border-warning': link.important }">
    <div class="card-body">
      <h5 class="card-title">{{ link.name }}</h5>
      <a :href="link.url" target="_blank" class="btn btn-primary">Open</a>
      <button class="btn btn-secondary" @click="$emit('edit', link)">
        Edit
      </button>
      <button class="btn btn-danger" @click="$emit('delete', link.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['link']);
defineEmits(['edit', 'delete']);
</script>
