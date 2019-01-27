function getWindDirection(deg) {

    let windDirection = "undefined"

    if((deg >= 350 && deg <=360) || (deg>=0 && deg<=10)){
        windDirection = "Nord"
    }
    if(deg >= 11 && deg <=39){
        windDirection = "Nord/Nord-Øst"
    }
    if(deg >= 40 && deg <=59){
        windDirection = "Nord-Øst"
    }
    if(deg >= 60 && deg <=79){
        windDirection = "Øst/Nord-Øst"
    }
    if(deg >= 80 && deg <=109){
        windDirection = "Øst"
    }
    if(deg >= 110 && deg <=129){
        windDirection = "Øst/Syd-Øst"
    }
    if(deg >= 130 && deg <=149){
        windDirection = "Syd-Øst"
    }
    if(deg >= 150 && deg <=169){
        windDirection = "Syd/Syd-Øst"
    }
    if(deg >= 170 && deg <=199){
        windDirection = "Syd"
    }
    if(deg >= 170 && deg <=199){
        windDirection = "Syd"
    }
    if(deg >= 200 && deg <=219){
        windDirection = "Syd/Syd-Vest"
    }
    if(deg >= 220 && deg <=239){
        windDirection = "Syd-Vest"
    }
    if(deg >= 240 && deg <=259){
        windDirection = "Vest/Syd-Vest"
    }
    if(deg >= 260 && deg <=289){
        windDirection = "Vest"
    }
    if(deg >= 290 && deg <=309){
        windDirection = "Vest/Nord-Vest"
    }
    if(deg >= 310 && deg <=329){
        windDirection = "Nord-Vest"
    }
    if(deg >= 330 && deg <=349){
        windDirection = "Nord/Nord-Vest"
    }
    return windDirection
}

const winDir = { getWindDirection }
export default winDir