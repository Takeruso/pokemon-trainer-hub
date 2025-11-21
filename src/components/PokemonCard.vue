<template>
  <div class="pokemon-card mb-3">
    <div class="card-body">
      <div class="row">
        <div class="col-12 d-flex justify-content-between">
          <h5 v-if="!editing" class="card-title">{{ local.name }}</h5>
          <input v-else v-model="local.name" class="form-control" />
        </div>

        <div class="col-12">
          <p v-if="!editing" class="card-text">{{ local.comment }}</p>
          <textarea
            v-else
            v-model="local.comment"
            class="form-control"
          ></textarea>
        </div>

        <div class="col-12">
          <p class="card-text">❤️ {{ local.likes }} Likes</p>
        </div>

        <div v-if="!editing" class="col-12">
          <button class="btn btn-outline-primary me-2" @click="handleLike">
            👍 Like
          </button>
          <button class="btn btn-outline-warning me-2" @click="startEdit">
            ✏️ Edit
          </button>
          <button
            class="btn btn-outline-danger"
            @click="$emit('delete', local.id)"
          >
            🗑 Delete
          </button>
        </div>

        <div v-else class="col-12">
          <button class="btn btn-outline-success me-2" @click="saveEdit">
            💾 Save
          </button>
          <button class="btn btn-outline-secondary" @click="cancelEdit">
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['pokemon']);
const emit = defineEmits(['like', 'delete', 'edit']);

const editing = ref(false);
const local = ref({ ...props.pokemon });

const handleLike = () => {
  emit('like', local.value.id);
  local.value.likes++;
};

const startEdit = () => {
  editing.value = true;
};

const saveEdit = () => {
  emit('edit', local.value);
  editing.value = false;
};

const cancelEdit = () => {
  local.value = { ...props.pokemon };
  editing.value = false;
};
</script>
