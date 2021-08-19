import React from 'react';
import { withStyle, useStyletron } from 'baseui';
import { Grid, Row, Col as Column } from 'components/FlexBox/FlexBox';
import RadialBarChart from 'components/Widgets/RadialBarChart/RadialBarChart';
import LineChart from 'components/Widgets/LineChart/LineChart';
import ColumnChart from 'components/Widgets/ColumnChart/ColumnChart';
import DonutChart from 'components/Widgets/DonutChart/DonutChart';
import GraphChart from 'components/Widgets/GraphChart/GraphChart';
import GradiantGraphChart from 'components/Widgets/GradiantGraphChart/GradiantGraphChart';
import MapWidget from 'components/Widgets/MapWidget/MapWidget';
import StickerCard from 'components/Widgets/StickerCard/StickerCard';
import BasicTable from '../../components/Table/table'
import { Revenue } from 'assets/icons/Revenue';
import { Refund } from 'assets/icons/Refund';
import { CoinIcon } from 'assets/icons/CoinIcon';
import { CartIconBig } from 'assets/icons/CartIconBig';
import { UserIcon } from 'assets/icons/UserIcon';
import { DeliveryIcon } from 'assets/icons/DeliveryIcon';
import axios from 'axios';
import SimpleAccordion from '../../components/Accordion/accordion'
import { useState,useEffect } from 'react';
import { visitors } from '@babel/traverse';
const Col = withStyle(Column, () => ({
  '@media only screen and (max-width: 574px)': {
    marginBottom: '30px',

    ':last-child': {
      marginBottom: 0,
    },
  },
}));

const Dashboard =  () => {
  let tab = [];
 
const [css] = useStyletron();
  const mb30 = css({
    '@media only screen and (max-width: 990px)': {
      marginBottom: '16px',
    },
  });
  const [clients, setclients] = useState([]);
  const [paths,setPaths]=useState([]);
  const [pages,setPages]=useState([]);
  const [pageNum,setPageNum]=useState([]);
  const [purshased,setPurshased]=useState([]);
  const [addedProducts,setaddedProducts]=useState([]);
  let NewVisitors=0;
  let RetuningVisitors=0
  async function getvisitors() 
    
   {
  const response = await axios.get('http://localhost:1337/visitors');
   setclients(response.data.map(item => item));
   const response1= await axios.get('http://localhost:1337/paths');
   setPaths(response1.data.map(item => item));
   const response2= await axios.get('http://localhost:1337/pages');
   setPages(response2.data.map(item => item.url));
   const response3= await axios.get('http://localhost:1337/pages');
   setPageNum(response3.data.map(item => item.nb));
   const response4= await axios.get('http://localhost:1337/added-products');
   setaddedProducts(response4.data.map(item => item.nb));
   const response5= await axios.get('http://localhost:1337/purchased-products/');
   setPurshased(response5.data.map(item => item));

   }
   console.log("******",pages)
  
useEffect(() =>{getvisitors();
 
 
 

},[])
for (let i =0;i<12;i++){
  let nb =0;
  for (let j=0;j<clients.length;j++){
    
  var d = new Date(clients[j]['date']);

  if(d.getMonth()==i)
  {
nb+=1;
  }
  }
  tab.push(nb);
}
let tab1=[];
for (let i =0;i<12;i++){
  let nb =0;
  for (let j=0;j<purshased.length;j++){
    
  var d = new Date(purshased[j]['updated_at']);

  if(d.getMonth()==i)
  {
nb+=1;
  }
  }
  tab1.push(nb);
}
 
  



  for (let i=0;i<clients.length;i++){
    NewVisitors+=1;
    let v =0;
    for(let j=0 ;j<paths.length;j++){
     
      if(clients[i]['ipAddress']==paths[j]['ipAddress']&&paths[j]['url']=="/close"){
        v+=1

      }
     
    } if(v!=0){
      RetuningVisitors+=1;
     }
  }
  return (
    <Grid fluid={true}>
      
      <Row>
        
        
        <Col md={5} lg={4} sm={6}>
          <RadialBarChart
            widgetTitle="Visitors overview"
            series={[NewVisitors*100/(RetuningVisitors+NewVisitors), RetuningVisitors*100/(RetuningVisitors+NewVisitors)]}
            label={[NewVisitors, RetuningVisitors]}
            colors={['#03D3B5', '#666d92']}
            helperText={['New visitors', 'Returning visitors']}
          />
        </Col>
        <Col md={7} lg={8} sm={6}>
          <LineChart
            widgetTitle="User Hit Rate"
            color={['#03D3B5']}
            categories={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            seriesName="Unique visitors"
            series={tab}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={12}>
          <ColumnChart
            widgetTitle="pages overview"
            colors={['#03D3B5']}
            series={pageNum}
            categories={pages}
            topRowTitle="Performance"
            bottomRowData={[
              {
                label: 'Last Week Profit',
                valueText: '+29.7%',
                value: 29.7,
                color: '#03D3B5',
              },
              {
                label: 'This Week Losses',
                valueText: '-53.4%',
                value: 53.4,
                color: '#FC747A',
              },
            ]}
          />
        </Col>
        </Row>
        <Row>
        
        
        
        
        <Col md={7} lg={8} sm={6}>
          <LineChart
            widgetTitle="User Hit Rate"
            color={['#03D3B5']}
            categories={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
            seriesName="total purchased products"
            series={tab1}
          />
        </Col>
        <Col md={5} lg={4} sm={6}>
          <RadialBarChart
            widgetTitle="Products overview"
            series={[addedProducts.length*100/(addedProducts.length), purshased.length*100/(addedProducts.length)]}
            label={[addedProducts.length, purshased.length]}
            colors={['#03D3B5', '#666d92']}
            helperText={['added products', 'purchased products']}
          />
        </Col>
        </Row>
        <Row>
      <SimpleAccordion></SimpleAccordion>
      </Row>
        <Row>
        <Col lg={3} sm={6} xs={12}>
          <StickerCard
            title="New Customer"
            subtitle="(Last 30 Days)"
            icon={<UserIcon/>}
            price="5,678"
            indicator="up"
            indicatorText="Customer up"
            note="(previous 30 days)"
            link="#"
            linkText="Full Details"
          />
        </Col>
        <Col lg={3} sm={6} xs={12} className={mb30}>
          <StickerCard
            title="Total Revenue"
            subtitle="(Last 30 Days)"
            icon={<CoinIcon />}
            price="$711.66"
            indicator="up"
            indicatorText="Revenue up"
            note="(previous 30 days)"
            link="#"
            linkText="Full Details"
          />
        </Col>
        <Col lg={3} sm={6} xs={12} className={mb30}>
          <StickerCard
            title="Total Order"
            subtitle="(Last 30 Days)"
            icon={<CartIconBig />}
            price="88,568"
            indicator="down"
            indicatorText="Order down"
            note="(previous 30 days)"
            link="#"
            linkText="Full Details"
          />
        </Col>
        <Col lg={3} sm={6} xs={12}>
          <StickerCard
            title="Total Delivery"
            subtitle="(Last 30 Days)"
            icon={<DeliveryIcon />}
            price="78,000"
            indicator="up"
            indicatorText="Delivery up"
            note="(previous 30 days)"
            link="#"
            linkText="Full Details"
          />
        </Col>
      </Row>

      <Row>
        <Col md={7} lg={8}>
          <GraphChart
            widgetTitle="Sales From Social Media"
            colors={['#03D3B5']}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              '2019-05-12',
              '2019-05-13',
              '2019-05-14',
              '2019-05-15',
              '2019-05-16',
              '2019-05-17',
              '2019-05-18',
            ]}
          />
        </Col>

        <Col md={5} lg={4}>
          <DonutChart
            widgetTitle="Target"
            series={[30634, 6340]}
            labels={['Todays Revenue', 'Todays Refund']}
            colors={['#03D3B5', '#666d92']}
            helperText={['Weekly Targets', 'Monthly Targets']}
            icon={[<Revenue />, <Refund />]}
            prefix="$"
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={12}>
          <ColumnChart
            widgetTitle="Sale History"
            colors={['#03D3B5']}
            prefix="$"
            totalValue="1,92,564"
            position="up"
            percentage="1.38%"
            text="More than last year"
            series={[44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65]}
            categories={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col md={5} lg={4}>
          <GradiantGraphChart
            colors={['#03D3B5']}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              '2019-05-12',
              '2019-05-13',
              '2019-05-14',
              '2019-05-15',
              '2019-05-16',
              '2019-05-17',
              '2019-05-18',
            ]}
            topRowTitle="Performance"
            bottomRowData={[
              {
                label: 'Last Week Profit',
                valueText: '+29.7%',
                value: 29.7,
                color: '#03D3B5',
              },
              {
                label: 'This Week Losses',
                valueText: '-53.4%',
                value: 53.4,
                color: '#FC747A',
              },
            ]}
          />
        </Col>

        <Col md={7} lg={8}>
          <MapWidget
            data={[
              {
                name: 'Williamburgs',
                value: 69922,
                color: '#2170FF',
              },
              {
                name: 'Brooklyn',
                value: 41953,
                color: '#29CAE4',
              },
              {
                name: 'New York',
                value: 23307,
                color: '#666D92',
              },
              {
                name: 'Jersey City',
                value: 20200,
                color: '#03D3B5',
              },
            ]}
            totalText="Total Client"
          />
        </Col>
      </Row>
    </Grid>
  );
};

export default Dashboard;
