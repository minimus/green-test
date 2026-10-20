import React, { SVGProps } from 'react';

export interface IIconProps extends SVGProps<Omit<SVGSVGElement, 'height' | 'width'>> {
  height?: number;
  width?: number;
}

export const CloseIcon = ({ width = 24, height = 24 }: IIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
  </svg>
);

export const AddIcon = ({ width = 24, height = 24 }: IIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
  </svg>
);

export const UpIcon = ({ width = 24, height = 24 }: IIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="currentColor" />
  </svg>
);
