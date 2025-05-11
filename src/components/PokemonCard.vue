<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h5 class="card-title">{{ pokemon.name }}</h5>
        <span class="badge bg-secondary">{{ pokemon.type }}</span>
      </div>

      <p class="card-text">❤️ {{ pokemon.likes }} Likes</p>

      <button
        class="btn btn-outline-primary me-2"
        @click="$emit('like', pokemon.id)"
      >
        👍 Like
      </button>
      <button
        class="btn btn-outline-danger"
        @click="$emit('delete', pokemon.id)"
      >
        🗑 Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['pokemon']);
defineEmits(['like', 'delete']);
</script>
