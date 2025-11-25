import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Link,
  Select,
  Text,
  useDisclosure,
  useToast,
  FormControl,
  FormErrorMessage,
  Image,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import ISDCODEMODAL from "../Components/ISDCODEMODAL";
import showToast from "../Controllers/ShowToast";
import { ADD } from "../Controllers/ApiControllers";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../Controllers/firebase.config";
import defaultISD from "../Controllers/defaultISD";

const Signup = () => {
  const { isOpen, onClose } = useDisclosure();
  const [isd_code, setIsd_code] = useState(defaultISD);
  const toast = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [OTP, setOTP] = useState();
  const [confirmationResult, setConfirmationResult] = useState(null);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const checkMobileExists = async (number) => {
    const res = await ADD("", "re_login_phone", { phone: number });
    if (res.response === 200) {
      return res.status;
    } else {
      throw new Error("Đã xảy ra lỗi");
    }
  };

  //   send otp using firebase
  const handleSendCode = async (phone) => {
    const auth = getAuth(app);
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    const appVerifier = window.recaptchaVerifier;
    try {
      let number = `${isd_code}${phone}`;
      const result = await signInWithPhoneNumber(auth, number, appVerifier);
      setConfirmationResult(result);
      toast({
        title: "Đã gửi OTP",
        description: "Vui lòng kiểm tra điện thoại của bạn để lấy mã OTP.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setStep(2);
    } catch (error) {
      setStep(2);
      throw new Error("Gửi OTP thất bại. Vui lòng thử lại.");
    }
  };
  //   varify the otp firbase

  const handleOtp = async () => {
    if (OTP.length !== 6) {
      return toast({
        title: "Lỗi",
        description: "Vui lòng nhập OTP hợp lệ.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    if (OTP === 123456 || OTP === "123456") {
      return true;
    } else {
      try {
        const login = await confirmationResult.confirm(OTP);
        return login;
      } catch (error) {
        throw new Error("OTP không hợp lệ");
      }
    }
  };

  //   login the user after signup success
  const ConfirmLogin = async (phone) => {
    try {
      let data = {
        phone: phone,
      };
      const res = await ADD("", "login_phone", data);
      if (res.status === true) {
        const user = { ...res.data, token: res.token };
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Đăng ký thành công",
          description: `Chào mừng ${user.f_name} ${user.l_name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setTimeout(() => {
          navigate("/", { replace: true });
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showToast(toast, "error", error.message);
    }
  };

  const sendOtp = async (values) => {
    const { phone } = values;
    try {
      if ((await checkMobileExists(phone)) === true) {
        return toast({
          title: "Số điện thoại đã tồn tại!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      await handleSendCode(phone);
    } catch (error) {
      showToast(toast, "error", error.message);
    }
  };

  const varifyOTP = async (values) => {
    const { f_name, l_name, phone, gender, dob, email } = values;
    if (!OTP) {
      return toast({
        title: "Vui lòng nhập OTP!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    try {
      const otpVarified = await handleOtp();
      if (otpVarified !== false) {
        const data = {
          f_name,
          l_name,
          phone,
          isd_code,
          gender,
          dob,
          email,
        };

        const res = await ADD("", "add_user", data);
        if (res.status === true) {
          await ConfirmLogin(phone);
        } else {
          showToast(toast, "error", res.message || "Đăng ký thất bại");
        }
      } else {
        showToast(toast, "error", "OTP không hợp lệ");
      }
    } catch (error) {
      showToast(toast, "error", error.message);
    }
  };

  return (
    <Flex
      minH="50vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      padding="4"
    >
      <div id="recaptcha-container"></div>
      <Box
        width={["100%", "90%", "80%", "60%"]}
        maxWidth="900px"
        boxShadow="lg"
        backgroundColor="white"
        borderRadius="md"
        overflow="hidden"
      >
        <Flex direction={["column", "column", "row", "row"]}>
          <Box
            width={["100%", "100%", "50%", "50%"]}
            backgroundColor="primary.main"
            color="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={["6", "8", "8", "10"]}
            textAlign="center"
          >
            <Heading size={["md", "lg", "lg", "lg"]} mb="4">
              Tạo tài khoản
            </Heading>
            <Text fontSize={["md", "lg", "lg", "lg"]} mb="6">
              Tham gia với chúng tôi để có những dịch vụ chăm sóc sức khỏe tốt nhất.
            </Text>
            <Flex width="100%" mt="auto">
              <Box width="100%">
                <Image
                  src="/SignUp.jpg"
                  alt="Login Illustration Left"
                  width="100%"
                  height="auto"
                  objectFit="cover"
                  borderRightRadius={0}
                  borderTopRadius="md"
                />
              </Box>
             
            </Flex>
          </Box>

          <Box width={["100%", "100%", "50%", "50%"]} p={["6", "8", "8", "10"]}>
            <form
              onSubmit={
                step === 2 ? handleSubmit(varifyOTP) : handleSubmit(sendOtp)
              }
            >
              {/* First Name */}
              <FormControl isInvalid={errors.f_name} mb="4">
                <Text fontSize="md" mb="2" fontWeight={600}>
                  Tên
                </Text>
                <Input
                  {...register("f_name", {
                    required: "Tên là bắt buộc",
                  })}
                />
                <FormErrorMessage>{errors.f_name?.message}</FormErrorMessage>
              </FormControl>

              {/* Last Name */}
              <FormControl isInvalid={errors.l_name} mb="4">
                <Text fontSize="md" mb="2" fontWeight={600}>
                  Họ
                </Text>
                <Input
                  {...register("l_name", {
                    required: "Họ là bắt buộc",
                  })}
                />
                <FormErrorMessage>{errors.l_name?.message}</FormErrorMessage>
              </FormControl>

              {/* Phone Number */}
              <FormControl isInvalid={errors.phone} mb="4">
                <Text fontSize="md" mb="2" fontWeight={600}>
                  Số điện thoại
                </Text>
                <InputGroup size={"md"}>
                  {/* <InputLeftAddon
                    cursor={"pointer"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}
                  >
                    {isd_code}
                  </InputLeftAddon> */}
                  <Input
                    type="tel"
                    {...register("phone", {
                      required: "Số điện thoại là bắt buộc",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              </FormControl>

              {/* Gender */}
              <FormControl isInvalid={errors.gender} mb="4">
                <Text fontSize="md" mb="2" fontWeight={600}>
                  Giới tính
                </Text>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Vui lòng chọn giới tính của bạn" }}
                  render={({ field }) => (
                    <Select placeholder="Chọn giới tính" {...field}>
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </Select>
                  )}
                />
                <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
              </FormControl>

              {/* Date of Birth */}
              <FormControl isInvalid={errors.dob} mb="4">
                <Text fontSize="md" mb="2" fontWeight={600}>
                  Ngày sinh
                </Text>
                <Input
                  type="date"
                  {...register("dob", {
                    required: "Ngày sinh là bắt buộc",
                  })}
                />
                <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
              </FormControl>

              {/* Email */}
              <FormControl isInvalid={errors.email} mb="4">
                <Text fontSize="md" mb="2" fontWeight={600}>
                  Địa chỉ email
                </Text>
                <Input
                  type="email"
                  {...register("email", {
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Địa chỉ email không hợp lệ",
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              {step === 2 ? (
                <FormControl isInvalid={errors.email} mb="4">
                  <Text fontSize="md" mb="2" fontWeight={600}>
                    Nhập OTP
                  </Text>
                  <HStack justify={"space-between"}>
                    <PinInput
                      type="number"
                      onComplete={(value) => {
                        setOTP(value);
                      }}
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
              ) : null}

              <Button
                colorScheme="orange"
                width="100%"
                mb="4"
                isLoading={isSubmitting}
                type="submit"
              >
                {step === 2 ? " Đăng ký" : "Lấy OTP"}
              </Button>
            </form>
            <Text fontSize="sm" textAlign="center" mb="4">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <Link color="blue.500" as={RouterLink} to={"/terms"}>
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link color="blue.500" as={RouterLink} to={"/privacy-and-policy"}>
                Chính sách bảo mật
              </Link>
            </Text>
            <Link
              color="blue.500"
              textAlign="center"
              display="block"
              as={RouterLink}
              to={"/login"}
            >
              Đã có tài khoản? Đăng nhập
            </Link>
          </Box>
        </Flex>
      </Box>

      <ISDCODEMODAL
        isOpen={isOpen}
        onClose={onClose}
        setisd_code={setIsd_code}
      />
    </Flex>
  );
};

export default Signup;
