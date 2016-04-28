import document
import time
evalstr = '''
var a=new XMLHttpRequest();a.open('GET','https://raw.githubusercontent.com/Zirientis/skulpt-canvas/master/l.js', false);a.send();eval(a.responseText);
'''
pre = document.getElementById('edoutput')

b = document.getElementById('runinjector')
if b == None:
	b = document.createElement('button')
	pre.appendChild(b)
b.innerHTML = 'Run'
b.setAttribute('id', 'runinjector')
b.setAttribute('onclick', evalstr)

canvas = document.getElementById('injectedcanvas')
if canvas != None:
	div = document.getElementsByClassName('main')[0]
	div.removeChild(canvas)

bridge = None
while True:
    time.sleep(1)
    bridge = document.getElementById('injectedcanvas')
    if bridge != None:
        break
bridge.innerHTML = 'ready'
while bridge.innerHTML != 'readyack':
    time.sleep(1)

# Put Python<->JS class here.
class Canvas:
    def fillRect(self, x, y, width, height):
        cmd = document.createElement('span');
        cmd.innerHTML = "fillrect {0} {1} {2} {3}".format(x, y, width, height)
        bridge.appendChild(cmd)























# Your code here
c = Canvas()
c.fillRect(20, 20, 50, 50)
