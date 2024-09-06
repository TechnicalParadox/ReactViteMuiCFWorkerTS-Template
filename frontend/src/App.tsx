import { Button, CssBaseline, Typography } from '@mui/material';
import {useContext, useState} from 'react';
import { ColorModeContext } from './ColorModeContext';
import {baseUrl} from "./helpers/environment_detection.ts";

function App() {

    const  { toggleColorMode } = useContext(ColorModeContext);
    const [testApiResponse, setTestApiResponse] = useState("");

    const sendTestRequest = async () => {
        try {
            const response = await fetch(`${baseUrl}/test`);
            const data = await response.json();
            setTestApiResponse(data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <CssBaseline />
            <Typography variant="h1" gutterBottom>Hello!</Typography>
            <Button onClick={toggleColorMode} color="secondary" variant="contained">Toggle Dark Mode</Button>
            <br/>
            <br/>
            <Button onClick={sendTestRequest} color="primary" variant="contained">Send Test Request</Button>
            <Typography>Response: {testApiResponse}</Typography>
        </>
    )
}

export default App