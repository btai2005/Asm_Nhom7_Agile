// Hiển thị sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
        updateCartSummary();
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Kích cỡ: ${item.selectedSize || 'N/A'}</p>
                    <p class="price">${formatPrice(itemTotal)}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity || 1}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    updateCartSummary();
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
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
    const subtotal = calculateTotal();
    const shipping = 0; // Miễn phí vận chuyển
    const total = subtotal + shipping;

    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotal);
    }
    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }
}

// Thanh toán
function checkout() {
    if (cart.length === 0) {
        showNotification('Giỏ hàng của bạn đang trống');
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
    displayCartItems();
    updateCartCount();

    // Chuyển hướng đến trang xác nhận đơn hàng
    window.location.href = 'order-confirmation.html';
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
}); 