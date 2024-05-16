import {Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from '@mui/material';
import Link from 'next/link';
import {Dispatch, SetStateAction} from 'react';

export default function SideNav({open, onClose, links, pathname}: {
  open: boolean,
  onClose: Dispatch<SetStateAction<boolean>>,
  links: { label: string, icon: React.ReactNode, href: string }[],
  pathname: string
}) {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      sx={{'& .MuiDrawer-paper': {boxSizing: 'border-box', width: {xs: '100vw', sm: 256}}}}
      open={open}
      onClose={onClose}
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