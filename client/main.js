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
  chooseWeapon();
  $('#weapons').on('click', '.weapon', clickWeapon);
}

var weapons = [];
var fighters = [];
var unequipped = [];

function clickWeapon() {
  var name = $(this).find('.name').text();
  var weapon = _.find(weapons, function(w){return w.name === name});
  debugger;
  console.log(name, weapon);
}

function chooseWeapon() {
  var fighter =_.sample(fighters);
  var $fighter = $('.fighter:contains("' + fighter.name + '")');
  $fighter.addClass('choose');
  console.log(fighter);
}

function playTheme() {
  $('audio').attr('src', '/audio/MKTheme.mp3');
  $('audio')[0].play();
}

function createWeapons() {
  var w1 = new Weapon('Fire_&_Ice', 'http://8e8460c4912582c4e519-11fcbfd88ed5b90cfb46edba899033c9.r65.cf1.rackcdn.com/sales/cardscans/MTG/MMA/en/nonfoil/SwordOfFireAndIce.jpg');
  var w2 = new Weapon('Godsend', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=380426&type=card');
  var w3 = new Weapon('Growth_&_Decay', 'http://surrealmemoir.com/wp-content/uploads/2010/09/Sword-of-Growth-and-Decay.png');
  var w4 = new Weapon('Unscyth', 'http://mythicspoiler.com/arb/cards/unscythekillerofkings.jpg');
  var w5 = new Weapon('GhostFire_Blade', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=394074&type=card');
  var w6 = new Weapon('Feast_&_Famine', 'http://41.media.tumblr.com/1052f499f58744c9454bbc2698d8b88a/tumblr_mvd9jchJKW1qzr2iro5_400.jpg');

  weapons.push(w1, w2, w3, w4, w5, w6);
  console.log('ran CWeap');
}

function createFighters() {
  var w1 = new Fighter('Sorin', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=249985&type=card');
  var w2 = new Fighter('Sarkhan', 'http://www.mythicspoiler.com/ktk/cards/sarkhanthedragonspeaker.jpg');
  var w3 = new Fighter('Elspeth', 'http://static.tappedout.net/mtg-cards-2/Duel-Decks-Elspeth-vs-Kiora/elspeth-suns-champion/mtg-cards/_user-added/quesobueno123-elspeth-suns-champion-14183455620.png');
  var w4 = new Fighter('Chandra', 'http://www.planeswalkerslibrary.com/images/m14/132.jpg?9.01.2014');
  var w5 = new Fighter('Jace', 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=195297&type=card');
  var w6 = new Fighter('Ashiok', 'http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/c6/6f/c66fdd22264f2b462206c17f220b6c4c.jpg?itok=f63ro1Y1');

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
    $name.addClass('name');

    var $damage = $('<div>');
    $damage.text(weapon.damage);

    $outer.append($img, $info);
    $info.append($name, $damage);
    $('#weapons').append($outer);
    console.log('ran PWeap');
  });
}
function paintFighters() {

  fighters.forEach(function(fighter) {
    var $outer = $('<div>');
    $outer.addClass('fighter');

    var $img = $('<div>');
    $img.css('background-image', 'url("' + fighter.image + '")');

    var $info = $('<div>');
    var $name = $('<div>');
    $name.text(fighter.name);

    var $strength = $('<div>');
    $strength.text('S: ' + fighter.strength);

    var $armor = $('<div>');
    $armor.text('A: ' + fighter.armor);

    var $health = $('<div>');
    $health.text('H: ' + fighter.health);

    $outer.append($img, $info);
    $info.append($name, $strength, $health, $armor);
    $('#fighters').append($outer);
    console.log('ran PFite');
  });
}
