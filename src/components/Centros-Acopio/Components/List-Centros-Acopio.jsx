import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';



import CentroAcopioService from "../Services/Service-Centros-Acopio";

export function ListCentroAcopio() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    CentroAcopioService.getCentros()
      .then((response) => {
        setData(response.data.results);
        console.log("🚀 ~ file: List-Centros-Acopio.jsx:37 ~ .then ~ response.data.results:", response.data.results)
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        setLoaded(true);
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleItemClick = (index) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index].open = !newData[index].open;
      return newData;
    });
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Centros de Acopio
        </ListSubheader>
      }
    >
      {data && data.map((item, index) => (
        <React.Fragment key={item.ID}>
          <ListItemButton onClick={() => handleItemClick(index)}>
          <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={item.Nombre} />
      {item.open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={item.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.Materiales && item.Materiales.map((material) => (
                <ListItemButton key={material.ID} sx={{ pl: 4 }}>
                  <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={material.Nombre} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}

