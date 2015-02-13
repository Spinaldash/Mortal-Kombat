/* global _ */
/* exported Fighter */
'use strict';

function Fighter(name, image) {
  this.name = name;
  this.image = image;
  this.strength = _.random(1, 20);
  this.health = _.random(1, 20);
  this.armor = _.random(1, 20);
}
