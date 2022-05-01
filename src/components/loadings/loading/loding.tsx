import * as React from 'react';
import './loading.scss';

// 全局loading
export const LoadingLG = () => {
    return (
        <div id='loadingLG' className='loadingLG'>
            <span>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    )
}

// 局部模块loading
export const LoadingLine = () => {
    return (
        <img
            className='loadingLine'
            style={{ width: 25, height: 25 }}
            src={require('@assets/icons/loadingLine.gif')}
        />
    )
}

