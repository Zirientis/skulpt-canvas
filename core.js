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

// Configure the JS<->Python link
var observer = new MutationObserver(mutationCallback);
var mutationConfig = { childList: true };
observer.observe(cv, mutationConfig);
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

function mutationCallback(mutations, observer)
{
	if (DEBUG)
	{
		console.debug("observer called with " + mutations.length + " records");
	}
	for (var mri = 0; mri < mutations.length; mri++)
	{
		var mr = mutations[mri].addedNodes;
		if (DEBUG)
		{
			console.debug("record " + mri + ": " + mr.length + " nodes added");
		}
		for (var i = 0; i < mr.length; i++)
		{
			var mut = mr[i];
			var cmdstr = mut.textContent;
			if (DEBUG)
			{
				console.debug("recieved command: " + cmdstr);
				var cmd = cmdstr.split(' ');
				handleCommand(cmd);
			}
		}
	}
}

function handleCommand(cmdwargs)
{
	var cmdname = cmdwargs[0];
	if (DEBUG)
	{
		console.debug("executing a " + cmdname);
	}
}
