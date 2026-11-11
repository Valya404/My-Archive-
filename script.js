(() => {
  const stories = Array.isArray(window.ARCHIVE_STORIES) ? window.ARCHIVE_STORIES : [];
  const storyList = document.getElementById("storyList");
  const feedCount = document.getElementById("feedCount");
  const searchInput = document.getElementById("searchInput");

  let query = "";

  function filteredStories() {
    if (!query) return stories;
    return stories.filter((story) => {
      const hay = `${story.title} ${story.excerpt}`.toLowerCase();
      return hay.includes(query);
    });
  }

  function render() {
    const list = filteredStories();
    feedCount.textContent = `${list.length} из ${stories.length}`;

    storyList.innerHTML = list
      .map(
        (story, index) => `
          <li class="story" style="animation-delay:${Math.min(index, 8) * 40}ms">
            <p class="story__meta"><time>${escapeHtml(story.date)}</time></p>
            <h3 class="story__title">
              <a href="${escapeAttr(story.url)}" target="_blank" rel="noopener">${escapeHtml(story.title)}</a>
            </h3>
            <p class="story__excerpt">${escapeHtml(story.excerpt)}</p>
          </li>
        `
      )
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("'", "&#39;");
  }

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim().toLowerCase();
    render();
  });

  render();
})();
