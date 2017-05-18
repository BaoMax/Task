import 'css/style.css';
import React from 'react';
import { render } from 'react-dom';
import App from 'components/app';
if(navigator.userAgent.indexOf('Android') !== -1 || navigator.userAgent.indexOf('iPhone') !== -1 || navigator.userAgent.indexOf('iPad') !== -1){

}else{
    render(<App />,document.getElementById('app'));
}