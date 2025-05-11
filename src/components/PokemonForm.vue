<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="onSubmit">
          <div class="col-12">
            <input
              v-model="form.name"
              placeholder="Pokémon Name"
              class="form-input mb-2"
              required
            />
          </div>
          <div class="col-12">
            <select v-model="form.type" class="form-input mb-2" required>
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
          </div>

          <button type="submit" class="handleLogin">Save</button>
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
