<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-12">
              <input
                v-model="form.name"
                placeholder="Your Name"
                class="form-input mb-2"
                required
              />
            </div>
            <div class="col-12">
              <textarea
                v-model="form.comment"
                placeholder="Enter your comments"
                class="form-input mb-2"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="col-12">
              <button type="submit" class="handleLogin">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
const props = defineProps(['initialData']);
const emit = defineEmits(['save']);
const initialState = {
  name: '',
  comment: '',
};

const form = reactive({ ...props.initialData });

const onSubmit = () => {
  emit('save', { ...form });
  Object.assign(form, initialState);
};
</script>
