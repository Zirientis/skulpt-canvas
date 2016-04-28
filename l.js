// Fetches required resources and executes the core payload.
var DEBUG = typeof DEBUG !== 'undefined' && DEBUG === true;
_LOADER = new Object();
(function() {
	var reslistxhr = new XMLHttpRequest();
	reslistxhr.open('GET', 'https://raw.githubusercontent.com/Zirientis/skulpt-canvas/master/resources.txt?r=' + Math.random(), false);
	reslistxhr.send();
	if (reslistxhr.status != 200)
	{
		console.error("HTTP " + reslistxhr.status);
		return;
	}
	var rstr = reslistxhr.responseText;
	var resources = rstr.split('\n');
	if (DEBUG)
	{
		console.debug(resources);
	}
	var headElem = document.getElementsByTagName('head')[0];
	for (var i = 0; i < resources.length; i++)
	{
		var r = resources[i];
		if (r.charAt(0) == '#' || r == '') // Ignore lines starting with '#'
		{
			continue;
		}
		var parts = r.split('.');
		var ext = parts[parts.length - 1];
		if (ext == "png" || ext == "jpg")
		{
			console.warn("Loading images not yet supported!");
		}
		else if (ext == "js")
		{
			if (DEBUG)
			{
				console.debug("loading script at " + r);
			}
			var xhr = new XMLHttpRequest();
			xhr.open('GET', r + '?r=' + Math.random(), false);
			xhr.send();
			if (xhr.status != 200)
			{
				console.error("HTTP " + xhr.status);
				return;
			}
			var s = document.createElement('script');
			s.innerHTML = xhr.responseText;
			headElem.appendChild(s);
		}
	}
	_SETUP();
})();
