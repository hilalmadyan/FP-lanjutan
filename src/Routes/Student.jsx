import {
  Box,
  Button,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
const Student = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/student");
      const data = await response.json();
      setStudents(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.log("Error deleting student: ", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.faculty === filter);

  return (
    <>
      <Box bgColor="#F5EFE7" className="student-data" p="20px">
        <Box>
          <Heading size="lg" textAlign="center" as="h2" color="#213555">
            STUDENT LIST
          </Heading>
          <Select
            value={filter}
            onChange={handleFilterChange}
            data-testid="filter"
          >
            <option value="All">All</option>
            <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
            <option value="Fakultas Ilmu Sosial dan Politik">
              Fakultas Ilmu Sosial dan Politik
            </option>
            <option value="Fakultas Teknik">Fakultas Teknik</option>
            <option value="Fakultas Teknologi Informasi dan Sains">
              Fakultas Teknologi Informasi dan Sains
            </option>
          </Select>
        </Box>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <TableContainer className="test-table-container">
            <Table variant='striped' colorScheme='facebook' className="test-table" id="table-student">
              <Thead className="test-thead">
                <Tr className="test-tr">
                  <Th className="test-th">No</Th>
                  <Th className="test-th">Full Name</Th>
                  <Th className="test-th">Faculty</Th>
                  <Th className="test-th">Program Study</Th>
                  <Th className="test-th">Option</Th>
                </Tr>
              </Thead>
              <Tbody className="test-tbody">
                {filteredStudents.map((student, index) => (
                  <Tr className="test-tr" key={student.id}>
                    <Td className="test-td" data-label="No">
                      {index + 1}
                    </Td>
                    <Td className="test-td" data-label="Full Name">
                      <Link className="test-link" to={`/student/${student.id}`}>
                        {student.fullname}
                      </Link>
                    </Td>
                    <Td className="test-td" data-label="Faculty">
                      {student.faculty}
                    </Td>
                    <Td className="test-td" data-label="Program Study">
                      {student.programStudy}
                    </Td>
                    <Td className="test-td" data-label="Option">
                      <Button
                        onClick={() => handleDelete(student.id)}
                        data-testid={`delete-${student.id}`}
                        id="del-btn"
                        bgColor="#4F709C"
                        color="white"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default Student;
