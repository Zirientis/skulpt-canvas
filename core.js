_INJ = new Object();
(function() { //setup
var pre = document.getElementById('edoutput');
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
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, cv.width, cv.height);
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
		_INJ.linkUp = true;
		if (typeof onLinkReady === "function")
		{
			onLinkReady();
		}
	}
}
