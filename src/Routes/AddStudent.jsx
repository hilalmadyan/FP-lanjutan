import React from "react";
import { Heading, Input, Button, Select, Box, Menu, MenuDivider, MenuButton, MenuList, MenuItem, Spacer } from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });
  useEffect(() => {
    fetch(`http://localhost:3001/student/`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      profilePicture: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
    } = formData;

    const faculty = getFacultyByProgramStudy(programStudy);
    const newStudent = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      faculty,
      programStudy,
    };

    fetch("http://localhost:3001/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/student");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFacultyByProgramStudy = (programStudy) => {
    let faculty = "";

    switch (programStudy) {
      case "Ekonomi":
      case "Manajemen":
      case "Akuntansi":
        faculty = "Fakultas Ekonomi";
        break;
      case "Administrasi Publik":
      case "Administrasi Bisnis":
      case "Hubungan Internasional":
        faculty = "Fakultas Ilmu Sosial dan Politik";
        break;
      case "Teknik Sipil":
      case "Arsitektur":
        faculty = "Fakultas Teknik";
        break;
      case "Matematika":
      case "Fisika":
      case "Informatika":
        faculty = "Fakultas Teknologi Informasi dan Sains";
        break;
      default:
        faculty = "";
        break;
    }
    return faculty;
  };

  return (
    <Box bgColor="#F5EFE7" p="20px">
      <div>
        <div>
          <form id="form-student" onSubmit={handleSubmit}>
            <Heading size="lg" textAlign="center" as="h2" color="#213555">
              ADD STUDENT
            </Heading>
            <div>
              <div>
                <img
                  src={formData.profilePicture}
                  alt="Insert Profile Picture"
                  data-testid="previewPicture"
                />
                <label>
                  Full Name:
                  <Input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    data-testid="name"
                  />
                </label>
                <Menu>
                  <MenuButton
                    px={4}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="md"
                    borderWidth="1px"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                  >
                    File <ChevronDownIcon />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>New Window</MenuItem>
                    <MenuDivider />
                    <MenuItem>Open...</MenuItem>
                    <MenuItem>Save File</MenuItem>
                  </MenuList>
                </Menu>
                <label>
                  Profile Picture
                  {/* <input
                    // type="text"
                    name="profilePicture"
                    value={formData.profilePicture}
                    onChange={handleProfilePictureChange}
                    data-testid="profilePicture"
                  /> */}
                </label>
                <Spacer/>
                <label>
                  Address:
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    data-testid="address"
                  />
                </label>
                <label>
                  Phone Number:
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    data-testid="phoneNumber"
                  />
                </label>
                <label>
                  Birth Date:
                  <Input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    data-testid="date"
                  />
                </label>
                <label>
                  Gender:
                  <Select
                    name="gender"
                    id="input-gender"
                    data-testid="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--- Silahkan Pilih Gender ---</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </label>
              </div>

              <label htmlFor="input-prody">Program Study</label>

              <Select
                name="programStudy"
                id="input-prody"
                data-testid="prody"
                value={formData.programStudy}
                onChange={handleChange}
                required
              >
                <option value="">--- Silahkan Pilih Program Studi --</option>

                <option value="Ekonomi ">Ekonomi</option>
                <option value="Manajemen">Manajemen</option>

                <option value="Akuntansi">Akuntansi</option>
                <option value="Administrasi Publik">Administrasi Publik</option>
                <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                <option value="Hubungan Internasional">
                  Hubungan Internasional
                </option>
                <option value="Teknik Sipil">Teknik Sipil</option>
                <option value="Arsitektur">Arsitektur</option>
                <option value="Matematika">Matematika</option>
                <option value="Fisika">Fisika</option>
                <option value="Informatika">Informatika</option>
              </Select>
              <Box textAlign="center" p="71px">
                <Button
                  bgColor="#4F709C"
                  color="white"
                  type="submit"
                  id="add-btn"
                  data-testid="add-btn"
                >
                  Add Student
                </Button>
              </Box>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default AddStudent;
