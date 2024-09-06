import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5f27cd', // Example primary color for light mode
        },
        secondary: {
            main: '#ef476f', // Example secondary color for light mode
        },
        // ... other light theme customizations
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc', // Example primary color for dark mode
        },
        secondary: {
            main: '#03dac5', // Example secondary color for dark mode
        },
        // ... other dark theme customizations
    },
});

export { lightTheme, darkTheme };