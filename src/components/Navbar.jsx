import { Link, Heading, Box, Flex, Button, Spacer, } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavBar = () => {
  return (
      <Flex
        as="nav"
        p="10px"
        allignItems="center"
        gap="10px"
        wrap="wrap"
        bgColor="#F5EFE7"
      >
        <Box>
          <Heading color="#213555" as="h1">
            <Link as={RouterLink} to="/" data-testid="home-page">
              STUDENT PORTAL
            </Link>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <Flex gap="10px">
            <Button bgColor="#4F709C" color="white">
              <Link as={RouterLink} to="/student" data-testid="student-page">
                All Student
              </Link>
            </Button>

            <Button bgColor="#4F709C" color="white">
              <Link as={RouterLink} to="/add" data-testid="add-page">
                Add Student
              </Link>
            </Button>
          </Flex>
        </Box>
      </Flex>

  );
};

export default NavBar;
