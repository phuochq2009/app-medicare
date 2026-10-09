# 📄 TÀI LIỆU MÔ TẢ TÍNH NĂNG & CÔNG NGHỆ

## **WEBSITE PHÒNG KHÁM – TRANG QUẢN TRỊ**

---

## 1. **Giới thiệu chung**

Website Phòng Khám là nền tảng hỗ trợ quản lý toàn diện hoạt động của cơ sở y tế, bao gồm:

* Quản lý lịch hẹn
* Hồ sơ bệnh nhân
* Đơn thuốc
* Quản trị người dùng và tài chính

Hệ thống gồm hai phần chính:

* **Giao diện cho bệnh nhân** (public website)
* **Trang quản trị** dành cho admin, bác sĩ, nhân viên

---

## 2. **Công nghệ sử dụng**

* **Backend:** PHP – xử lý nghiệp vụ, quản lý dữ liệu, API
* **Frontend:** ReactJS + Vite – giao diện nhanh, mượt, dễ mở rộng
* **Database:** MySQL
* **Triển khai:** Server riêng hoặc cloud (AWS, DigitalOcean, …)

---

## 3. **Các tính năng chính**

### 3.1 **Dashboard**

Tổng quan hệ thống:

* Số bác sĩ
* Số bệnh nhân
* Lịch hẹn theo trạng thái: *chờ, xác nhận, khám xong, hủy, từ chối…*
* Cập nhật theo thời gian thực

---

### 3.2 **Quản lý lịch hẹn & Check-in**

* Tạo lịch hẹn mới
* Xem chi tiết lịch hẹn
* Theo dõi trạng thái từng lịch
* Tính năng **check-in** để xác nhận bệnh nhân đến khám

---

### 3.3 **Quản lý tài chính**

* **Giao dịch:** xem lịch sử và chi tiết thanh toán
* **Hóa đơn:** tạo, xuất file, lưu trữ
* **Thanh toán:** hỗ trợ thủ công hoặc online (nếu tích hợp)

---

### 3.4 **Quản lý phòng khám & bác sĩ**

* Quản lý chuyên khoa, phòng ban
* Thêm/sửa thông tin bác sĩ
* Phân quyền theo chuyên môn

---

### 3.5 **Bệnh nhân & người dùng**

* Danh sách bệnh nhân
* Thành viên gia đình
* Quản lý tài khoản và vai trò người dùng
* Chức năng giới thiệu bệnh nhân

---

### 3.6 **Hồ sơ bệnh án & Đơn thuốc**

* Tạo – chỉnh sửa – lưu trữ hồ sơ khám
* Quản lý đơn thuốc: liều lượng, hướng dẫn sử dụng

---

### 3.7 **Quản lý thuốc**

* Danh sách thuốc
* Số lượng tồn
* Giá và mô tả chi tiết

---

### 3.8 **Khuyến mãi**

* Tạo banner, voucher giảm giá
* Lời chứng thực và đánh giá từ bệnh nhân

---

### 3.9 **Thông báo & Cài đặt**

* Gửi thông báo hệ thống
* Cấu hình màn hình đăng nhập
* Quản lý vai trò, phân quyền
* Cài đặt thông tin phòng khám

---

## 4. **Phân quyền người dùng**

| Vai trò         | Quyền hạn chính                          |
| --------------- | ---------------------------------------- |
| **Super Admin** | Toàn quyền, cấu hình hệ thống            |
| **Bác sĩ**      | Quản lý khám bệnh, đơn thuốc             |
| **Nhân viên**   | Check-in, tạo lịch hẹn, hỗ trợ tài chính |
| **Bệnh nhân**   | Đặt lịch, xem hồ sơ, xem đơn thuốc       |

---

## 5. **Bảo mật & hiệu suất**

* Xác thực bảo mật bằng **JWT** hoặc **PHP Session**
* Phân quyền chặt chẽ theo vai trò
* ReactJS + Vite giúp tải nhanh, thân thiện mobile
* Mã hoá mật khẩu & dữ liệu nhạy cảm

---

## 6. **Hướng dẫn sử dụng**

* **Link truy cập:**
  [https://medicare-web-admin-v2.vercel.app/admin/checkins](https://medicare-web-admin-v2.vercel.app/admin/checkins)

* **Tài khoản demo:**

  * Email: **[admin@gmail.com](mailto:admin@gmail.com)**
  * Mật khẩu: **admin@123**



---

## **WEBSITE PHÒNG KHÁM - TRANG NGƯỜI DÙNG**

---

## 1. **Giới thiệu chung**

Giao diện người dùng (UI) của hệ thống **Medicare** là công cụ giúp bệnh nhân tiếp cận dịch vụ y tế một cách:

* Nhanh chóng và trực quan
* Dễ thao tác trên mọi thiết bị
* Mang lại cảm giác chuyên nghiệp và tin cậy

Người dùng có thể:

* Tìm kiếm thông tin y tế
* Đặt lịch khám trực tuyến
* Quản lý hồ sơ cá nhân, lịch sử khám, hóa đơn
* Giao tiếp với bộ phận hỗ trợ

---

## 2. **Cấu trúc giao diện trang chủ**

### 2.1 **Header (Phần đầu trang)**

**Thành phần bao gồm:**

* **Logo Medicare** ở góc trái
* **Thanh điều hướng** cố định khi cuộn trang, gồm:

  * Trang chủ
  * Phòng khám
  * Bác sĩ
  * Về chúng tôi
  * Liên hệ
* **Thông tin nhanh:**

  * Hotline
  * Địa chỉ + nút chuyển Google Maps
  * Dropdown chọn chi nhánh (Thanh Xuân, Cầu Giấy, Hà Đông…)
* **Nút CTA:**

  * **Đăng nhập / Đăng ký** nổi bật, dễ nhận thấy

---

### 2.2 **Banner chính (Hero Section)**

* Hình ảnh bác sĩ thân thiện, chuyên nghiệp
* **Slogan:**

  > “Chúng tôi cung cấp dịch vụ chăm sóc sức khỏe tốt nhất và phải chăng.”
* Mô tả ngắn gọn về trải nghiệm người dùng
* **Nút hành động:**

  * **Bắt đầu ngay**
  * **Đặt lịch hẹn**

---

## 3. **Tính năng chính dành cho người dùng**

### ● **Tra cứu bác sĩ**

* Bộ lọc theo chuyên khoa, địa điểm, ngày khám
* Hiển thị ảnh, thông tin, điểm đánh giá

### ● **Đặt lịch khám online**

* Giao diện bước–theo–bước rõ ràng
* Xác nhận qua email/SMS

### ● **Hồ sơ cá nhân**

* Lịch sử khám
* Đơn thuốc
* Kết quả xét nghiệm
* Hóa đơn
* Cho phép tải xuống hoặc chia sẻ

### ● **Đánh giá dịch vụ**

* Đánh giá bác sĩ sau khi khám
* Đánh giá được kiểm duyệt trước khi hiển thị

### ● **Chat trực tiếp (Live Chat)**

* Tích hợp WhatsApp hoặc hệ thống chat riêng

### ● **Thiết kế Responsive**

* Tối ưu cho desktop – tablet – mobile
* Hamburger menu trên mobile

---

## 4. **Công nghệ giao diện**

* **ReactJS + Vite:** tối ưu tốc độ & hiệu năng
* **Tailwind CSS:** xây dựng UI linh hoạt, chuẩn responsive
* **RESTful API** để đồng bộ dữ liệu (bác sĩ, lịch hẹn, đánh giá…)
* **Axios/Fetch API** xử lý request
* **Quản lý state:** Zustand / Redux / Context API
* Giao diện được chia thành các component nhỏ:

  * Header
  * Footer
  * DoctorCard
  * AppointmentForm …

---

## 5. **Tối ưu trải nghiệm người dùng (UX/UI)**

### ● **Hiệu năng**

* Tốc độ tải <1s
* Lazy load hình ảnh & tài nguyên

### ● **Đơn giản hóa thao tác**

* Kiểm tra hợp lệ form (email, số điện thoại, ngày khám…)
* Chỉ yêu cầu thông tin cần thiết

### ● **Hỗ trợ người lớn tuổi**

* Cỡ chữ lớn
* Màu sắc tương phản tốt
* Nút lớn, dễ nhấn

### ● **Thông báo tương tác**

* Sử dụng Toast/Modal
* Gợi ý: react-toastify

---

## 6. **Hướng dẫn sử dụng**

* **Link truy cập:**
  [https://medicare-web-amber.vercel.app](https://medicare-web-amber.vercel.app)


---

## 7. **Kết luận**

Giao diện người dùng của hệ thống **Medicare** được thiết kế để tối ưu hoá:

* Tính dễ sử dụng
* Tốc độ
* Sự chuyên nghiệp

Hệ thống UI/UX này không chỉ hỗ trợ bệnh nhân trong việc quản lý sức khỏe cá nhân mà còn góp phần xây dựng một trải nghiệm y tế số hiện đại và đáng tin cậy.

