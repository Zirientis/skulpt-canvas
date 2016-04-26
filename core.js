(function() {
//console.log("hi!");
var pre = document.getElementById('edoutput');
pre.innerHTML = '';
//alert(_INJ.source);
//nw = window.open('data:text/html,<html><body><canvas id="inj"></canvas></body></html>', 'pop');
var cv = document.getElementById('injectedcanvas');
if (cv == null)
{
  cv = document.createElement('canvas');
  cv.id = 'injectedcanvas';
  cv.width = 800;
  cv.height = 800;
  pre.parentNode.insertBefore(cv, pre);
}
//cv = nw.document.getElementById('inj');
//alert('before paint');
var ctx = cv.getContext('2d');
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, cv.width, cv.height);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 20, 20);
_INJ.element = cv;
_INJ.renderCtx = ctx;

ctx.fillStyle = 'green';
_INJ.demoTimer = setInterval(demoRect, 100);
setTimeout(stop, 5000);
})();

function demoRect()
{
	var ctx = _INJ.renderCtx;
  ctx.fillRect(800 * Math.random(), 800 * Math.random(), 20, 20);
}
function stop()
{
	clearInterval(_INJ.demoTimer);
}
