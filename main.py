import document
import time
evalstr = '''
var a=new XMLHttpRequest();a.open('GET','https://raw.githubusercontent.com/Zirientis/skulpt-canvas/master/l.js', false);a.send();eval(a.responseText);
'''
b = document.createElement('button')
b.innerHTML = 'Run'
b.setAttribute('id', 'runinjector')
b.setAttribute('onclick', evalstr)
pre = document.getElementById('edoutput')
pre.appendChild(b)

bridge = None
while True:
    time.sleep(1)
    bridge = document.getElementById('injectedcanvas')
    if bridge != None:
        break
bridge.innerHTML = 'ready'
# Put Python<->JS class here.
class Canvas:
    def fillRect(self, x, y, width, height):
        cmd = document.createElement('span');
        cmd.innerHTML = "{0} {1} {2} {3}".format(x, y, width, height)
		bridge.appendChild(cmd)























# Your code here
