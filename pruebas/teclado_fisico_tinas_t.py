import subprocess,sys,time
from playwright.sync_api import sync_playwright
import os;root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
srv=subprocess.Popen([sys.executable,'-m','http.server','8798'],cwd=root,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.8)
SEED="ST.U=[{id:1,name:'Admin',email:'a@p.org',role:'admin',notify:true}];me=ST.U[0];save();RT=null;go('rtin')"
bad=[];errs=[]
def ok(c,t):
    print(('  ✔ ' if c else '  ✘ ')+t)
    if not c: bad.append(t)
with sync_playwright() as p:
    b=p.chromium.launch()
    for touch in (True,False):
        ctx=b.new_context(viewport={'width':1280,'height':900},has_touch=touch,is_mobile=False)
        pg=ctx.new_page();pg.on('pageerror',lambda e:errs.append(str(e)))
        if touch: pg.add_init_script("const _m=matchMedia.bind(window);window.matchMedia=q=>q.includes('pointer: coarse')?{matches:true,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}}:_m(q)")
        pg.goto('http://127.0.0.1:8798/index.html?modo=local');pg.wait_for_timeout(500);pg.evaluate(SEED);pg.wait_for_timeout(400)
        if pg.locator('#tnpad').count()==0: pg.locator('[data-kpo="1"]').first.click();pg.wait_for_timeout(300)
        tag='táctil' if touch else 'mouse'
        ok(pg.locator('#tnpad').count()==1,f'{tag}: teclado abierto')
        pg.locator('#tn_k1').click();pg.wait_for_timeout(150)
        ro=pg.evaluate("document.getElementById('tn_k1').readOnly");print('   readonly:',ro)
        for k in ['Numpad3','Numpad4','NumpadDecimal','Numpad9','Numpad5']: pg.keyboard.press(k)
        ok(pg.input_value('#tn_k1')=='34.95',f'{tag}: numpad escribe 34.95 (hay {pg.input_value("#tn_k1")!r})')
        pg.keyboard.press('Backspace');ok(pg.input_value('#tn_k1')=='34.9',f'{tag}: borrar')
        pg.keyboard.press('r');pg.wait_for_timeout(200)
        ok(pg.evaluate("RT.tn[1].z")==pg.evaluate("S[1]") and pg.evaluate("RT.act")==2,f'{tag}: R pone Mediana y pasa a tina 2')
        pg.evaluate("document.activeElement.blur()")
        for k in '12':pg.keyboard.press(k)
        pg.keyboard.press('NumpadEnter');pg.wait_for_timeout(200)
        ok(pg.evaluate("RT.tn[2]&&RT.tn[2].g")=='12' and pg.evaluate("RT.act")==3,f'{tag}: sin foco, 12 + Enter numérico va a tina 2 y pasa')
        ctx.close()
    ok(not errs,'sin errores JS '+';'.join(errs))
srv.terminate();print('TODO BIEN' if not bad else 'FALLAS')
