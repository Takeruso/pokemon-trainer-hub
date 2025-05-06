<template>
  <div>
    <p>Welcome, {{ currentUser }}! This page is only for logged-in users.</p>
    <LinkForm :initial-data="newLink" @save="addLink" />
    <SearchBar v-model="searchQuery" />

    <div v-for="link in filteredLinks" :key="link.id">
      <LinkCard :link="link" @edit="editLink" @delete="deleteLink" />
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';

const { currentUser } = useAuth();
import { ref, computed } from 'vue';
import { useLinks } from '../composables/useLinks';
import LinkForm from '../components/LinkForm.vue';
import LinkCard from '../components/LinkCard.vue';
import SearchBar from '../components/SearchBar.vue';

const userId = 'takeru';
// add updateLink later
const { links, addLink, deleteLink } = useLinks(userId);

const searchQuery = ref('');
const filteredLinks = computed(() =>
  links.value.filter((link) =>
    link.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const newLink = ref({ name: '', url: '', important: false });

const editLink = (link) => {
  newLink.value = { ...link };
};
</script>
