class AnimeQuoteExplorer {
    constructor() {
        this.anilistUrl = 'https://graphql.anilist.co';
        this.jikanUrl = 'https://api.jikan.moe/v4';
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('randomQuote').addEventListener('click', () => this.getRandomQuote());
        document.getElementById('searchQuote').addEventListener('click', () => {
            const anime = document.getElementById('animeSearch').value;
            if (anime) this.searchAnime(anime);
        });
    }

    async getRandomQuote() {
        this.showLoading();
        try {
            // Get random anime from Jikan API
            const randomResponse = await fetch(`${this.jikanUrl}/random/anime`);
            const randomData = await randomResponse.json();
            const anime = randomData.data;

            // Get more details from AniList
            const animeData = await this.getAnimeInfo(anime.title);

            const quoteData = {
                quote: anime.synopsis?.split('.')[0] + '.' || "No quote available",
                anime: anime.title,
                character: anime.title,
                jikanScore: anime.score,
                popularity: anime.popularity,
                ranking: anime.rank
            };

            this.updateUIWithBothAPIs(quoteData, animeData.data.Media);
        } catch (error) {
            console.error('Fetch Error:', error);
            this.showError('Failed to fetch quote. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async searchAnime(searchTerm) {
        this.showLoading();
        try {
            // Search using Jikan API
            const jikanResponse = await fetch(`${this.jikanUrl}/anime?q=${encodeURIComponent(searchTerm)}&limit=1`);
            const jikanData = await jikanResponse.json();

            if (jikanData.data && jikanData.data.length > 0) {
                const anime = jikanData.data[0];
                
                // Get additional info from AniList
                const animeData = await this.getAnimeInfo(anime.title);

                const quoteData = {
                    quote: anime.synopsis?.split('.')[0] + '.' || "No quote available",
                    anime: anime.title,
                    character: anime.title,
                    jikanScore: anime.score,
                    popularity: anime.popularity,
                    ranking: anime.rank
                };

                this.updateUIWithBothAPIs(quoteData, animeData.data.Media);
            } else {
                throw new Error('Anime not found');
            }
        } catch (error) {
            console.error('Search Error:', error);
            this.showError(`No results found for "${searchTerm}". Please try another search term.`);
        } finally {
            this.hideLoading();
        }
    }

    async getAnimeInfo(title) {
        const query = `
            query ($search: String) {
                Media (search: $search, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                    }
                    description
                    coverImage {
                        large
                    }
                    episodes
                    averageScore
                    genres
                    status
                }
            }
        `;

        const response = await fetch(this.anilistUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: { search: title }
            })
        });

        return response.json();
    }

    updateUIWithBothAPIs(jikanData, anilistData) {
        // Quote/Synopsis
        document.getElementById('quote').textContent = `"${jikanData.quote}"`;
        document.getElementById('character').textContent = `- From ${jikanData.anime}`;

        // Combine information from both APIs
        document.getElementById('animeTitle').textContent = 
            anilistData.title.english || anilistData.title.romaji;
        
        // Show scores from both sources
        document.getElementById('score').textContent = 
            `AniList Score: ${anilistData.averageScore}% | MAL Score: ${jikanData.jikanScore || 'N/A'}`;
        
        // Additional information
        document.getElementById('episodeCount').textContent = 
            `Episodes: ${anilistData.episodes || 'Unknown'} | Rank: #${jikanData.ranking || 'N/A'}`;
        
        document.getElementById('animeDescription').innerHTML = 
            anilistData.description || 'No description available';

        // Cover image from AniList
        const coverImage = document.getElementById('animeCover');
        if (anilistData.coverImage && anilistData.coverImage.large) {
            coverImage.src = anilistData.coverImage.large;
            coverImage.classList.remove('hidden');
        } else {
            coverImage.classList.add('hidden');
        }
    }

    updateUIWithoutAnimeInfo(quoteData) {
        document.getElementById('quote').textContent = `"${quoteData.quote}"`;
        document.getElementById('character').textContent = `- ${quoteData.character}`;
        document.getElementById('animeTitle').textContent = quoteData.anime;
        document.getElementById('episodeCount').textContent = 'Episodes: Unknown';
        document.getElementById('score').textContent = 'Score: N/A';
        document.getElementById('animeDescription').textContent = 'No description available';
        document.getElementById('animeCover').classList.add('hidden');
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('error').classList.add('hidden');
    }

    hideLoading() {
        document.getElementById('loading').classList.add('hidden');
    }

    showError(message) {
        const errorElement = document.getElementById('error');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        this.hideLoading();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AnimeQuoteExplorer();
});