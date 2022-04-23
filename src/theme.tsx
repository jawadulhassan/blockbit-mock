import theme from 'styled-theming';

export const backgroundColor = theme('mode', {
  light: '#fafafa',
  dark: '#222',
});

export const textColor = theme('mode', {
  light: '#000',
  dark: '#fff',
});

export const buttonBackgroundColor = theme('mode', {
  light: '#18bbc4',
  dark: '#708090',
});

export const formBackgroundColor = theme('mode', {
  light: '#fcfcfc',
  dark: '	#DCDCDC',
});

export const buttonTextColor = theme('mode', {
  light: '#180D5B',
  dark: '#222',
});
