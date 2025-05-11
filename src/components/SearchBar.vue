<template>
  <input
    :value="modelValue"
    placeholder="Search ..."
    class="searchPokemon"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
