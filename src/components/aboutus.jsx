import * as React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Divider
} from '@mui/material';
import HeaderB from './headerB';
import {Link} from 'react-router-dom';

function AboutUs() {

  return (
    <Container  maxWidth="xl" sx={{ color: 'black', height: "100vh", width: "100vw", justifyContent:"center" }}>
      <Box >
        <Grid container spacing={3}>
           
           <Grid item xs={12} sm={12} md={12} >
               <HeaderB/>
           </Grid>
           
       </Grid>
        {/* Team Section (Optional) */}
        <Grid container spacing={3}>
           
            <Grid item xs={12} sm={12} md={3} >
                <Link to="/">
                    <img src="/dehsoFullLogo.svg" alt="Your Logo" style={{height: 120}}  />
                </Link>
            </Grid>
            
        </Grid>

        <Grid container spacing={3}>
            <Grid item md={3} lg={3}></Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} >
                    <Typography variant="h4" align="left" gutterBottom>
                        About Us
                    </Typography>
                    <Divider/>

                    {/* Our Story Section */}
                    <Grid container spacing={3} mt={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="left" gutterBottom>Our Story</Typography>
                        <Typography variant="body1" align="left" paragraph>
                        We are a team of [number] dedicated individuals, driven by our love for [your industry/niche]. Our journey began in [year], with a simple vision: to [your mission statement]. Today, we are proud to have achieved [your accomplishments].
                        </Typography>
                    </Grid>
                    </Grid>

                    

                    {/* Values Section (Optional) */}
                    <Grid container spacing={3} mt={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="left" gutterBottom>Our Values</Typography>
                        <Typography variant="body1" align="left" paragraph>
                        We believe in [your core values]. We strive to uphold these values in everything we do, from [specific examples related to your business].
                        </Typography>
                    </Grid>
                    </Grid>
                    <Link to="/contact">Contact Us</Link>

                </Grid>

                <Grid item md={1} lg={1}></Grid>
                
                
            </Grid>

        
      </Box>
    </Container>
  );
}

export default AboutUs;