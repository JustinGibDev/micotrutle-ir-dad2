function car_avoid () {
    if (car_mode == 1) {
        basic.showLeds(`
            # . . . #
            . # . # .
            # # # # #
            . # # # .
            . . . . .
            `)
        distance_val = turtleBit.ultra()
        turtleBit.Led(LR.LeftSide, COLOR.white)
        turtleBit.Led(LR.RightSide, COLOR.white)
        if (distance_val <= 10) {
            while (distance_val <= 10) {
                turtleBit.run(DIR.Turn_Left, 80)
                basic.showLeds(`
                    . # # # .
                    . # . . #
                    . # . # .
                    . . . . .
                    . # . # .
                    `)
                basic.pause(700)
                turtleBit.state(MotorState.stop)
                distance_val = turtleBit.ultra()
            }
            turtleBit.run(DIR.Run_forward, 80)
        }
    }
}
function CarStop () {
    turtleBit.state(MotorState.stop)
    car_mode = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . # # # .
        . # . # .
        `)
    turtleBit.OFFLed()
}
function car_follow () {
    if (distance_val > 9 && distance_val <= 30) {
        turtleBit.run(DIR.Run_forward, 80)
    } else if (distance_val > 6 && distance_val <= 9) {
        turtleBit.state(MotorState.brake)
    } else if (distance_val <= 6) {
        turtleBit.run(DIR.Run_back, 80)
    } else if (distance_val <= 30) {
        turtleBit.state(MotorState.brake)
    }
}
function car_Tracking () {
    if (car_mode == 2) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            `)
        turtleBit.Led(LR.LeftSide, COLOR.red)
        turtleBit.Led(LR.RightSide, COLOR.red)
        if (turtleBit.LineTracking() == 2 || (turtleBit.LineTracking() == 3 || (turtleBit.LineTracking() == 5 || (turtleBit.LineTracking() == 6 || turtleBit.LineTracking() == 7)))) {
            turtleBit.run(DIR.Run_forward, 60)
        } else if (turtleBit.LineTracking() == 4) {
            turtleBit.Motor(LR.LeftSide, MD.Back, 80)
            turtleBit.Motor(LR.RightSide, MD.Forward, 80)
        } else if (turtleBit.LineTracking() == 1) {
            turtleBit.Motor(LR.LeftSide, MD.Forward, 80)
            turtleBit.Motor(LR.RightSide, MD.Back, 80)
        } else {
            turtleBit.state(MotorState.brake)
        }
    }
}
let val2 = 0
let val = 0
let distance_val = 0
let car_mode = 0
irRemote.connectInfrared(DigitalPin.P11)
let strip = neopixel.create(DigitalPin.P8, 4, NeoPixelMode.RGB)
basic.forever(function () {
    val = irRemote.returnIrButton()
    car_avoid()
    car_Tracking()
    if (val != 0) {
        val2 = val
        if (val2 == 70) {
            turtleBit.run(DIR.Run_forward, 90)
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
        } else if (val2 == 68) {
            turtleBit.Motor(LR.LeftSide, MD.Forward, 60)
            turtleBit.Motor(LR.RightSide, MD.Forward, 85)
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        } else if (val2 == 67) {
            turtleBit.Motor(LR.LeftSide, MD.Forward, 85)
            turtleBit.Motor(LR.RightSide, MD.Forward, 60)
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        } else if (val2 == 21) {
            turtleBit.run(DIR.Run_back, 90)
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        } else if (val2 == 64) {
            turtleBit.state(MotorState.stop)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
        } else if (val2 == 82) {
            if (car_mode == 0) {
                car_mode = 1
            } else {
                CarStop()
            }
        } else if (val2 == 74) {
            if (car_mode == 0) {
                car_mode = 2
            } else {
                CarStop()
            }
        } else {
            basic.showString("" + (val2))
        }
    }
})
