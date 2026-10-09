# Deploy Medicare lên Vercel

Repository này có hai ứng dụng frontend Vite độc lập và backend API tối thiểu trong `medicare_api`. Backend hiện chỉ trả cấu hình khởi tạo và các collection rỗng để trang chủ có thể hiển thị; nó chưa lưu dữ liệu, xử lý đăng nhập, lịch hẹn hay nghiệp vụ quản trị.

## 1. Kiểm tra API trước

Kiểm tra API sau khi deploy backend theo mục 3 bên dưới. Không dùng hostname cũ `vmi2087236.contaboserver.net` hoặc giá trị ví dụ nếu chưa xác nhận nó đang hoạt động.

Endpoint cấu hình mà trang bệnh nhân cần là:

```text
https://<api-domain>/api/v1/get_configurations
```

Endpoint phải phân giải DNS, trả về phản hồi hợp lệ và cho phép CORS từ domain Vercel của cả hai frontend. Mã frontend thêm `/api/v1` vào `VITE_API_ADDRESS`, vì vậy chỉ nhập origin, không thêm `/api/v1` hay dấu `/` ở cuối.

## 2. Deploy backend API

Tạo project Vercel thứ ba từ cùng repository:

- Root Directory: `medicare_api`
- Framework: Other
- Build Command: để trống
- Output Directory: để trống

Thêm biến `CORS_ORIGINS` chứa origin chính xác của hai frontend, phân tách bằng dấu phẩy, ví dụ:

```text
CORS_ORIGINS=https://<patient-project>.vercel.app,https://<admin-project>.vercel.app
```

Có thể cấu hình thêm `CLINIC_NAME`, `PLAY_STORE_URL` và `APP_STORE_URL`. Endpoint kiểm tra sau deploy là `https://<api-project>.vercel.app/api/health`; endpoint cấu hình là `https://<api-project>.vercel.app/api/v1/get_configurations`.

## 3. Tạo project giao diện bệnh nhân

Trong Vercel, import repository và cấu hình:

- Root Directory: `medicare_web`
- Framework Preset: Vite
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`

Thêm biến môi trường cho Production (và Preview nếu cần):

```text
VITE_API_ADDRESS=https://<api-domain>
```

Thay `<api-domain>` bằng API origin đã xác minh. Sau khi lưu biến, tạo deployment mới.

## 4. Tạo project trang quản trị

Tạo project Vercel thứ hai từ cùng repository:

- Root Directory: `medicare_web_admin`
- Framework Preset: Vite
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_ADDRESS=https://<api-domain>`

Build script chạy thêm bước postbuild để đặt ứng dụng quản trị dưới `/admin`. Kiểm tra URL `https://<admin-project>.vercel.app/admin` sau khi deploy.

## 5. Cấu hình CORS trên API

Đặt `CORS_ORIGINS` thành origin chính xác của cả hai frontend. Nếu dùng custom domain, thêm các domain đó và redeploy backend. API tối thiểu hiện chỉ nhận GET và OPTIONS.

Không dùng CORS proxy công khai làm giải pháp production. Proxy helper trong frontend không được dùng bởi các API request chính.

## 6. Xác minh sau deploy

1. Mở trang chủ bệnh nhân và trang `/admin`.
2. Mở DevTools → Network, tải lại trang và tìm request `get_configurations`.
3. Xác nhận request đi tới `https://<api-domain>/api/v1/get_configurations` và có phản hồi thành công.
4. Mở trực tiếp một route như `/doctors`, sau đó refresh để xác nhận SPA fallback hoạt động.

Trang lỗi “500 Lỗi máy chủ nội bộ” là màn hình do frontend hiển thị khi request cấu hình ban đầu thất bại; nó không nhất thiết là HTTP 500 do Vercel trả về.

## Xử lý lỗi thường gặp

- `ERR_NAME_NOT_RESOLVED`: domain API sai hoặc chưa có DNS record công khai.
- CORS/preflight error: cấu hình CORS trên backend chưa cho phép origin/header/method cần thiết.
- HTTP 404: kiểm tra API domain và đường dẫn endpoint.
- HTTP 5xx: backend nhận request nhưng trả lỗi; kiểm tra log máy chủ API.
- Request vẫn dùng URL cũ: cập nhật `VITE_API_ADDRESS` trong đúng Vercel project và redeploy.

## Firebase

Có thể bỏ qua Firebase để triển khai frontend, nhưng các chức năng đăng nhập Firebase và push notification sẽ chưa hoạt động nếu chưa cấu hình Firebase thật. Không đưa giá trị placeholder vào Vercel.

Các file `.env` chỉ dành cho local development và được loại khỏi Git. `VITE_API_ADDRESS` sẽ được đưa vào bundle frontend; đây phải là URL công khai, không phải mật khẩu hay API secret.