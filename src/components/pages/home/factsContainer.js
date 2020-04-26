import React from 'react';

export default function FactsContainer(props) {
    return (
        <div className="container facts">
            <div className="row block-divided">
                <div className="block-title">
                    {props.nameContainer}
                </div>
                <div className="info_content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}