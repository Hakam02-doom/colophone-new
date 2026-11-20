import json, numpy as np, os
from PIL import Image, ImageFilter
import sys
R=sys.argv[1] if len(sys.argv)>1 else '.'
specs=json.load(open(f'{R}/specs.json'))
rng=np.random.default_rng(7)
def grade(img, seed):
    a=np.asarray(img).astype(np.float32)/255
    lum=(a@[0.2126,0.7152,0.0722])[...,None]
    # S-curve contrast with lifted blacks
    a=a+0.18*(a-0.5)*(1-np.abs(2*a-1))
    a=0.04+0.94*a
    # teal shadows / orange highlights split tone
    sh=np.clip(1-lum*2,0,1); hi=np.clip(lum*2-1,0,1)
    a+=sh*np.array([-0.035,0.02,0.045])+hi*np.array([0.05,0.015,-0.04])
    # slight desaturation of mids
    g=(a@[0.2126,0.7152,0.0722])[...,None]; a=g+(a-g)*0.92
    a=np.clip(a,0,1)
    h,w=a.shape[:2]
    # halation: blurred highlights tinted red-orange
    hm=np.clip((lum-0.72)/0.28,0,1)
    hb=np.asarray(Image.fromarray((hm[...,0]*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(max(w,h)/120))).astype(np.float32)[...,None]/255
    a=1-(1-a)*(1-hb*np.array([0.30,0.11,0.04]))
    # warm light leak from a corner
    yy,xx=np.mgrid[0:h,0:w].astype(np.float32)
    r=np.random.default_rng(seed); cx=w*(r.choice([-.1,1.1])); cy=h*r.uniform(-.1,.4)
    d=np.sqrt((xx-cx)**2+(yy-cy)**2)/max(w,h)
    leak=np.clip(1-d/0.55,0,1)**2*0.22
    a=1-(1-a)*(1-leak[...,None]*np.array([1.0,0.45,0.15]))
    # vignette
    vd=np.sqrt(((xx-w/2)/(w/2))**2+((yy-h/2)/(h/2))**2)
    a*=(1-0.38*np.clip(vd-0.45,0,1)**1.6)[...,None]
    # film grain, luminance-weighted
    gr=rng.normal(0,1,(h,w,1)).astype(np.float32)
    gr=np.asarray(Image.fromarray(np.clip(gr[...,0]*40+128,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32)[...,None]/255-0.5
    a+=gr*0.11*(0.5+0.5*(1-np.abs(2*lum-1)))
    return Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8))
for i,(out,(W,H),_) in enumerate(specs):
    im=Image.open(f'{R}/raw/{out}').convert('RGB')
    s=max(W/im.width,H/im.height,1.0)
    if s>1: im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
    grade(im,i).save(f'{R}/final/{out}',optimize=True)
    print(out,im.size)
