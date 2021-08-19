import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
import LogoImage from 'assets/images/logo.svg';
import UserImage from 'assets/images/user.jpg';
import { isCategoryPage } from '../is-home-page';
import Search from 'features/search/search';
import {useEffect,useState}from 'react';
import axios from'axios';
import { mobileVendor, getUA, deviceDetect, browserName, CustomView } from 'react-device-detect';
import { useBeforeunload } from 'react-beforeunload';
import { CostCalculation } from 'features/user-profile/order/order-details/order-details.style';
import { Prompt } from 'react-router'
type Props = {
  className?: string;
};

const Header = ({ className }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  
  const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
    
  
  };
  
  const location = useRouter()
  const userAgent = getUA;
  const [ip, setIP] = useState('');
   
    const publicIp = require('public-ip');

(async () => {
	console.log(await publicIp.v4());
	//=> '46.5.21.123'
  setIP(await publicIp.v4())

	
})();
const x = { url : useRouter().asPath.toString(),ipAddress:ip.toString(),userAgent:userAgent.toString()};

  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => 
    {  axios({
      method: "post",
      url: "http://localhost:1337/paths",
      data: { url :'/close',ipAddress:ip.toString(),userAgent:userAgent.toString()}
    });
        
        
    });
  axios({
      method: "post",
      url: "http://localhost:1337/paths",
      data: x
    });
  console.log(location);


  }, [location]);
   
  
  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  };
  const showSearch =
    isCategoryPage(query.type) ||
    pathname === '/furniture-two' ||
    pathname === '/grocery-two' ||
    pathname === '/bakery';
    
  return (
    
    <HeaderWrapper className={className} id="layout-header">
      
      <LeftMenu logo={LogoImage} />
      {showSearch && <Search minimal={true} className="headerSearch" />}
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
