import * as React from 'react';
import {useState} from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardHeader,
  CardContent, 
  CardMedia,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { red, purple, pink, blue, cyan, teal } from '@mui/material/colors';
import HeaderB from './headerB';
import {Link} from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Personas() {

  const [expanded, setExpanded] = useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false); // Update state on click
  };

   

  return (
    <Container  maxWidth="xl" sx={{ color: 'black', height: "100vh", width: "100vw", justifyContent:"center" }}>
      <Box >
        <Grid container spacing={3}>
           
           <Grid item xs={12} sm={12} md={12} >
               <HeaderB/>
           </Grid>
           
       </Grid>

        <Grid container spacing={1} px={3}>
            
            <Grid item lg={12} xs={12} >
              <Typography variant="h4" align="left" gutterBottom>
                  Personas (Under Construction)
              </Typography>
              <Divider/>

              
              <Grid container spacing={1} mt={2}>
                {personasCol.map((persona, index)=>(

                  <Grid item key={index} lg={3} xs={12} mt={1}>
                    <Card >
                      <CardMedia
                        component="img"
                        height="194"
                        image={persona.image}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          align="left" 
                          // sx={{color: persona.color}}
                        >
                            <strong>{persona.name}</strong>
                          </Typography>
                        <Accordion 
                          // defaultExpanded 
                          disableGutters 
                          sx={{ boxShadow: 'none' }}
                          expanded={expanded === ('demographics' + index)} 
                          onChange={handleChange('demographics'+ index)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            Demographics
                          </AccordionSummary>
                          <AccordionDetails align="left">
                            {persona.demographics}
                          </AccordionDetails>
                        </Accordion>
                        <Accordion 
                          disableGutters 
                          sx={{ boxShadow: 'none' }}
                          expanded={expanded === ('psychographics' + index)} 
                          onChange={handleChange('psychographics' + index)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            Psychographics
                          </AccordionSummary>
                          <AccordionDetails align="left">
                            {persona.psychographics}
                          </AccordionDetails>
                        </Accordion>
                        <Accordion 
                          disableGutters 
                          sx={{ boxShadow: 'none' }}
                          expanded={expanded === ('housing' + index)} 
                          onChange={handleChange('housing' + index)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                          >
                            Housing Preferences
                          </AccordionSummary>
                          <AccordionDetails align="left">
                            <Stack spacing={1}>
                              {persona.preferences.map((pref, index)=>(
                                <item key={index}>
                                  <Typography variant="body2" align='left' sx={{ color: 'text.secondary' }}>
                                    {pref}
                                  </Typography>
                                </item>

                              ))}
                            </Stack>
                          </AccordionDetails>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

            </Grid>

            <Grid item mt={5}></Grid>
                
                
        </Grid>


            

        
      </Box>
    </Container>
  );
}

export default Personas;


const personasCol = [
  {
    name: "Transient Seekers", 
    demographics: "Younger adults, students, and early-career professionals, often with unstable or entry-level incomes.", 
    psychographics: "Flexible, prioritize mobility over long-term stability.",
    preferences: [
      "Studio apartments, shared housing, or temporary rentals.",
      "Proximity to schools, jobs, or urban amenities."
    ],
    image: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1734541768/Transient_Seekers_350_x_200_v3_ni44ys.png",
    color: red[300]
  },
  {
    name: "Ambitious Urbanites", 
    demographics: "Young professionals and recent graduates in their 20s-30s with moderate incomes", 
    psychographics: "Career-driven, tech-savvy, and social. Value proximity to work, and nightlife.",
    preferences: [
      "Small, modern apartments or condos in city centres.",
      "Amenities like gyms, and shared social areas."
    ],
    image: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1734541899/Ambitious_Urbanites_350_x_200_v3_gfhyr8.png",
    color: purple[300]
  },
  {
    name: "Budget-Conscious Nesters", 
    demographics: "Lower to middle-income households, diverse ages, often single-parent families or working-class couples.", 
    psychographics: "Focused on affordability, stability, and value for money.",
    preferences: [
      "Modest homes, townhouses, or affordable rentals.",
      "Willing to compromise on location for cost savings."
    ],
    image: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1734542010/Budget-Conscious_Nesters_350_x_200_v2_azxxzp.png",
    color: pink[300]
  },
  {
    name: "Aspiring Upgraders", 
    demographics: "Mid-30s to early 40s couples or small families, slightly higher income but still budget conscious.", 
    psychographics: "Motivated by upward mobility, seeking to transition from starter homes, or rentals.",
    preferences: [
      "Larger townhouses or smaller detached homes with growth potential.",
      "Favor neighbourhoods with a good balance of affordability and quality of life."
    ],
    image: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1734543292/Aspiring_Upgraders_350_x_200_v5_nuwe6w.png",
    color: cyan[300]
  },
  {
    name: "Rural Independents", 
    demographics: "Low-, middle-, and fixed-income households, often older individuals or families in rural areas.", 
    psychographics: "Value independence, self-sufficiency, and a connection to nature.",
    preferences: [
      "Standalone houses with large plots of land.",
      "Privacy, space, and affordability over proximity to urban centres."
    ],
    image: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1734543417/Rural_Independents_350_x_200_v2_oflrdv.png",
    color: teal[300]
  },
  {
    name: "Established Elite", 
    demographics: "High-income households, older professionals, retirees, or their children.", 
    psychographics: "Status-driven, prefer luxury and exclusivity, emphasize property as an investment.",
    preferences: [
      "High-end homes, estates, or penthouses in prestigious locations.",
      "Custom features and luxury amenities."
    ],
    image: "https://res.cloudinary.com/dubn0hzzi/image/upload/v1734550318/Established_Elite_350_x_200_v2_zvynxk.png",
    color: blue[300]
  }
]