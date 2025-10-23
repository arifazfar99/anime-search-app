## ChatGPT - for coding

1. Help me build an Anime Search App - a two page application where users can search for anime and view details.

Page 1: Search page displaying results (on initial load, show list of top anime)
Page 2: Detail page for selected anime
API: Use Jikan API

Make sure to follow the below technical requirements:

Core Stack:

- React 18 or higher
- React hooks only (no class components)
- TypeScript
- react-router-dom for navigation
- Redux for state management
- UI library of your choice
- Single Page App only (no Next.js)

Functionality:

- Server-side pagination on the search page
- Instant search with debouncing (see details below)
- Must use redux for state management

Instant Search Implementation

The search bar should work without requiring users to press Enter or click a button:

- Debounce API calls to 250ms intervals to avoid excessive requests
- Cancel any in-flight API requests if the user continues typing
- This prevents making calls on every keystroke while keeping search responsive

Provide the code with explanation 

2. Based on the AnimeCard provided <code>, please create a skeleton loaders


## MagicPattern - for design

1. Help me build an interface for Anime Search App - a two page application where users can search for anime and view details.

Page 1: Search page displaying results (on initial load, show list of top anime)
Page 2: Detail page for selected anime