import {mkdir,readFile,writeFile} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
for(const [slug,title] of [['off-the-clock','Off The Clock'],['elisa-gpt','elisa.gpt'],['rect','Rect'],['travel-tribe','The Travel Tribe']]){
 await mkdir(`dist/work/${slug}`,{recursive:true});
 await writeFile(`dist/work/${slug}/index.html`,html.replace(/<title>.*?<\/title>/,`<title>${title} — Elisa Cose</title>`));
}

await mkdir('dist/playground',{recursive:true});
await writeFile('dist/playground/index.html',html.replace(/<title>.*?<\/title>/,'<title>Playground — Elisa Cose</title>'));
