// Hiển thị sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        updateCartSummary(0);
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">${formatPrice(item.price)}</p>
            </div>
            <div class="item-quantity">
                <button onclick="updateQuantity(${index}, -1)">-</button>
                <span>1</span>
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    updateCartSummary();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
    // Trong phiên bản này, chúng ta chỉ cho phép 1 sản phẩm mỗi loại
    if (change > 0) {
        showNotification('Bạn chỉ có thể mua 1 sản phẩm mỗi loại');
    } else {
        removeFromCart(index);
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng');
}

// Cập nhật tổng tiền
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal;

    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (totalElement) totalElement.textContent = formatPrice(total);
}

// Thanh toán
function checkout() {
    if (cart.length === 0) {
        showNotification('Giỏ hàng của bạn đang trống');
        return;
    }
    showNotification('Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
}); 