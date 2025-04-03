# ShoeStore - Website Bán Giày

Đây là một dự án website bán giày được xây dựng bằng HTML, CSS và JavaScript thuần.

## Cấu trúc thư mục

```
ShoeStore/
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── register.js
│   ├── products.js
│   └── cart.js
├── images/
│   ├── hero-bg.jpg
│   ├── product1.jpg
│   ├── product2.jpg
│   └── ...
├── index.html
├── products.html
├── cart.html
├── register.html
└── README.md
```

## Cách chạy dự án

1. Clone hoặc tải dự án về máy
2. Mở file `index.html` bằng trình duyệt web
3. Hoặc sử dụng một local server (khuyến nghị):
   - Nếu có Python: `python -m http.server 8000`
   - Nếu có Node.js: `npx serve`
   - Hoặc sử dụng Live Server trong VS Code

## Tính năng

- Xem danh sách sản phẩm
- Đăng ký tài khoản
- Thêm sản phẩm vào giỏ hàng
- Quản lý giỏ hàng
- Responsive design

## Lưu ý

- Dự án sử dụng localStorage để lưu trữ dữ liệu
- Cần có kết nối internet để load Font Awesome icons
- Hình ảnh sản phẩm cần được thêm vào thư mục `images/` 