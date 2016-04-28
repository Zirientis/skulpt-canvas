_INJ = Object.create(null);

function isLinkReady()
{
	return _INJ.linkState === 2;
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
	/*
	if (!isLinkReady())
	{
		console.error("link wasn't ready!");
		return;
	}
	*/
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
			_INJ.linkState = 1;
			_INJ.bridge.innerHTML = "readyack";
			break;
		case "readyack":
			_INJ.linkState = 2;
			clearInterval(_INJ.linkStateTimer);
			delete _INJ.linkStateTimer;
			if (typeof onLinkReady === "function")
			{
				onLinkReady();
			}
			break;
		default:
			console.warn("don't know how to handle command " + cmdname);
	}
}



function _SETUP()
{
	if (DEBUG)
	{
		console.debug("DEBUG works!");
	}
	var pre = document.getElementById('edoutput');
	var cv = document.getElementById('injectedcanvas');
	if (cv == null)
	{
		cv = document.createElement('canvas');
		cv.width = 800;
		cv.height = 800;
		cv.id = 'injectedcanvas';
		pre.parentNode.insertBefore(cv, pre);
	}
	var br = document.getElementById('bridge');
	if (br == null)
	{
		br = document.createElement('div');
		cv.parentNode.insertBefore(br, cv);
	}
	var ctx = cv.getContext('2d');
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, cv.width, cv.height);
	_INJ.element = cv;
	_INJ.renderCtx = ctx;
	_INJ.linkState = 0;

	// Configure the JS<->Python link
	var obs = new MutationObserver(mutationCallback);
	var mutationConfig = { childList: true };
	obs.observe(br, mutationConfig);
	_INJ.observing = true;
	_INJ.observer = obs;
	_INJ.bridge = br;
	br.id = 'bridge'; // Don't create the ID until we're ready for Python
}
