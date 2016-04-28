_INJ = Object.create(null);
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
_INJ.linkUpTimer = setInterval(isLinkReady, 250);
_INJ.linkUp = false;

// Configure the JS<->Python link
var observer = new MutationObserver(mutationCallback);
_INJ.observer = observer;
})();

function isLinkReady()
{
	if (_INJ.linkUp == true)
	{
		return true;
	}
	var dat = _INJ.element.innerHTML;
	if (dat.length > 0 && dat.substr(0, 5) == 'ready')
	{
		clearInterval(_INJ.linkUpTimer);
		delete _INJ.linkUpTimer;
		_INJ.linkUp = true;
		var mutationConfig = { childList: true };
		_INJ.observer.observe(_INJ.element, mutationConfig);
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

function handleCommand(cmdarr)
{
	if (!isLinkReady())
	{
		console.error("link wasn't ready!");
		return;
	}
	var cmdname = cmdarr[0];
	if (DEBUG)
	{
		console.debug("decoding a " + cmdname);
	}
	switch (cmdname)
	{
		case "fillrect":
			if (cmdarr.length != 5)
			{
				console.warn("fillrect with bad args length; was " + cmdarr.length);
			}
			_INJ.renderCtx.fillRect(cmdarr[1], cmdarr[2], cmdarr[3], cmdarr[4]);
			break;
		case "ready":
			_INJ.element.innerHTML += "ack";
			break;
		default:
			console.warn("don't know how to handle command " + cmdname);
	}
}
