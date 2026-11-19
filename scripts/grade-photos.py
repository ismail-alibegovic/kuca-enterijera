import json,sys,os,urllib.request,io
import numpy as np
from PIL import Image
S=os.path.dirname(os.path.abspath(__file__))  # expects photo-ids.json, photo-plan.json beside it; originals cache in ./.photo-cache
ids=json.load(open(f'{S}/photo-ids.json'))
OUT=os.path.join(S,'..','src','assets','photo')
os.makedirs(OUT,exist_ok=True)
# key -> (unsplash id, target median luminance)
plan=json.load(open(f'{S}/photo-plan.json'))
def fetch(uid):
    os.makedirs(f'{S}/../.photo-cache',exist_ok=True); p=f'{S}/../.photo-cache/{uid}.jpg'
    if not os.path.exists(p):
        u=f"https://images.unsplash.com/{ids[uid]}?fm=jpg&q=88&fit=max&w=2400&h=2400"
        open(p,'wb').write(urllib.request.urlopen(u,timeout=60).read())
    return Image.open(p).convert('RGB')
def grade(im,target,sat=0.78):
    a=np.asarray(im).astype(np.float32)/255
    lum=a@np.array([.2126,.7152,.0722],dtype=np.float32)
    med=float(np.median(lum))
    g=np.log(target)/np.log(max(min(med,.95),.02))
    a=np.clip(a,1e-4,1)**g
    lum=a@np.array([.2126,.7152,.0722],dtype=np.float32)
    # gentle S-curve contrast around mid
    a=a+0.12*(a-a**2)*(a-0.5)*-1  # soft
    # desaturate 22%
    lum=(a@np.array([.2126,.7152,.0722],dtype=np.float32))[...,None]
    a=lum+(a-lum)*sat
    # split tone: warm shadows (umber), cream highlights
    l=lum
    sh=np.clip(1-l*2.2,0,1); hi=np.clip((l-.55)*2.2,0,1)
    a=a+sh*np.array([.018,.008,-.012])+hi*np.array([.02,.012,-.01])
    # matte blacks / soft highlight rolloff
    a=0.028+a*(0.94-0.028)
    # vignette
    h,w=a.shape[:2]; yy,xx=np.mgrid[0:h,0:w]
    r=np.sqrt(((xx-w/2)/(w/2))**2+((yy-h/2)/(h/2))**2)/np.sqrt(2)
    a=a*(1-0.28*np.clip(r-0.35,0,1)**1.6)[...,None]
    return Image.fromarray((np.clip(a,0,1)*255+.5).astype(np.uint8))
only=sys.argv[1:]
for key,spec in plan.items():
    uid,target=spec[0],spec[1]; sat=spec[2] if len(spec)>2 else 0.78
    if only and key not in only: continue
    im=grade(fetch(uid),target,sat)
    im.save(f'{OUT}/{key}.jpg',quality=84,optimize=True,progressive=True)
    print(key,im.size)
