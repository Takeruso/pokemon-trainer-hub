<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3">
        <h2>Login</h2>
      </div>
      <Form @submit="handleLogin">
        <div class="col-12 mb-3">
          <Field
            name="username"
            as="input"
            class="form-input"
            placeholder="Username"
            rules="required"
          />
          <ErrorMessage v-slot="{ message }" name="username">
            <div class="text-danger small mt-1">{{ message }}</div>
          </ErrorMessage>
        </div>

        <div class="col-12 mb-3">
          <Field
            name="password"
            as="input"
            type="password"
            class="form-input"
            placeholder="Password"
            rules="required"
          />
          <ErrorMessage v-slot="{ message }" name="password">
            <div class="text-danger small mt-1">{{ message }}</div>
          </ErrorMessage>
        </div>

        <div class="col-12 mb-3">
          <div v-if="success" class="col-12">
            <div class="alert alert-success">{{ success }}</div>
          </div>

          <div v-if="error" class="col-12">
            <div class="alert alert-danger">{{ error }}</div>
          </div>
        </div>
        <div class="col-12 mb-3">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { useAuth } from '@/composables/useAuth';

// const username = ref(''); // Unused - form values come from vee-validate
// const password = ref(''); // Unused - form values come from vee-validate
const error = ref('');
const success = ref('');
const { login } = useAuth();

defineRule('required', required);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field} is required.`,
    };
    return messages[ctx.rule.name] || 'Invalid field';
  },
});

async function handleLogin(values) {
  const ok = await login(values.username, values.password);
  if (ok) {
    success.value = 'Login successful';
    error.value = '';
  } else {
    error.value = 'Invalid username or password';
    success.value = '';
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
