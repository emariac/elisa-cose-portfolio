import {sitePath} from './paths';
import {useEffect,useRef,useState,lazy,Suspense} from 'react';
import LoadingSnake from './LoadingSnake';
import './playground.css';
const BlocksGame=lazy(()=>import('./BlocksGame'));
const items=[
 {title:'Comp 1',kind:'Video edit',image:'playground/comp-1.jpg',video:'playground/comp-1.mp4',color:'#d7e6b9'},
 {title:'DIVINE',kind:'Video edit',image:'playground/divine.jpg',video:'playground/divine.mp4',color:'#c9b9ea'},
 {title:'Testing testing 123',kind:'Video edit',image:'playground/testing-testing-123.jpg',video:'playground/testing-testing-123.mp4',color:'#efb8d1'},
];
export default function Playground(){
 const dialog=useRef<HTMLDialogElement>(null);
 const player=useRef<HTMLVideoElement>(null);
 const [selected,setSelected]=useState<(typeof items)[number]|null>(null);
 useEffect(()=>{if(selected){dialog.current?.showModal();player.current?.play().catch(()=>{})}},[selected]);
 function closeVideo(){player.current?.pause();dialog.current?.close();setSelected(null)}
 const rail=useRef<HTMLDivElement>(null);
 useEffect(()=>{document.title='Playground — Elisa Cose';const el=rail.current;if(!el)return;const center=()=>{el.scrollLeft=el.scrollWidth/3};center();const resize=new ResizeObserver(center);resize.observe(el);return()=>resize.disconnect()},[]);
 function wrap(){const el=rail.current;if(!el)return;const span=el.scrollWidth/3;if(el.scrollLeft<span*.5)el.scrollLeft+=span;else if(el.scrollLeft>span*1.5)el.scrollLeft-=span}
 function step(direction:number){const el=rail.current;if(el)el.scrollBy({left:direction*(el.querySelector('.play-case')!.getBoundingClientRect().width+28),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 return <div className="playground-page"><header className="case-nav"><a className="wordmark" href={sitePath('/')} aria-label="Elisa Cose home">ec<span>✳</span></a><a href={sitePath('/#work')}>Selected work</a><a href="mailto:elisa_cose@fitnyc.edu">Say hello ↗</a></header><main className="playground-main"><div className="play-intro"><span className="eyebrow">A LITTLE OUTSIDE THE LINES</span><h1>Play<em>ground.</em></h1><p className="playground-intro">Mini projects, moving images,<br/>and things made <em>just because.</em></p></div><div className="play-controls"><span>Scroll. Pick something. Get curious.</span><div><button onClick={()=>step(-1)} aria-label="Previous projects">←</button><button onClick={()=>step(1)} aria-label="Next projects">→</button></div></div><div className="play-rail" ref={rail} onScroll={wrap} role="region" aria-label="Looping project collection" tabIndex={0} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1)}}}>{[0,1,2].map(copy=><div className="play-set" key={copy} aria-hidden={copy!==1?true:undefined}>{[...items,...items,...items].map((item,i)=><button type="button" className="play-case" key={item.title+i} onClick={()=>setSelected(item)} aria-label={`Play ${item.title}`} tabIndex={copy===1?0:-1} style={{'--cover':item.color} as React.CSSProperties}><div className="case-sleeve"><div className="case-spine"/><div className="case-cover"><img src={sitePath(item.image)} alt="" draggable={false}/><span className="video-play" aria-hidden="true">▶</span><span className="case-number">EC — 0{i%items.length+1}</span></div><span className="case-shine"/></div><div className="play-caption"><div><span>{item.kind}</span><h2>{item.title}</h2></div><span aria-hidden="true">↗</span></div></button>)}</div>)}</div></main><dialog className="video-dialog" ref={dialog} onCancel={closeVideo} onClick={e=>{if(e.target===e.currentTarget)closeVideo()}} onClose={()=>{player.current?.pause();setSelected(null)}} aria-label={selected?.title||'Video player'}><button className="video-close" onClick={closeVideo} aria-label="Close video">×</button>{selected&&<><video ref={player} key={selected.video} src={sitePath(selected.video)} poster={sitePath(selected.image)} controls playsInline preload="metadata"/><p>{selected.title}</p></>}</dialog><div id="play"><Suspense fallback={<div className="claw-stage"><LoadingSnake loading={true}/></div>}><BlocksGame/></Suspense></div><footer className="playground-footer"><span>© {new Date().getFullYear()} ELISA COSE</span><a href={sitePath('/')}>Back to the portfolio ↗</a></footer></div>
}
