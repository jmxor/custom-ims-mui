'use client';

import {darken, lighten} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {Roboto} from 'next/font/google';
import type {} from '@mui/x-data-grid/themeAugmentation';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);


const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-rowInfo': {
            backgroundColor: getBackgroundColor('#0288d1', 'light'),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor('#0288d1', 'light',),
            },
            '&.Mui-selected': {
              backgroundColor: getSelectedBackgroundColor('#0288d1', 'light',),
              '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor('#0288d1', 'light',),
              },
            },
          },
          '& .MuiDataGrid-rowSuccess': {
            backgroundColor: getBackgroundColor('#2e7d32', 'light',),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor('#2e7d32', 'light',),
            },
            '&.Mui-selected': {
              backgroundColor: getSelectedBackgroundColor('#2e7d32', 'light',),
              '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor('#2e7d32', 'light',),
              },
            },
          },
          '& .MuiDataGrid-rowWarning': {
            backgroundColor: getBackgroundColor('#ed6c02', 'light',),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor('#ed6c02', 'light',),
            },
            '&.Mui-selected': {
              backgroundColor: getSelectedBackgroundColor('#ed6c02', 'light',),
              '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor('#ed6c02', 'light',),
              },
            },
          },
          '& .MuiDataGrid-rowError': {
            backgroundColor: getBackgroundColor('#d32f2f', 'light',),
            '&:hover': {
              backgroundColor: getHoverBackgroundColor('#d32f2f', 'light',),
            },
            '&.Mui-selected': {
              backgroundColor: getSelectedBackgroundColor('#d32f2f', 'light',),
              '&:hover': {
                backgroundColor: getSelectedHoverBackgroundColor('#d32f2f', 'light',),
              },
            },
          },
        }
      }
    }
  }
});

export default theme;
