const axios = require('axios');
const faker = require('faker');
const moment = require('moment');

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

    async login(email = faker.internet.email()) {
        try {
            let response = await this.request({
                method: 'POST',
                url: '/user/login',
                data: {
                    'email': email
                },
                responseType: 'json'
            });
            this.setAccessToken(response.data.token);
            return response.data;
        } catch (err) {
            console.log('error with login', err);
        }
    }

    async verifyEmail(code) {
        try {
            let response = await this.request({
                method: 'PUT',
                url: `/request/accept`,
                data: {
                    token: code
                },
                responseType: 'json'
            });
            this.setAccessToken(response.data.token);
            return response.data;
        } catch (err) {
            console.log('error with verifyEmail', err);
        }
    }


    async getUserAgreement() {
        try {
            let response = await this.request({
                method: 'GET',
                url: `/user-agreement`,
                params: {
                    role: 'RIDER'
                },
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with getUserAgreement', err);
        }
    }

    async acceptUserAgreement(uaId) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/user-agreement/accept`,
                data: {
                    agreement_content_ids: [
                        uaId
                    ]
                },
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with acceptUserAgreement', err);
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

    async updateProfile(profile) {
        try {
            let response = await this.request({
                method: 'PUT',
                url: `/user/update`,
                data: profile,
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with updateProfile', err);
        }
    }

    async getScootersNearby(latitude, longitude, radius = 500) {
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
            return response.data.birds;
        } catch (err) {
            console.log('error with getScootersNearby', err);
        }
    }

    async getScooterDetails(scooterId, alarm = false) {
        try {
            let response = await this.request({
                method: 'PUT',
                url: `/bird/chirp`,
                data: {
                    alarm: alarm,
                    bird_id: scooterId
                },
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with getScooterDetails', err);
        }
    }

    async setScooterAlarm(scooterId) {
        try {
            return await this.getScooterDetails(scooterId, true)
        } catch (err) {
            console.log('error with setScooterAlarm', err);
        }
    }

    async setScooterMissing(scooterId) {
        try {
            let response = await this.request({
                method: 'PUT',
                url: `/bird/missing`,
                data: {
                    bird_id: scooterId
                },
                responseType: 'json'
            });
            return response.data;
        } catch (err) {
            console.log('error with setScooterMissing', err);
        }
    }
}

module.exports = Bird;