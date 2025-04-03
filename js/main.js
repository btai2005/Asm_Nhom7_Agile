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
    if (!product) {
        showError('Không tìm thấy sản phẩm');
        return;
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => 
        item.id === productId && item.selectedSize === product.selectedSize
    );

    if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới với số lượng là 1
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Đã thêm sản phẩm vào giỏ hàng!');
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng!');
}

function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * (item.quantity || 1));
    }, 0);
}

function checkout() {
    if (cart.length === 0) {
        showError('Giỏ hàng của bạn đang trống!');
        return;
    }

    // Tạo thông tin đơn hàng
    const order = {
        items: cart,
        total: calculateTotal(),
        date: new Date().toISOString(),
        status: 'pending'
    };

    // Lưu đơn hàng vào localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Xóa giỏ hàng
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Chuyển hướng đến trang xác nhận đơn hàng
    window.location.href = 'order-confirmation.html';
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

function showError(message) {
    alert(message);
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