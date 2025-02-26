import * as React from 'react';
import { useState} from "react";

import { Box} from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from "react-router-dom";
import { useLoadScript} from "@react-google-maps/api";
import PlacesAutocomplete2 from "./PlacesAutocomplete2";
import PlacesAutocomplete3 from './PlacesAutocomplete3';
import { Alert } from "@mui/material";
import { Typography } from "@mui/material";


import Header from "./header";
import HeaderB from './headerB';
import {Link} from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_KEY,
    libraries: ["places"], 
  });


  if (!isLoaded) return <div>Loading...</div>;


  

  const handleWarning = (msg) => {
    setDialogMsg(msg)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogMsg("")
  };

  const handleSelect = async (newValueString) => {

    if (newValueString) {
      console.log(newValueString);
      const newStr = newValueString.replaceAll(" ", "+");
      const newStr2 = newStr.replaceAll(",", "-");
      console.log(newStr2)
      navigate(`/${newStr2}`);
    }


  }

  return (
    <Box sx={{ color: 'black', height: "100vh", width: "100vw" }}>
      
      <Grid container spacing={3}>
          
          <Grid item xs={12} sm={12} md={12} >
              <HeaderB/>
          </Grid>
          
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                         
        <Alert severity="warning" sx={{ width: '100%', textAlign: 'left'}}>
          Coverage: Spanish Town and Portmore, Jamaica.
        </Alert>
      </Box>
        
      <Box container display={"flex"} flexDirection={"column"} justifyContent="center" alignItems="center" spacing={3} mt={15}>
          
          
              <Link to="/">
                  <Box component={"img"} src="/dehsoNameNoLogo2.svg" alt="Your Logo" sx={{height: { xs: "14vw", sm: "14vw", md: "5vw", lg: "5vw", xl: "5vw" }}}  />
              </Link>
          
          
            {/* <PlacesAutocomplete2 setSelected={handleSelect} coverageWarn={handleWarning}/> */}
            <Box mt={3}>

            <PlacesAutocomplete3 coverageWarn={handleWarning}/>
            </Box>
            <Typography variant="caption" mt={1} color={"textSecondary"}>
             Learn more about Jamaican neighbourhoods.
            </Typography>
            
          
          
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

       

    </Box>
  );
}

export default AboutUs;