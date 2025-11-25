import { Box, Image } from "@chakra-ui/react";
import useSettingsData from "../Hooks/SettingData";

const WhatsAppButton = () => {
  const { settingsData } = useSettingsData();
  const whatsappNumber = settingsData?.find(
    (value) => value.id_name === "whatsapp"
  );
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number and message
    const phoneNumber = whatsappNumber.value;
    const message =
      "Xin chào! Tôi muốn đặt lịch hẹn tại bệnh viện của bạn. Bạn có thể vui lòng hướng dẫn tôi quy trình được không?";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
      onClick={handleWhatsAppClick}
      cursor="pointer"
    >
      <Image
        src="/whatsapp.png" // Replace with your custom WhatsApp image URL
        alt="WhatsApp"
        boxSize="40px" // Adjust size as needed
     
      />
    </Box>
  );
};

export default WhatsAppButton;
