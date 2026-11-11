(() => {
  const stories = Array.isArray(window.ARCHIVE_STORIES) ? window.ARCHIVE_STORIES : [];
  const storyList = document.getElementById("storyList");
  const tagList = document.getElementById("tagList");
  const feedCount = document.getElementById("feedCount");
  const searchInput = document.getElementById("searchInput");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];

  let activeFilter = "all";
  let query = "";

  const uniqueTags = [...new Set(stories.flatMap((s) => s.tags || []))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "ru"));

  function setActiveFilter(next) {
    activeFilter = next;
    document.querySelectorAll(".tag[data-filter], .tag.is-active").forEach((btn) => {
      const value = btn.getAttribute("data-filter");
      btn.classList.toggle("is-active", value === activeFilter);
    });
    render();
  }

  function openRandom() {
    if (!stories.length) return;
    const pick = stories[Math.floor(Math.random() * stories.length)];
    window.open(pick.url, "_blank", "noopener");
  }

  function filteredStories() {
    return stories.filter((story) => {
      const hay = `${story.title} ${(story.tags || []).join(" ")} ${story.excerpt}`.toLowerCase();
      const matchesQuery = !query || hay.includes(query);

      if (!matchesQuery) return false;
      if (activeFilter === "all") return true;
      if (activeFilter === "__new") return stories.indexOf(story) < 8;
      return (story.tags || []).includes(activeFilter);
    });
  }

  function renderTags() {
    tagList.innerHTML = uniqueTags
      .map(
        (tag) =>
          `<li><button type="button" class="tag" data-filter="${escapeAttr(tag)}">${escapeHtml(tag)}</button></li>`
      )
      .join("");

    tagList.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => setActiveFilter(btn.getAttribute("data-filter")));
    });
  }

  function render() {
    const list = filteredStories();
    feedCount.textContent = `${list.length} из ${stories.length}`;

    storyList.innerHTML = list
      .map((story, index) => {
        const tags = (story.tags || [])
          .map(
            (tag) =>
              `<button type="button" class="chip" data-chip="${escapeAttr(tag)}">${escapeHtml(tag)}</button>`
          )
          .join("");

        return `
          <li class="story" style="animation-delay:${Math.min(index, 8) * 40}ms">
            <p class="story__meta"><time>${escapeHtml(story.date)}</time></p>
            <h3 class="story__title">
              <a href="${escapeAttr(story.url)}" target="_blank" rel="noopener">${escapeHtml(story.title)}</a>
            </h3>
            <p class="story__excerpt">${escapeHtml(story.excerpt)}</p>
            <div class="story__tags">${tags}</div>
          </li>
        `;
      })
      .join("");

    storyList.querySelectorAll("[data-chip]").forEach((chip) => {
      chip.addEventListener("click", () => setActiveFilter(chip.getAttribute("data-chip")));
    });
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

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => setActiveFilter(btn.getAttribute("data-filter")));
  });

  searchInput.addEventListener("input", () => {
    query = searchInput.value.trim().toLowerCase();
    render();
  });

  document.getElementById("randomBtn")?.addEventListener("click", openRandom);
  document.getElementById("randomHeroBtn")?.addEventListener("click", openRandom);
  document.getElementById("sideRandom")?.addEventListener("click", openRandom);

  document.querySelector('[data-action="new"]')?.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveFilter("__new");
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
  });

  renderTags();
  render();
})();
