import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from '@mui/material';
import Link from 'next/link';

export default function SideNav({links, open, pathname}: {
  links: { label: string, icon: React.ReactNode, href: string }[],
  open: boolean,
  pathname: string
}) {
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
            <ListItem key={index} disablePadding>
              <ListItemButton href={href} selected={pathname == href} component={Link}>
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