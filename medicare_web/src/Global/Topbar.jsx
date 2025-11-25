import { FaUserMd } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { MdHealthAndSafety } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiWallet } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { IoMdWallet } from "react-icons/io";
/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  Text,
  DrawerHeader,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../Controllers/user";
import { BiUser } from "react-icons/bi";
import moment from "moment";
import WalletModel from "../Components/Wallet";
import useSettingsData from "../Hooks/SettingData";

import NotificationIcon from "../Components/Notification";

const LinksPublic = [
  { path: "/home", label: "Trang chủ" },
  { path: "/doctors", label: "Bác sĩ" },
];
const LinksAuth = [{ path: "/appointments", label: "Lịch hẹn" }];
const LinksPublic2 = [
  { path: "/about-us", label: "Về chúng tôi" },
  { path: "/contact-us", label: "Liên hệ" },
];

const SideBarLinks = [
  {
    name: "Home",
    label: "Trang chủ",
    icon: <AiFillHome />,
    auth: true,
  },
  {
    name: "Profile",
    label: "Hồ sơ",
    icon: <FaUserAlt />,
    auth: user ? true : false,
  },
  {
    name: "Family Members",
    label: "Thành viên gia đình",
    icon: <HiUsers />,
    auth: user ? true : false,
  },
  {
    name: "Appointments",
    label: "Lịch hẹn",
    icon: <AiOutlineHistory />,
    auth: user ? true : false,
  },
  {
    name: "Doctors",
    label: "Bác sĩ",
    icon: <FaUserMd />,
    auth: true,
  },
  {
    name: "Vitals",
    label: "Chỉ số sức khoẻ",
    icon: <MdHealthAndSafety />,
    auth: user ? true : false,
  },
  {
    name: "About-Us",
    label: "Về chúng tôi",
    icon: <AiFillInfoCircle />,
    auth: true,
  },
  {
    name: "Contact-Us",
    label: "Liên hệ",
    icon: <BsFillTelephoneFill />,
    auth: true,
  },
];

const NavLink = (props) => {
  const { path, label } = props;
  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "none",
      }}
      to={path}
    >
      {label}
    </Box>
  );
};

export default function TopBar() {
  const { settingsData } = useSettingsData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const [activeTab, setactiveTab] = useState("Home");
  const {
    isOpen: isWalletOpen,
    onOpen: onWalletOpen,
    onClose: onWalletClose,
  } = useDisclosure();

  //

  
  const play_store_link = settingsData?.find(
    (value) => value.id_name === "play_store_link"
  );
  const app_store_link = settingsData?.find(
    (value) => value.id_name === "app_store_link"
  );
  return (
    <>
      <Box
        borderBottom={"0.5px solid"}
        borderColor={"gray.400"}
        position="sticky"
        top="0"
        left="0"
        width="100%"
        bg={"primary.main"}
        color={useColorModeValue("#fff", "white")}
        zIndex={99}
      >
        <div className="container">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"lg"}
              icon={<HamburgerIcon color={"#fff"} />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              variant={"ghost"}
              _hover={{
                background: "none",
              }}
              ref={btnRef}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Flex gap={2} align={"center"} as={Link} to={"/"}>
                <Image
                  w={10}
                  src={"logo.png"}
                />
                <Text
                  fontFamily={"Quicksand, sans-serif"}
                  fontWeight={800}
                  fontSize={20}
                >
                  MediCare360
                </Text>
              </Flex>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {LinksPublic.map((link) => (
                  <NavLink key={link.path} path={link.path} label={link.label} />
                ))}

                {user &&
                  LinksAuth.map((link) => (
                    <NavLink key={link.path} path={link.path} label={link.label} />
                  ))}
                {LinksPublic2.map((link) => (
                  <NavLink key={link.path} path={link.path} label={link.label} />
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"} gap={2}>
              <NotificationIcon />
              {user ? (
                <>
                  {" "}
                  <Box display={{ base: "block", md: "block" }}>
                    {" "}
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Avatar size={"sm"} src={"user.png"} />
                      </MenuButton>
                      <MenuList color={"#000"}>
                        <MenuItem
                          fontWeight={500}
                          color="gray.800"
                          icon={<FaUserAlt fontSize={16} />}
                          onClick={() => {
                            onClose();
                            navigate("/profile");
                          }}
                        >
                          Hồ sơ
                        </MenuItem>
                        <MenuItem
                          fontWeight={500}
                          color="gray.800"
                          icon={
                            <MdHealthAndSafety
                              fontSize={16}
                              fontWeight={600}
                              color="gray.500"
                            />
                          }
                          onClick={() => {
                            onClose();
                            navigate("/vitals");
                          }}
                        >
                          Chỉ số sức khoẻ{" "}
                        </MenuItem>
                        <MenuItem
                          fontWeight={500}
                          color="gray.800"
                          icon={
                            <MdHealthAndSafety
                              fontSize={16}
                              fontWeight={600}
                              color="gray.500"
                            />
                          }
                          onClick={() => {
                            onClose();
                            navigate("/vitals");
                          }}
                        >
                          Chỉ số sức khoẻ{" "}
                        </MenuItem>
                        <MenuItem
                          fontWeight={500}
                          color="gray.800"
                          icon={
                            <IoMdWallet
                              fontSize={16}
                              fontWeight={600}
                              color="gray.500"
                            />
                          }
                          onClick={onWalletOpen}
                        >
                          Ví{" "}
                        </MenuItem>

                        <MenuDivider />
                        <MenuItem
                          fontWeight={500}
                          color="gray.800"
                          icon={
                            <BiLogOut
                              fontSize={16}
                              fontWeight={600}
                              color="gray.500"
                            />
                          }
                          onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/", { replace: true });
                            window.location.reload();
                          }}
                        >
                          Đăng xuất
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Box>{" "}
                  {/* <Box pos={"relative"}>
                    <IconButton
                      as={Link}
                      bg={"#fff"}
                      icon={<BiShoppingBag fontSize={20} />}
                      variant={"solid"}
                      size={"sm"}
                      borderRadius={"full"}
                      to={"/cart"}
                    />
                    <Badge
                      colorScheme="blue"
                      borderRadius="full"
                      position="absolute"
                      top="-1"
                      right="-1"
                      fontSize="0.7em"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      minW="10px"
                      minH="10px"
                      variant={"solid"}
                    >
                      {cartData?.length}
                    </Badge>
                  </Box> */}
                </>
              ) : (
                <Box display={{ base: "none", md: "Flex" }} gap={5}>
                  <Button
                    fontSize={"sm"}
                    fontWeight={500}
                    variant={"link"}
                    href={"#"}
                    color={"#fff"}
                    as={Link}
                    to={"/login"}
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    variant="ghost"
                    bg={"pink.400"}
                    href={"#"}
                    _hover={{
                      bg: "pink.300",
                    }}
                    w="100px"
                    h="30px"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Đăng ký
                  </Button>
                </Box>
              )}
            </Flex>
          </Flex>
        </div>

        {isOpen ? (
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <Box>
                  {user ? (
                    <>
                      {" "}
                      <Flex
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        {" "}
                        <Text fontSize={"18px"} mb={0}>
                          {user?.f_name} {user?.l_name}
                        </Text>
                        <Flex gap={0}>
                          {" "}
                          <Button
                            variant={"ghost"}
                            px={0}
                            onClick={() => {
                              onClose();
                              onWalletOpen();
                            }}
                          >
                            <BiWallet fontSize={22} />
                          </Button>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              variant="ghost"
                              colorScheme="gray"
                              icon={<BiUser fontSize={20} />}
                            ></MenuButton>

                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  onClose();
                                  navigate("/profile");
                                }}
                                fontSize={16}
                              >
                                Hồ sơ
                              </MenuItem>
                              <MenuItem
                                fontSize={16}
                                onClick={() => {
                                  localStorage.removeItem("user");
                                  navigate("/", { replace: true });
                                  window.location.reload();
                                }}
                              >
                                Đăng xuất
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Flex>
                      </Flex>
                      <Text fontSize={12} mt={"-5px"} fontWeight={400}>
                        Thành viên từ{" "}
                        {moment(user?.created_at).format("MMM DD YYYY")}
                      </Text>
                    </>
                  ) : (
                    <Flex
                      justify={"space-around"}
                      borderBottom={"1px solid"}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      borderColor={useColorModeValue("gray.100", "gray.500")}
                      pb={2}
                    >
                      {" "}
                      <Button
                        fontSize={"sm"}
                        fontWeight={500}
                        href={"#"}
                        colorScheme={"green"}
                        as={Link}
                        to={"/login"}
                        onClick={() => {
                          navigate("/login");
                          onClose();
                        }}
                        w="100px"
                        h="30px"
                      >
                        Đăng nhập
                      </Button>
                      <Button
                        fontSize={"sm"}
                        fontWeight={600}
                        color={"white"}
                        variant="ghost"
                        bg={"pink.400"}
                        href={"#"}
                        _hover={{
                          bg: "pink.300",
                        }}
                        w="100px"
                        h="30px"
                        onClick={() => {
                          navigate("/signup");
                          onClose();
                        }}
                      >
                        Đăng ký
                      </Button>
                    </Flex>
                  )}
                </Box>
              </DrawerHeader>

              <DrawerBody pr={0}>
                <Box>
                  {SideBarLinks?.map((item) => {
                    if (item.auth === true) {
                      return (
                        <Box
                          key={item}
                          as={Link}
                          href="#"
                          style={{ textDecoration: "none" }}
                          _focus={{ boxShadow: "none" }}
                          onClick={() => {
                            setactiveTab(item.name);
                            onClose();
                          }}
                          to={`/${item.name.toLocaleLowerCase()}`}
                        >
                          <Flex
                            align="center"
                            p="2"
                            mx="4"
                            mt={3}
                            borderRadius="lg"
                            role="group"
                            cursor="pointer"
                            bg={
                              activeTab === item.name
                                ? "primary.bg"
                                : "transperent"
                            }
                            color={activeTab === item.name && "white"}
                            _hover={{
                              bg: "primary.bg",
                              color: "white",
                            }}
                            gap={5}
                          >
                            {item.icon}
                            <Text mb={0}>{item.label}</Text>
                          </Flex>
                        </Box>
                      );
                    }
                  })}
                </Box>
              </DrawerBody>

              <DrawerFooter
                flexDir={"column"}
                alignItems={"start"}
                borderTop={"1px solid"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                borderColor={useColorModeValue("gray.100", "gray.600")}
                p={3}
              >
                <Text textAlign={"left"} fontSize={17} mb={5}>
                  Nhấn để cài đặt ứng dụng
                </Text>
                <Flex gap={5} justifyContent={"center"} w={"100%"}>
                  <Link isExternal href={play_store_link.value}>
                    {" "}
                    <Image src={"/play store.png"} w={120} />
                  </Link>
                  <Link isExternal href={app_store_link.value}>
                    <Image src={"/app store.png"} w={120} />
                  </Link>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : null}
      </Box>

      {user && (
        <WalletModel
          isModalOpen={isWalletOpen}
          closeModal={onWalletClose}
          openModal={onWalletClose}
        />
      )}
    </>
  );
}
