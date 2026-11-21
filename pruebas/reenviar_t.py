# v1.58.3 · «Volver a enviar» en «Correos enviados» (modo local, sin internet ni base real).
# Correr:  python3 -I pruebas/reenviar_t.py  → debe terminar en «TODO BIEN».
# Revisa los tres casos: el que no salió (Reintentar), el que se descartó (Mandarlo ahora) y el que sí salió (Volver a enviar).
import os, sys, subprocess, time, socket
from playwright.sync_api import sync_playwright
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get('PORT_REENVIAR', '8795'))
def libre(p):
    with socket.socket() as s: return s.connect_ex(('127.0.0.1',p))!=0
srv=None
if libre(PORT):
    srv=subprocess.Popen([sys.executable,'-m','http.server',str(PORT)],cwd=RAIZ,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(0.8)
MAL=[]
def ok(c,t):
    print(('  ✔ ' if c else '  ✘ ')+t)
    if not c: MAL.append(t)
SEED=r"""
ST.U=[{id:1,name:'Admin',email:'admin@propesa.org',role:'admin',notify:true}];me=ST.U[0];
const l='LTEST1';ST.R.push({id:'R-'+uidS(),lot:l,origin:'Proveedor X',tank:'T1',rdate:dLoc(),time:'08:00',date:fd(dLoc()),tn:[[1,S[1],30000]],final:null,closed:false});
ST.B[l]=[];post('RECEPCION',l,S[1],58);save();
ST.O.unshift({u:'E1',ev:'rec',t:'21/11/26, 3:33 p.m.',by:'Admin',subject:'[PROPESA] Lote LTEST1 · Recepción terminada',to:['a@x.com','b@x.com'],cc:[],body:'',ar:'',fs:['Formato 02 · lote LTEST1'],pk:['rec|LTEST1'],rf:['l:LTEST1'],ok:0,x:1,er:'Falta la llave RESEND_API_KEY'});
ST.O.unshift({u:'E2',ev:'rec',t:'21/11/26, 4:00 p.m.',by:'Admin',subject:'[PROPESA] Lote LTEST1 · Recepción terminada',to:['a@x.com'],cc:[],body:'',ar:'conectandoensenada@gmail.com',fs:['Formato 02 · lote LTEST1'],pk:['rec|LTEST1'],rf:['l:LTEST1'],ok:1});
ST.O.unshift({u:'E3',ev:'rec',t:'21/11/26, 5:00 p.m.',by:'Admin',subject:'[PROPESA] Lote LTEST1 · Recepción terminada',to:['a@x.com'],cc:[],body:'',ar:'',fs:['Formato 02 · lote LTEST1'],pk:['rec|LTEST1'],rf:['l:LTEST1'],ok:0,er:'No hay conexión'});
save();window.__sent=[];window.mlSendNow=async(D,to,cc,s,b)=>{window.__sent.push({to,s});return{ok:true}};
go('lote:'+l);"""
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':900})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(f'http://127.0.0.1:{PORT}/index.html?modo=local'); pg.wait_for_timeout(600)
    pg.evaluate(SEED); pg.wait_for_timeout(400)
    # abrir el plegable
    pg.evaluate("document.querySelectorAll('#mlsent summary,#mlsent .fsum,#mlsent [data-fold]').forEach(x=>x.click&&x.click())")
    pg.wait_for_timeout(300)
    tx=pg.locator('#mlsent').inner_text()
    print('--- texto ---'); print(tx); print('-------------')
    ok(pg.locator('[data-mlre2="E2"]').count()==1,'El enviado (✔) trae «Volver a enviar ›»')
    ok(pg.locator('[data-mlre="E1"]').count()==1,'El de «ya no hacía falta» trae «Mandarlo ahora»')
    ok(pg.locator('[data-mlre="E3"]').count()==1,'El que no salió sigue con «Reintentar»')
    ok(pg.locator('[data-mlno="E3"]').count()==1,'El que no salió sigue con «Ya no hace falta»')
    ok(pg.locator('[data-mlre2="E3"]').count()==0,'El que no salió no duplica botones')
    # click en «Volver a enviar» del enviado
    n0=pg.evaluate("ST.O.length")
    pg.locator('[data-mlre2="E2"]').click(); pg.wait_for_selector('#ml_atts',timeout=8000); pg.wait_for_timeout(400)
    ok(pg.locator('#ml_atts .mlatt').count()>=1,'Abre el borrador con su PDF otra vez')
    ok('a@x.com' in pg.locator('.mlbox').inner_text(),'Trae las mismas personas')
    pg.locator('#ml_send').click(); pg.wait_for_timeout(900)
    ok(len(pg.evaluate("window.__sent"))==1,'Se mandó')
    ok(pg.evaluate("ST.O.length")==n0+1,'Dejó un renglón NUEVO y no borró el de antes')
    ok(pg.evaluate("!!ST.O.find(x=>x.u==='E2'&&x.ok===1)"),'El renglón de antes sigue como ✔ Enviado')
    # click en «Mandarlo ahora» del descartado
    pg.wait_for_timeout(300)
    pg.evaluate("document.querySelectorAll('#mlsent summary,#mlsent .fsum,#mlsent [data-fold]').forEach(x=>x.click&&x.click())")
    pg.wait_for_timeout(300)
    n1=pg.evaluate("ST.O.length")
    pg.locator('[data-mlre="E1"]').click(); pg.wait_for_selector('#ml_atts',timeout=8000); pg.wait_for_timeout(400)
    pg.locator('#ml_send').click(); pg.wait_for_timeout(900)
    ok(pg.evaluate("ST.O.length")==n1,'El descartado reusa su renglón (no agrega otro)')
    ok(pg.evaluate("!!ST.O.find(x=>x.u==='E1'&&x.ok===1&&!x.x)"),'El descartado quedó como ✔ Enviado')
    pg.set_viewport_size({'width':390,'height':844}); pg.wait_for_timeout(400)
    ok(pg.evaluate("document.documentElement.scrollWidth<=392"),'390 px: no se sale de la pantalla')
    ok(not errs,'Sin errores de JavaScript'+(' · '+errs[0] if errs else ''))
    b.close()
if srv: srv.terminate()
print('TODO BIEN' if not MAL else 'FALLAS'); sys.exit(1 if MAL else 0)
