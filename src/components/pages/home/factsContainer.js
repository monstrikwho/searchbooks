import React from 'react';

export default function FactsContainer(props) {
    return (
        <div className="container facts">
            <div className="row block-divided">
                <div className="block-title">
                    FACTS
                </div>
                <div className="bookfacts">
                    {props.children}
                </div>
            </div>
        </div>
    )
}