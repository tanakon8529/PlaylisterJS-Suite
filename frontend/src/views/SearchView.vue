<template>
    <div class="p-8">
      <div class="text-white text-2xl font-semibold mb-4">Search</div>
      <input type="text" v-model="searchQuery" @input="searchSongs" class="input-search" placeholder="Type to search...">
      <div class="py-4"></div>
  
      <!-- Display Search Results -->
      <div v-if="searchResults.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="song in searchResults" :key="song.id" class="song-item">
            <img :src="song.img" class="rounded-full w-20 h-20" alt="">
            <div class="title-item">{{ song.title }}</div>
            <!-- Add button or click handler to play song -->
            <button class="button-play" @click="fetchAndPlaySong(song.id)">Play</button>
          </div>
        </div>
      </div>
      <div v-else>No results found.</div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useSongStore } from '../stores/song';
  
  const useSong = useSongStore();
  const { searchSongs, fetchAndPlaySong, searchResults } = useSong;
  
  const searchQuery = ref('');
  
  const search = async () => {
    await searchSongs(searchQuery.value);
  };
  
  // Debounce function if desired for search input
  // const debounceSearch = debounce(search, 300);
</script>
  
<style scoped>
    /* Add your styles here */
    .input-search {
        width: 100%;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
    }

    .song-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .title-item {
        font-size: 0.85rem;
        font-weight: bold;
        color: white;
    }

    .button-play {
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: #4caf50;
        color: white;
        border: none;
        cursor: pointer;
    }
</style>
  