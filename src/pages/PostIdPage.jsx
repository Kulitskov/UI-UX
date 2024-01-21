import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import Comments from "../components/UI/button/Comments";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data.movie);
    });

    useEffect(() => {
        fetchPostById(params.id);
    }, []);

    // Определение цвета в зависимости от рейтинга
    const getRatingColor = () => {
        const rating = post?.rating;
        if (rating < 4) {
            return 'red';
        } else if (rating > 7) {
            return 'green';
        } else {
            return 'orange';
        }
    };
    {console.log(post)}
    return (
        <div className="idpage">
            {/*<img src={post.background_image}/>*/}
            {post.id ? (
                // <div>
                // <div style={{ backgroundImage: `url(${post.background_image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 430}}>
                // </div>
                    //     <img src={post.background_image} alt="Your Image" style={{ display: 'none' }} />

                <div className="idcontent">
                    {/*<img src={post.background_image} alt="Your Image" style={{ display: 'none' }} />*/}
                    <div className="movie-details">
                        <img src={post.medium_cover_image} alt={post.title_long} />
                        <div className="details">

                            <h1>{post.title_long}</h1>
                            <h1 style={{ color: getRatingColor() }}>Rating: {post.rating}/10</h1>
                            <div>
                                {/*<h2>{post.genres[0]}    {post.genres[1]}    {post.genres[2]}    {post.genres[3]}</h2>*/}
                                {post.genres[0] ? <button className="bg">{post.genres[0]}</button> : " "}
                                {post.genres[1] ? <button className="bg">{post.genres[1]}</button> : " "}
                                {post.genres[2] ? <button className="bg">{post.genres[2]}</button> : " "}
                                {post.genres[3] ? <button className="bg">{post.genres[3]}</button> : " "}
                            </div>
                            <h3>Продолжительность фильма: {Math.floor(post.runtime/60)}ч. {Math.floor(post.runtime % 60)}мин.</h3>
                            <div>
                                {post.torrents[0] ? <button className="bt" onClick={() => window.open(post.torrents[0].url, '_blank')}>{post.torrents[0].quality}  {post.torrents[0].size}</button> : " "}
                                {post.torrents[1] ? <button className="bt" onClick={() => window.open(post.torrents[1].url, '_blank')}>{post.torrents[1].quality}  {post.torrents[1].size}</button> : " "}
                                {post.torrents[2] ? <button className="bt" onClick={() => window.open(post.torrents[2].url, '_blank')}>{post.torrents[2].quality}  {post.torrents[2].size}</button> : " "}

                                {console.log(post.torrents[0].url)}
                            </div>
                            <h1>{post.ge}</h1>
                        </div>
                    </div>
                    {/*{console.log(post.description)}*/}
                    {/*{console.log(post.description_full)}*/}
                    <h1> {post.description || post.description_full ? "Описание:" : ""}</h1>
                    <h2>{post.description_full ? post.description_full : post.description}</h2>

                    <h1 style={{marginTop: 30}}>Добавить комментарий</h1>
                    <Comments postId={params.id} />
                </div>
                // </div>
            ) : (
                <Loader />
            )}
        </div>

    );
};

export default PostIdPage;
