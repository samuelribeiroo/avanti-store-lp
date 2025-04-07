document.addEventListener("DOMContentLoaded", showSearchedResults);

function showSearchedResults() {
  const searchButton = document.querySelector(".search__button");
  const searchInput = document.querySelector(".search__input");
  const searchContainer = document.querySelector(".search");

  const resultsContainer = document.createElement("div");
  resultsContainer.className = "search-result";
  searchContainer.appendChild(resultsContainer);

  const closeResult = () => resultsContainer.classList.remove("active");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    closeResult();

    if (searchTerm) {
      resultsContainer.textContent = `Você buscou por: ${searchTerm}`;
      resultsContainer.classList.add("active");
    }
    searchInput.value = "";
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") searchButton.click();
  });

  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target)) closeResult();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeResult();
  });
}