const Bird = require('./')
const bird = new Bird()

const prompt = require("prompt-async");


async function init() {
  try {
    await bird.login('bird2@mailbucks.tech')
    prompt.start();
    const {
      verifyCode
    } = await prompt.get(['verifyCode']);
    await bird.verifyEmail(verifyCode)
    const birds = await bird.getScootersNearby(48.8760826, 2.3691194, 10000)
    birds.map(async scoot => await bird.setScooterAlarm(scoot.id))
  } catch (err) {
    console.log(err)
  }
}

init()