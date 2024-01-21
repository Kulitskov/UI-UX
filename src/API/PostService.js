import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://yts.mx/api/v2/list_movies.json?page=' + String(page) + '&limit=' + String(limit), {
            params: {
                _limit: limit,
                _page_number: 2
            }
        });
        console.log(response.data)
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        return response.data;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        return response.data.data;
    }
}
