// Dữ liệu sản phẩm mẫu
const products = [
    {
        id: 1,
        name: "Nike Air Max",
        price: 2500000,
        image: "images/product1.jpg",
        description: "Giày Nike Air Max chính hãng"
    },
    {
        id: 2,
        name: "Adidas Superstar",
        price: 1800000,
        image: "images/product2.jpg",
        description: "Giày Adidas Superstar classic"
    },
    {
        id: 3,
        name: "Puma RS-X",
        price: 2200000,
        image: "images/product3.jpg",
        description: "Giày Puma RS-X thời trang"
    }
];

// Hiển thị sản phẩm nổi bật
function displayFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Giỏ hàng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Đã thêm sản phẩm vào giỏ hàng!');
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    updateCartCount();
}); 