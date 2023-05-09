radio.onReceivedNumber(function (receivedNumber) {
    game.addScore(1)
    music.playTone(698, music.beat(BeatFraction.Whole))
    showScore()
})
function showScore () {
    range = strip.range(0, game.score())
    strip.clear()
    range.showColor(neopixel.colors(NeoPixelColors.Green))
}
input.onButtonPressed(Button.A, function () {
    restartGame()
})
function restartGame () {
    radio.setGroup(10)
    strip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
    game.setScore(0)
}
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(1)
})
let range: neopixel.Strip = null
let strip: neopixel.Strip = null
radio.setGroup(10)
strip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
game.setScore(0)
basic.forever(function () {
    basic.pause(1000)
    game.addScore(-1)
    music.playTone(131, music.beat(BeatFraction.Whole))
    if (game.score() < 0) {
        game.setScore(0)
    }
    showScore()
    if (game.score() > 9) {
        game.gameOver()
        basic.showString("You Win!")
    }
})
basic.forever(function () {
    if (input.acceleration(Dimension.Strength) > 300) {
        radio.sendNumber(1)
    }
})
