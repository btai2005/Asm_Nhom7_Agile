// Hàm hiển thị thông báo
function showNotification(message, isSuccess = true) {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;

    // Thêm vào body
    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Lấy danh sách người dùng từ localStorage hoặc tạo mảng rỗng nếu chưa có
let users = JSON.parse(localStorage.getItem('users')) || [];

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Hàm kiểm tra mật khẩu mạnh
function isStrongPassword(password) {
    // Ít nhất 8 ký tự, có cả chữ và số
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
        errorElement.style.color = '#ff4d4d';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
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
    const address = document.getElementById('address')?.value.trim() || '';

    let hasError = false;

    // Kiểm tra các trường bắt buộc
    if (!fullName) {
        showError('fullNameError', 'Vui lòng nhập họ và tên');
        hasError = true;
    }

    if (!email) {
        showError('emailError', 'Vui lòng nhập email');
        hasError = true;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Email không hợp lệ');
        hasError = true;
    } else if (users.some(user => user.email === email)) {
        showError('emailError', 'Email đã được sử dụng');
        hasError = true;
    }

    if (!phone) {
        showError('phoneError', 'Vui lòng nhập số điện thoại');
        hasError = true;
    } else if (!isValidPhone(phone)) {
        showError('phoneError', 'Số điện thoại không hợp lệ');
        hasError = true;
    }

    if (!password) {
        showError('passwordError', 'Vui lòng nhập mật khẩu');
        hasError = true;
    } else if (!isStrongPassword(password)) {
        showError('passwordError', 'Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ và số');
        hasError = true;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Mật khẩu xác nhận không khớp');
        hasError = true;
    }

    if (hasError) {
        return false;
    }

    try {
        // Tạo đối tượng người dùng mới
        const newUser = {
            id: Date.now(),
            fullName,
            email,
            phone,
            password,
            createdAt: new Date().toISOString()
        };

        // Thêm người dùng mới vào danh sách
        users.push(newUser);

        // Lưu vào localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Hiển thị thông báo thành công
        showNotification('Đăng ký tài khoản thành công! Đang chuyển hướng...', true);
        
        // Chuyển hướng đến trang đăng nhập sau 3 giây
        setTimeout(() => {
            window.location.replace('./login.html');
        }, 3000);

    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        showNotification('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.', false);
    }

    return false;
}

// Thêm sự kiện input để kiểm tra realtime
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (form) {
        // Thêm sự kiện input cho từng trường
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                hideError(input.id + 'Error');
            });
        });
    }
}); 