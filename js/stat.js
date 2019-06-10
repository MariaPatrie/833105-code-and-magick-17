'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var GAP_20 = 20;
var TEXT_HEIGHT = 20;
var HEADER_HEIGHT = GAP + TEXT_HEIGHT + TEXT_HEIGHT + GAP;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var barHeight = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_20, CLOUD_Y + GAP_20);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_20, CLOUD_Y + GAP_20 + TEXT_HEIGHT);
};

var renderColumns = function (ctx, player, time, count) {
  var colorOpacity = Math.random();

  ctx.fillStyle = '#000';
  ctx.fillText(
    time.toFixed(),
    CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * count,
    CLOUD_Y + HEADER_HEIGHT + (barHeight - (barHeight * time) / maxTime)
  );

  ctx.fillText(
    player,
    CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * count,
    CLOUD_Y + HEADER_HEIGHT + TEXT_HEIGHT + barHeight + GAP
  );

  ctx.fillStyle = player === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255,' + colorOpacity + ')';

  ctx.fillRect(
    CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * count,
    CLOUD_Y + HEADER_HEIGHT + TEXT_HEIGHT + (barHeight - (barHeight * time) / maxTime),
    BAR_WIDTH,
    (barHeight * time) / maxTime
  );
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    renderColumns(ctx, players[i], times[i], i);
  }
};
