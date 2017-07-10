$(document).ready(() => {
  let quotes = [
    "It's not what you look at that matters, it's what you see.",
    "The price of anything is the amount of life you exchange for it.",
    "You must live in the present, launch yourself on every wave, find your eternity in each moment.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
    "If you have built castles in the air, your work need not be lost; that is where they should be. Now put the foundations under them.",
    "It's not what you look at that matters, it's what you see.",
    "Aim above morality. Be not simply good, be good for something.",
    "Disobedience is the true foundation of liberty. The obedient must be slaves.",
    "The universe is wider than our views of it.",
    "Truths and roses have thorns about them."
  ]

  function randomize(quotes){
    let random = quotes[Math.floor(Math.random()*quotes.length)];
    $('#quotes-line').html(random)
  }

  randomize(quotes)

})

//go through the array of quotes and return one randomly to display in the text box.
//Math.random [0,1] times the length of the array
//Math.floor to then turn the value into an interger which then will be parsed as a index value
