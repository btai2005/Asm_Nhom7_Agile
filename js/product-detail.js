// Mở rộng dữ liệu sản phẩm với thông tin chi tiết
const productDetails = {
    1: {
        id: 1,
        name: "Nike Air Max",
        brand: "Nike",
        price: 2500000,
        image: "images/product1.jpg",
        images: [
            "images/product1.jpg",
            "images/product1-2.jpg",
            "images/product1-3.jpg"
        ],
        description: "Giày Nike Air Max chính hãng với công nghệ Air đột phá, mang đến cảm giác thoải mái tối đa cho người dùng. Được thiết kế với chất liệu cao cấp, bền bỉ và thời trang.",
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
        rating: 4.5,
        reviews: [
            {
                author: "Nguyễn Văn A",
                date: "2024-02-15",
                rating: 5,
                content: "Sản phẩm rất tốt, đúng như mô tả. Chất lượng cao, thoải mái khi mang."
            },
            {
                author: "Trần Thị B",
                date: "2024-02-10",
                rating: 4,
                content: "Giày đẹp, giá hợp lý. Chỉ hơi chật một chút ở phần mũi."
            }
        ]
    },
    2: {
        id: 2,
        name: "Adidas Superstar",
        brand: "Adidas",
        price: 1800000,
        image: "images/product2.jpg",
        images: [
            "images/product2.jpg",
            "images/product2-2.jpg",
            "images/product2-3.jpg"
        ],
        description: "Giày Adidas Superstar classic với thiết kế đơn giản nhưng đẳng cấp. Phù hợp cho mọi dịp, từ casual đến thể thao.",
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
        rating: 4.8,
        reviews: [
            {
                author: "Lê Văn C",
                date: "2024-02-18",
                rating: 5,
                content: "Sản phẩm chính hãng, chất lượng tốt. Giao hàng nhanh."
            }
        ]
    },
    3: {
        id: 3,
        name: "Puma RS-X",
        brand: "Puma",
        price: 2200000,
        image: "images/product3.jpg",
        images: [
            "images/product3.jpg",
            "images/product3-2.jpg",
            "images/product3-3.jpg"
        ],
        description: "Giày Puma RS-X thời trang với thiết kế hiện đại, phong cách streetwear. Kết hợp công nghệ đệm cao cấp cho trải nghiệm thoải mái.",
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
        rating: 4.2,
        reviews: [
            {
                author: "Phạm Thị D",
                date: "2024-02-20",
                rating: 4,
                content: "Giày đẹp, phong cách. Giá hơi cao nhưng xứng đáng."
            }
        ]
    }
};

// Lấy ID sản phẩm từ URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Hiển thị thông tin sản phẩm
function displayProductDetails() {
    const productId = getProductIdFromUrl();
    const product = productDetails[productId];

    if (!product) {
        showError('Không tìm thấy sản phẩm');
        return;
    }

    // Hiển thị hình ảnh chính
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.image;
    mainImage.alt = product.name;

    // Hiển thị thumbnail
    const thumbnailContainer = document.querySelector('.thumbnail-images');
    thumbnailContainer.innerHTML = product.images.map(img => `
        <img src="${img}" alt="${product.name}" onclick="changeMainImage('${img}')">
    `).join('');

    // Hiển thị thông tin sản phẩm
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-brand').textContent = product.brand;
    document.getElementById('product-price').textContent = formatPrice(product.price);
    document.getElementById('product-description').textContent = product.description;

    // Hiển thị kích cỡ
    const sizeGrid = document.getElementById('size-grid');
    sizeGrid.innerHTML = product.sizes.map(size => `
        <div class="size-option ${size.inStock ? '' : 'out-of-stock'}" 
             onclick="${size.inStock ? `selectSize('${size.size}')` : ''}">
            ${size.size}
        </div>
    `).join('');

    // Hiển thị đánh giá
    displayReviews(product);
}

// Thay đổi hình ảnh chính
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = imageSrc;
}

// Chọn kích cỡ
function selectSize(size) {
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.textContent.trim() === size) {
            option.classList.add('selected');
        }
    });
}

// Hiển thị đánh giá
function displayReviews(product) {
    const averageRating = document.getElementById('average-rating');
    const reviewCount = document.getElementById('review-count');
    const reviewsList = document.getElementById('reviews-list');

    // Hiển thị đánh giá trung bình
    averageRating.innerHTML = `
        <i class="fas fa-star"></i>
        <span>${product.rating.toFixed(1)}</span>
    `;

    // Hiển thị số lượng đánh giá
    reviewCount.textContent = `${product.reviews.length} đánh giá`;

    // Hiển thị danh sách đánh giá
    reviewsList.innerHTML = product.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <span class="review-date">${formatDate(review.date)}</span>
            </div>
            <div class="review-rating">
                ${generateStars(review.rating)}
            </div>
            <div class="review-content">${review.content}</div>
        </div>
    `).join('');
}

// Tạo chuỗi sao đánh giá
function generateStars(rating) {
    return Array(5).fill('').map((_, index) => `
        <i class="fas fa-star ${index < rating ? 'filled' : ''}"></i>
    `).join('');
}

// Định dạng ngày tháng
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Thêm vào giỏ hàng từ trang chi tiết
function addToCartFromDetail() {
    const productId = getProductIdFromUrl();
    const product = productDetails[productId];
    const selectedSize = document.querySelector('.size-option.selected');

    if (!selectedSize) {
        showError('Vui lòng chọn kích cỡ');
        return;
    }

    const productToAdd = {
        ...product,
        selectedSize: selectedSize.textContent.trim()
    };

    addToCart(productToAdd);
    showNotification('Đã thêm sản phẩm vào giỏ hàng!');
}

// Mua ngay
function buyNow() {
    const productId = getProductIdFromUrl();
    const product = productDetails[productId];
    const selectedSize = document.querySelector('.size-option.selected');

    if (!selectedSize) {
        showError('Vui lòng chọn kích cỡ');
        return;
    }

    const productToAdd = {
        ...product,
        selectedSize: selectedSize.textContent.trim()
    };

    addToCart(productToAdd);
    window.location.href = 'cart.html';
}

// Hiển thị thông báo lỗi
function showError(message) {
    alert(message);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayProductDetails();
    updateCartCount();
}); 