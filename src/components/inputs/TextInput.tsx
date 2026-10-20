import { FormControl, FormHelperText, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import React, { ChangeEvent, FC, useMemo } from 'react';

import { ITextInput } from '../../types/types';
import { getSize } from '../../utils/utils';

import InputRoot from './InputRoot';

const TextInput: FC<ITextInput> = (props) => {
  const {
    id,
    caption,
    tooltip,
    value,
    contentType = 'text',
    size = 'small',
    big = false,
    prefix = '',
    suffix = '',
    inside = false,
    disabled = false,
    button = false,
    onChange,
  } = props;

  const onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      const val = e?.target?.value;
      if (contentType === 'number') {
        if (!Number.isNaN(Number(val))) {
          onChange(Number(val));
        }
      } else {
        onChange(val);
      }
    }
  };

  const sxStyle = useMemo(
    () => ({
      width: getSize(size),
    }),
    [size],
  );

  return (
    <InputRoot size={size} inside={inside} button={button}>
      <FormControl sx={sxStyle} size={big ? 'medium' : 'small'}>
        <InputLabel htmlFor={id}>{caption}</InputLabel>
        <OutlinedInput
          id={id}
          label={caption}
          value={value}
          disabled={disabled}
          size={big ? 'medium' : 'small'}
          sx={sxStyle}
          startAdornment={prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined}
          endAdornment={suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined}
          fullWidth={inside}
          onChange={onValueChange}
        />
        {tooltip && <FormHelperText>{tooltip}</FormHelperText>}
      </FormControl>
    </InputRoot>
  );
};

export default TextInput;
