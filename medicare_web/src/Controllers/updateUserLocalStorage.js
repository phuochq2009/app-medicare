import { ADD } from "./ApiControllers";
import user from "./user";
export const updateUserLocalStorage = async (phoneNumber) => {
  try {
    const data = { phone: phoneNumber };
    const res = await ADD(user.token, "re_login_phone", data);

    if (res.status === true) {
      const user = { ...res.data, token: user.token };
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.error(
        "Không thể cập nhật dữ liệu người dùng:",
        res.message || "Lỗi không xác định"
      );
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật dữ liệu người dùng:", error.message);
  }
};
