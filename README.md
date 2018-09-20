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

### Get Scooters Nearby

```javascript
bird.getScootersNearby(latitude, longitude, (radius = 500));
```

### Get Scooter details

```javascript
bird.getScooterDetails(scooterId);
```

### Set alarm for a scooter

```javascript
bird.setScooterAlarm(scooterId);
```

### Set missing for a scooter

```javascript
bird.setScooterMissing(scooterId);
```
