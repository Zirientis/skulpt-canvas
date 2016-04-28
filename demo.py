import document

pre = document.getElementById('edoutput')
pre.innerHTML = '''
<button onclick="var a=new XMLHttpRequest();a.open('GET','https://raw.githubusercontent.com/Zirientis/skulpt-canvas/master/l.js, false);a.send();eval(a.responseText);">Run</button>
<span id="evaltext" style="display:none">
</span>
'''

# Put Python<->JS class here.
class FakeCanvas:
    def fillRect(self, x, y, width, height):
        pass
    
