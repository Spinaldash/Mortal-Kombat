/*global Weapon */
/*global Fighter */
'use strict';

$(document).ready(init);

function init() {
  playTheme();
  createFighters();
  createWeapons();
  paintFighters();
  paintWeapons();
  chooseFighter();
  $('#weapons').on('click', '.weapon:not(".picked")', clickWeapon);
  $('#declare').click(enterArena);
  $('#fight').click(clickFight);

}

var weapons = [];
var fighters = [];
var equipped = [];
var deadFighters = [];
var arena = [];

function enterArena() {
  if (arena.length !== 2 && equipped.length >= 2 ) { //run if arena is not full
    arena = []; // reset arena
      var p1 = _.sample(equipped); //find 2 fighters
      var p2;
      while(true){ // make sure fighter 2 is not a duplicate of f1
        p2 = _.sample(equipped);
        if(p2.name !== p1.name){
          break;
        }
      }
    arena.push(p1, p2); //put fighters into the arena
    var $p1 = $('.fighter:contains("' + p1.name + '")'); // This finds the object's DIV
    var $p2 = $('.fighter:contains("' + p2.name + '")');
    $p1.addClass('arena');
    $p2.addClass('arena');

  } else {
      console.log ('arena is full or Not enough equipped fighters');
    }
}

function clickFight() {
  var p1 = _.sample(arena); //find 2 fighters
  var p2;
  while(true){ // make sure fighter 2 is not a duplicate of f1
    p2 = _.sample(arena);
    if(p2.name !== p1.name){
      break;
    }
  }
    console.log(p2.name + " " + p2.health)
    p1.hit(p2);
    console.log(p2.name + " " + p2.health)
    checkDeath(p2);

}

function checkDeath(defender) {
  if (defender.health <= 0) {
      console.log('defender is dead');
      var $defender = $('.fighter:contains("' + defender.name + '")');
      $defender.removeClass('arena')
      $defender.addClass('dead')
  }
}

function clickWeapon() {
  var weaponName = $(this).find('.name').text();
  var weapon = _.find(weapons, function(w){return w.name === weaponName;});
  var $fighter = $('.choose');
  var fighterName = $fighter.find('.name').text();
  var fighter = _.find(fighters, function(f) {return f.name === fighterName;});
  fighter.weapon = weapon;
  equipWeapon($fighter, weapon);
  equipped.push(_.remove(fighters, function(f){return f.name === fighterName;})[0]);
  $(this).addClass('picked');
  $fighter.removeClass('choose');

  if (fighters.length) {
    chooseFighter();
  }
}

function chooseFighter() {
  var fighter =_.sample(fighters);
  var $fighter = $('.fighter:contains("' + fighter.name + '")');
  $fighter.addClass('choose');
  console.log(fighter);
}

function playTheme() {
  $('audio').attr('src', '/audio/skyrim_theme.mp3');
  $('audio')[0].play();
}

function createWeapons() {
  var w1 = new Weapon('Fire_&_Ice', 'http://8e8460c4912582c4e519-11fcbfd88ed5b90cfb46edba899033c9.r65.cf1.rackcdn.com/sales/cardscans/MTG/MMA/en/nonfoil/SwordOfFireAndIce.jpg');
  var w2 = new Weapon('Godsend', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=380426&type=card');
  var w3 = new Weapon('Tatsumasa', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=75291&type=card');
  var w4 = new Weapon('Unscyth', 'http://mythicspoiler.com/arb/cards/unscythekillerofkings.jpg');
  var w5 = new Weapon('GhostFire_Blade', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=394074&type=card');
  var w6 = new Weapon('Feast_&_Famine', 'http://41.media.tumblr.com/1052f499f58744c9454bbc2698d8b88a/tumblr_mvd9jchJKW1qzr2iro5_400.jpg');

  weapons.push(w1, w2, w3, w4, w5, w6);
}

function createFighters() {
  var w1 = new Fighter('Sorin', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=249985&type=card');
  var w2 = new Fighter('Sarkhan', 'http://www.mythicspoiler.com/ktk/cards/sarkhanthedragonspeaker.jpg');
  var w3 = new Fighter('Garruk', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=383251&type=card');
  var w4 = new Fighter('Chandra', 'http://www.planeswalkerslibrary.com/images/m14/132.jpg?9.01.2014');
  var w5 = new Fighter('Jace', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=195297&type=card');
  var w6 = new Fighter('Elspeth', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=373649&type=card');

  fighters.push(w1, w2, w3, w4, w5, w6);
}
function paintWeapons() {

  weapons.forEach(function(weapon) {
    var $outer = $('<div>');
    $outer.addClass('weapon');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + weapon.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.text(weapon.name);
    $name.addClass('name title');

    var $damage = $('<div>');
    $damage.text('Damage: ' + weapon.damage);


    $outer.append($img, $info);
    $info.append($name, $damage);
    $('#weapons').append($outer);
  });
}
function paintFighters() {

  fighters.forEach(function(fighter) {
    var $outer = $('<div>');
    $outer.addClass('fighter');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + fighter.image + '")');

    var $info = $('<div>');
    $info.addClass('statsPanel');

    var $name = $('<div>');
    $name.text(fighter.name);
    $name.addClass('name title');

    var $strength = $('<div>');
    $strength.text('Strength: ' + fighter.strength);

    var $armor = $('<div>');
    $armor.text('Armor: ' + fighter.armor);

    var $health = $('<div>');
    $health.addClass('health');
    $health.text('Health: ' + fighter.health);

    $outer.append($img, $info);
    $info.append($name, $strength, $health, $armor);
    $('#fighters').append($outer);
  });
}

function equipWeapon($fighter, weapon) {
  $fighter.find('.statsPanel').append('<div>w: '+ weapon.name +'</div>');
}
