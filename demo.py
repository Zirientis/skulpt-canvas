import document

pre = document.getElementById('edoutput')
pre.innerHTML = '''
<button onclick="var a=new XMLHttpRequest();a.open('GET','https://raw.githubusercontent.com/Zirientis/skulpt-canvas/master/core.js', false);a.send();console.log(a.response);">Run</button>
<span id="evaltext" style="display:none">
</span>
'''

# Put Python<->JS class here.
class FakeCanvas:
    def fillRect(self, x, y, width, height):
        pass
    
