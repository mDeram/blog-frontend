import React from "react";
import { TAB_TO_SPACE } from "../constants";
import { Article } from "../generated/graphql";
import styles from "../styles/ArticleEditor.module.scss";

interface ArticleEditorFormProps {
    handleChange: (change: Partial<Article>) => void;
    title: string;
    description: string;
    author: string;
    markdown: string;
    slug: string;
}

const ArticleEditorForm: React.FC<ArticleEditorFormProps> = ({
    handleChange,
    title,
    description,
    author,
    markdown,
    slug
}) => {
    function tabToSpace(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key !== "Tab") return;

        e.preventDefault();

        const target = e.currentTarget;
        let caretPos = target.selectionStart;

        // Inserting Tab
        const value = markdown.substring(0, caretPos)
                    + TAB_TO_SPACE
                    + markdown.substring(target.selectionEnd);

        // Changing caret position, setting value and setting value in React
        caretPos = caretPos + TAB_TO_SPACE.length;
        target.value = value;
        target.selectionStart = caretPos;
        target.selectionEnd = caretPos;
        handleChange({ markdown: value });
    }

    return (
        <div className={styles.editorForm}>
            <div>
                <label htmlFor="title">Title</label>
                <div className={styles.editorSlug}>
                    <input
                        name="title"
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => handleChange({ title: e.target.value })}
                        placeholder="Title"
                    />
                    <p>slug: {slug}</p>
                </div>
            </div>
            <div>
                <label htmlFor="author">Author</label>
                <input
                    name="author"
                    type="text"
                    id="author"
                    value={author}
                    onChange={e => handleChange({ author: e.target.value })}
                    placeholder="Author"
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={e => handleChange({ description: e.target.value })}
                    placeholder="Write down a short description about your article"
                />
            </div>
            <div>
                <label htmlFor="markdown">Article</label>
                <textarea
                    name="markdown"
                    className={styles.editorMarkdown}
                    id="markdown"
                    value={markdown}
                    onChange={e => handleChange({ markdown: e.target.value })}
                    onKeyDown={e => tabToSpace(e)}
                    placeholder="Write down your article using markdown"
                />
            </div>
        </div>
    )
}

export default ArticleEditorForm;
