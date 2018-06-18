'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var FONT_HEIGHT = 24;
var PLAYER_NAME_Y = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_HEIGHT;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var renderText = function (ctx, text, x, y) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'top';
  ctx.textAlign = 'start';
  ctx.fillText(text, x, y);
};

var getRandom = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  renderText(ctx, 'Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP + FONT_HEIGHT);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    renderText(ctx, names[i], CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, PLAYER_NAME_Y);
    var columnColor = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + getRandom(0.3, 1) + ')';

    ctx.fillStyle = columnColor;
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, PLAYER_NAME_Y - GAP, COLUMN_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime + GAP);
    renderText(ctx, Math.round(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_GAP + COLUMN_WIDTH) * i, PLAYER_NAME_Y - GAP - (BAR_HEIGHT * times[i]) / maxTime - GAP / 2);
  }
};
