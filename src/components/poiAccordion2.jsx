import React, {useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { blue, red, yellow, green, lightGreen, grey, orange } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

export default function POIAccordion2({ selected, groupedPOIs, safety, scores, locationString }) {
    
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false); // Update state on click
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
    ];

    // const groupedPOIs = poi.reduce((groups, facility) => {
    //     (groups[facility.category] = groups[facility.category] || []).push(facility);
    //     return groups;
    // }, {});

    // Sorting all facility categories by distance
    for (const category in groupedPOIs) {
        groupedPOIs[category].sort((a, b) => a.distanceInKm - b.distanceInKm);
    }
    

    return (
        <div>
            <Card sx={{minWidth: 275}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ 
                        bgcolor:scores.overall ? scoreColourKey[scores.overall.charAt(0)] : grey[400], }} 
                        variant="rounded">
                            <Typography >{scores.overall || "-"}</Typography>
                        </Avatar>
                    }
                    title={<Typography variant="body2" style={{ fontWeight: 'bold' }} >{locationString}</Typography>}
                    // subheader="-"
                />
                <CardContent sx={{ maxHeight: 500, overflowY: 'auto' }}>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!groupedPOIs["healthFacility"]} 
                        expanded={expanded === 'panel1'} 
                        onChange={handleChange('panel1')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }}variant="subtitle1" align="left" >Health Care</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                        bgcolor:scores.health ? scoreColourKey[scores.health.charAt(0)] : grey[400],
                                        width: 24, 
                                        height: 24 }} 
                                        variant="rounded">
                                            <Typography >{scores.health || "-"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Distance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedPOIs["healthFacility"] && groupedPOIs["healthFacility"].map((facility) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <Typography variant="body2" >
                                                        {facility.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                        {facility.type} 
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{facility.distanceInKm} km</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!groupedPOIs["supermarket"]} 
                        expanded={expanded === 'panel2'} 
                        onChange={handleChange('panel2')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Grocery Stores</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                    bgcolor:scores.grocery ? scoreColourKey[scores.grocery.charAt(0)] : grey[400],
                                    width: 24, 
                                    height: 24 }} 
                                    variant="rounded">
                                        <Typography >{scores.grocery || "-"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Distance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedPOIs["supermarket"] && groupedPOIs["supermarket"].map((facility) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <Typography variant="body2" >
                                                        {facility.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                        {facility.type} 
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{facility.distanceInKm} km</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!groupedPOIs["education"]} 
                        expanded={expanded === 'panel8'} 
                        onChange={handleChange('panel8')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Schools</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                    bgcolor:scores.education ? scoreColourKey[scores.education.charAt(0)] : grey[400], 
                                    width: 24, 
                                    height: 24 }} 
                                    variant="rounded">
                                        <Typography >{scores.education || "-"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Distance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedPOIs["education"] && groupedPOIs["education"].map((facility) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <Typography variant="body2" >
                                                        {facility.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                        {facility.type} 
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{facility.distanceInKm} km</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                        </AccordionDetails>
                    </Accordion>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!groupedPOIs["leisure"]} 
                        expanded={expanded === 'panel7'} 
                        onChange={handleChange('panel7')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Food & Fun</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                    bgcolor:scores.leisure ? scoreColourKey[scores.leisure.charAt(0)] : grey[400], 
                                    width: 24, 
                                    height: 24 }} 
                                    variant="rounded">
                                        <Typography >{scores.leisure || "-"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Distance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedPOIs["leisure"] && groupedPOIs["leisure"].map((facility) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <Typography variant="body2" >
                                                        {facility.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                        {facility.type} 
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{facility.distanceInKm} km</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                        </AccordionDetails>
                    </Accordion>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!groupedPOIs["financialServices"]} 
                        expanded={expanded === 'panel5'} 
                        onChange={handleChange('panel5')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Financial Services</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                    bgcolor:scores.finance ? scoreColourKey[scores.finance.charAt(0)] : grey[400], 
                                    width: 24, 
                                    height: 24 }} 
                                    variant="rounded">
                                        <Typography >{scores.finance || "-"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                        </AccordionSummary>
                        <AccordionDetails>

                            {groupedPOIs["financialServices"] && groupedPOIs["financialServices"].filter(facility => facility.type === "Commercial Bank").length > 0 && (
                                <>
                                <Box mt={1}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                   Commercial Banks
                                </Typography>
                                </Box>
                                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Distance</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {groupedPOIs["financialServices"].filter(facility => facility.type === "Commercial Bank").map((facility) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <Typography variant="body2" >
                                                            {facility.name}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                            {facility.type} 
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{facility.distanceInKm} km</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </>
                            )}
                            {groupedPOIs["financialServices"] && groupedPOIs["financialServices"].filter(facility => facility.type === "ATM").length > 0 && (
                                <>
                                <Box mt={3}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                      ATMS
                                   </Typography>
                                </Box>
                                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Distance</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {groupedPOIs["financialServices"].filter(facility => facility.type === "ATM").map((facility) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <Typography variant="body2" >
                                                            {facility.name}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                            {facility.type} 
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{facility.distanceInKm} km</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                </>
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!groupedPOIs["emergencyservices"]} 
                        expanded={expanded === 'panel3'} 
                        onChange={handleChange('panel3')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Emergency Services</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                    bgcolor:scores.emergency ? scoreColourKey[scores.emergency.charAt(0)] : grey[400], 
                                    width: 24, 
                                    height: 24 }} 
                                    variant="rounded">
                                        <Typography >{scores.emergency || "-"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}> {/* Optional: Wrap table in Paper */}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Distance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groupedPOIs["emergencyservices"] && groupedPOIs["emergencyservices"].map((facility) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <Typography variant="body2" >
                                                        {facility.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                        {facility.type} 
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>{facility.distanceInKm} km</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                        </AccordionDetails>
                    </Accordion>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!safety} 
                        expanded={expanded === 'panel4'} 
                        onChange={handleChange('panel4')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Safety</Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar sx={{ 
                                    bgcolor:scores.safety ? scoreColourKey[scores.safety.charAt(0)] : grey[400],
                                    width: 24, 
                                    height: 24 }} 
                                    variant="rounded">
                                        <Typography >{scores.safety || "N/A"}</Typography>
                                    </Avatar>
                                </Grid>
                            </Grid>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            {safety && (
                                
                                    <Card  elevation={0}>
                                        <CardContent sx={{textAlign: 'left'}}>
                                            <Stack  spacing={1}>

                                            <Typography  variant="body2">
                                                This safety score takes a broad view, assessing not only your selected location but also the surrounding areas that impact your daily activities.
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                Police Division:
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {safety.policeDivisionName}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                                Serious Crimes Recorded in Division:
                                            </Typography>
                                            <Typography variant="h6" component="div">
                                                {safety.count}
                                            </Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                
                            )

                            } 
                        </AccordionDetails>
                    </Accordion>
                    <Box sx={{ p: 2, width: '80%' }}>
                     

                        <Stack direction="row" spacing={2}>
                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                Map Circles:
                            </Typography>
                        </Stack>
                        <Stack direction={{ sm: 'row' }} spacing={2} alignItems="flex-start">
                            <Typography variant="body2" sx={{color: green[500], fontSize: 12}} component="div">
                                - 1 km Radius
                            </Typography>
                            <Typography variant="body2" sx={{color:yellow[700], fontSize: 12}} component="div">
                                - 5 km Radius
                            </Typography>
                            <Typography variant="body2" sx={{color:red[500], fontSize: 12}} component="div">
                                - 10 km Radius
                            </Typography>
                        </Stack>

                    </Box>
                </CardContent>


            </Card>
            
        </div>
    );
}


const scoreColourKey = {
    A: green[800],
    B: lightGreen[500],
    C: yellow[700],
    D: orange[500],
    F: red[500],
}