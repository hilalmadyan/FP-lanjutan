import { Button, Heading, Input, Select, Box, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    programStudy: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/student/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error", error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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

    fetch(`http://localhost:3001/student/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);

        navigate("/student");
      })

      .catch((error) => {
        console.error("Error", error);
      })

      .finally(() => {
        setLoading(false);
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
            <Box>
              <Heading size="lg" textAlign="center" as="h2" color="#213555" p="20px">EDIT STUDENT</Heading>
            </Box>
            {loading ? (
              <p>Loading ...</p>
            ) : (
              <div>
                <div>
                  <Center>
                    <img
                      src={formData.profilePicture}
                      alt="Profile"
                      data-testid="previewPicture"
                    />
                  </Center>
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
                  <option value="Administrasi Publik">
                    Administrasi Publik
                  </option>
                  <option value="Administrasi Bisnis">
                    Administrasi Bisnis
                  </option>
                  <option value="Hubungan Internasional">
                    Hubungan Internasional
                  </option>
                  <option value="Teknik Sipil">Teknik Sipil</option>
                  <option value="Arsitektur">Arsitektur</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Informatika">Informatika</option>
                </Select>
                <Box textAlign="center" p="50px">
                  <Button
                    bgColor="#4F709C"
                    color="white"
                    type="submit"
                    id="add-btn"
                    data-testid="add-btn"
                  >
                    Edit Student
                  </Button>
                </Box>
              </div>
            )}
          </form>
        </div>
      </div>
    </Box>
  );
};

export default EditStudent;
