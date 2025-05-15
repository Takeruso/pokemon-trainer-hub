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

        <div class="col-12" v-if="!editing">
          <button @click="handleLike" class="btn btn-outline-primary me-2">
            👍 Like
          </button>
          <button @click="startEdit" class="btn btn-outline-warning me-2">
            ✏️ Edit
          </button>
          <button
            @click="$emit('delete', local.id)"
            class="btn btn-outline-danger"
          >
            🗑 Delete
          </button>
        </div>

        <div class="col-12" v-else>
          <button @click="saveEdit" class="btn btn-outline-success me-2">
            💾 Save
          </button>
          <button @click="cancelEdit" class="btn btn-outline-secondary">
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
