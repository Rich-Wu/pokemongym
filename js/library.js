
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
