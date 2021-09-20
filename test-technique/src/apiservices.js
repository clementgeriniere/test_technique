import * as axios from 'axios';
import md5 from 'js-md5';

class ApiService {
    BASE_URL = "https://gateway.marvel.com"
    PUBLIC_KEY = "e74c77399e9e4db6718acd91d0681a72"
    PRIVATE_KEY = "822d72f7ab1c775b68e6f26d5ee92d424ea3d50d"

    getCharacters() {
        const ts = Number(new Date());
        const hash = md5.create();
        hash.update(ts + this.PRIVATE_KEY + this.PUBLIC_KEY);
        const request = {
            method: 'get',
            url: "https://gateway.marvel.com/v1/public/characters?ts=" + ts + "&apikey=" + this.PUBLIC_KEY + "&hash=" + hash.hex(),
        }

        return axios.request(request)
            .then(response => (response))
            .catch(error => console.log(error, request));
    }

    getComics(characterId) {
        const ts = Number(new Date());
        const hash = md5.create();
        hash.update(ts + this.PRIVATE_KEY + this.PUBLIC_KEY);
        const request = {
            method: 'get',
            url: "https://gateway.marvel.com/v1/public/characters/" + characterId + "/comics?ts=" + ts + "&apikey=" + this.PUBLIC_KEY + "&hash=" + hash.hex(),
        }

        return axios.request(request)
            .then(response => (response))
            .catch(error => console.log(error, request));
    }
}

const api = new ApiService();

export default api;