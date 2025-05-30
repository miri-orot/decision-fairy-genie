
import React from 'react';
import { IconProps } from '../types';

export const MagicLampIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.75 6.092C12.466 4.089 10.713 2.5 8.5 2.5C5.999 2.5 4.5 4.624 4.5 7C4.5 8.631 5.063 10.085 5.982 11.098L5.973 11.111C5.22 12.044 4.115 12.58 3.04 12.963C2.489 13.15 2 13.605 2 14.193V15.5C2 16.328 2.672 17 3.5 17H7.628C7.956 18.015 8.483 18.927 9.17 19.678C8.725 20.061 8.062 20.5 7.5 20.5C7.224 20.5 7 20.724 7 21C7 21.276 7.224 21.5 7.5 21.5H16.5C16.776 21.5 17 21.276 17 21C17 20.724 16.776 20.5 16.5 20.5C15.938 20.5 15.275 20.061 14.83 19.678C15.517 18.927 16.044 18.015 16.372 17H20.5C21.328 17 22 16.328 22 15.5V14.193C22 13.605 21.511 13.15 20.96 12.963C19.885 12.58 18.78 12.044 18.027 11.111L18.019 11.098C18.937 10.085 19.5 8.631 19.5 7C19.5 4.624 18.001 2.5 15.5 2.5C14.63 2.5 13.834 2.823 13.184 3.343C13.062 3.874 12.882 5.035 12.75 6.092ZM8.5 4.5C9.879 4.5 11 5.621 11 7S9.879 9.5 8.5 9.5S6 8.379 6 7S7.121 4.5 8.5 4.5ZM15.5 4.5C16.879 4.5 18 5.621 18 7S16.879 9.5 15.5 9.5S13 8.379 13 7S14.121 4.5 15.5 4.5Z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l1.168 4.832L18 6l-4.832 1.168L12 12l-1.168-4.832L6 6l4.832-1.168L12 0zm0 12l-1.168 4.832L6 18l4.832 1.168L12 24l1.168-4.832L18 18l-4.832-1.168L12 12zm6.832-7.168L18 0l-1.168 4.832L12 6l4.832-1.168zM6 18l-1.168-4.832L0 12l4.832 1.168L6 18z" />
  </svg>
);

export const LoadingSpinnerIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const PaperPlaneIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.47 3.415a2.006 2.006 0 0 0-2.107-1.192L3.39 7.057a2 2 0 0 0 .205 3.807l6.938 1.734a1 1 0 0 1 .657.657l1.734 6.938a2 2 0 0 0 3.807.205l4.834-15.973a2.005 2.005 0 0 0-1.192-2.107ZM7.865 12.01l-3.063- .766L17.73 5.312l-9.865 6.698Zm8.126 8.125L14.257 17.07l6.698-9.865-.766 3.063Z"/>
  </svg>
);

export const ThinkingFaceIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
    <path d="M12 14c-2.206 0-4 1.794-4 4h2c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4z"/>
    <circle cx="8.5" cy="10.5" r="1.5"/>
    <path d="M16.5 9A1.5 1.5 0 0 0 15 10.5v1A1.5 1.5 0 0 0 16.5 13a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 16.5 9z"/>
  </svg>
);
