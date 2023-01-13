import {FormControl, 
        Box, 
        MenuItem ,
        TextField} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import styles from '@/styles/Add.module.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';

import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

export default function AddContent() {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor:
            theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className='text-black px-10'>
        <div className={`${styles.title}`}>
            <div className={`text-black`}>Category detail</div>
        </div>

           <FormGroup className={`my-5`}>
                <label>Title name*</label>
                <Input className='w-9/12' type="text" placeholder="Category name" />           
            </FormGroup>

            <FormGroup className={`my-5`}>
                <label>Content type</label>
                <Box className='py-5' sx={{ width:200,minWidth: 120 }}>
                    <FormControl fullWidth>
                    <Select
                        // labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        // label="Age"
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>NEWS</MenuItem>
                        <MenuItem value={20}>FAQ</MenuItem>
                        <MenuItem value={30}>KTM</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        width: 200,
                        maxWidth: '100%',
                    }}
                    >
                    <TextField fullWidth id="fullWidth" />
                </Box>
            </FormGroup>

            <div>
                <label>Short descripti</label><br/>
                <textarea className='text-white' rows={3} cols={50}></textarea>
            </div>

            <FormControlLabel
            className='flex content-end'
            labelPlacement="start"
            label="Publish/Unpublish"
            control={<IOSSwitch defaultChecked sx={{ m: 1 }} />}
            />
    </div>
  );
}