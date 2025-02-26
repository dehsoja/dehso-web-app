import React, {useState} from "react";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, ButtonBase } from '@mui/material';
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardContent } from "@mui/material";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";
import { blue, red, yellow, green, lightGreen, grey, orange } from '@mui/material/colors';
import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

export default function POIAccordion2({ selected, groupedPOIs, safety, scores, locationString, moveTOInfoWindow }) {
    
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

    const healthFacility = groupedPOIs["healthFacility"]
    const supermarket = groupedPOIs["supermarket"];
    const education = groupedPOIs["education"];
    const leisure = groupedPOIs["leisure"];
    const financialServices = groupedPOIs["financialServices"];
    const commercialBank = groupedPOIs["financialServices"] ? groupedPOIs["financialServices"].filter(facility => facility.type === "Commercial Bank") : null;
    const atm = groupedPOIs["financialServices"] ? groupedPOIs["financialServices"].filter(facility => facility.type === "ATM") : null;
    const emergencyServices = groupedPOIs["emergencyservices"];
    const policeStation = groupedPOIs["emergencyservices"] ? groupedPOIs["emergencyservices"].filter(facility => facility.type === "Police Station") : null;
    const fireStation = groupedPOIs["emergencyservices"] ? groupedPOIs["emergencyservices"].filter(facility => facility.type === "Fire Station") : null;
    const ambulanceService = groupedPOIs["emergencyservices"] ? groupedPOIs["emergencyservices"].filter(facility => facility.type === "Ambulance Service") : null;
    

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
                    title={<Typography variant="body2" style={{ fontWeight: 'bold' }} align="left" >{locationString}</Typography>}
                    // subheader="-"
                />
                <CardHeader
                    style={{ padding: "5px"}}
                   
                    title={<Typography variant="caption" style={{ fontWeight: 'bold' }}>Neighbourhood Scorecard</Typography>}
                />
                <CardContent sx={{ maxHeight: 500, overflowY: 'auto' }}>
                    <Accordion 
                        // sx={{ border: '1px solid #ccc'  }}
                        disableGutters
                        disabled={!healthFacility} 
                        expanded={expanded === 'panel1'} 
                        onChange={handleChange('panel1')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }}variant="subtitle1" align="left" >Health Care</Typography>
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1733082411/homeHealth3Key_ecjrmv.svg"
                                                
                                            />}
                                            label={healthFacility.length}
                                        
                                            size="small"
                                        />
                                       
                                    
                                    </Stack>
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
                                        {healthFacility && healthFacility.map((facility, index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow((index + "healthFacility"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                        <Typography variant="body2" align="left" >
                                                            {facility.name}
                                                        </Typography>
                                                    </ButtonBase>
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
                        disabled={!supermarket} 
                        expanded={expanded === 'panel2'} 
                        onChange={handleChange('panel2')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Grocery Stores</Typography>
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760837/shoppingCartKey_irnuvj.svg"
                                                
                                            />}
                                            label={supermarket.length}
                                        
                                            size="small"
                                        />
                                        
                                    
                                    </Stack>
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
                                        {supermarket && supermarket.map((facility,index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow((index + "supermarket"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                        <Typography variant="body2" align="left" >
                                                            {facility.name}
                                                        </Typography>
                                                    </ButtonBase>
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
                        disabled={!education} 
                        expanded={expanded === 'panel8'} 
                        onChange={handleChange('panel8')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Schools</Typography>
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760836/schoolKey_nzzjyc.svg"
                                                
                                            />}
                                            label={education.length}
                                        
                                            size="small"
                                        />
                                        
                                    
                                    </Stack>
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
                                        {education && education.map((facility,index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow((index + "education"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                        <Typography variant="body2" align="left" >
                                                            {facility.name}
                                                        </Typography>
                                                    </ButtonBase>
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
                        disabled={!leisure} 
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
                                        {leisure && leisure.map((facility,index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow((index + "leisure"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                        <Typography variant="body2" align="left" >
                                                            {facility.name}
                                                        </Typography>
                                                    </ButtonBase>
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
                        disabled={!financialServices} 
                        expanded={expanded === 'panel5'} 
                        onChange={handleChange('panel5')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Financial Services</Typography>
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/bankKey_uomtun.svg"
                                                
                                            />}
                                            label={commercialBank.length}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/atmKey_gzvv44.svg"
                                                
                                            />}
                                            label={atm.length}
                                        
                                            size="small"
                                        />
                                    
                                    </Stack>
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

                            {financialServices && commercialBank.length > 0 && (
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
                                            {commercialBank.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow((index + "Commercial Bank"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                            <Typography variant="body2" align="left" >
                                                                {facility.name}
                                                            </Typography>
                                                        </ButtonBase>
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
                            {financialServices && atm.length > 0 && (
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
                                            {atm.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow((index + "ATM"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                            <Typography variant="body2" align="left" >
                                                                {facility.name}
                                                            </Typography>
                                                        </ButtonBase>
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
                        disabled={!emergencyServices} 
                        expanded={expanded === 'panel3'} 
                        onChange={handleChange('panel3')}
                        sx={{ boxShadow: 'none' }}
                    > 
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
                                <Grid item>
                                    <Typography  sx={{ fontSize: 14, fontWeight: 'bold' }} variant="subtitle1" align="left">Emergency Services</Typography>
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760836/localPoliceKey_ntwrkm.svg"
                                                
                                            />}
                                            label={policeStation.length}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/fireTruckKey_jeqdlh.svg"
                                                
                                            />}
                                            label={fireStation.length}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/ambulanceKey_s6c4cg.svg"
                                                
                                            />}
                                            label={ambulanceService.length}
                                        
                                            size="small"
                                        />

                                    
                                    </Stack>
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

                            {emergencyServices && policeStation.length > 0 && (
                                <>
                                <Box mt={1}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                    Police Stations
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
                                            {policeStation.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow((emergencyServices.indexOf(facility) + "emergencyservices"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                            <Typography variant="body2" align="left" >
                                                                {facility.name}
                                                            </Typography>
                                                        </ButtonBase>
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
                            {emergencyServices && fireStation.length > 0 && (
                                <>
                                <Box mt={3}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                        Fire Stations
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
                                            {fireStation.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow((emergencyServices.indexOf(facility) + "emergencyservices"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                            <Typography variant="body2" align="left" >
                                                                {facility.name}
                                                            </Typography>
                                                        </ButtonBase>
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
                            {emergencyServices && ambulanceService.length > 0 && (
                                <>
                                <Box mt={3}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                        Ambulance Services
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
                                            {ambulanceService.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow((emergencyServices.indexOf(facility) + "emergencyservices"), facility.location.coordinates[1],facility.location.coordinates[0])} style={{ display: 'block', outline: 'none' }}>
                                                            <Typography variant="body2" align="left" >
                                                                {facility.name}
                                                            </Typography>
                                                        </ButtonBase>
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