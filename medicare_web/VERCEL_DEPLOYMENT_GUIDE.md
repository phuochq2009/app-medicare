# Hướng dẫn khắc phục lỗi API khi deploy lên Vercel

## Vấn đề
Khi deploy lên Vercel, API calls bị lỗi CORS hoặc network error, trong khi ở local thì hoạt động bình thường.

## Nguyên nhân
1. **CORS (Cross-Origin Resource Sharing)**: API server không cho phép requests từ domain của Vercel
2. **Environment Variables**: Biến môi trường chưa được cấu hình trên Vercel
3. **Mixed Content**: Vercel sử dụng HTTPS nhưng API server sử dụng HTTP

## Giải pháp đã thực hiện

### 1. Cải thiện API Address Configuration
- ✅ Luôn sử dụng HTTP cho API server (http://194.233.67.229:443)
- ✅ Xử lý environment variables an toàn
- ✅ Fallback đơn giản và ổn định

### 2. Cải thiện Error Handling
- ✅ Thêm retry mechanism (3 lần thử với exponential backoff)
- ✅ Timeout 15 giây cho API calls
- ✅ Logging chi tiết cho debugging
- ✅ Xử lý các loại lỗi cụ thể (CORS, Network, Server)

### 3. Thêm Debug Component
- ✅ Component ApiDebug để kiểm tra kết nối API
- ✅ Hiển thị thông tin environment và API URL
- ✅ Test connection button

## Các bước cần thực hiện trên Vercel

### Bước 1: Cấu hình Environment Variables
1. Vào Vercel Dashboard
2. Chọn project của bạn
3. Vào **Settings** > **Environment Variables**
4. Thêm các biến sau:

```
VITE_API_ADDRESS = http://194.233.67.229:443
```

### Bước 2: Cấu hình CORS trên API Server (nếu có quyền)
Thêm vào API server (Laravel):

```php
// Trong config/cors.php hoặc middleware
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://your-app-name.vercel.app',
        'https://your-custom-domain.com',
        'http://localhost:3000'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### Bước 3: Deploy lại
Sau khi cấu hình environment variables, deploy lại project.

## Kiểm tra và Debug

### 1. Kiểm tra Console Logs
Mở Developer Tools > Console để xem thông tin lỗi chi tiết.

### 2. Sử dụng Debug Component
Component ApiDebug sẽ hiển thị ở góc phải dưới (chỉ trong development).

### 3. Test API Connection
Click "Test Connection" button trong debug component.

## Troubleshooting

### Nếu vẫn lỗi CORS:
1. Kiểm tra CORS configuration trên Laravel server
2. Thử sử dụng CORS proxy (đã có sẵn trong code)
3. Liên hệ admin của API server để cấu hình CORS

### Nếu lỗi Mixed Content (HTTPS/HTTP):
1. Vercel sử dụng HTTPS nhưng API server sử dụng HTTP
2. Cần cấu hình CORS đúng cách trên server
3. Hoặc sử dụng CORS proxy

### Nếu lỗi Network:
1. Kiểm tra xem API server có hoạt động không
2. Kiểm tra firewall settings
3. Thử ping IP address của API server

### Nếu lỗi Timeout:
1. Tăng timeout trong code (hiện tại là 15 giây)
2. Kiểm tra network performance
3. Thử sử dụng CDN hoặc proxy

## Các file đã được cập nhật:
- `src/Controllers/apiAddress.js` - Cải thiện API address configuration
- `src/Controllers/ApiControllers.js` - Thêm retry mechanism và error handling
- `src/Components/ApiDebug.jsx` - Component debug mới
- `src/App.jsx` - Thêm debug component
- `src/Controllers/apiProxy.js` - CORS proxy configuration

## Lưu ý:
- API server sử dụng HTTP (http://194.233.67.229:443)
- Vercel sử dụng HTTPS, có thể gây ra mixed content issues
- Debug component chỉ hiển thị trong development mode
- Retry mechanism sẽ thử lại 3 lần với exponential backoff
- Tất cả API calls đều có timeout 15 giây (30 giây cho upload)
- Error messages được hiển thị bằng tiếng Việt cho user-friendly 