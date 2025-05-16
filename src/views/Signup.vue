<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3">
        <h2>Sign Up</h2>
      </div>
      <Form @submit="handleSignup">
        <div class="mb-3">
          <Field
            name="username"
            as="input"
            class="form-input"
            placeholder="Username"
            rules="required"
          />
          <ErrorMessage name="username" v-slot="{ message }">
            <div class="mt-1 text-danger small">{{ message }}</div>
          </ErrorMessage>
        </div>

        <div class="mb-3">
          <Field
            name="password"
            as="input"
            type="password"
            class="form-input"
            placeholder="Password"
            rules="required|min:6"
          />
          <ErrorMessage name="password" v-slot="{ message }">
            <div class="mt-1 text-danger small">{{ message }}</div>
          </ErrorMessage>
        </div>
        <div class="mb-3">
          <button type="submit">Submit</button>
        </div>
      </Form>
      <div class="col-12" v-if="error">
        <div
          :class="{
            'alert alert-success': isSuccess,
            'alert alert-danger': !isSuccess,
          }"
        >
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, min } from '@vee-validate/rules';

const error = ref('');
const { register } = useAuth();
const isSuccess = ref(false);

defineRule('required', required);
defineRule('min', min);

configure({
  generateMessage: (context) => {
    const messages = {
      required: `${context.field} is required.`,
      min: `${context.field} must be at least ${context.rule.params[0]} characters.`,
    };
    return messages[context.rule.name] ?? `${context.field} is invalid.`;
  },
});

async function handleSignup(values) {
  const { username, password } = values;
  try {
    await register(username, password);
    error.value = 'Signup successful. You can now log in.';
    isSuccess.value = true;
  } catch {
    error.value = 'User already exists';
    isSuccess.value = false;
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
