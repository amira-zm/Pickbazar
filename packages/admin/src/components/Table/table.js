import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect,useState} from 'react';
import axios from 'axios';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(Paths) {
  return { Paths };
}

const rows = [
  createData('Frozen yoghurt'),
  createData('Ice cream sandwich'),
  createData('Eclair'),
  createData('Cupcake'),
  createData('Gingerbread'),
];

export default function BasicTable(props) {
  const ipAddress=props.ip;
  const [clients, setclients] = useState([]);
  useEffect(async () =>{
    
    const response = await axios.get('http://localhost:1337/paths');
    setclients(response.data.map(item => item));
    },[])
    console.log(clients)
    const visitors =[];
    const date =[];
    for(let i=0;i<clients.length-1;i++)
      {if (clients[i]['ipAddress']==ipAddress && clients[i]['url']!='/close'){
        var d1 = new Date(clients[i+1]['updated_at']);
        var d2 = new Date(clients[i]['updated_at']);
      
        let prop ={
          'url':clients[i]['url'],
          'date':(Math.round(d1.getTime()-d2.getTime())).toString()
        }
          
      
        if (prop.date==NaN){
          prop.date='--'
        }
        visitors.push(prop);
        

      }
    }
    
  const classes = useStyles();

  return (
   
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.url}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              
              
            </TableRow>
            
          ))}
         
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
