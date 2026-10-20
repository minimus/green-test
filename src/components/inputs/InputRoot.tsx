import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { getSize } from '../../utils/utils';

interface IProps {
  relative?: boolean;
  button?: boolean;
  inside?: boolean;
  size?: string;
  children: ReactNode | ReactNode[];
}

const InputRoot: FC<IProps> = (props) => {
  const { children, relative = false, button = false, inside = false, size = 'small' } = props;

  return (
    <Box
      sx={{
        'position': relative ? 'relative' : 'inherit',
        'display': 'flex',
        'flexDirection': 'column',
        'alignItems': 'flex-start',
        'justifyContent': 'flex-start',
        'width': inside ? 'inherit' : '100%',
        'margin': '5px 0 10px',
        '& .MuiTextField-root': {
          width: `calc(${getSize(size)} - 10px)`,
          margin: '5px',
        },
        '& .MuiSelect-root': {
          width: `calc(${getSize(size)} - 10px)`,
          height: '51px',
        },
        /*'& .MuiOutlinedInput-adornedEnd': {
          paddingRight: button ? '0' : '14px',
        },*/
      }}
    >
      {children}
    </Box>
  );
};

export default InputRoot;
