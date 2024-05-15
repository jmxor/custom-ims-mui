import {Menu} from '@mui/icons-material';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';

export default function Header({handleDrawerToggle}: { handleDrawerToggle: () => void }) {
  return (
    // TODO apply z-index programmatically from theme: "zIndex: (theme) => theme.zIndex.drawer + 1"
    // TODO style navbar like drawer component
    <AppBar position="fixed" color="default" sx={{zIndex: 1301}}>
      <Toolbar>
        <IconButton
          onClick={handleDrawerToggle}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}
        >
          <Menu/>
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          Inventory Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
}