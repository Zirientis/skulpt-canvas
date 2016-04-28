function onLinkReady()
{
	demo();
}

function demo()
{
	var ctx = _INJ.renderCtx;
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
}
