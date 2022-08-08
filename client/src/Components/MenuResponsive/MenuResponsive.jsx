import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Paper } from '@mui/material';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import PropTypes from 'prop-types';

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/material-ui/getting-started/installation/" {...props} />
));

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
  children: PropTypes.node,
};


export default function MenuResponsive() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display:{xs:'block',sm:'none'}, zIndex:'1000' }} elevation={3}>
    <BottomNavigation
      showLabels
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction component={RouterLink} to="/overview" label="Overview" icon={<LeaderboardIcon />} />
      <BottomNavigationAction component={RouterLink} to="/earnings" label="Earnings" icon={<TrendingUpIcon />} />
      <BottomNavigationAction component={RouterLink} to="/expenses" label="Expenses" icon={<TrendingDownIcon />} />
      <BottomNavigationAction component={RouterLink} to="/createTransaction" label="Create" icon={<AddIcon />} />
    </BottomNavigation>
  </Paper>
  );
}
