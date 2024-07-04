import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function POITable({ selected, poi }) {
    
    // 1. Group POIs by Category
    const groupedPOIs = poi.reduce((groups, facility) => {
        (groups[facility.category] = groups[facility.category] || []).push(facility);
        return groups;
    }, {});
 
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* <TableCell>Category</TableCell> */}
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Location</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.entries(groupedPOIs).map(([category, facilities]) => (
                        <React.Fragment key={category}>
                            <TableRow>
                                <TableCell colSpan={4} style={{ fontWeight: 'bold' }}>
                                    {category}
                                </TableCell>
                            </TableRow>
                            {facilities.map((facility) => (
                                <TableRow key={facility.name}>
                                    <TableCell>{facility.name}</TableCell>
                                    <TableCell>{facility.type}</TableCell>
                                    <TableCell>{facility.distance}</TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
