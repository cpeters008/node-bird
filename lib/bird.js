const axios = require('axios');
const faker = require('faker');

class Bird {
    constructor() {
        this.request = axios.create({
            baseURL: 'https://api.bird.co',
            headers: {
                'Device-id': faker.random.uuid(),
                'Platform': 'ios',
                'App-Version': '3.0.5'
            }
        });
    }

    setAccessToken(accessToken) {
        this.request.defaults.headers.common['Authorization'] = '';
        delete this.request.defaults.headers.common['Authorization'];

        this.request.defaults.headers.common[
            'Authorization'
        ] = `Bird ${accessToken}`;
    }

    async login() {
        try {
            let response = await this.request({
                method: 'POST',
                url: '/user/login',
                data: {
                    'email': faker.internet.email()
                },
                responseType: 'json'
            });
            this.setAccessToken(response.data.token);
            return response.data;
        } catch (err) {
            console.log('error with login', err);
        }
    }

    async getProfile() {
        try {
            let response = await this.request({
                method: 'GET',
                url: `/user`,
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with getProfile', err);
        }
    }

    async getScootersNearby(latitude, longitude, radius = '500') {
        try {
            let response = await this.request({
                method: 'GET',
                url: `/bird/nearby`,
                params: {
                    latitude: latitude,
                    longitude: longitude,
                    radius: radius
                },
                headers: {
                    Location: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                        altitude: 500,
                        accuracy: 100,
                        speed: -1,
                        heading: -1
                    }),
                },
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with getScootersNearby', err);
        }
    }
}

module.exports = Bird;