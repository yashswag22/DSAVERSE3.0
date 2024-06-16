async function searchOnBrave(query) {
    const corsProxy = 'https://cors.bridged.cc/';
    const apiKey = BRAVEPLACEHOLDER;
    const url = `${corsProxy}https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "gzip",
                "X-Subscription-Token": apiKey
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return null;
    }
}

async function performSearch() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') {
        alert('Please enter some text to search');
        return;
    }

    try {
        const queries = [
            `${userInput} leetcode practice`,
            `${userInput} geeksforgeeks practice`,
            `${userInput} coding ninjas practice`
        ];

        for (let i = 0; i < queries.length; i++) {
            const results = await searchOnBrave(queries[i]);
            displaySearchResults(results, i + 1);
            await delay(500); // Delay between each search (500 milliseconds)
        }
    } catch (error) {
        console.error('Error performing search:', error);
        alert('Failed to fetch search results');
    }
}
  const BRAVEPLACEHOLDER = "BSA212SlD8iO2Uufs0Z0dNXBN1sLNtM";
function displaySearchResults(results, count) {
    const resultElement = document.getElementById(`result${count}`);
    resultElement.innerHTML = '';
    if(count === 1)
        resultElement.innerHTML = '<img src="https://w7.pngwing.com/pngs/640/947/png-transparent-leetcode-button-icon.png" class="headingimg2 resultimg1">';
    else if(count === 2)
        resultElement.innerHTML = '<img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210419113249/gfg-new-logo-min.png" class="headingimg2 resultimg2" style="background-color: white;">';
    else if(count === 3)
        resultElement.innerHTML = '<img src="https://entrackr.com/storage/2023/10/Codingninjas-800x400.jpg" class="headingimg2 resultimg3" style=" max-height: 65px;    object-fit: cover;">';
    
    if (!results || !results.web || results.web.length === 0) {
        resultElement.innerHTML += '<p>No results found</p>';
        return;
    }

    for (let i = 0; i < Math.min(5); i++) {
        const titleElem = document.createElement('h3');
        titleElem.textContent = results.web.results[i].title;
        resultElement.appendChild(titleElem);

        const urlElem = document.createElement('a');
        urlElem.textContent = results.web.results[i].url;
        urlElem.href = results.web.results[i].url;
        urlElem.target = '_blank';
        resultElement.appendChild(urlElem);

        resultElement.appendChild(document.createElement('hr')); // Separator
    }
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
