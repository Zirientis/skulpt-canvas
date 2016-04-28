_INJ = new Object();
(function() { //setup
var pre = document.getElementById('edoutput');
pre.innerHTML = '';
var cv = document.getElementById('injectedcanvas');
if (cv == null)
{
	cv = document.createElement('canvas');
	cv.id = 'injectedcanvas';
	cv.width = 800;
	cv.height = 800;
	pre.parentNode.insertBefore(cv, pre);
}
var ctx = cv.getContext('2d');
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, cv.width, cv.height);
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 20, 20);
_INJ.element = cv;
_INJ.renderCtx = ctx;
_INJ.linkUpTimer = setInterval(isLinkReady, 1000);
_INJ.linkUp = false;
})();

function isLinkReady()
{
	if (_INJ.element.innerHTML == 'ready')
	{
		clearInterval(_INJ.linkUpTimer);
		delete _INJ.linkUpTimer;
		if (typeof onLinkReady === "function")
		{
			onLinkReady();
		}
	}
}

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
