import { Box } from "@chakra-ui/react";

const year = new Date();
const currentYear = year.getFullYear();

const Footer = () => (
  <Box
    p="5"
    borderTop="1px"
    borderColor="gray.100"
    fontWeight="bold"
    textAlign="center"
  >
    {currentYear} Realtor, Inc.
  </Box>
);

export default Footer;
