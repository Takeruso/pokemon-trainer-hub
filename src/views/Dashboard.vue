<template>
  <div>
    <LinkForm :initial-data="newLink" @save="addLink" />
    <SearchBar v-model="searchQuery" />

    <div v-for="link in filteredLinks" :key="link.id">
      <LinkCard :link="link" @edit="editLink" @delete="deleteLink" />
    </div>
  </div>
</template>

<script setup>
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

// const addLinkHandler = (link) => {
//   if (link.id) {
//     updateLink(link);
//   } else {
//     addLink(link);
//   }
//   newLink.value = { name: '', url: '', important: false };
// };
</script>
