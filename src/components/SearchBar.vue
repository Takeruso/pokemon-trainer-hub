<template>
  <input
    :value="modelValue"
    placeholder="Search links..."
    class="form-control my-3"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
