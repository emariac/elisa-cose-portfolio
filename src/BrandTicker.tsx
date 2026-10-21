import {useState} from 'react';
import {sitePath} from './paths';
import './ticker.css';
const names=['Wix','Symphony','Tangle','Airwallex','Anthropic','Y Combinator','Henry AI'];
const logos=[['1','Tapstitch'],['0','French Connection'],['2','Motel Rocks'],['3','U Beauty'],['4','ILIA'],['6','Dé Rococo'],['7','Saie'],['8','KHY'],['9','Avec Les Filles']];
export default function BrandTicker(){const [paused,setPaused]=useState(false);return <section className={'brand-ticker'+(paused?' is-paused':'')} aria-label="Brands and organizations"><div className="brand-track">{[0,1].map(copy=><div className="brand-set" key={copy} aria-hidden={copy===1?true:undefined}>{names.map(name=><span className={'brand-wordmark brand-'+name.toLowerCase().replaceAll(' ','-')} key={name}>{name}</span>)}{logos.map(([file,name])=><img key={name} src={sitePath('brands/'+file+'.png')} alt={name}/>)}</div>)}</div><button className="ticker-pause" onClick={()=>setPaused(v=>!v)} aria-label={paused?'Play brand ticker':'Pause brand ticker'}>{paused?'▷':'Ⅱ'}</button></section>}
