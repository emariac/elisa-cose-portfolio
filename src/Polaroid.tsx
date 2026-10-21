import {sitePath} from './paths';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
export default function Polaroid({reduced}:{reduced:boolean}){
 const [state,setState]=useState<'blank'|'developing'|'developed'>('blank');
 const photo=useRef<HTMLImageElement>(null);const flash=useRef<HTMLSpanElement>(null);const animation=useRef<gsap.core.Timeline|null>(null);
 useEffect(()=>()=>{animation.current?.kill()},[]);
 function develop(){if(state==='developing')return;animation.current?.kill();setState('developing');const tl=gsap.timeline({onComplete:()=>setState('developed')});animation.current=tl;tl.set(photo.current,{opacity:0,filter:'blur(14px) brightness(1.9) saturate(0)'}).set(flash.current,{opacity:reduced?0:.8}).to(flash.current,{opacity:0,duration:reduced?0:.45}).to(photo.current,{opacity:1,duration:reduced?0:1.7,ease:'power1.inOut'},reduced?0:.35).to(photo.current,{filter:'blur(0px) brightness(1) saturate(1)',duration:reduced?0:2.8,ease:'power2.out'},reduced?0:.5)}
 return <div className="polaroid-wrap"><button className={`polaroid polaroid-${state}`} onClick={develop} disabled={state==='developing'} aria-label="Click to develop a photo of Elisa"><span className="polaroid-window"><img ref={photo} src={sitePath('/projects/elisa-polaroid.jpeg')} alt="Elisa wearing sunglasses and a riding helmet on horseback"/><span className="polaroid-flash" ref={flash}/></span><span className="polaroid-caption" aria-hidden="true"/><span className="polaroid-hint">Click to develop</span></button><span className="sr-only" role="status" aria-live="polite">{state==='developed'?'Photo developed.':state==='developing'?'Photo developing.':''}</span></div>
}
