'use client';

import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import theme from '@/theme';
import {Box, styled} from '@mui/material';
import {useState} from 'react';

const HeaderOffset = styled('div')(({theme}) => theme.mixins.toolbar);

export default function MainLayout({children}: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(true);

  return (
    <>
      <Header handleDrawerToggle={() => setNavOpen(!navOpen)}/>
      <HeaderOffset/>
      <SideNav open={navOpen}/>
      <Box component="main" sx={{
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: '0px',
        ...(navOpen && {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: {xs: '0px', sm: '256px'},
        })
      }}>
        {children}
      </Box>
    </>
  );
}