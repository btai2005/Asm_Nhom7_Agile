// Lấy đơn hàng mới nhất từ localStorage
function getLatestOrder() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders[orders.length - 1];
}

// Hiển thị chi tiết đơn hàng
function displayOrderDetails() {
    const order = getLatestOrder();
    if (!order) {
        window.location.href = 'products.html';
        return;
    }

    // Hiển thị danh sách sản phẩm
    const orderItems = document.getElementById('order-items');
    orderItems.innerHTML = order.items.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Kích cỡ: ${item.selectedSize}</p>
                <p>Số lượng: ${item.quantity}</p>
                <p class="item-price">${formatPrice(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');

    // Hiển thị tổng tiền
    document.getElementById('subtotal').textContent = formatPrice(order.total);
    document.getElementById('total').textContent = formatPrice(order.total);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayOrderDetails();
    updateCartCount();
}); 