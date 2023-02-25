import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor } from '@toast-ui/react-editor';

interface Props {
    content: string;
    editorRef: React.MutableRefObject<any>;
}

const TUITextEditor = ({ content = '', editorRef }: Props) => {
    const toolbarItems = [
        // ['heading', 'bold', 'italic', 'strike'],
        // ['hr'],
        // ['ul', 'ol', 'task'],
        // ['table', 'link'],
        // ['image'],
        // ['code'],
        // ['scrollSync'],
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
    ];

    return (
        <>
            <button
                onClick={() =>
                    console.log(
                        '??',
                        editorRef.current?.getInstance().getHTML(),
                    )
                }
            >
                asdasd
            </button>
            <div style={{ height: 500 }}>
                {editorRef && (
                    <Editor
                        ref={editorRef}
                        initialValue={content || ' '} // 글 수정 시 사용
                        initialEditType="wysiwyg" // wysiwyg & markdown
                        previewStyle={
                            window.innerWidth > 1000 ? 'vertical' : 'tab'
                        } // tab, vertical
                        hideModeSwitch={true}
                        height="calc(100% - 10rem)"
                        theme={''} // '' & 'dark'
                        usageStatistics={false}
                        toolbarItems={toolbarItems}
                        useCommandShortcut={true}
                        plugins={[colorSyntax]}
                    />
                )}
            </div>
        </>
    );
};

export default TUITextEditor;
