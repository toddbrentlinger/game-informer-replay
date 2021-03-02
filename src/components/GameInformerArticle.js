import React from 'react';
import './GameInformerArticle.css';

function GameInformerArticle(props) {
    function createArticleContent() {
        if (!props.article.content) return;

        return props.article.content.map(
            (para, index) => {
                if (para.replace(/\s/g, '').length)
                    return <p key={index}>{para}</p>
            }
        );
    }

    return (
        <div className="article">
            <div className="article-heading">
                <h4 className="article-title">{props.article.title}</h4>
                <div className="article-author">
                    {`by ${props.article.author}${props.article.date}`}
                </div>
            </div>
            {createArticleContent()}
        </div>
    );
}

export default GameInformerArticle;