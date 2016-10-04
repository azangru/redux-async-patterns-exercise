import React from 'react';

const icon = (
    <svg className="header-uploader-button" viewBox="0 0 1000 1000">
        <path d="M836.5,461.7c0,0,18.6-250.6-211-279.2c-196.8-20.1-256.7,162.8-256.7,162.8s-59.3-57-139.7-10.4c-72,44.4-59.3,125.8-59.3,125.8S10,491.7,10,654.7c3.6,162.8,173.6,164.4,173.6,164.4h268.1v-172h-86L509,503.7l143.3,143.3h-86v172H809c0,0,158.3,0.2,180.5-154.7C1000.1,495.1,836.5,461.7,836.5,461.7z"/>
    </svg>    
);

export default (props) => {
    return (
        <span onClick={props.redirectToUploader}>{icon}</span>
    );
};
