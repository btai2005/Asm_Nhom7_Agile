// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: "Nike Air Max",
        brand: "Nike",
        price: 2500000,
        image: "images/product1.jpg",
        category: "Running",
        inStock: true
    },
    {
        id: 2,
        name: "Adidas Superstar",
        brand: "Adidas", 
        price: 1800000,
        image: "images/product2.jpg",
        category: "Casual",
        inStock: true
    },
    {
        id: 3,
        name: "Puma RS-X",
        brand: "Puma",
        price: 2200000,
        image: "images/product3.jpg",
        category: "Lifestyle",
        inStock: true
    },
    {
        id: 4,
        name: "Nike Air Jordan",
        brand: "Nike",
        price: 3200000,
        image: "images/product4.jpg",
        category: "Basketball",
        inStock: true
    },
    {
        id: 5,
        name: "Adidas Ultra Boost",
        brand: "Adidas",
        price: 2800000,
        image: "images/product5.jpg",
        category: "Running",
        inStock: true
    },
    {
        id: 6,
        name: "Converse Chuck 70",
        brand: "Converse",
        price: 1500000,
        image: "images/product6.jpg",
        category: "Casual",
        inStock: true
    }
];

// Cấu hình phân trang
const ITEMS_PER_PAGE = 3;
let currentPage = 1;
let filteredProducts = [...products];

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Hiển thị sản phẩm với phân trang
function displayProducts(productsList = products) {
    const productsContainer = document.getElementById('products-container');
    const paginationContainer = document.getElementById('pagination');
    
    filteredProducts = productsList;
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (currentProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm nào</p>';
        paginationContainer.innerHTML = '';
        return;
    }

    productsContainer.innerHTML = currentProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-category">${product.category}</p>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="view-detail">Xem chi tiết</a>
                    <button onclick="addToCart(${product.id})" class="add-to-cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Hiển thị phân trang
    let paginationHTML = '';
    if (totalPages > 1) {
        paginationHTML += `
            <button onclick="changePage(1)" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-angle-double-left"></i>
            </button>
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-angle-left"></i>
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `
                    <button onclick="changePage(${i})" class="${currentPage === i ? 'active' : ''}">
                        ${i}
                    </button>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += '<span>...</span>';
            }
        }

        paginationHTML += `
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-angle-right"></i>
            </button>
            <button onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-angle-double-right"></i>
            </button>
        `;
    }
    paginationContainer.innerHTML = paginationHTML;
}

// Chuyển trang
function changePage(page) {
    currentPage = page;
    displayProducts(filteredProducts);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Thêm vào giỏ hàng
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Hiển thị thông báo
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Đã thêm sản phẩm vào giỏ hàng';
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

// Lọc sản phẩm theo danh mục
function filterByCategory(category) {
    currentPage = 1;
    if (category === 'all') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filteredProducts);
}

// Lọc sản phẩm theo thương hiệu
function filterByBrand(brand) {
    currentPage = 1;
    if (brand === 'all') {
        displayProducts(products);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.brand.toLowerCase() === brand.toLowerCase()
    );
    displayProducts(filteredProducts);
}

// Sắp xếp sản phẩm
function sortProducts(criteria) {
    currentPage = 1;
    let sortedProducts = [...filteredProducts];
    
    switch(criteria) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
    }
    
    displayProducts(sortedProducts);
}

// Tìm kiếm sản phẩm
function searchProducts(keyword) {
    currentPage = 1;
    const searchResults = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.brand.toLowerCase().includes(keyword.toLowerCase()) ||
        product.category.toLowerCase().includes(keyword.toLowerCase())
    );
    displayProducts(searchResults);
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    
    // Xử lý sự kiện tìm kiếm
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });
    }
    
    // Xử lý sự kiện sắp xếp
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }
    
    // Xử lý sự kiện lọc danh mục
    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            filterByCategory(e.target.value);
        });
    }

    // Xử lý sự kiện lọc thương hiệu
    const brandSelect = document.getElementById('brand-select');
    if (brandSelect) {
        brandSelect.addEventListener('change', (e) => {
            filterByBrand(e.target.value);
        });
    }
}); 