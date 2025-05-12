import React, {useState} from "react";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Button, ButtonBase } from '@mui/material';
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

export default function POIAccordion2({ selected, groupedPOIs, safety, scores, locationString, moveTOInfoWindow, learnOpen }) {
    
    const [expanded, setExpanded] = useState(false);
    const [pagehealthFacility, setPagehealthFacility] = useState(0);
    const [pageSupermarket, setPageSupermarket] = useState(0);
    const [pageEducation, setPageEducation] = useState(0);
    const [pageCommercialBank, setPageCommercialBank] = useState(0);
    const [pageAtm, setPageAtm] = useState(0);
    const [pagePoliceStation, setPagePoliceStation] = useState(0);
    const [pageFireStation, setPageFireStation] = useState(0);
    const [pageAmbulanceService, setPageAmbulanceService] = useState(0);
    const [pageDining, setPageDining] = useState(0);
    const [pageFastFood, setPageFastFood] = useState(0);
    const [pageRecreation, setPageRecreation] = useState(0);

    const tablePageCount = 4;

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
    const slicedHealthFacility = healthFacility ? healthFacility.slice(pagehealthFacility * tablePageCount, pagehealthFacility * tablePageCount + tablePageCount) : healthFacility;
    const supermarket = groupedPOIs["supermarket"];
    const slicedSupermarket = supermarket ? supermarket.slice(pageSupermarket * tablePageCount, pageSupermarket * tablePageCount + tablePageCount) : supermarket;
    const education = groupedPOIs["education"];
    const slicedEducation = education ? education.slice(pageEducation * tablePageCount, pageEducation * tablePageCount + tablePageCount) : education;
    const leisure = groupedPOIs["leisure"];
    const financialServices = groupedPOIs["financialServices"];
    const commercialBank = groupedPOIs["financialServices"] ? groupedPOIs["financialServices"].filter(facility => facility.type === "Commercial Bank") : null;
    const slicedCommercialBank = commercialBank ? commercialBank.slice(pageCommercialBank * tablePageCount, pageCommercialBank * tablePageCount + tablePageCount) : commercialBank;
    const atm = groupedPOIs["financialServices"] ? groupedPOIs["financialServices"].filter(facility => facility.type === "ATM") : null;
    const slicedAtm = atm ? atm.slice(pageAtm * tablePageCount, pageAtm * tablePageCount + tablePageCount) : atm;
    const emergencyServices = groupedPOIs["emergencyservices"];
    const policeStation = groupedPOIs["emergencyservices"] ? groupedPOIs["emergencyservices"].filter(facility => facility.type === "Police Station") : null;
    const slicedPoliceStation = policeStation ? policeStation.slice(pagePoliceStation * tablePageCount, pagePoliceStation * tablePageCount + tablePageCount) : policeStation;
    const fireStation = groupedPOIs["emergencyservices"] ? groupedPOIs["emergencyservices"].filter(facility => facility.type === "Fire Station") : null;
    const slicedFireStation = fireStation ? fireStation.slice(pageFireStation * tablePageCount, pageFireStation * tablePageCount + tablePageCount) : fireStation;
    const ambulanceService = groupedPOIs["emergencyservices"] ? groupedPOIs["emergencyservices"].filter(facility => facility.type === "Ambulance Service") : null;
    const slicedAmbulanceService = ambulanceService ? ambulanceService.slice(pageAmbulanceService * tablePageCount, pageAmbulanceService * tablePageCount + tablePageCount) : ambulanceService;
    const dining = groupedPOIs["leisure"] ? groupedPOIs["leisure"].filter(facility => facility.type === "Dining") : null;
    const slicedDining = dining ? dining.slice(pageDining * tablePageCount, pageDining * tablePageCount + tablePageCount) : dining;
    const fastFood = groupedPOIs["leisure"] ? groupedPOIs["leisure"].filter(facility => facility.type === "Fast Food") : null;
    const slicedFastFood = fastFood ? fastFood.slice(pageFastFood * tablePageCount, pageFastFood * tablePageCount + tablePageCount) : fastFood;
    const recreation = groupedPOIs["leisure"] ? groupedPOIs["leisure"].filter(facility => facility.type === "Recreation") : null;
    const slicedRecreation = recreation ? recreation.slice(pageRecreation * tablePageCount, pageRecreation * tablePageCount + tablePageCount) : recreation;



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
                   
                    title={<Typography variant="caption" style={{ fontWeight: 'bold' }}>Community Scorecard</Typography>}
                />
                <CardContent sx={{ maxHeight: 515, overflowY: 'auto' }}>
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
                                            label={healthFacility ? healthFacility.length:0}
                                        
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
                                        {healthFacility && slicedHealthFacility.map((facility, index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow(healthFacility.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={healthFacility ? healthFacility.length : 0}
                                rowsPerPage={tablePageCount}
                                page={pagehealthFacility}
                                onPageChange={(event, newPage) => setPagehealthFacility(newPage)}
                            />
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
                                            label={supermarket ? supermarket.length:0}
                                        
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
                                        {supermarket && slicedSupermarket.map((facility,index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow(supermarket.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={supermarket ? supermarket.length : 0}
                                rowsPerPage={tablePageCount}
                                page={pageSupermarket}
                                onPageChange={(event, newPage) => setPageSupermarket(newPage)}
                            />
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
                                            label={education ? education.length:0 }
                                        
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
                                        {education && slicedEducation.map((facility,index) => (
                                            <TableRow key={facility.name}>
                                                <TableCell>
                                                    <ButtonBase onClick={() => moveTOInfoWindow(education.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={education ? education.length : 0}
                                rowsPerPage={tablePageCount}
                                page={pageEducation}
                                onPageChange={(event, newPage) => setPageEducation(newPage)}
                            />
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
                                    <Stack direction="row" spacing={.5} alignItems="center">
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1746903291/diningKey_vyx7cy.svg"
                                                
                                            />}
                                            label={dining ? dining.length:0}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1746903291/fastFoodKey_il1f1f.svg"
                                                
                                            />}
                                            label={fastFood ? fastFood.length:0}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1746903291/recreationKey_uds562.svg"
                                                
                                            />}
                                            label={recreation ? recreation.length:0}
                                        
                                            size="small"
                                        />

                                    
                                    </Stack>
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
                            {leisure && dining.length > 0 && (
                                <>
                                <Box mt={1}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                   Dining
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
                                            {slicedDining.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(leisure.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={dining ? dining.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageDining}
                                    onPageChange={(event, newPage) => setPageDining(newPage)}
                                />
                                </>
                            )}
                            {leisure && fastFood.length > 0 && (
                                <>
                                <Box mt={1}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                   Fast Food
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
                                            {slicedFastFood.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(leisure.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={fastFood ? fastFood.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageFastFood}
                                    onPageChange={(event, newPage) => setPageFastFood(newPage)}
                                />
                                </>
                            )}
                            {leisure && recreation.length > 0 && (
                                <>
                                <Box mt={1}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }} >
                                   Recreation
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
                                            {slicedRecreation.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(leisure.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={recreation ? recreation.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageRecreation}
                                    onPageChange={(event, newPage) => setPageRecreation(newPage)}
                                />
                                </>
                            )}
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
                                            label={commercialBank ? commercialBank.length:0}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/atmKey_gzvv44.svg"
                                                
                                            />}
                                            label={atm ? atm.length:0}
                                        
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
                                            {slicedCommercialBank.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(financialServices.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={commercialBank ? commercialBank.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageCommercialBank}
                                    onPageChange={(event, newPage) => setPageCommercialBank(newPage)}
                                />
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
                                            {slicedAtm.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(financialServices.findIndex(item => item === facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={atm ? atm.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageAtm}
                                    onPageChange={(event, newPage) => setPageAtm(newPage)}
                                />
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
                                            label={policeStation ? policeStation.length:0}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/fireTruckKey_jeqdlh.svg"
                                                
                                            />}
                                            label={fireStation ? fireStation.length:0}
                                        
                                            size="small"
                                        />
                                        <Chip
                                            avatar={<Avatar 
                                                src="https://res.cloudinary.com/dubn0hzzi/image/upload/v1732760835/ambulanceKey_s6c4cg.svg"
                                                
                                            />}
                                            label={ambulanceService ? ambulanceService.length:0}
                                        
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
                                            {slicedPoliceStation.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(emergencyServices.indexOf(facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={policeStation ? policeStation.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pagePoliceStation}
                                    onPageChange={(event, newPage) => setPagePoliceStation(newPage)}
                                />
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
                                            {slicedFireStation.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(emergencyServices.indexOf(facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={fireStation ? fireStation.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageFireStation}
                                    onPageChange={(event, newPage) => setPageFireStation(newPage)}
                                />
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
                                            {slicedAmbulanceService.map((facility,index) => (
                                                <TableRow key={facility.name}>
                                                    <TableCell>
                                                        <ButtonBase onClick={() => moveTOInfoWindow(emergencyServices.indexOf(facility) + facility.type.replace(/\s/g, ''))} style={{ display: 'block', outline: 'none' }}>
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
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={ambulanceService ? ambulanceService.length : 0}
                                    rowsPerPage={tablePageCount}
                                    page={pageAmbulanceService}
                                    onPageChange={(event, newPage) => setPageAmbulanceService(newPage)}
                                />
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
                    <Box >
                        <Button variant="outlined" size="small" sx={{ color: 'black' }} onClick={() => {learnOpen()}}>About Scorecard...</Button>
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