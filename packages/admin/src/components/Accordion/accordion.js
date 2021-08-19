import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import BasicTable from '../../components/Table/table'
import { Autocomplete } from '@material-ui/lab';
import { inspect } from "util";
import { useEffect, useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { width } from 'styled-system';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function SimpleAccordion() {
    let p='';
    let n='';
    const classes = useStyles();
    const [clients, setclients] = useState([]);
    useEffect(async () => {

        const response = await axios.get('http://localhost:1337/distinct');
        setclients(response.data.map(item => item));
    }, [])
    console.log(clients)
    const [value, setValue] = useState(null);
    const onChange = useCallback(
        (e, newValue) => {
            setValue(newValue);
        },
        [setValue]
    );

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        <Autocomplete
                           
                            freeSolo
                            style={{ width: 600 }}
                            options={clients.map((option) => option.ipAddress)}
                            value={value}
                            onChange={onChange}
                            renderInput={(params) => (
                                <TextField {...params} label="ipAddress" variant="outlined" fullWidth />
                            )}
                        />
                        
                       
                          
                    </Typography>
                
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                    <Typography>
                        
                        <BasicTable ip={value} ></BasicTable>
                    </Typography>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
