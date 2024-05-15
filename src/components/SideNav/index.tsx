import {Dashboard, FormatListBulleted} from '@mui/icons-material';
import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from '@mui/material';
import Link from 'next/link';

const links = [
  {label: 'Dashboard', icon: <Dashboard/>, href: '/'},
  {label: 'Products', icon: <FormatListBulleted/>, href: '/'},
];

export default function SideNav({open}: { open: boolean }) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      sx={{'& .MuiDrawer-paper': {boxSizing: 'border-box', width: {xs: '100vw', sm: 256}}}}
      open={open}
    >
      <Toolbar/>
      <Box>
        <List>
          {links.map(({label, icon, href}, index) => (
            <ListItem key={index}>
              <ListItemButton href={href} component={Link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}