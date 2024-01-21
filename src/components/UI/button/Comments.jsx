import React, { useState, useEffect } from 'react';
import Loader from "../Loader/Loader";

const Comments = ({ postId }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem(`comments_${postId}`)) || [];
        setComments(storedComments);
    }, [postId]);

    const handleAddComment = () => {
        if (name.trim() !== '' && comment.trim() !== '') {
            const newComment = {
                id: new Date().getTime(),
                name,
                text: comment,
            };
            setComments((prevComments) => [newComment, ...prevComments]);
            setName('');
            setComment('');

            localStorage.setItem(`comments_${postId}`, JSON.stringify([...comments, newComment]));
        }
    };

    const handleDeleteComment = (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
    };

    return (
        <div>
            <div>
                <label>
                    <h3>Имя:</h3>
                    <input style={{background: "lightgrey"}} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    <h3>Комментарий:</h3>
                    <textarea style={{background: "lightgrey"}}
                        rows="4"
                        cols="50"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleAddComment}>Добавить комментарий</button>

            <h2 style={{marginTop: 30}}> {comments.length > 0 ?  "Комментарии:" : <Loader/>}</h2>
            {console.log(comments.length)}
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.name}:</strong> {comment.text}
                        <button style={{marginLeft: 30}} onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
