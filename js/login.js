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
        showNotification('Đăng nhập thành công!');
        
        // Chuyển hướng về trang chủ sau 1 giây
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);

        return false;
    } catch (error) {
        showNotification('Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.');
        return false;
    }
}

// Kiểm tra nếu đã đăng nhập
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || 
                       JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Nếu đã đăng nhập, chuyển hướng về trang chủ
        window.location.href = 'index.html';
    }
}

// Thêm sự kiện input để kiểm tra realtime
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra trạng thái đăng nhập khi trang được tải
    checkLoginStatus();

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