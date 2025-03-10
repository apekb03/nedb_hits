fetch("/hit")
    .then(response => response.json())
    .then(data => {
        document.getElementById("hits").innerText = "this is the total hits: " + data.hits;
    })
    .catch(error => console.error("Error fetching hit count:", error));