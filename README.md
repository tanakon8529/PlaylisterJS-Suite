
# PlaylisterJS-Suite

PlaylisterJS-Suite is a showcase full-stack web application modeled after Spotify for creating and managing music playlists. Leveraging the efficiency of Vite and Vue 3, it presents an intuitive interface allowing users to search, organize, and play their favorite tracks with ease.

## Features

- Spotify-like UI for familiar user experience
- Search for songs using a third-party music API
- Create and manage custom playlists
- Add and remove songs with ease
- In-browser audio playback
- Responsive design for desktop and mobile users

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (v14 or higher recommended)
- A package manager like npm or yarn
- Vite for front-end scaffolding
- Vue 3 for front-end interactivity
- Pinia for state management
- Express.js for the backend server

## Installation

To install PlaylisterJS-Suite, follow these steps:

```bash
git clone https://github.com/tanakon8529/PlaylisterJS-Suite.git
cd PlaylisterJS-Suite
```

### Backend setup

```bash
cd backend
npm install
```

### Frontend setup with Vite

```bash
cd frontend
npm install
```

## Configuration

Create a `.env` file in the backend directory with the following content:

```env
PORT=5000
# Add other environment variables as needed
```

For the frontend, Vite manages environment variables using `.env` files in the root of the frontend directory.

## Running the Project

### Backend

Navigate to the backend directory and start the server:

```bash
cd backend
npm install
nodemon src/server.js
```

### Frontend

Navigate to the frontend directory and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend should now be running on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Usage

Open `http://localhost:3000` in your web browser to access the PlaylisterJS-Suite:

- Use the search bar to explore songs.
- Click the "Play" button to start an audio preview.
- Add songs to playlists via the "+" icon, and remove them as desired.
- Access your created playlists and liked songs from the sidebar.

## Acknowledgments

Special thanks to:

- Spotify for the design inspiration.
- Vue.js team for the innovative framework.
- Vite for the blazing fast build tooling.
- Pinia for the intuitive state management.
- All the contributors to the third-party libraries used in this project.

## License

PlaylisterJS-Suite is released under the [MIT License](LICENSE). See the LICENSE file for more information.