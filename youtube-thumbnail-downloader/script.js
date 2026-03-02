document.addEventListener("DOMContentLoaded", () => {
    const getBtn = document.getElementById("get-btn");
    const inputUrl = document.getElementById("yt-url");
    const errorMsg = document.getElementById("error-msg");
    const resultSection = document.getElementById("result-section");
    const gallery = document.getElementById("thumbnail-gallery");

    getBtn.addEventListener("click", () => {
        const url = inputUrl.value.trim();
        const videoId = extractVideoID(url);

        if (videoId) {
            errorMsg.classList.add("hidden");
            generateThumbnails(videoId);
        } else {
            errorMsg.classList.remove("hidden");
            resultSection.classList.add("hidden");
        }
    });

    // Function to extract Video ID using Regex
    function extractVideoID(url) {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    // Function to generate and display thumbnails
    function generateThumbnails(id) {
        gallery.innerHTML = ""; // Clear old results

        const resolutions = [
            { label: "HD Quality", quality: "1280x720", format: "maxresdefault" },
            { label: "High Quality (SD)", quality: "640x480", format: "sddefault" },
            { label: "Medium Quality (HQ)", quality: "480x360", format: "hqdefault" },
            { label: "Normal Quality (MQ)", quality: "320x180", format: "mqdefault" }
        ];

        resolutions.forEach(res => {
            const imgUrl = `https://img.youtube.com/vi/${id}/${res.format}.jpg`;
            
            const card = document.createElement("div");
            card.className = "thumb-card";
            
            card.innerHTML = `
                <img src="${imgUrl}" alt="${res.label} Thumbnail">
                <h3>${res.label}</h3>
                <p>${res.quality}</p>
                <a href="${imgUrl}" target="_blank" class="download-btn">View / Save Image</a>
            `;
            
            gallery.appendChild(card);
        });

        resultSection.classList.remove("hidden");
        
        // Smooth scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
});