import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

import { MenuItem, InputLabel, FormControl, Select,  } from "@mui/material";

const BASE_URL = "http://localhost:8000/api/v1";

const theme = createTheme();

export default function Register({ handleHaveAccount }) {

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [addressError, setaddressError] = useState(false)
  const [contactNumberError, setContactNumberError] = useState(false)
  const [role, setRole] = useState("USER");
 
  const [passwordError, setPasswordError] = useState(false)


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const ValidateFirstName = (firstName) => {
    return String(firstName)
    .match(/[a-z]{3,20}/i);
  }
  const validateLasttname = (lastName) => {
    return String(lastName)
    .match(/[a-z]{3,20}/i);
  }
  const validatePassword = (password) =>
  {
    return String(password)
    .match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

  }
  const validateAddress = (address) =>
  {
    return String(address)
    .match(/^[a-zA-Z0-9,\s]{3,200}$/);
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let er = false;

    const data = {
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      address: formData.get("address"),
      password: formData.get("password"),
      name: formData.get("firstName") +" "+ formData.get("lastName"),
      role: role
    }

    const { email, contactNumber, password} = data

    if(email==="" || !validateEmail(email)){
      
      er=true;
      setEmailError(true)
    }else{
      setEmailError(false)
    }
    if(formData.get("firstName")==="" || !ValidateFirstName(formData.get("firstName"))){
      er=true;
     
      setFirstNameError(true)
    }else{
      setFirstNameError(false)
    }

    if(formData.get("lastName")==="" || !validateLasttname(formData.get("lastName"))){
      er=true;
     
      setLastNameError(true)
    }else{
      setLastNameError(false)
    }

    if(formData.get("address")==="" || !validateAddress(formData.get("address"))){
      er=true;
     
      setaddressError(true)
    }else{
      setaddressError(false)
    }

    if(contactNumber==="" || contactNumber.length!=10){
      er=true;
      
      setContactNumberError(true)
    }else{
      setContactNumberError(false)
    }


    if(password==="" || !validatePassword(password)){
      er=true;
      
      setPasswordError(true)
    }else{
      setPasswordError(false)
    }
       try {
      if(er) throw "Invalid form data"
      console.log("error", error)
      const response = await axios({
        method: "post",
        url: BASE_URL + "/users/signup",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if(response.data){
          setSuccess(true)
          setTimeout(()=>  handleHaveAccount(true), 3000)
         
      }

      setTimeout(()=> setSuccess(false), 5000)
      
    } catch (err) {

        setError(true)
        setTimeout(()=> setError(false), 5000)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{marginTop: 70}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && <Alert severity="error">Please enter valid information</Alert>}
        {success && <Alert severity="success">Registration successful, kindly proceed with login</Alert>}
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={firstNameError}
                  helperText={firstNameError?"Enter valid first name":""}
                  onChange={(e)=>setFirstNameError(false)}
                  name="firstName"
                  required
                  
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                   error={lastNameError}
                   helperText={lastNameError?"Enter valid last name":""}
                   onChange={(e)=>setLastNameError(false)}
                  required
                  
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={emailError}
                  helperText={emailError?"Enter valid email":""}
                  onChange={(e)=> setEmailError(false)}
                  required
                  
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                error={contactNumberError}
                helperText={contactNumberError?"Enter valid contact number":""}
                onChange={(e)=>setContactNumberError(false)}
                  required
                  fullWidth
                  id="contactNumber"
                  label="Contact Number"
                  name="contactNumber"
                  autoComplete="contactNumber"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                error={addressError}
                helperText={addressError?"Enter valid address":""}
                onChange={(e)=>setaddressError(false)}
                  required
                  
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue="USER"
                    value={role}
                    required
                    label="Select Role"
                    onChange={(e) => { setRole(e.target.value)
                    }}
                  >
                    <MenuItem value={"VENDOR"}>Vendor</MenuItem>
                    {/* <MenuItem value={"ADMIN"}>Admin</MenuItem> */}
                    <MenuItem value={"USER"}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                error={passwordError}
                helperText={passwordError?"Enter valid password":""}
                onChange={(e)=>setPasswordError(false)}
                  required
                  
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setShowPassword(!showPassword)}
                      value={showPassword}
                      color="primary"
                    />
                  }
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => handleHaveAccount(true)}>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
