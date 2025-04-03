// Lấy danh sách người dùng từ localStorage hoặc tạo mảng rỗng nếu chưa có
let users = JSON.parse(localStorage.getItem('users')) || [];

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Hàm kiểm tra mật khẩu mạnh
function isStrongPassword(password) {
    // Ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
}

// Hàm kiểm tra số điện thoại hợp lệ
function isValidPhone(phone) {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
}

// Hàm hiển thị lỗi
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Hàm ẩn lỗi
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Hàm xử lý đăng ký
function handleRegister(event) {
    event.preventDefault();
    
    // Reset các thông báo lỗi
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });

    // Lấy giá trị từ form
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const address = document.getElementById('address').value.trim();

    // Kiểm tra các trường bắt buộc
    if (!fullName) {
        showError('fullNameError', 'Vui lòng nhập họ và tên');
        return false;
    }

    if (!email) {
        showError('emailError', 'Vui lòng nhập email');
        return false;
    }

    if (!isValidEmail(email)) {
        showError('emailError', 'Email không hợp lệ');
        return false;
    }

    // Kiểm tra email đã tồn tại
    if (users.some(user => user.email === email)) {
        showError('emailError', 'Email đã được sử dụng');
        return false;
    }

    if (!phone) {
        showError('phoneError', 'Vui lòng nhập số điện thoại');
        return false;
    }

    if (!isValidPhone(phone)) {
        showError('phoneError', 'Số điện thoại không hợp lệ');
        return false;
    }

    if (!password) {
        showError('passwordError', 'Vui lòng nhập mật khẩu');
        return false;
    }

    if (!isStrongPassword(password)) {
        showError('passwordError', 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 số');
        return false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Mật khẩu xác nhận không khớp');
        return false;
    }

    try {
        // Tạo đối tượng người dùng mới
        const newUser = {
            id: Date.now(), // Tạo ID duy nhất
            fullName,
            email,
            phone,
            password, // Trong thực tế nên mã hóa mật khẩu
            address,
            createdAt: new Date().toISOString()
        };

        // Thêm người dùng mới vào danh sách
        users.push(newUser);

        // Lưu vào localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Hiển thị thông báo thành công
        showNotification('Đăng ký tài khoản thành công!');
        
        // Chuyển hướng đến trang đăng nhập sau 2 giây
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

        return false;
    } catch (error) {
        showNotification('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.');
        return false;
    }
}

// Thêm sự kiện input để kiểm tra realtime
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('input', (event) => {
            const target = event.target;
            const errorId = target.id + 'Error';
            
            // Ẩn thông báo lỗi khi người dùng bắt đầu nhập
            hideError(errorId);
        });
    }
}); 