import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TitleLogo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CallIcon from '@mui/icons-material/Call';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Menu,
  MenuItem,
} from "@mui/material";

export default function Header() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [logOutAnchorEl, setLogOutAnchorEl] = useState(null);

  const openLogout = Boolean(logOutAnchorEl);

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#000" }}>
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            disableRipple
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 3 }}
          >
            <Box
              component="img"
              sx={{
                height: 60,
              }}
              alt="shoe Ecommerce"
              src={TitleLogo}
            />
          </IconButton>
          <Typography sx={{ml: 0, color: "#fff", fontSize: 20}}>Sneaker Head</Typography>
          <Button onClick={()=> navigate("/")} sx={{ml: 1, mt:0.5, color: "#fff", fontSize: 18, textTransform: 'none'}}>Home</Button>
          <Button sx={{ml: 0.5, mt:0.5, color: "#fff", fontSize: 17, textTransform: 'none'}}><a href="/#shop" style={{textDecoration: "none", color: "#fff"}}>Shop</a></Button>
          <Button onClick={()=> navigate("/my-orders")} sx={{ml: 0.5, mt:0.5, color: "#fff", fontSize: 17, textTransform: 'none'}}><a style={{textDecoration: "none", color: "#fff"}}>Orders</a></Button>
          <Box sx={{flexGrow: 1}}></Box>
          {role && role.toUpperCase() === "ADMIN" && (
            <IconButton
              title="Admin Panel"
              onClick={() => navigate("/admin-panel")}
              color="inherit"
              sx={{ marginLeft: 0 }}
            >
             <AdminPanelSettingsIcon sx={{color: "green"}}/>
            </IconButton>
          )}

          {role && role.toUpperCase() === "VENDOR" && (
            <IconButton
              title="Vendor Panel"
              onClick={() => navigate("/vendor-panel")}
              color="inherit"
              sx={{ marginLeft: 0 }}
            >
             <MedicalServicesIcon sx={{color: "green"}}/>
            </IconButton>
          )}

          {role && role.toUpperCase() === "USER" && (
            <IconButton
              title="Go To Cart"
              onClick={() => navigate("/my-cart")}
              color="inherit"
              sx={{ marginLeft: 0 }}
            >
              <ShoppingCartIcon sx={{color: "green"}}/>
            </IconButton>
          )}

          <IconButton
             title="Contact Us"
            onClick={() => setContactDialogOpen(true)}
            color="inherit"
            sx={{ marginLeft: 3 }}
          >
           <CallIcon sx={{color: ""}}/>
          </IconButton>

          <Box sx={{ flexGrow: 0, marginTop: -5, float: "right" }}>
            {loggedInUser ? (
              <Box
                onClick={(event) => setLogOutAnchorEl(event.currentTarget)}
                title="Profile"
                sx={{
                  background: "purple",
                  paddingRight: 1,
                  paddingLeft: 1,
                  borderRadius: 3,
                  marginLeft: 4,
                  cursor: "pointer"
                }}
              >
                {" "}
                <Typography
                  variant="h6"
                  sx={{ color: "ThreeDFace", marginTop: 5 }}
                >
                  {" "}
                  {loggedInUser}
                </Typography>
              </Box>
            ) : (
              <Button
                onClick={() => navigate("/login-register")}
                sx={{ color: "blue", marginTop: 5 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Phone Number : +91 8108079035
            <br />
            Phone Number : +91 8108079035
          </DialogContentText>
          <br />
          <br />
          <DialogContentText id="alert-dialog-description">
            Email : helpdesk@sneakerhead.com
            <br />
            Email : sneakerhead@hotmail.com
          </DialogContentText>
          <br />
          <br />
          <DialogContentText id="alert-dialog-description">
            Address: CDAC Kharaghar, Navi Mumbai
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="basic-menu"
        anchorEl={logOutAnchorEl}
        open={openLogout}
        onClose={() => setLogOutAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {role==="USER" && <MenuItem
          onClick={() => {
            navigate("/my-orders");
          }}
        >
          My Orders
        </MenuItem>}
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            setLogOutAnchorEl(null);
            navigate("/login-register");
          }}
        >
          Log Out
        </MenuItem>

      </Menu>
    </Box>
  );
}
