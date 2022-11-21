import { createGlobalStyle } from 'styled-components';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FuturaBold from './fonts/FuturaStd-Bold.woff';

export const GlobalFonts = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap');
    
    @font-face {
        font-family: 'Futura';
        src: local('Futura'),
        url(${FuturaBold}) format('woff')
    }
`;
