import React, { useState } from 'react';
import MyButton from "./UI/button/MyButton";
import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {
    const navigate = useNavigate();
    const storageKey = props.post.id;
    const [idInLocalStorage, setIdInLocalStorage] = useState(localStorage.getItem(storageKey));

    const handleButtonClick = () => {
        // Проверка наличия переменной id в localStorage
        if (idInLocalStorage) {
            // Если переменная id есть, удалить ее
            localStorage.removeItem(storageKey);
            setIdInLocalStorage(null);
            console.log('Переменная id удалена из localStorage.');
        } else {
            // Если переменной id нет, добавить ее
            const newId = 'your_generated_id'; // Замените эту строку на ваш способ генерации id
            localStorage.setItem(storageKey, newId);
            setIdInLocalStorage(newId);
            console.log('Переменная id добавлена в localStorage.');
        }
    };

    return (
        // <div className="post">
        <div className={`post${idInLocalStorage ? '' : '1'}`}>
            <div className="post__content">
                <strong style={{textAlign: 'center'}}>{props.post.rating}/10. {props.post.title_long}</strong>
                <h6> </h6>
                <div>
                    {props.post.body}
                </div>
            </div>

            <div className="ggg">
                <img className="cc" src={props.post.medium_cover_image} alt="Здесь должно было быть фото, но походу что-то погло не так" />

            </div>

            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
                    Открыть
                </MyButton>
                {/*<MyButton onClick={() => props.remove(props.post)}>*/}
                {/*    Просмотренно*/}
                {/*</MyButton>*/}
                <MyButton onClick={handleButtonClick}>
                    {idInLocalStorage ? 'Не посмотренно' : 'Просмотренное'}
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;
