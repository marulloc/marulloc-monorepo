import React, { useState } from 'react';

const TextEditor: React.FC = () => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        console.log('Text Saved', text);
    };
    return (
        <div>
            <textarea value={text} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default React.memo(TextEditor);
