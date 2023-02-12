type TProps = {
    propA: string;
};

const TestDiv: React.FC<TProps> = ({ propA }) => {
    return <div>{propA}</div>;
};

export default TestDiv;
