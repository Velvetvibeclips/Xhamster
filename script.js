document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery");

  Papa.parse("videos.txt", {
    download: true,
    delimiter: "|",
    header: true,
    complete: function(results) {
      results.data.forEach(video => {
        if (!video.ID || !video.TITLE || !video.Thumb) return;

        // Get first thumbnail (before ;)
        const thumbUrl = video.Thumb.split(";")[0].trim();

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
          <a href="https://xh.partners/x/${video.ID}" target="_blank" rel="nofollow">
            <img src="${thumbUrl}" alt="${video.TITLE}" loading="lazy">
            <h3>${video.TITLE}</h3>
            <p>${video.Duration || 'N/A'}</p>
          </a>
        `;

        gallery.appendChild(card);
      });
    },
    error: () => {
      gallery.innerHTML = "<p>Failed to load videos.</p>";
    }
  });
});
