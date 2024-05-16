'use client';

import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import theme from '@/theme';
import {Dashboard, FormatListBulleted} from '@mui/icons-material';
import {Box, Breadcrumbs, Link, styled, Typography} from '@mui/material';
import {usePathname} from 'next/navigation';
import {useState} from 'react';

const links = [
  {label: 'Dashboard', icon: <Dashboard/>, href: '/dashboard'},
  {label: 'Products', icon: <FormatListBulleted/>, href: '/products'},
];

const breadcrumbMap: {
  [key: string]: string
} = {
  '/dashboard': 'Dashboard',
  '/products': 'Products',
  '/products/new': 'New Product'
};

const HeaderOffset = styled('div')(({theme}) => theme.mixins.toolbar);

export default function MainLayout({children}: {
  children: React.ReactNode
}) {
  const [navOpen, setNavOpen] = useState(true);
  const pathname = usePathname();
  const pathSections = pathname.split('/');

  return (
    <>
      <Header handleDrawerToggle={() => setNavOpen(!navOpen)}/>
      <HeaderOffset/>
      <SideNav links={links} open={navOpen} pathname={pathname}/>
      <Box component="main" sx={{
        flexGrow: 1,
        paddingY: theme.spacing(1),
        paddingX: theme.spacing(2),
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

        {/* Page Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{paddingY: theme.spacing(1.5)}}>
          {pathSections.map((section, index) => {
            const last = index === pathSections.length - 1;
            const to = `${pathSections.slice(0, index + 1).join('/')}`;

            return last ? (
              <Typography key={index} color="text.primary">{breadcrumbMap[to]}</Typography>
            ) : (
              <Link key={index} underline="hover" color="inherit" href={to}>{breadcrumbMap[to]}</Link>
            );
          })}
        </Breadcrumbs>

        {/* Main Content*/}
        {children}
      </Box>
    </>
  );
}