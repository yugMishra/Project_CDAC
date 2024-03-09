import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  CardContent,
  Card,
  Select,
  MenuItem,
  Divider,
  Grid,
  CardMedia,
  FormControl,
  InputLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from "../components/Snackbar";


import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/api/v1";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const VendorPanel = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [sneakers, setSneakers] = useState();
  const [sneakerId, setSneakerId] = useState();
  const [stock, setstock] = useState();
  const [brand, setbrand] = useState("");
  const [image, setimage] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState();
  const [returnPolicy, setReturnPolicy] = useState("");
  const [description, setdescription] = useState("")

  const [name, setname] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [price, setprice] = useState();

  const [showValidationError, setshowValidationError] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [orderData, setorderData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(()=> {
    if(!token){
      navigate("/");
  }
    if(role==="ADMIN"){
      navigate("/admin-panel");
    }else if(role==="USER"){
      navigate("/");
    }
},[])

  useEffect(()=> {
      loadMyOrders()
  },[])

  const loadMyOrders = async () => {
      try {
          const response = await axios({
              method: 'get',
              url: `${BASE_URL}/orders/all`,
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          });
          if (response.data) {
              const data = response.data.filter(item=> item.orderItems.length > 0)
              setorderData(data);
              let totalPrice=0;
              response.data.map(item=> item.orderItems.map((d)=>{ 
                  if(d.status !== 'CANCELLED'){
                      totalPrice+=d.product.price*d.quantity
                  }
                  }))
              setTotalPrice(totalPrice);
          } 
      } catch (error) {
         
          console.log(error);
      }
  }

  const approveOrder = async (id) => {
      let status = 'Delivered';
      try {
          const response = await axios({
              method: 'put',
              url: `${BASE_URL}/orders/${id}`,
              data: JSON.stringify({status: status}),
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          });
          if (response.data) {
              loadMyOrders();
              setSnackbarMessage("Order delivered successfully");
              setSnackbarSeverity("success");
              setOpenSnackbar(true);
          } else {
              setSnackbarMessage("Order couldn't delivered");
              setSnackbarSeverity("error");
              setOpenSnackbar(true);
          }
      } catch (error) {
          setSnackbarMessage("Order couldn't delivered");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          console.log(error);
      }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login-register");
    }
  }, []);



  const deleteSneaker = async (sneakerId) => {
    try {
      const response = await axios({
        method: "delete",
        url: BASE_URL + "/sneakers/" + sneakerId,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        setOpenSuccessSnack(true);
        setSuccessMsg("Sneaker deleted successfully");
        setOpenEditForm(false);
        let prd = sneakers.filter((sneaker) => sneaker.id !== sneakerId);
        setSneakers(prd);
        setname("");
        setprice("");
        setManufacturingDate("");
      }
    } catch (err) {
      console.log(err);
      setOpenErrorSnack(true);
      setErrorMsg("Error occured while deleting sneaker");
    }
  };

  const editSneaker = async () => {
    if (
      name === "" ||
      manufacturingDate === "" ||
      price === "" ||
      stock === "" ||
      brand === "" ||
      type === "" ||
      description === "" ||
      size === "" ||
      color === "" ||
      returnPolicy===""
    ) {
      setshowValidationError(true);
    } else {
      const sneakerData = { name, manufacturingDate, price, brand, stock, type, description, size, color, returnPolicy };
      try {
        const response = await axios({
          method: "put",
          url: BASE_URL + "/sneakers/update/" + sneakerId,
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          data: JSON.stringify(sneakerData),
        });

        if (response.data) {
          setOpenSuccessSnack(true);
          setSuccessMsg("Sneaker updated successfully");
          setOpenEditForm(false);
          let prd = sneakers.map((sneaker) =>
            sneaker.id === sneakerId ? response.data : sneaker
          );
          setSneakers(prd);
          setname("");
          setprice("");
          setManufacturingDate("");
          setbrand("");
          setType("");
          setdescription("");
          setColor("");
          setSize("")
          setReturnPolicy("");
        }
      } catch (err) {
        console.log(err);
        setOpenErrorSnack(true);
        setErrorMsg("Error occured while updating sneaker");
      }
    }
  };

  const addSneaker = async () => {
    if (
      name === "" ||
      brand === "" ||
      manufacturingDate === "" ||
      price === null ||
      stock === null||
      image === null ||
      type === ""||
      description === "" ||
      size === null ||
      color === "" ||
      returnPolicy===""
    ) {
      setshowValidationError(true);
    } else {
      const sneakerData = new FormData();
      sneakerData.append("name", name);
      sneakerData.append("brand", brand);
      sneakerData.append("manufacturingDate", manufacturingDate);
      sneakerData.append("price", price);
      sneakerData.append("stock", stock);
      sneakerData.append("image", image);
      sneakerData.append("type", type);
      sneakerData.append("description", description);
      sneakerData.append("color", color);
      sneakerData.append("size", size);
      sneakerData.append("returnPolicy", returnPolicy);
      try {
        const response = await axios({
          method: "post",
          url: BASE_URL + "/sneakers/",
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
          data: sneakerData,
        });

        if (response.data) {
          setOpenSuccessSnack(true);
          setSuccessMsg("Sneaker added successfully");
          setOpenAddForm(false);
          setSneakers([...sneakers, response.data]);
          setname("");
          setprice();
          setManufacturingDate("");
          setbrand("");
          setType("");
          setdescription("");
          setColor("");
          setstock()
          setSize()
          setReturnPolicy("");
        }
      } catch (err) {
        console.log(err);
        setOpenErrorSnack(true);
        setErrorMsg("Error occured while adding sneaker");
      }
    }
  };

  const loadSneakers = async () => {
      try {
        const response = await axios({
          method: "get",
          url: BASE_URL + "/sneakers/my-sneakers",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          }
        });
        if (response.data) {
          setSneakers(response.data)
        }
      } catch (err) {
        console.log(err);
        setOpenErrorSnack(true);
        setErrorMsg("Error occured while adding sneaker");
      }
  };

  useEffect(() => {
   loadSneakers()
  }, []);

  const handleOpenEditForm = (sneaker) => {
    setOpenEditForm(true);
    setSneakerId(sneaker.id);
    setname(sneaker.name);
    setprice(sneaker.price);
    setManufacturingDate(sneaker.manufacturingDate);
    setstock(sneaker.stock);
    setbrand(sneaker.brand)
    setdescription(sneaker.description);
    setType(sneaker.type);
    setColor(sneaker.color);
    setSize(sneaker.size);
    setReturnPolicy(sneaker.returnPolicy);
  };

  const handleOpenAddForm = () => {
    setOpenAddForm(true);
  };

  return (
    <div>
      <Header />
      <Box sx={{mt: 9, padding: 1}}>
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
          <DialogTitle>Edit Sneaker</DialogTitle>
          <DialogContent>
            {showValidationError && (
              <Alert severity="error">All the fields are mandatory</Alert>
            )}
            <TextField
              size="small"
              label="Name"
              fullWidth
              onChange={(e) => {
                setshowValidationError(false);
                setname(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Manufacturing Date"
              fullWidth
              type="date"
              onChange={(e) => {
                setshowValidationError(false);
                setManufacturingDate(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Price"
              fullWidth
              type="number"
              onChange={(e) => {
                setshowValidationError(false);
                setprice(e.target.value);
              }}
              value={price}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="stock"
              fullWidth
              value={stock}
              type="number"
              onChange={(e) => {
                setshowValidationError(false);
                setstock(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Size"
              fullWidth
              value={size}
              type="number"
              onChange={(e) => {
                setshowValidationError(false);
                setSize(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Color"
              fullWidth
              value={color}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setColor(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Return Policy"
              fullWidth
              value={returnPolicy}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setReturnPolicy(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <Select
              size="small"
              label="Brand"
              fullWidth
              value={brand}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setbrand(e.target.value);
              }}
              sx={{ mt: 2 }}
            >
              <MenuItem value="Puma">Puma</MenuItem>
              <MenuItem value="Bata">Bata</MenuItem>
              <MenuItem value="Red Tape">Red Tape</MenuItem>
              <MenuItem value="Brooks">Brooks</MenuItem>
              <MenuItem value="Nike">Nike</MenuItem>
              <MenuItem value="Adidas">Adidas</MenuItem>
              <MenuItem value="Reebok">Reebok</MenuItem>
            </Select>
              <Select
              size="small"
              label="Type"
              fullWidth
              value={type}
              onChange={(e) => {
                setshowValidationError(false);
                setType(e.target.value);
              }}
              sx={{ mt: 2 }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <TextField
              size="small"
              label="Description"
              fullWidth
              multiline
              row={4}
              value={description}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setdescription(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
          
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
            <Button onClick={editSneaker}>Update</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAddForm} onClose={() => setOpenAddForm(false)}>
          <DialogTitle>Add Sneaker</DialogTitle>
          <DialogContent>
            {showValidationError && (
              <Alert severity="error">All the fields are mandatory</Alert>
            )}
            <TextField
              size="small"
              label="Name"
              fullWidth
              onChange={(e) => {
                setshowValidationError(false);
                setname(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Manufacturing Date"
              fullWidth
              type="date"
              onChange={(e) => {
                setshowValidationError(false);
                setManufacturingDate(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Price"
              fullWidth
              type="number"
              onChange={(e) => {
                setshowValidationError(false);
                setprice(e.target.value);
              }}
              value={price}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="stock"
              fullWidth
              value={stock}
              type="number"
              onChange={(e) => {
                setshowValidationError(false);
                setstock(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Size"
              fullWidth
              value={size}
              type="number"
              onChange={(e) => {
                setshowValidationError(false);
                setSize(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Color"
              fullWidth
              value={color}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setColor(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <TextField
              size="small"
              label="Return Policy"
              fullWidth
              value={returnPolicy}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setReturnPolicy(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth>
            <InputLabel id="select-brand">Select Brand</InputLabel>
            <Select
            labelId="select-brand"
              size="small"
              label="Brand"
              fullWidth
              value={brand}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setbrand(e.target.value);
              }}
              sx={{ mt: 2 }}
            >
              <MenuItem value="Puma">Puma</MenuItem>
              <MenuItem value="Bata">Bata</MenuItem>
              <MenuItem value="Red Tape">Red Tape</MenuItem>
              <MenuItem value="Brooks">Brooks</MenuItem>
              <MenuItem value="Nike">Nike</MenuItem>
              <MenuItem value="Adidas">Adidas</MenuItem>
              <MenuItem value="Reebok">Reebok</MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth>
            <InputLabel id="gender-select" style={{textAlign: "center"}}> Select Gender</InputLabel>
              <Select
              labelId="gender-select"
              size="small"
              label="Type"
              fullWidth
              value={type}
              onChange={(e) => {
                setshowValidationError(false);
                setType(e.target.value);
              }}
              sx={{ mt: 2 }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            </FormControl>
              <TextField
              size="small"
              label="Image"
              fullWidth
              type="file"
              onChange={(e) => {
                setshowValidationError(false);
                setimage(e.target.files[0]);
              }}
              sx={{ mt: 2 }}
            />
              
            <TextField
              size="small"
              label="Description"
              fullWidth
              multiline
              row={4}
              value={description}
              type="text"
              onChange={(e) => {
                setshowValidationError(false);
                setdescription(e.target.value);
              }}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddForm(false)}>Cancel</Button>
            <Button onClick={addSneaker}>Add Sneaker</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ mt: 5, mb: 1 }}>
        <Box sx={{ mt: 10, padding: 2 }}>
              {orderData?.length>0 ?  <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box sx={{ padding: 1, bgcolor: "#fff", mb:1 }}>
                            <Typography component="div">Order Items</Typography>
                        </Box>
                        <Box >
                            {orderData && orderData.map(order=> order.orderItems.map((item =>
                                <Card sx={{ display: 'flex', mb:2 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 200 }}
                                        image={item.product.imageUrl}
                                        alt=""
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                {item.product.name}
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" component="div">
                                                {`Quantity: ${item.quantity}`}
                                            </Typography>
                                            <Typography sx={{fontSize: 14}}  variant="subtitle1" color="text.secondary" component="div">
                                            {`Price: ${item.quantity*item.product.price}`}
                                            </Typography>
                                            <Typography sx={{fontSize: 14, color: "green"}}  variant="subtitle1" color="text.secondary" component="div">
                                            {`Status: ${item.status}`}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, mt:1 }}>
                                            <Button disabled={item.status!="Pending Dispatch"} onClick={()=> approveOrder(item.id)} sx={{color: "orange"}}>Dispatch</Button>
                                        </Box>
                                    </Box>
                                </Card>
                            )))}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ bgcolor: "#fff", paddingLeft: 2, paddingRight: 2 }}>
                            <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                                <Typography> Revenue</Typography>
                            </Box>
                            <Divider />
                           
                            <Divider />
                            <Box sx={{ paddingTop: 2, paddingBottom: 2, bgColor: "#fff", display: "flex" }}>
                                <Typography sx={{ fontWeight: 600 }}>Total Amount</Typography>
                                <Typography sx={{ ml: "auto", fontWeight: 600 }}>{totalPrice}</Typography>
                            </Box>
                            <Divider />
                           
                        </Box>
                    </Grid>
                </Grid>: <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}> <Typography sx={{fontSize: 25}}>No Orders yet!</Typography> </Box>}
            </Box>
            <Snackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} snackbarMessage={snackbarMessage} snackbarSeverity={snackbarSeverity} />
          <Box display="flex">
            <Typography variant="h5" color="initial">
              Sneakers
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: "auto" }}
              onClick={() => handleOpenAddForm()}
            >
              Add Sneaker
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sneaker (Id)</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Manufacturing Date</StyledTableCell>
                    <StyledTableCell align="right">
                      Price
                    </StyledTableCell>
                    <StyledTableCell align="right">Brand</StyledTableCell>
                    <StyledTableCell align="right">Stock</StyledTableCell>
                    <StyledTableCell align="right">Type</StyledTableCell>
                    <StyledTableCell align="right">Size</StyledTableCell>
                    <StyledTableCell align="right">Color</StyledTableCell>
                    <StyledTableCell align="right">Return Policy</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sneakers &&
                    sneakers.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.id}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          component="th"
                          scope="row"
                        >
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.manufacturingDate}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.price}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.brand}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.stock}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.type}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.size}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.color}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.returnPolicy}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <EditIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleOpenEditForm(row)}
                          />
                          <DeleteIcon
                            sx={{ cursor: "pointer", ml: 2 }}
                            onClick={() => deleteSneaker(row.id)}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default VendorPanel