Project Name: Movie Mate

Purpose:

To help users discover movies and save their favorite ones for future reference. The app will fetch data from movie-related APIs and allow users to personalize their experience by saving preferences locally.

Target Audience:

Movie enthusiasts who want a simple tool to search for movies, view details, and keep track of favorites.

APIs:

	The Movie Database (TMDb): Provides detailed movie information.
	•	Endpoint 1: Search movies by keyword (e.g., /search/movie).
	•	Endpoint 2: Get movie details by ID (e.g., /movie/{movie_id}).

Features:

	1.	Search Movies:
	•	Input a movie name and fetch results from the TMDb API.
	2.	View Movie Details:
	•	Click on a movie to fetch detailed information from both TMDb and OMDb APIs.
	3.	Save Favorites:
	•	Allow users to save movies to a “Favorites” list stored in LocalStorage.
	4.	Personalized Experience:
	•	Display the user’s saved favorites on the homepage.

Deployment:

	•	Deploy the app on Vercel for easy access.

Example Workflow:

	User Flow:
	•	User searches for “Inception”.
	•	Results are fetched from TMDb and displayed.
	•	User clicks on “Inception” to view details, combining data from TMDb.
	•	User clicks “Add to Favorites” to save the movie locally.