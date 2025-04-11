document.addEventListener("DOMContentLoaded", init);

function init() {
  showSearchedResults();
  initPaymentIcons();
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

  const paymentMethods = [
    {
      id: 0,
      title: "Amex",
      src: "./assets/icons/amex.svg",
    },

    {
      id: 1,
      title: "Mastercard",
      src: "./assets/icons/mastercard.svg",
    },

    {
      id: 2,
      title: "Visa",
      src: "./assets/icons/visa.svg",
    },

    {
      id: 3,
      title: "Hipercard",
      src: "./assets/icons/hipercard.svg",
    },

    {
      id: 4,
      title: "Cielo",
      src: "./assets/icons/cielo.svg",
    },

    {
      id: 5,
      title: "Payment",
      src: "./assets/icons/payment.svg",
    },

    {
      id: 6,
      title: "PayPal",
      src: "./assets/icons/paypal-seeklogo.com.svg",
    },

    {
      id: 7,
      title: "Pix",
      src: "./assets/icons/pix.svg",
    },

    {
      id: 8,
      title: "Boleto",
      src: "./assets/icons/boleto.svg",
    },
  ];

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
  
      isExpanded ? list.classList.remove("footer__list--expanded") : list.classList.add("footer__list--expanded");
  });
};

// Footer Mobile List
function handleToggleList() {
  const toggleButtons = document.querySelectorAll(".footer__toggle");

  return toggleButtons.forEach((button) => buttonListenerMobile(button));
}
