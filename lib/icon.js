
var Canvas = require('canvas');

function star(ctx) {
  ctx.save();

  ctx.lineWidth = 2 / 100;
  ctx.rotate(Math.PI * (2/4));

  ctx.beginPath();

  function step(fn, i, l) {
    ctx[fn](Math.cos(Math.PI * (2/10) * i) * l, Math.sin(Math.PI * (2/10) * i) * l);
  }

  step('moveTo', 0, 0.2);
  step('lineTo', 1, 0.5);
  step('lineTo', 2, 0.2);
  step('lineTo', 3, 0.5);
  step('lineTo', 4, 0.2);
  step('lineTo', 5, 0.5);
  step('lineTo', 6, 0.2);
  step('lineTo', 7, 0.5);
  step('lineTo', 8, 0.2);
  step('lineTo', 9, 0.5);
  step('lineTo', 0, 0.2);

  ctx.fill();
  ctx.stroke();

  ctx.closePath();

  ctx.restore();
}

function heart(ctx) {
  ctx.save();

  ctx.lineWidth = 2 / (100 * 0.4);
  ctx.scale(0.4, 0.4);

  ctx.beginPath();

  ctx.moveTo(0, 1);
  ctx.lineTo(-1, 0);
  ctx.arc(-0.5, -0.5, Math.sqrt(2) / 2, 3/4 * Math.PI, 7/4 * Math.PI, false);
  ctx.arc(+0.5, -0.5, Math.sqrt(2) / 2, 5/4 * Math.PI, 1/4 * Math.PI, false);
  ctx.lineTo(0, 1);

  ctx.fill();
  ctx.stroke();

  ctx.closePath();

  ctx.restore();
}

module.exports = exports = function (opts) {

  var canvas = new Canvas(opts.size, opts.size);
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';

  ctx.fillRect(0, 0, opts.size, opts.size);

  ctx.fillStyle = opts.fill;
  ctx.strokeStyle = opts.stroke;

  ctx.translate(opts.size / 2, opts.size / 2);
  ctx.scale(100, 100);

  switch (opts.shape) {
    case 'heart':
      heart(ctx);
      break;
    case 'star':
      star(ctx);
      break;
    default:
      throw new Error('Unknown shape: ' + opts.shape);
  }

  return canvas.pngStream();
}
