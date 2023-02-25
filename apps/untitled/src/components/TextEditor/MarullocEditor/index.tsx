import React, { useEffect, useState } from 'react';

const MarullocEditor: React.FC = () => {
    const [content, setContent] = useState(
        '<p>This is <b>Marulloc Editor </b>!</p>',
    );

    const handleInput = (evt) => {
        console.log(evt.target.innerHTML);
        setContent(evt.target.innerHTML);
    };

    //

    return (
        <div>
            <button>Bold</button>
            <button>italic</button>
            <button>underline</button>
            <button>highlight</button>
            <button>code</button>
            <div
                contentEditable="true"
                onInput={handleInput}
                dangerouslySetInnerHTML={{ __html: content }}
                //
                style={{ background: 'white', color: 'red', padding: 20 }}
            />
        </div>
    );
};

export default React.memo(MarullocEditor);
