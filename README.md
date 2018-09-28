# node-bird

An API for Bird Scooters

## Usage

```javascript
const Bird = require('node-bird');
const bird = new Bird();
```

For a cool example, see _example/index.js_

### Log in

```javascript
bird.login((email = faker.internet.email()));
```

### Verify email

```javascript
bird.verifyCode(code);
```

### Get user agreements

```javascript
bird.getUserAgreement();
```

### Accept user agreements

```javascript
bird.acceptUserAgreement(uaId);
```

### Get profile

```javascript
bird.getProfile();
```

### Update profile

```javascript
bird.updateProfile(profile);
```

### Add voucher code

```javascript
bird.addVoucherCode(code);
```

### Get Scooters Nearby

```javascript
bird.getScootersNearby(latitude, longitude, (radius = 500));
```

### Get Scooter details

```javascript
bird.getScooterDetails(scooterId);
scooterId is not scooterCode
```

### Set alarm for a scooter

```javascript
bird.setScooterAlarm(scooterId);
```

### Set missing for a scooter

```javascript
bird.setScooterMissing(scooterId);
```

### Scan scooter

```javascript
bird.scanScooter(scooter);
scooter can be fetched from getScootersNearby array, or from getScooterDetails if you already know scooterId
```

### Ride scooter

```javascript
bird.rideScooter(scooter);
scooter can be fetched from getScootersNearby array
```

### Stop ride

```javascript
bird.stopRide(scooter, ride);
scooter can be fetched from getScootersNearby array
ride is returned from rideScooter method
```

### Add card registered with Stripe to account

```javascript
bird.addCardFromStripe(stripeToken, { latitude = faker.address.latitude(), longitude = faker.address.longitude() });
```

### Get Stripe Customer

```javascript
bird.getStripeCustomer();
```

### Set card as default source in your Bird account

```javascript
bird.setCardAsDefault(cardId, latitude = faker.address.latitude(), longitude = faker.address.longitude() });
```
