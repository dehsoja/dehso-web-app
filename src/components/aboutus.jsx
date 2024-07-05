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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

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
                          <Typography variant="h6" align="left" mb={2}>This is Our Proof of Concept:</Typography>
                          <Typography variant="body1" align="left" paragraph>
                            At Dehso, we envision a future where finding your dream location to build, buy, or rent your home in Jamaica is effortless, transparent, and empowering. 
                            We're building more than a platform—we aim to foster a movement that revolutionizes the way Jamaicans search for property. 
                            By harnessing the collective knowledge and passion of our vibrant tech community, we're creating a property search solution that's truly by and for the people of Jamaica.
                          </Typography>
                      </Grid>
                    </Grid>

                    

                    {/* Values Section (Optional) */}
                    <Grid container spacing={1} mt={1} >
                      <Grid item xs={12}>
                          <Typography variant="h6" align="left" >Our Open-Source Vision:</Typography>
                          <List>
                            <ListItem>
                              <ListItemText >
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Community-Driven Collaboration:</span> We envision a platform built on collaboration, where volunteers, developers, data scientists, and community members come together, each contributing their unique skills and insights to shape a truly Jamaican solution.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText >
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Radical Transparency & Accessibility:</span> We're committed to open-source principles, making our code, data, and algorithms accessible to all. We believe in empowering our community with knowledge and ensuring everyone has a voice in this transformative project.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText >
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Diversity-Fuelled Innovation:</span> By embracing the diverse perspectives and expertise of our community, we will drive innovation and create a platform that caters to the unique needs and aspirations of Jamaicans.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            {/* Add more list items with the same icon */}
                          </List>
                      </Grid>
                    </Grid>

                    {/* Values Section (Optional) */}
                    <Grid container spacing={1} mt={1}>
                      <Grid item xs={12}>
                          <Typography variant="h6" align="left" >Our Ambitious Goals:</Typography>
                          <List>
                            <ListItem>
                              <ListItemText >
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Holistic Livability Scores:</span> We envision a platform that goes beyond the basics, providing comprehensive livability scores for locations across Jamaica that consider not just amenities and location, but also safety, environmental impact, future growth potential, and community vibrancy. We aim to empower you with the knowledge to choose a home and neighbourhood that truly aligns with your lifestyle and values.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText >
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Industry Transformation:</span> We're not just building a platform for individuals—we're aiming to transform the entire real estate landscape. By partnering with agents, brokers, developers, and stakeholders, we will strive to create a more transparent, equitable, and efficient market that benefits everyone.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText >
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Economic Empowerment Through Tech:</span> We envision a future where our platform fosters a thriving tech community, creating opportunities for learning, skill development, and entrepreneurship in Jamaica's tech sector.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Typography variant="body1" align="left">
                                <span style={{ fontWeight: 'bold' }}>Celebrating Jamaica's Unique Character:</span> As proud Jamaicans, we're deeply committed to our island's future. We envision a platform that supports sustainable growth, fosters community engagement, and showcases the unique beauty and character of each community.
                              </Typography>
                              </ListItemText>
                            </ListItem>
                            {/* Add more list items with the same icon */}
                          </List>
                      </Grid>
                    </Grid>

                    {/* Our Story Section */}
                    <Grid container spacing={3} mt={1}>
                      <Grid item xs={12}>
                          <Typography variant="h6" align="left" mb={2}>Join the Movement:</Typography>
                          <Typography variant="body1" align="left" paragraph>
                            Our journey has just begun. Whether you're a seasoned developer, a data enthusiast, or simply passionate about improving the property search experience in Jamaica, we invite you to be part of the change. Contribute your skills, share your ideas, and let's shape the future of finding your home in Jamaica, together.
                          </Typography>
                          <Typography variant="body1" align="left">
                            Email: dehsoja@gmail.com
                          </Typography>
                          <Typography variant="body1" align="left">
                            {"Product Roadmap: [Coming Soon]"}
                          </Typography>
                          <Typography variant="body1" align="left">
                            {"Code Repositories: [Coming Soon]"} 
                          </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3} mt={1}>
                      <Grid item xs={12}>
                          
                      </Grid>
                    </Grid>

                    {/* <Link to="/contact">Contact Us</Link> */}

                </Grid>

                <Grid item md={1} lg={1}></Grid>
                
                
            </Grid>

            

        
      </Box>
    </Container>
  );
}

export default AboutUs;