import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box >
        <Heading>404 Not Found</Heading>
        <Button onClick={handleBack} data-testid="back">
          Back
        </Button>
    </Box>
  );
};

export default NotFound;
