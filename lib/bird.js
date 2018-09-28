const axios = require('axios')
const faker = require('faker')
const moment = require('moment')

class Bird {
    constructor() {
        this.request = axios.create({
            baseURL: 'https://api.birdapp.com',
            headers: {
                'Device-id': faker.random.uuid(),
                'Platform': 'ios',
                'App-Version': '3.0.5'
            }
        })
    }

    setAccessToken(accessToken) {
        this.request.defaults.headers.common['Authorization'] = ''
        delete this.request.defaults.headers.common['Authorization']

        this.request.defaults.headers.common[
            'Authorization'
        ] = `Bird ${accessToken}`
    }

    async login(email = faker.internet.email()) {
        try {
            let response = await this.request({
                method: 'POST',
                url: '/user/login',
                data: {
                    email: email
                },
                responseType: 'json'
            })
            this.setAccessToken(response.data.token)
            return response.data
        } catch (err) {
            console.log('error with login', err)
            return err
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
            })
            this.setAccessToken(response.data.token)
            return response.data
        } catch (err) {
            console.log('error with verifyEmail', err)
            return err
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
            })
            return response.data
        } catch (err) {
            console.log('error with getUserAgreement', err)
            return err
        }
    }

    async acceptUserAgreement(uaId) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/user-agreement/accept`,
                data: {
                    agreement_content_ids: [uaId]
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with acceptUserAgreement', err)
            return err
        }
    }

    async getProfile() {
        try {
            let response = await this.request({
                method: 'GET',
                url: `/user`,
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with getProfile', err)
            return err
        }
    }

    async updateProfile(profile) {
        try {
            let response = await this.request({
                method: 'PUT',
                url: `/user/update`,
                data: profile,
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with updateProfile', err)
            return err
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
                    })
                },
                responseType: 'json'
            })
            return response.data.birds
        } catch (err) {
            console.log('error with getScootersNearby', err)
            return err
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
            })
            return response.data
        } catch (err) {
            console.log('error with getScooterDetails', err)
            return err
        }
    }

    async setScooterAlarm(scooterId) {
        try {
            return await this.getScooterDetails(scooterId, true)
        } catch (err) {
            console.log('error with setScooterAlarm', err)
            return err
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
            })
            return response.data
        } catch (err) {
            console.log('error with setScooterMissing', err)
            return err
        }
    }

    async addVoucherCode(code) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/coupon/promo`,
                data: {
                    link_code: code
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with addVoucherCode', err)
            return err
        }
    }

    async getStripeCustomer() {
        try {
            let response = await this.request({
                method: 'GET',
                url: `/stripe/customer`,
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with getStripeCustomer', err)
            return err
        }
    }

    async scanScooter(scooter) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/scan`,
                headers: {
                    Location: JSON.stringify({
                        latitude: scooter.location['latitude'],
                        longitude: scooter.location['longitude']
                    })
                },
                data: {
                    barcode: scooter.code,
                    mode: 'rider'
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with scanScooter', err)
            return err
        }
    }

    async rideScooter(scooter) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/ride`,
                headers: {
                    Location: JSON.stringify({
                        latitude: scooter.location['latitude'],
                        longitude: scooter.location['longitude']
                    })
                },
                data: {
                    bird_id: scooter.id,
                    unlock: true
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with rideScooter', err)
            return err
        }
    }

    async stopRide(scooter, ride) {
        try {
            await this.request({
                method: 'PUT',
                url: `/ride/complete`,
                headers: {
                    Location: JSON.stringify({
                        latitude: scooter.location['latitude'],
                        longitude: scooter.location['longitude']
                    })
                },
                data: {
                    ride_id: ride.bird['ride_id']
                },
                responseType: 'json'
            })
            let response = await this.request({
                method: 'PUT',
                url: `/ride/photo`,
                headers: {
                    Location: JSON.stringify({
                        latitude: scooter.location['latitude'],
                        longitude: scooter.location['longitude']
                    })
                },
                data: {
                    photo_url: 'https://s3.amazonaws.com/bird-uploads-production/ride-photos/b64bacac-f2d6-40ad-85ba-ccb046264904.png',
                    ride_id: ride.bird['ride_id']
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with stopRide', err)
            return err
        }
    }

    async addCardFromStripe(
        stripeToken, {
            latitude = faker.address.latitude(),
            longitude = faker.address.longitude()
        }
    ) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/stripe/card`,
                headers: {
                    upgrade: 'h2c',
                    Location: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude
                    })
                },
                data: {
                    token: stripeToken
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with addCardFromStripe', err)
            return err
        }
    }

    async setCardAsDefault(cardId, {
        latitude = faker.address.latitude(),
        longitude = faker.address.longitude()
    }) {
        try {
            let response = await this.request({
                method: 'POST',
                url: `/stripe/source/default`,
                headers: {
                    upgrade: 'h2c',
                    Location: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude
                    })
                },
                data: {
                    source: cardId
                },
                responseType: 'json'
            })
            return response.data
        } catch (err) {
            console.log('error with setCardAsDefault', err)
            return err
        }
    }
}

module.exports = Bird