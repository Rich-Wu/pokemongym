
class Pokemon {
    constructor(name, hp, def, atk, spDef, spAtk, speed, idNum) {
      this.name = name;
      this.hp = hp;
      this.def = def;
      this.atk = atk
      this.spDef = spDef;
      this.spAtk = spAtk;
      this.speed = speed;
      this.idNum = idNum;
      this.picture = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + threeDigits(idNum) + ".png";
      this.abilities = [];
      this.flavorText = undefined;
    }
}

class Trainer {
    constructor(name, picName, trainerText) {
      this.name = name;
      this.pokemon = [];
      this.ids = [];
      this.picUrl = `img/${picName}.png`;
      this.trainerText = trainerText;
    }
    all() {
      return this.pokemon;
    }
    getPokemon(pokemon) {
      for (var i = 0; i < this.pokemon.length; i++) {
        if (this.pokemon[i].name == pokemon) {
          return this.pokemon[i];
        }
      }
        return console.log('You do not have this pokemon');
    }

    setPokemon(num1, num2, num3, trainerName) {
      this.ids.push(num1, num2, num3);

      for (var i = 0; i < this.ids.length; i++) {

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var x = new Pokemon(
              data['species']['name'],
              data['stats'][5]['base_stat'],
              data['stats'][3]['base_stat'],
              data['stats'][4]['base_stat'],
              data['stats'][1]['base_stat'],
              data['stats'][2]['base_stat'],
              data['stats'][0]['base_stat'],
              data['id']
            );
            for (var i = 0; i < data['abilities'].length; i++) {
              x.abilities.push(data['abilities'][i]['ability']['name']);
            }
            addFlavor(x, trainerName);
          }
        }
        xhttp.open('GET',  `https://fizal.me/pokeapi/api/v2/id/${this.ids[i]}.json`,);
        xhttp.send();
      }


    }
}


function addFlavor(pokemon, trainerName) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemon.idNum + "/", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      for (entries in data['flavor_text_entries']) {
        if (data['flavor_text_entries'][entries]['language']['name'] == 'en'){
          pokemon.flavorText = data['flavor_text_entries'][entries]['flavor_text'];
          }
        }
        trainerName.pokemon.push(pokemon);
      }
    }
  };

function changeTrainer() {
  // console.log('something happened');
  $('#trainerCarousel').carousel(document.getElementsByTagName('select')[0].options.selectedIndex);
}

function threeDigits(num) {
  if (num.toString().length == 3) {
    return num;
  } else {
    num = "0" + num.toString();
    return threeDigits(num);
  }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$('#trainerCarousel').on('slide.bs.carousel', function () {
console.log('something is sliding');
})


function setScreen() {
    var pokemon = document.querySelectorAll('.pokemon');
    var flavor = document.querySelectorAll('.flavortext');
    var hp = document.querySelectorAll('.hp');
    var def = document.querySelectorAll('.def');
    var abilities = document.querySelectorAll('.abilities');
    let trainerNum = 0;
    if (document.getElementsByClassName('active')[0].id == 'red') {

        for (var i = 0; i < pokemon.length; i++) {
          pokemon[i].innerHTML = red.pokemon[i].name;
        }

        for (var i = 0; i < flavor.length; i++) {
          flavor[i].innerHTML = red.pokemon[i].flavorText;
        }

        for (var i = 0; i < hp.length; i++) {
          hp[i].innerHTML = `HP: ${red.pokemon[i].hp}`;
        }

        for (var i = 0; i < def.length; i++) {
          def[i].innerHTML = `DEF: ${red.pokemon[i].def}`;
        }

        for (var i = 0; i < atk.length; i++) {
          atk[i].innerHTML = ` ATK: ${red.pokemon[i].atk}`;
        }

        for (var i = 0; i < abilities.length; i++) {
          abilities[i].innerHTML = `Abilities: ${red.pokemon[i].abilties}`;
        }
    } else

    if (document.getElementsByClassName('active')[0].id == 'bald') {

        for (var i = 0; i < pokemon.length; i++) {
          pokemon[i].innerHTML = bald.pokemon[i].name;
        }

        for (var i = 0; i < flavor.length; i++) {
          flavor[i].innerHTML = bald.pokemon[i].flavorText;
        }

        for (var i = 0; i < hp.length; i++) {
          hp[i].innerHTML = `HP: ${bald.pokemon[i].hp}`;
        }

        for (var i = 0; i < def.length; i++) {
          def[i].innerHTML = `DEF: ${bald.pokemon[i].def}`;
        }

        for (var i = 0; i < atk.length; i++) {
          atk[i].innerHTML = ` ATK: ${bald.pokemon[i].atk}`;
        }

        for (var i = 0; i < abilities.length; i++) {
          abilities[i].innerHTML = `Abilities: ${bald.pokemon[i].abilties}`;
        }
    } else

    if (document.getElementsByClassName('active')[0].id == 'ash') {

        for (var i = 0; i < pokemon.length; i++) {
          pokemon[i].innerHTML = ash.pokemon[i].name;
        }

        for (var i = 0; i < flavor.length; i++) {
          flavor[i].innerHTML = ash.pokemon[i].flavorText;
        }

        for (var i = 0; i < hp.length; i++) {
          hp[i].innerHTML = `HP: ${ash.pokemon[i].hp}`;
        }

        for (var i = 0; i < def.length; i++) {
          def[i].innerHTML = `DEF: ${ash.pokemon[i].def}`;
        }

        for (var i = 0; i < atk.length; i++) {
          atk[i].innerHTML = ` ATK: ${ash.pokemon[i].atk}`;
        }

        for (var i = 0; i < abilities.length; i++) {
          abilities[i].innerHTML = `Abilities: ${ash.pokemon[i].abilties}`;
        }
    } else

    if (document.getElementsByClassName('active')[0].id == 'bruce') {

        for (var i = 0; i < pokemon.length; i++) {
          pokemon[i].innerHTML = bruce.pokemon[i].name;
        }


        for (var i = 0; i < flavor.length; i++) {
          flavor[i].innerHTML = bruce.pokemon[i].flavorText;
        }

        for (var i = 0; i < hp.length; i++) {


        for (var i = 0; i < hp.length; i++) {
          hp[i].innerHTML = `HP: ${bruce.pokemon[i].hp}`;
        }

        for (var i = 0; i < def.length; i++) {
          def[i].innerHTML = `DEF: ${bruce.pokemon[i].def}`;
        }

        for (var i = 0; i < atk.length; i++) {
          atk[i].innerHTML = ` ATK: ${bruce.pokemon[i].atk}`;
        }

        for (var i = 0; i < abilities.length; i++) {
          abilities[i].innerHTML = `Abilities: ${bruce.pokemon[i].abilties}`;
        }
}
}
}
