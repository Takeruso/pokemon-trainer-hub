import { ref, watch } from 'vue';

export function useLinks(userId) {
  const storageKey = `userApps_${userId}`;
  const links = ref(JSON.parse(localStorage.getItem(storageKey)) || []);

  const saveLinks = () => {
    localStorage.setItem(storageKey, JSON.stringify(links.value));
  };

  const addLink = (link) => {
    links.value.push({ ...link, id: Date.now() });
    saveLinks();
  };

  const deleteLink = (id) => {
    links.value = links.value.filter(link => link.id !== id);
    saveLinks();
  };

  const updateLink = (updatedLink) => {
    const index = links.value.findIndex(link => link.id === updatedLink.id);
    if (index !== -1) {
      links.value[index] = updatedLink;
      saveLinks();
    }
  };

  watch(links, saveLinks, { deep: true });

  return { links, addLink, deleteLink, updateLink };
}
