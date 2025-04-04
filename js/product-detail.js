// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: "Nike Air Max",
        brand: "Nike",
        price: 2500000,
        image: "images/giay-nike-air-max.webp",
        category: "Running",
        inStock: true,
        description: "Giày Nike Air Max với công nghệ đệm Air độc quyền, mang lại cảm giác thoải mái và nhẹ nhàng khi di chuyển. Thiết kế hiện đại, phù hợp cho cả tập luyện và lifestyle.",
        images: [
            "images/mau01.jpg",
            "images/mau02.jpg",
            "images/mau03.jpg",
            "images/mau04.jpg"
        ],
        sizes: [
            { size: "36", inStock: true },
            { size: "37", inStock: true },
            { size: "38", inStock: true },
            { size: "39", inStock: false },
            { size: "40", inStock: true },
            { size: "41", inStock: true },
            { size: "42", inStock: true },
            { size: "43", inStock: true }
        ],
        colors: [
            { name: "Đen", code: "#000000" },
            { name: "Trắng", code: "#FFFFFF" },
            { name: "Đỏ", code: "#FF0000" },
            { name: "Xanh", code: "#0000FF" }
        ]
    },
    {
        id: 2,
        name: "Adidas Superstar",
        brand: "Adidas", 
        price: 1800000,
        image: "images/adidasSuperStar.webp",
        category: "Casual",
        inStock: true,
        description: "Giày Adidas Superstar là biểu tượng của phong cách streetwear. Với thiết kế cổ điển và logo vỏ sò đặc trưng, đây là lựa chọn hoàn hảo cho phong cách casual.",
        images: [
            "images/mau05.jpg",
            "images/mau06.jpg",
            "images/mau07.jpg",
            "images/mau08.jpg"
        ],
        sizes: [
            { size: "36", inStock: true },
            { size: "37", inStock: true },
            { size: "38", inStock: true },
            { size: "39", inStock: true },
            { size: "40", inStock: true },
            { size: "41", inStock: false },
            { size: "42", inStock: true },
            { size: "43", inStock: true }
        ],
        colors: [
            { name: "Đen", code: "#000000" },
            { name: "Trắng", code: "#FFFFFF" },
            { name: "Vàng", code: "#FFD700" }
        ]
    },
    {
        id: 3,
        name: "Puma RS-X",
        brand: "Puma",
        price: 2200000,
        image: "images/Suede Classic.jpg",
        category: "Lifestyle",
        inStock: true,
        description: "Puma RS-X kết hợp giữa thiết kế retro và công nghệ hiện đại. Đế dày với nhiều lớp đệm, mang lại cảm giác thoải mái và phong cách thời trang độc đáo.",
        images: [
            "images/mau09.jpg",
            "images/mau10.jpg",
            "images/mau11.jpg",
            "images/mau12mau12.jpg"
        ],
        sizes: [
            { size: "36", inStock: true },
            { size: "37", inStock: true },
            { size: "38", inStock: true },
            { size: "39", inStock: true },
            { size: "40", inStock: true },
            { size: "41", inStock: true },
            { size: "42", inStock: false },
            { size: "43", inStock: true }
        ],
        colors: [
            { name: "Đen", code: "#000000" },
            { name: "Xám", code: "#808080" },
            { name: "Hồng", code: "#FFC0CB" }
        ]
    },
    {
        id: 4,
        name: "Nike Air Jordan",
        brand: "Nike",
        price: 3200000,
        image: "images/jd1.jpg",
        category: "Basketball",
        inStock: true,
        description: "Nike Air Jordan là dòng giày bóng rổ huyền thoại. Với công nghệ đệm Air và thiết kế đặc trưng, mang lại hiệu suất tối ưu trên sân và phong cách thời trang.",
        images: [
            "images/mau12.jpg",
            "images/mau13.jpg",
            "images/mau14.jpg",
            "images/mau15.jpg"
        ],
        sizes: [
            { size: "38", inStock: true },
            { size: "39", inStock: true },
            { size: "40", inStock: true },
            { size: "41", inStock: true },
            { size: "42", inStock: true },
            { size: "43", inStock: true },
            { size: "44", inStock: true },
            { size: "45", inStock: false }
        ],
        colors: [
            { name: "Đen", code: "#000000" },
            { name: "Đỏ", code: "#FF0000" },
            { name: "Xanh", code: "#0000FF" }
        ]
    },
    {
        id: 5,
        name: "Adidas Ultra Boost",
        brand: "Adidas",
        price: 2800000,
        image: "images/ultraBoot.webp",
        category: "Running",
        inStock: true,
        description: "Adidas Ultra Boost với công nghệ Boost đệm cao cấp, mang lại cảm giác nhẹ nhàng và phản hồi năng lượng tối ưu. Lý tưởng cho chạy bộ và các hoạt động thể thao.",
        images: [
            "images/mau16.jpg",
            "images/mau17.jpg",
            "images/mau18.jpg",
            "images/mau19.jpg"
        ],
        sizes: [
            { size: "36", inStock: true },
            { size: "37", inStock: true },
            { size: "38", inStock: true },
            { size: "39", inStock: true },
            { size: "40", inStock: true },
            { size: "41", inStock: true },
            { size: "42", inStock: true },
            { size: "43", inStock: false }
        ],
        colors: [
            { name: "Đen", code: "#000000" },
            { name: "Trắng", code: "#FFFFFF" },
            { name: "Xanh", code: "#0000FF" },
            { name: "Đỏ", code: "#FF0000" }
        ]
    },
    {
        id: 6,
        name: "Converse Chuck 70",
        brand: "Converse",
        price: 1500000,
        image: "images/mau07.jpg",
        category: "Casual",
        inStock: true,
        description: "Converse Chuck 70 là phiên bản cao cấp của Chuck Taylor All Star. Với chất liệu canvas dày hơn và đế cao su cứng hơn, mang lại độ bền và thoải mái vượt trội.",
        images: [
            "images/mau20.jpg",
            "images/mau01.jpg",
            "images/mau02.jpg",
            "images/mau05.jpg"
        ],
        sizes: [
            { size: "36", inStock: true },
            { size: "37", inStock: true },
            { size: "38", inStock: true },
            { size: "39", inStock: true },
            { size: "40", inStock: true },
            { size: "41", inStock: true },
            { size: "42", inStock: true },
            { size: "43", inStock: true }
        ],
        colors: [
            { name: "Đen", code: "#000000" },
            { name: "Trắng", code: "#FFFFFF" },
            { name: "Navy", code: "#000080" }
        ]
    }
];

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Lấy thông tin sản phẩm từ URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Biến để lưu trữ lựa chọn hiện tại
let selectedSize = null;
let selectedColor = null;

// Hiển thị thông tin sản phẩm
function displayProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);

    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Hiển thị thông tin cơ bản
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = formatPrice(product.price);
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-stock').textContent = product.inStock ? 'Còn hàng' : 'Hết hàng';
    document.getElementById('product-description').textContent = product.description;

    // Hiển thị ảnh chính
    const mainImage = document.getElementById('main-image');
    mainImage.src = product.image;
    mainImage.alt = product.name;

    // Hiển thị thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    thumbnailContainer.innerHTML = product.images.map((image, index) => `
        <img src="${image}" 
             alt="${product.name} - Ảnh ${index + 1}" 
             class="thumbnail ${index === 0 ? 'active' : ''}"
             onclick="changeMainImage('${image}', this)">
    `).join('');

    // Hiển thị kích cỡ
    const sizeOptions = document.getElementById('size-options');
    sizeOptions.innerHTML = product.sizes.map(size => `
        <div class="size-option ${size.inStock ? '' : 'out-of-stock'}" 
             data-size="${size.size}" 
             onclick="selectSize('${size.size}', this)">
            ${size.size}
        </div>
    `).join('');

    // Hiển thị màu sắc
    const colorOptions = document.getElementById('color-options');
    colorOptions.innerHTML = product.colors.map(color => `
        <div class="color-option" 
             style="background-color: ${color.code};" 
             data-color="${color.name}"
             onclick="selectColor('${color.name}', this)">
        </div>
    `).join('');
}

// Thay đổi ảnh chính
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = imageSrc;

    // Cập nhật trạng thái active của thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Chọn kích cỡ
function selectSize(size, element) {
    // Kiểm tra nếu kích cỡ hết hàng
    if (element.classList.contains('out-of-stock')) {
        return;
    }

    // Cập nhật trạng thái selected
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Lưu kích cỡ đã chọn
    selectedSize = size;
}

// Chọn màu sắc
function selectColor(color, element) {
    // Cập nhật trạng thái selected
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    element.classList.add('selected');
    
    // Lưu màu đã chọn
    selectedColor = color;
}

// Tăng số lượng
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Giảm số lượng
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Thêm vào giỏ hàng
function addToCart() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!product) return;

    // Kiểm tra nếu chưa chọn kích cỡ
    if (!selectedSize) {
        showNotification('Vui lòng chọn kích cỡ', 'error');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.size === selectedSize && 
        item.color === selectedColor
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Hiển thị thông báo
    showNotification('Đã thêm sản phẩm vào giỏ hàng');
}

// Mua ngay
function buyNow() {
    // Kiểm tra nếu chưa chọn kích cỡ
    if (!selectedSize) {
        showNotification('Vui lòng chọn kích cỡ', 'error');
        return;
    }
    
    addToCart();
    window.location.href = 'cart.html';
}

// Hiển thị thông báo
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = '#f44336';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
    updateCartCount();
}); 