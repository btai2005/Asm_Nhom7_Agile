// Hàm hiển thị thông báo
function showNotification(message, isSuccess = true) {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.zIndex = '1000';

    // Thêm vào body
    document.body.appendChild(notification);

    // Xóa thông báo sau 3 giây
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Lấy danh sách người dùng từ localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Hàm kiểm tra email hợp lệ
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

// Hàm xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();
    
    // Reset các thông báo lỗi
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });

    // Lấy giá trị từ form
    const loginId = document.getElementById('loginId').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Kiểm tra các trường bắt buộc
    if (!loginId) {
        showError('loginIdError', 'Vui lòng nhập email hoặc số điện thoại');
        return false;
    }

    if (!password) {
        showError('passwordError', 'Vui lòng nhập mật khẩu');
        return false;
    }

    // Tìm người dùng theo email hoặc số điện thoại
    const user = users.find(u => 
        (u.email === loginId || u.phone === loginId) && 
        u.password === password
    );

    if (!user) {
        showError('loginIdError', 'Email/số điện thoại hoặc mật khẩu không chính xác');
        return false;
    }

    try {
        // Lưu thông tin đăng nhập nếu người dùng chọn "Ghi nhớ đăng nhập"
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }));
        } else {
            // Nếu không ghi nhớ, chỉ lưu session
            sessionStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone
            }));
        }

        // Hiển thị thông báo thành công
        showNotification('Đăng nhập thành công! Đang chuyển hướng...', true);
        
        // Chuyển hướng về trang chủ sau 3 giây
        setTimeout(() => {
            window.location.replace('./index.html');
        }, 3000);

    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        showNotification('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.', false);
    }

    return false;
}

// Thêm sự kiện input để kiểm tra realtime
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('input', (event) => {
            const target = event.target;
            const errorId = target.id + 'Error';
            
            // Ẩn thông báo lỗi khi người dùng bắt đầu nhập
            hideError(errorId);
        });
    }
}); 