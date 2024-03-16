import { defineStore } from 'pinia'
import artist from '../artist.json'
import axios from 'axios';
import Hls from 'hls.js';

export const useSongStore = defineStore('song', {
  state: () => ({
    isPlaying: false,
    audio: null,
    currentArtist: null,
    currentTrack: null,
    searchResults: {},
    hls: null,
  }),
  actions: {
    async searchSongs(query) {
        try {
          const response = await axios.get(`http://0.0.0.0:5000/api/music/search?q=${query}&searchEngine=gaama`);
          if (response.data.status === 200) {
            // Transforming the search results into the desired JSON format
            const formattedResults = {
              name: "Search Results",
              albumCover: "", // Assuming you don't have a specific cover for search results
              releaseYear: new Date().getFullYear(),
              tracks: response.data.response.map((song, index) => ({
                id: index + 1, // Generating an ID based on array index, might want to use something else
                name: song.title,
                path: song.img, // Assuming the path is not directly provided, you might need to adjust
              }))
            };
      
            this.searchResults = formattedResults;
          }
        } catch (error) {
          console.error('Error searching songs: ', error);
        }
    },

    async fetchAndPlaySong(songId) {
        try {
          const response = await axios.get(`http://0.0.0.0:5000/api/music/fetch?id=${songId}`);
          if (response.data.status === 200) {
            const streamUrl = response.data.response;
      
            // Ensure the audio element is initialized
            if (!this.audio) {
              this.audio = new Audio();
            }
      
            if (Hls.isSupported()) {
              if (this.hls) {
                this.hls.destroy();
              }
              this.hls = new Hls();
              this.hls.loadSource(streamUrl);
              this.hls.attachMedia(this.audio);
              this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.audio.play();
                this.isPlaying = true;
              });
            } else if (this.audio.canPlayType('application/vnd.apple.mpegurl')) {
              this.audio.src = streamUrl;
              this.audio.addEventListener('loadedmetadata', () => {
                this.audio.play();
                this.isPlaying = true;
              });
            }
          }
        } catch (error) {
          console.error('Error fetching song: ', error);
        }
    },

    loadSong(artist, track) {
        this.currentArtist = artist
        this.currentTrack = track

        if (this.audio && this.audio.src) {
            this.audio.pause()
            this.isPlaying = false
            this.audio.src = ''
        }

        this.audio = new Audio()
        this.audio.src = track.path

        setTimeout(() => {
            this.isPlaying = true
            this.audio.play()
        }, 200)
    },

    playOrPauseSong() {
        if (this.audio.paused) {
            this.isPlaying = true
            this.audio.play()
        } else {
            this.isPlaying = false
            this.audio.pause()
        }
    },

    playOrPauseThisSong(artist, track) {
        if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
            this.loadSong(artist, track)
            return
        }

        this.playOrPauseSong()
    },

    prevSong(currentTrack) {
        let track = artist.tracks[currentTrack.id - 2]
        this.loadSong(artist, track)
    },

    nextSong(currentTrack) {
        if (currentTrack.id === artist.tracks.length) {
            let track = artist.tracks[0]
            this.loadSong(artist, track)
        } else {
            let track = artist.tracks[currentTrack.id]
            this.loadSong(artist, track)
        }
    },

    playFromFirst() {
        this.resetState()
        let track = artist.tracks[0]
        this.loadSong(artist, track)
    },

    resetState() {
        this.isPlaying = false
        this.audio = null
        this.currentArtist = null
        this.currentTrack = null
    }
  },
  persist: true
})