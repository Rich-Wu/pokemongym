
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
      this.picName = `img/${picName}.png`;
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

  function setScreen(trainer) {
    var trainerPic = document.getElementById('trainer');
    var pokemonImg1 = document.getElementById('pokeimg1');
    var pokemonImg2 = document.getElementById('pokeimg2');
    var pokemonImg3 = document.getElementById('pokeimg3');
    var flavor1 = document.getElementById('pokeflavor1');
    var flavor2 = document.getElementById('pokeflavor2');
    var flavor3 = document.getElementById('pokeflavor3');
    // var trainerPic = document.getElementById('trainer');
    // var trainerPic = document.getElementById('trainer');
    // var trainerPic = document.getElementById('trainer');

    trainerPic.setAttribute('src', `${trainer.picName}`);
    flavor1.innerHTML = `${trainer.pokemon[0].flavorText}`;
    flavor2.innerHTML = `${trainer.pokemon[1].flavorText}`;
    flavor3.innerHTML = `${trainer.pokemon[2].flavorText}`;
  }
