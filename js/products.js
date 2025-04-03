// Mở rộng dữ liệu sản phẩm
const allProducts = [
    ...products,
    {
        id: 4,
        name: "Nike Jordan 1",
        price: 3500000,
        image: "images/product4.jpg",
        description: "Giày Nike Jordan 1 Retro"
    },
    {
        id: 5,
        name: "Adidas Stan Smith",
        price: 1500000,
        image: "images/product5.jpg",
        description: "Giày Adidas Stan Smith classic"
    },
    {
        id: 6,
        name: "Puma Suede",
        price: 1200000,
        image: "images/product6.jpg",
        description: "Giày Puma Suede thời trang"
    }
];

// Hiển thị tất cả sản phẩm
function displayAllProducts(productsToShow = allProducts) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            <p>${product.description}</p>
            <p class="price">${formatPrice(product.price)}</p>
            <button onclick="addToCart(${product.id})">Thêm vào giỏ hàng</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Sắp xếp sản phẩm
function sortProducts(sortBy) {
    let sortedProducts = [...allProducts];
    
    switch(sortBy) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayAllProducts(sortedProducts);
}

// Tìm kiếm sản phẩm
function searchProducts(query) {
    const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayAllProducts(searchResults);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayAllProducts();
    updateCartCount();

    // Sắp xếp sản phẩm
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }

    // Tìm kiếm sản phẩm
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchProducts(e.target.value);
        });
    }
}); 