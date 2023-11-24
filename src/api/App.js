import '../App.css';
import {Card, CardContent, styled} from '@mui/material';
import React from 'react';
import Typography from "@mui/material/Typography";

const Pre = styled('pre')(
  ({theme}) => `
  font-family: monospace;
  font-size: 0.75rem;
  text-align: left;
  color: ${theme.palette.mode === 'dark' ? '#FFF' : '#000'};
  `,
);

export function ApiResponseCard(props) {
  const {text} = props
  return (
    <Card sx={{minWidth: 275}}>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          API Response
        </Typography>
        <Typography variant="h5" component="div">
          <Pre>{JSON.stringify(text, null, 2)}</Pre>
        </Typography>
      </CardContent>
    </Card>
  );
}