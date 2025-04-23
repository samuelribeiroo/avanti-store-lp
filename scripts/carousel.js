import { slidesProducts as products } from "../data/index.js";

function createCarousel(containerId) {
  const carouselTrack = document.getElementById(`carousel-track${containerId}`);
  const carouselNav = document.getElementById(`carousel-nav${containerId}`);
  const prevButton = document.getElementById(`prev${containerId}`);
  const nextButton = document.getElementById(`next${containerId}`);

  const getItemsPerView = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;

    return 4;
  };

  let currentIndex = 0;
  let itemsPerView = getItemsPerView();
  let totalSlides = Math.ceil(products.length / itemsPerView);

  function renderProducts() {
    carouselTrack.innerHTML = "";

    products.map((product) => {
      const productElement = document.createElement("div");
      productElement.className = "carousel-item";

      productElement.innerHTML = `
      <div class="product-card">
          <span class="tag-novo">NOVO</span>
          <img src="${product.imagem}" alt="${product.titulo}" class="product-image">
          <h3 class="product-title">${product.titulo}</h3>
          <div class="price-container">
          <span class="original-price">${product.precoOriginal}</span>
          <span class="discount-tag">${product.desconto}</span>
              <div class="old-price-wrapper">
              </div>
              <span class="current-price">${product.precoAtual}</span>
              <p class="installment">${product.parcelas}</p>
          </div>
          <button class="buy-button"><strong>Comprar</strong></button>
      </div>
  `;

      carouselTrack.appendChild(productElement);
    });
  }

  function renderNavDots() {
    carouselNav.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.dataset.index = i;

      dot.addEventListener("click", () => {
        goToSlide(i);
      });

      carouselNav.appendChild(dot);
    }
  }

  function updateCarousel() {
    const slideWidth =
      carouselTrack.querySelector(".carousel-item").offsetWidth;
    carouselTrack.style.transform = `translateX(-${
      currentIndex * slideWidth * itemsPerView
    }px)`;

    carouselNav.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function handleResize() {
    const newItemsPerView = getItemsPerView();

    if (newItemsPerView !== itemsPerView) {
      itemsPerView = newItemsPerView;
      totalSlides = Math.ceil(products.length / itemsPerView);
      currentIndex = Math.min(currentIndex, totalSlides - 1);
      renderNavDots();
      updateCarousel();
    }
  }

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);

  return {
    init: () => {
      renderProducts();
      itemsPerView = getItemsPerView();
      renderNavDots();
      updateCarousel();
      prevButton.addEventListener("click", prevSlide);
      nextButton.addEventListener("click", nextSlide);
      window.addEventListener("resize", handleResize);
    },
  };
}

export function initCarousel() {
  const carousel1 = createCarousel("1");
  const carousel2 = createCarousel("2");
  carousel1.init();
  carousel2.init();
}
