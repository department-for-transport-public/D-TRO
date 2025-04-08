document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('site-search');
    const searchButton = document.getElementById('searchButton');
    const prevButton = document.getElementById('prevMatch');
    const nextButton = document.getElementById('nextMatch');
    const clearButton = document.getElementById('clearSearch');
    const matchCounter = document.getElementById('matchCounter');
    const mainContent = document.querySelector('main');
    const searchForm = document.getElementById('searchForm');
    let matches = [];
    let currentIndex = -1;

    function highlightMatches() {
        clearHighlights();
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;

        const regex = new RegExp(searchTerm, 'gi');
        mainContent.innerHTML = mainContent.innerHTML.replace(regex, match => {
            return `<mark class="highlight">${match}</mark>`;
        });

        matches = Array.from(mainContent.querySelectorAll('mark.highlight'));
        if (matches.length > 0) {
            currentIndex = 0;
            updateActiveMatch();
        }
        updateCounter();
    }

    function updateActiveMatch() {
        matches.forEach((match, index) => {
            match.classList.remove('active');
            if (index === currentIndex) {
                match.classList.add('active');
                match.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    function updateCounter() {
        matchCounter.textContent = matches.length > 0 ? `${currentIndex + 1} / ${matches.length}` : '0 / 0';
    }

    function clearHighlights() {
        mainContent.innerHTML = mainContent.innerHTML.replace(/<mark class="highlight">(.*?)<\/mark>/g, '$1');
        matches = [];
        currentIndex = -1;
        updateCounter();
    }

    searchButton.addEventListener('click', highlightMatches);

    prevButton.addEventListener('click', function() {
        if (matches.length > 0) {
            currentIndex = (currentIndex - 1 + matches.length) % matches.length;
            updateActiveMatch();
            updateCounter();
        }
    });

    nextButton.addEventListener('click', function() {
        if (matches.length > 0) {
            currentIndex = (currentIndex + 1) % matches.length;
            updateActiveMatch();
            updateCounter();
        }
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearHighlights();
    });

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting
    });
}); 