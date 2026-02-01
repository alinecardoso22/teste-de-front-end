class ProductManager {
  constructor() {
    this.products = [];
    this.carouselPositions = {
      related_products: 0,
      related_products_2: 0,
      related_products_extra: 0
    };
  }

  // Função para formatar preço em Real
  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  }

  // Carregar produtos do JSON local
  async loadProducts() {
    try {
      const response = await fetch('../produtos.json');
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }
      const data = await response.json();
      
      if (data.success && data.products) {
        this.products = data.products;
        this.renderProducts('related_products');
        this.renderProducts('related_products_2');
        this.renderProducts('related_products_extra');
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  // Renderizar produtos no DOM com limite (para carrossel)
  renderProducts(containerId, itemsPerView = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const startIndex = this.carouselPositions[containerId] || 0;
    const visibleProducts = this.products.slice(startIndex, startIndex + itemsPerView);

    visibleProducts.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.className = 'products';
      productCard.style.cursor = 'pointer';

      productCard.innerHTML = `
        <div>
          <img src="${product.photo}" alt="${product.productName}">
        </div>
        <p>${product.descriptionShort}</p>
        <p>${this.formatPrice(product.price)}</p>
        <p>${this.formatPrice(product.price * 0.9)}</p>
        <p>ou 2x de ${this.formatPrice((product.price * 0.9) / 2)} sem juros</p>
        <p>Frete grátis</p>
        <button type="button" class="shop">COMPRAR</button>
      `;

      productCard.addEventListener('click', () => {
        this.openModal(product);
      });

      container.appendChild(productCard);
    });
  }

  // Navegar no carrossel
  navigateCarousel(direction, containerId, itemsPerView = 4) {
    const totalProducts = this.products.length;
    const currentPosition = this.carouselPositions[containerId] || 0;

    if (direction === 'next') {
      if (currentPosition + itemsPerView < totalProducts) {
        this.carouselPositions[containerId] = currentPosition + itemsPerView;
      } else {
        this.carouselPositions[containerId] = 0; // Volta ao início
      }
    } else if (direction === 'prev') {
      if (currentPosition >= itemsPerView) {
        this.carouselPositions[containerId] = currentPosition - itemsPerView;
      } else {
        // Volta ao final
        const remainder = totalProducts % itemsPerView;
        this.carouselPositions[containerId] = remainder === 0 
          ? totalProducts - itemsPerView 
          : totalProducts - remainder;
      }
    }

    this.renderProducts(containerId, itemsPerView);
  }

  // Abrir modal com informações do produto
  openModal(product) {
    const modal = document.getElementById('modal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');

    if (modalProductImage) modalProductImage.src = product.photo;
    if (modalProductName) modalProductName.textContent = product.productName;
    if (modalProductDescription) modalProductDescription.textContent = product.descriptionShort;
    if (modalProductPrice) modalProductPrice.textContent = this.formatPrice(product.price);

    // Resetar quantidade
    const qtyDisplay = document.querySelector('.qty-display');
    if (qtyDisplay) qtyDisplay.textContent = '01';

    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Fechar modal
  closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Inicializar listeners
  initializeListeners() {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.closeModal());
    }

    window.addEventListener('click', (event) => {
      const modal = document.getElementById('modal');
      if (event.target === modal) {
        this.closeModal();
      }
    });

    // Listeners para botões de carrossel
    const carouselButtons = document.querySelectorAll('.carousel-arrow');
    carouselButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const containerId = button.dataset.container;
        const direction = button.classList.contains('carousel-arrow-left') ? 'prev' : 'next';
        this.navigateCarousel(direction, containerId);
      });
    });

    // Listeners para seletor de quantidade no modal
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyDisplay = document.querySelector('.qty-display');

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        let quantity = parseInt(qtyDisplay.textContent);
        if (quantity > 1) {
          quantity--;
          qtyDisplay.textContent = quantity.toString().padStart(2, '0');
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        let quantity = parseInt(qtyDisplay.textContent);
        quantity++;
        qtyDisplay.textContent = quantity.toString().padStart(2, '0');
      });
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const productManager = new ProductManager();
  productManager.initializeListeners();
  productManager.loadProducts();
});
