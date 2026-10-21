import {sitePath} from './paths';
import {useEffect,useRef,lazy,Suspense} from 'react';
import LoadingSnake from './LoadingSnake';
import './playground.css';
const BlocksGame=lazy(()=>import('./BlocksGame'));
const items=[
 {title:'The Travel Tribe',kind:'Website',image:'projects/travel-tribe.jpg',href:sitePath('/work/travel-tribe/'),color:'#c9dfbc'},
 {title:'elisa.gpt',kind:'Video & storytelling',image:'projects/elisa-gpt.png',href:sitePath('/work/elisa-gpt/'),color:'#efb8d1'},
 {title:'Photo Club',kind:'Interactive experiment',image:'playground/photo-club.svg',href:sitePath('/#contact'),color:'#c9b9ea'},
 {title:'One more round',kind:'Playable experiment',image:'playground/blocks.svg',href:'#play',color:'#e4efaa'},
];
export default function Playground(){
 const rail=useRef<HTMLDivElement>(null);
 useEffect(()=>{document.title='Playground — Elisa Cose';const el=rail.current;if(!el)return;const center=()=>{el.scrollLeft=el.scrollWidth/3};center();const resize=new ResizeObserver(center);resize.observe(el);return()=>resize.disconnect()},[]);
 function wrap(){const el=rail.current;if(!el)return;const span=el.scrollWidth/3;if(el.scrollLeft<span*.5)el.scrollLeft+=span;else if(el.scrollLeft>span*1.5)el.scrollLeft-=span}
 function step(direction:number){const el=rail.current;if(el)el.scrollBy({left:direction*(el.querySelector('a')!.getBoundingClientRect().width+28),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 return <div className="playground-page"><header className="case-nav"><a className="wordmark" href={sitePath('/')} aria-label="Elisa Cose home">ec<span>✳</span></a><a href={sitePath('/#work')}>Selected work</a><a href="mailto:elisa_cose@fitnyc.edu">Say hello ↗</a></header><main className="playground-main"><div className="play-intro"><span className="eyebrow">A LITTLE OUTSIDE THE LINES</span><h1>Play<em>ground.</em></h1><p className="playground-intro">Mini projects, moving images,<br/>and things made <em>just because.</em></p></div><div className="play-controls"><span>Scroll. Pick something. Get curious.</span><div><button onClick={()=>step(-1)} aria-label="Previous projects">←</button><button onClick={()=>step(1)} aria-label="Next projects">→</button></div></div><div className="play-rail" ref={rail} onScroll={wrap} role="region" aria-label="Looping project collection" tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1)}}}>{[0,1,2].map(copy=><div className="play-set" key={copy} aria-hidden={copy!==1?true:undefined}>{items.map((item,i)=><a className="play-case" key={item.title} href={item.href} tabIndex={copy===1?0:-1} style={{'--cover':item.color} as React.CSSProperties}><div className="case-sleeve"><div className="case-spine"/><div className="case-cover"><img src={sitePath(item.image)} alt="" draggable={false}/><span className="case-number">EC — 0{i+1}</span></div><span className="case-shine"/></div><div className="play-caption"><div><span>{item.kind}</span><h2>{item.title}</h2></div><span aria-hidden="true">↗</span></div></a>)}</div>)}</div></main><div id="play"><Suspense fallback={<div className="claw-stage"><LoadingSnake loading={true}/></div>}><BlocksGame/></Suspense></div><footer className="playground-footer"><span>© {new Date().getFullYear()} ELISA COSE</span><a href={sitePath('/')}>Back to the portfolio ↗</a></footer></div>
}
