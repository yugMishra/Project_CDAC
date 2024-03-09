import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Typography, Box, TextField } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SneakerCardHome from "../components/SneakerCard";

const BASE_URL = "http://localhost:8000/api/v1";

const Home = () => {

    const [sneakers, setSneakers] = useState([]);
    const [sneakersToDisplay, setSneakersToDisplay] = useState([]);
    const navigate = useNavigate();
  
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
  
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      loadSneakers();
    }, [])
  
    const loadSneakers = async () => {
      try{
        const response = await axios.get(`${BASE_URL}/sneakers/all`);
        if(response.data){
          setSneakers(response.data);
          setSneakersToDisplay(response.data);
        }
      }catch(error){
        console.log(error);
      }
    }
  
    useEffect(()=> {
      const sneakersToDisplay = sneakers.filter(sneaker=> sneaker.name.toLowerCase().includes(searchText.toLowerCase()));
      console.log(sneakersToDisplay)
      setSneakersToDisplay(sneakersToDisplay)
    },[searchText])
    return (
        <>
            <Header />
            <Box sx={{ mt: 10, maxWidth: "100%" }}>
                <video width="100%" id="HomeV" muted loop autoPlay>
                    <source src={require('../videos/Thrifter.mp4')} type="video/mp4" ></source>
                </video>
                <img width="100%" src={require('../images/Banner.jpg')}/>
                <div style={{ marginTop: 10, padding: 20 }}>
       
       <Box sx={{mt: 2, padding: 1}} id="shop">
          <TextField onChange={(e)=> setSearchText(e.target.value)} fullWidth placeholder="Search"/>
       </Box>
       {sneakersToDisplay && <Box container spacing={2} display="block">

          {[ ...new Set(sneakersToDisplay.map((p) => p.brand))].map(
            (brand) => (
              <Box key={brand} display="block" sx={{mt: 6, padding: 1}}> 
              <Box sx={{padding: 1, bgcolor: "#fff"}}>
                <Typography variant="h6" gutterBottom sx={{fontWeight: 600}}>
                  {brand}
                </Typography>
                </Box>
                <Box display="flex" sx={{overflowX: "auto", "-webkit-scrollbar": {display: "none"}, paddingBottom: 5, marginTop: 1}}>
                  {sneakersToDisplay
                    .filter((p) => ( p.brand === brand))
                    .map((sneaker) => (
                      <div style={{marginRight: 20}}>
                        <SneakerCardHome
                          sneaker={sneaker}
                        />
                      </div>
                    ))}
                </Box>
              </Box>
            )
          )}
        </Box>}
      </div>
    </Box>
        </>
    )
}

export default Home