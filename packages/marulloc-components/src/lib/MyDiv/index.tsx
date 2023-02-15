import React from 'react';

export type TMyDivProps = {
    propA: string;
    propB: number;
};
const MyDiv: React.FC<TMyDivProps> = () => {
    return <div>asdasd</div>;
};

export default React.memo(MyDiv);
