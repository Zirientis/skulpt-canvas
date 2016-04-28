function onLinkReady()
{
	demo();
}

function demo()
{
  var cv = _INJ.element;
	var ctx = _INJ.renderCtx;
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 20, 20);
	ctx.fillStyle = 'green';
	_INJ.demoTimer = setInterval(demoRect, 100);
	setTimeout(stop, 5000);
}
function demoRect()
{
	if (DEBUG)
	{
		console.debug("demoRect");
	}
	var ctx = _INJ.renderCtx;
	ctx.fillRect(800 * Math.random(), 800 * Math.random(), 20, 20);
}
function stop()
{
	if (DEBUG)
	{
		console.debug("stop");
	}
	clearInterval(_INJ.demoTimer);
  delete _INJ.demoTimer;
}
