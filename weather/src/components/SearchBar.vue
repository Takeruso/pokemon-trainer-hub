<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Search links..."
    class="form-control my-3"
  />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
