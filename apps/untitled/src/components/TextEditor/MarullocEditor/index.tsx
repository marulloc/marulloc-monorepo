import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * @TODo 1. useRef로 리렌더링 시점에 커서 위치 변하지 않도록 만들기
 * @TODO 2. 애초에 저장을 인풋할때마다 하지 않기 (쓰로틀링 써서 하거나, 입력이 멈춘지 5초가 지났을 때, 혹은 저장버튼을 눌렀을 때)
 * @TODO 3. 볼드, 이탤릭, 언더라인 과 같은 (?)텍스트 그 머냐 태그 삽입하는 류의 기능 추가하기
 * @TODO 4. 코드블락
 * @TODO 5. 드래거블
 * @TODO 6. 미디어 삽입 및 사이즈조절
 * @TODO 7. Layout 변경
 * @returns
 */

const MarullocEditor: React.FC = () => {
    const [preview, setPreview] = useState('');

    return (
        <div>
            <EditorCore setContentState={setPreview} />

            <div id="preview" dangerouslySetInnerHTML={{ __html: preview }}></div>
        </div>
    );
};

export default React.memo(MarullocEditor);

// eslint-disable-next-line react/display-name
const EditorCore = React.memo(({ setContentState }: any) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef('<p>Marulloc</p>');

    const handleInput = (event) => {
        contentRef.current = editorRef.current?.innerHTML || '';
        setContentState(contentRef.current);
    };

    return (
        <div
            ref={editorRef}
            id="editor"
            contentEditable
            // suppressContentEditableWarning
            onInput={handleInput}
            dangerouslySetInnerHTML={{ __html: contentRef.current }}
            style={{ background: 'white', color: 'red', padding: 20 }}
        />
    );
});
