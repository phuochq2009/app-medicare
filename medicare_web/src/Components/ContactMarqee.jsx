import { ImLocation } from "react-icons/im";
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import LocationSeletor from "./LocationSeletor";
import useSettingsData from "../Hooks/SettingData";
function ContactMarqee() {
  const { settingsData } = useSettingsData();
  return (
    <>
      {settingsData ? (
        <Box
          py={2}
          bg={"blue.900"}
          color={"#fff"}
          borderBottom={"0.5px solid"}
          borderColor={"gray.400"}
          px={2}
        >
          <div className="container">
            <Flex gap={2} align={"center"} justifyContent={"space-between"}>
              <Box display={{ base: "block", lg: "none" }}>
                {" "}
                <LocationSeletor />
              </Box>
              <Box display={{ base: "none", lg: "block" }} w={"100%"}>
                <div className="container">
                  {" "}
                  <Flex gap={7} justifyContent={"flex-end"}>
                    {" "}
                    <a
                      href={`tel:0966969666`}
                      display="flex"
                      color="blue.500"
                      fontWeight="bold"
                    >
                      <HStack spacing={1}>
                        <PhoneIcon boxSize={3} />
                        <Text fontSize="sm">0966 969 666</Text>
                      </HStack>
                    </a>
                    <Link
                      href={`https://www.google.com/maps?q=123+Đường+Cầu+Giấy,+Quận+Cầu+Giấy,+Hà+Nội`}
                      display="flex"
                      color="#fff"
                      fontWeight="semi-bold"
                      isExternal
                      textTransform={"none"}
                    >
                      <HStack spacing={2}>
                        <ImLocation />
                        <Text fontSize="sm">Địa chỉ: 123 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội</Text>
                      </HStack>
                    </Link>
                  </Flex>
                </div>{" "}
              </Box>
            </Flex>
          </div>{" "}
        </Box>
      ) : null}
    </>
  );
}

export default ContactMarqee;
