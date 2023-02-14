import React from 'react';

export type TTestDivProps = {
    propA: string;
};

const TestDiv: React.FC<TTestDivProps> = ({ propA }) => {
    return <div>{propA}</div>;
};

export default React.memo(TestDiv);
