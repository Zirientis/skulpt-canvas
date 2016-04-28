// Fetches required resources and executes the core payload.
DEBUG = typeof DEBUG !== 'undefined' && DEBUG === true;
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
	for (var i = 0; i < resources.length; i++)
	{
		var r = resources[i];
		var parts = r.split('.');
		var ext = parts[parts.length - 1];
		if (ext == "png" || ext == "jpg")
		{
			// Handle images here.
		}
		else if (ext == "js")
		{
			var xhr = new XMLHttpRequest();
			xhr.open('GET', r + '?r=' + Math.random(), false);
			xhr.send();
			if (xhr.status != 200)
			{
				console.error("HTTP " + xhr.status);
				return;
			}
			eval(xhr.responseText);
		}
	}
})();
