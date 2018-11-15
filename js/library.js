
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
    }
}

class Trainer {
    constructor(name) {
      this.name = name;
      this.pokemon = [];
      this.ids = [];
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

        var xhttp = new XMLHttpRequest();
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
            // console.log(x);
            trainerName.pokemon.push(x)
          }
        }
        xhttp.open('GET',  `https://fizal.me/pokeapi/api/v2/id/${this.ids[i]}.json`,);
        xhttp.send();
      }


    }
}

var red = new Trainer('Red');
var ash = new Trainer('Ash Fetchum');
var bruce = new Trainer('Bruce Leroy');
var bald = new Trainer('Bald Eagle');

red.setPokemon(37, 135, 235, red);
ash.setPokemon(65, 18, 62, ash);
bruce.setPokemon(106, 539, 143, bruce);
bald.setPokemon(487, 150, 484, bald);
