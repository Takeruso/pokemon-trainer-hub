<template>
  <!-- <div class="about-content"> -->
  <div class="container">
    <div class="row">
      <div class="col-12 mt-3">
        <h1>About This App</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <p>
          Welcome to the Hoenn Pokémon Selector! Enter your name and pick your
          side: Mountain or Ocean. We’ll show you which legendary Pokémon
          matches you!
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-center gap-3 flex-wrap text-center">
          <input
            v-model="firstName"
            placeholder="First Name"
            class="form-input w-auto"
            style="min-width: 200px"
          />
          <input
            v-model="lastName"
            placeholder="Last Name"
            class="form-input w-auto"
            style="min-width: 200px"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="form-group d-flex justify-content-center gap-3 flex-wrap">
          <label>Select your favorite type:</label>
          <div class="radio-group">
            <label
              v-for="type in types"
              :key="type"
              :class="[
                'radio-option',
                { selected: selectedType === type },
                type.toLowerCase(),
              ]"
            >
              <input type="radio" :value="type" v-model="selectedType" />
              <span>{{ typeEmojis[type] }} {{ type }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div v-if="selectedType" class="result">
          <h3>
            Welcome, {{ displayName }}! You chose
            <strong>{{ selectedType }}</strong
            >.
          </h3>
          <p>
            You might like: <strong>{{ recommendedPokemon }}</strong>
          </p>
          <transition name="fade">
            <img
              v-if="typeImage"
              :src="typeImage"
              :alt="`${selectedType} Pokémon`"
              class="type-image"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const firstName = ref('');
const lastName = ref('');
const selectedType = ref('');

const types = ['Mountain', 'Ocean'];

const typeEmojis = {
  Mountain: '⛰️',
  Ocean: '🌊',
};
const typeData = {
  Mountain: {
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png',
    recommended: 'Groudon',
  },
  Ocean: {
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png',
    recommended: 'Kyogre',
  },
};

const displayName = computed(() => {
  const first = firstName.value.trim();
  const last = lastName.value.trim();
  return first || last ? `${first} ${last}`.trim() : 'Trainer';
});

const typeImage = computed(() => {
  return typeData[selectedType.value]?.image || '';
});

const recommendedPokemon = computed(() => {
  return typeData[selectedType.value]?.recommended || '';
});
</script>

<style scoped>
.about-content {
  /* max-width: 700px; */
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input {
  padding: 0.6em;
  border: 2px solid #1e3a8a;
  border-radius: 6px;
  font-size: 1em;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 5px #3b82f6;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}

.radio-option {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 1em;
  transition: 0.3s;
  user-select: none;
}

.radio-option input {
  display: none;
}

.radio-option.selected {
  border-color: var(--secondary-color, #3b82f6);
  background-color: rgba(59, 130, 246, 0.1);
  font-weight: bold;
}

.radio-option.mountain {
  background-color: #f0e68c;
}

.radio-option.ocean {
  background-color: #add8e6;
}

.result {
  margin-top: 30px;
}

.type-image {
  width: 350px;
  height: auto;
  margin-top: 20px;
  transition: transform 0.3s ease;
}

.type-image:hover {
  transform: scale(1.1) rotate(5deg);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.form-group.names {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

@media (max-width: 600px) {
  .radio-group {
    flex-direction: column;
    align-items: center;
  }
  .form-group.names {
    flex-direction: column;
  }
}
</style>
