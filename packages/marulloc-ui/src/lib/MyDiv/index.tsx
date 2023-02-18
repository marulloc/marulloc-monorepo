import React from 'react';

export type TMyDivProps = {
    propA: string;
    propB: number;
};
const MyDiv: React.FC<TMyDivProps> = ({ propA, propB }) => {
    return (
        <div>
            {propA} {propB}
        </div>
    );
};

export default MyDiv;
