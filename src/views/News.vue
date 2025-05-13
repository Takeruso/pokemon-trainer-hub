<template>
  <div class="container">
    <h1 class="col-12 mt-3">Pokémon News</h1>

    <!-- Filters -->
    <div class="filters col-12">
      <input v-model="searchTitle" placeholder="Search by title..." />
      <input v-model="searchContent" placeholder="Search by content..." />
      <input type="date" v-model="searchDate" placeholder="Date" />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option
          v-for="category in uniqueCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <button
        v-if="searchTitle || searchContent || searchDate || selectedCategory"
        class="reset-button col-12"
        @click="resetFilters"
      >
        Clear Search
      </button>
    </div>

    <!-- News Cards -->
    <div
      v-for="news in paginatedNews"
      :key="news.title"
      :class="['pokemon-card', 'border-' + news.category.toLowerCase()]"
    >
      <div class="card-header col-12">
        <h3>{{ news.title }}</h3>
        <span class="date">{{ news.date }}</span>
      </div>
      <p><strong>Category:</strong> {{ news.category }}</p>
      <p>{{ news.content }}</p>
    </div>

    <!-- Pagination -->
    <div class="pagination-container col-12">
      <button
        class="pagination"
        @click="prevPage"
        :disabled="currentPage === 1 || loading"
        aria-label="Previous page"
      >
        Prev
      </button>

      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        class="pagination"
        @click="nextPage"
        :disabled="currentPage === totalPages || loading"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import newsData from '@/assets/news.json';

export default {
  data() {
    return {
      newsList: [],
      searchTitle: '',
      searchContent: '',
      searchDate: '',
      selectedCategory: '',
      currentPage: 1,
      perPage: 5,
    };
  },
  computed: {
    uniqueCategories() {
      const categories = this.newsList.map((news) => news.category);
      return [...new Set(categories)];
    },
    filteredNews() {
      return this.newsList.filter((news) => {
        const matchTitle = news.title
          .toLowerCase()
          .includes(this.searchTitle.toLowerCase());
        const matchContent = news.content
          .toLowerCase()
          .includes(this.searchContent.toLowerCase());
        const matchDate =
          this.searchDate === '' || news.date === this.searchDate;
        const matchCategory =
          this.selectedCategory === '' ||
          news.category === this.selectedCategory;

        return matchTitle && matchContent && matchDate && matchCategory;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.perPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredNews.slice(start, start + this.perPage);
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    resetFilters() {
      this.searchTitle = '';
      this.searchContent = '';
      this.searchDate = '';
      this.selectedCategory = '';
      this.currentPage = 1;
    },
  },
  mounted() {
    this.newsList = newsData;
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
}

.filters input,
.filters select {
  padding: 0.6em 1em;
  border: 2px solid var(--secondary-color);
  border-radius: 8px;
  font-size: 1em;
  min-width: 200px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 6px var(--primary-color);
}

input,
select {
  padding: 0.6em;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
  min-width: 200px;
}

.pokemon-card {
  background: var(--card-light);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  text-align: left;
}

.pokemon-card p {
  font-size: 1em;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.card-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}
.page-info {
  font-size: 1.2em;
  color: var(--primary-color);
}

.border-event {
  border-color: #3b82f6;
  background-color: #e0f0ff;
}
.border-raid {
  border-color: #f44336;
  background-color: #ffe0e0;
}
.border-update {
  border-color: #4caf50;
  background-color: #e0ffe0;
}
.border-announcement {
  border-color: #ff9800;
  background-color: #fff5e0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
}

.pagination {
  background-color: var(--secondary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
}
.pagination:hover:not(:disabled) {
  background-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.pagination:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.pagination:hover:not(:disabled) {
  background-color: var(--primary-color);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.pagination:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .pokemon-card {
    flex-direction: column;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media (hover: hover) {
  .pokemon-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
}

.reset-button {
  background-color: #e0e0e0;
  color: #333;
  padding: 0.6em 1em;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
}

.reset-button:hover {
  background-color: #ccc;
  transform: scale(1.05);
}
</style>
