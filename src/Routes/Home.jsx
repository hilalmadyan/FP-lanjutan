import { Box, Button, Heading, Text, Container} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box bgColor="#F5EFE7">
    <Container>
      <Box p="30px" textAlign="center" bgColor="">
        <Heading color="#213555" as="h1" mt="60px">Studi Independen Kampus Merdeka</Heading>
        <Text  color=" #213555">By Ruang Guru</Text>
      </Box>
      <Box textAlign="center" p="50px" >
        <Heading  color=" #213555" as="h3">Welcome to Student Portal</Heading>
        <Link to="/student">
          <Button bgColor="#D8C4B6" color="#213555" data-testid="student-btn" mt="100px" mb="151px">All Student</Button>
        </Link>
      </Box>
      </Container>
      </Box>
  );
};

export default Home;
