<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="onSubmit">
          <input
            v-model="form.name"
            placeholder="Pokémon Name"
            class="form-control mb-2"
            required
          />

          <select v-model="form.type" class="form-control mb-2" required>
            <option disabled value="">Select Type</option>
            <option>Fire</option>
            <option>Water</option>
            <option>Grass</option>
            <option>Electric</option>
            <option>Normal</option>
            <option>Psychic</option>
            <option>Ghost</option>
            <option>Dark</option>
            <option>Dragon</option>
          </select>

          <div class="form-check mb-2">
            <input
              v-model="form.isFavorite"
              type="checkbox"
              class="form-check-input"
              id="favoriteCheck"
            />
            <label class="form-check-label" for="favoriteCheck">
              Mark as Favorite
            </label>
          </div>

          <button type="submit" class="btn btn-success w-100">Save</button>
        </form>
      </div>
    </div>
  </div>
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
