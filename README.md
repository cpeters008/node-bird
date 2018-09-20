# node-bird

An API for Bird Scooters

## Usage

```javascript
const Bird = require('node-bird');
const bird = new Bird();
```

### Log in

```javascript
bird.login();
```

### Get profile

```javascript
bird.getProfile()
```

### Get Scooters Nearby

```javascript
bird.getScootersNearby(latitude, longitude, radius = 500);
```