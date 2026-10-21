import {sitePath,routePath} from './paths';
import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
const Scene = lazy(() => import('./Scene'));
import './style.css';
import Work from './Work';
import LoadingSnake from './LoadingSnake';
import PhotoBoothFooter from './PhotoBoothFooter';
import Playground from './Playground';
import Polaroid from './Polaroid';
import Experience from './Experience';
import CaseStudy from './CaseStudy';
import {projects} from './projects';

function Home(){
 useLayoutEffect(()=>{const id=window.location.hash.slice(1);if(!id)return;const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame)},[]);
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [play,setPlay]=useState(()=>{try{return sessionStorage.getItem('elisa-intro')? -1:0}catch{return 0}});
 const [entering,setEntering]=useState(play!==-1&&!reduced);
 const timeline=useRef<gsap.core.Timeline|null>(null);
 const [sceneReady,setSceneReady]=useState(false);
 const onReady=useCallback(()=>setSceneReady(true),[]);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const listener=()=>setReduced(media.matches);media.addEventListener('change',listener);return()=>media.removeEventListener('change',listener)},[]);
 useLayoutEffect(()=>{const animate=!reduced&&play!==-1;setEntering(animate);const ctx=gsap.context(()=>{const tl=gsap.timeline({onComplete:()=>{setEntering(false);try{sessionStorage.setItem('elisa-intro','1')}catch{}}});timeline.current=tl;if(animate){tl.fromTo('h1',{y:100,opacity:0,rotate:2},{y:0,opacity:1,rotate:0,duration:1.15,ease:'power4.out'},.15).fromTo('.hero-foot, .bottomline',{y:12,opacity:0},{y:0,opacity:1,duration:.65,stagger:.12},1.15)}else{gsap.set('h1,.hero-foot,.bottomline',{clearProps:'all'});setEntering(false)}});return()=>ctx.revert()},[play,reduced]);
 function replay(){setPlay(v=>Math.max(0,v)+1);document.getElementById('home')?.scrollIntoView({behavior:'auto'})}
 function skip(){timeline.current?.progress(1);setPlay(-1);setEntering(false)}
 return <>
 <header className="nav"><a className="wordmark" href="#home" aria-label="Elisa Cose home">ec<span>✳</span></a><a className="location" href="#about">BASED IN NEW YORK, NY</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href={sitePath('/playground/')}>Playground</a><a href="mailto:elisa_cose@fitnyc.edu">Say hello <span>↗</span></a></nav></header>
 <main><section className="hero" id="home" aria-label="Meet Elisa Cose"><div className="name-wrap"><h1>ELISA <em>COSE</em><span className="period">.</span></h1></div><div className="scene-layer" aria-hidden="true"><Suspense fallback={null}><Scene play={play} reduced={reduced} onReady={onReady}/></Suspense></div><LoadingSnake loading={!sceneReady}/><div className="intro-controls">{entering?<button onClick={skip}>Skip intro ↗</button>:<button onClick={replay} aria-label="Replay intro animation"><span>↻</span> Replay intro</button>}</div><div className="hero-foot"><p>A people person with a world of ideas.<br/><span>Bringing them together, online & offline.</span></p></div><div className="bottomline"><span>EVENTS · CONTENT · DESIGN</span><span>SCROLL TO GET TO KNOW ME ↓</span></div></section>
 <Work reduced={reduced}/><Experience/>
 <section className="about-section" id="about"><div className="about-photo-column"><span className="eyebrow">03 / BEYOND THE INTRO</span><Polaroid reduced={reduced}/></div><div><h2>People person.<br/>Idea collector.<br/><em>Professional yapper.</em></h2><p>I’m Elisa, a New York–based content marketer, event organizer, and designer. I’m currently the Content Marketing and Events Lead at Henry AI, building connections across tech, creators, and community.</p><p>Outside of work? Probably a Vietnamese coffee in hand, Olivia Dean on repeat, and another idea for getting everyone together.</p><p className="education-note">Studying Advertising and Marketing Communications at the Fashion Institute of Technology, with graduation expected December 2026. Dean’s List · Phi Theta Kappa · Member of Rewrite the Code.</p><a href="https://www.linkedin.com/in/elisa-cose/" target="_blank" rel="noreferrer" className="text-link">Find me on LinkedIn ↗</a></div></section>
 <PhotoBoothFooter reduced={reduced}/></main>
 </>}
export default function App(){if(routePath().replace(/\/$/,'')==='/playground')return <Playground/>;const id=routePath().match(/^\/work\/([^/]+)\/?$/)?.[1];const project=projects.find(p=>p.id===id);if(project)return <CaseStudy project={project}/>;if(id)return <main className="case-heading"><h1>Project not found.</h1><a href={sitePath('/#work')}>← Back to work</a></main>;return <Home/>}
