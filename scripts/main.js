import { initCarousel } from "../scripts/carousel.js";
import { paymentMethods } from "../data/index.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  initPaymentIcons();
  initCategoryNavActions();
  initDepartamentsCategories();
  initCarousel();
  showSearchedResults();
  handleToggleList();
}

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

function initPaymentIcons() {
  const paymentContainer = document.querySelector(".footer__payment-methods");

  paymentMethods.map((icon) => {
    const img = createPaymentIcons(icon);
    paymentContainer.appendChild(img);
  });
}

function createPaymentIcons(icon) {
  const img = document.createElement("img");

  img.src = icon.src;
  img.alt = icon.title;
  img.className = "footer__payment-icon";

  return img;
}

const buttonListenerMobile = (buttonElement) => {
  buttonElement.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    this.setAttribute("aria-expanded", !isExpanded);

    const columnTitle = this.closest(".footer__column-title");
    const column = columnTitle.parentElement;
    const list = column.querySelector(".footer__list--collapsible");

    isExpanded
      ? list.classList.remove("footer__list--expanded")
      : list.classList.add("footer__list--expanded");
  });
};

// Footer Mobile List
function handleToggleList() {
  const toggleButtons = document.querySelectorAll(".footer__toggle");

  return toggleButtons.forEach((button) => buttonListenerMobile(button));
}

function initCategoryNavActions() {
  const menuToggle = document.getElementById("menuToggle");
  const categoriesDropdown = document.getElementById("categoriesDropdown");
  const closeDropdown = document.getElementById("closeDropdown");
  const departments = document.querySelectorAll(
    ".categories-dropdown__department"
  );

  const handleOpenDropdown = () => {
    categoriesDropdown.classList.add("active");
    menuToggle.classList.add("active");
    document.documentElement.classList.add("dropdown-active");

    if (departments.length > 0) {
      departments.forEach((element) => element.classList.remove("active"));
      departments[0].classList.add("active");
    }
  };

  const handleCloseDropdown = () => {
    categoriesDropdown.classList.remove("active");
    menuToggle.classList.remove("active");
    document.documentElement.classList.remove("dropdown-active");
  };

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    categoriesDropdown.classList.contains("active")
      ? handleCloseDropdown()
      : handleOpenDropdown();
  });

  document.addEventListener("click", function (event) {
    if (
      !categoriesDropdown.contains(event.target.value) &&
      !menuToggle.contains(event.target) &&
      categoriesDropdown.classList.contains("active")
    )
      handleCloseDropdown();
  });

  closeDropdown.addEventListener("click", handleCloseDropdown);

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      categoriesDropdown.classList.contains("active")
    ) {
      handleCloseDropdown();
    }
  });

  departments.forEach((department) => {
    department.addEventListener("click", function (event) {
      event.preventDefault();
      departments.forEach((element) => element.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

function initDepartamentsCategories() {
  const navLinks = document.querySelectorAll(".categories-nav__link");
  const mainContainer = document.querySelector(".container-products");
  const body = document.body;

  const closeContainer = () => {
    mainContainer.classList.remove("active");
    body.classList.remove("overlay-active");
  };

  navLinks.forEach((nav) => {
    nav.addEventListener("click", function (event) {
      event.preventDefault();

      navLinks.forEach((item) => item.classList.remove("active"));

      nav.classList.add("active");

      const isAlreadyActive = mainContainer.classList.contains("active");

      closeContainer();

      if (!isAlreadyActive) {
        body.classList.add("overlay-active");
        mainContainer.classList.add("active");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !mainContainer.contains(event.target) &&
      !event.target.closest(".categories-nav__link") &&
      mainContainer.classList.contains("active")
    ) {
      closeContainer();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mainContainer.classList.contains("active")) {
      closeContainer();
    }
  });
}
