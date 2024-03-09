import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SneakerCardHome = ({ sneaker }) => {
    const navigate = useNavigate();
    return (
        <>
            <Card sx={{minWidth:300, maxWidth: 300, height: 350 }} onClick={()=> navigate(`/sneaker/${sneaker.id}?pid=${Math.random()}`)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        width="300"
                        image={sneaker.imageUrl}
                        alt={sneaker.name}
                    />
                    <CardContent display="flex" flexDirection="column">
                        <Typography gutterBottom variant="h5" component="div">
                            {sneaker.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {sneaker.description}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{mt: 2}}>
                        ₹{sneaker.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default SneakerCardHome