import {lazy,Suspense,useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const Details=lazy(()=>import("./Details"));
const API=import.meta.env.VITE_API_URL||"http://localhost:4000/api";
type Row={id:string;title:string;location:string;category:string;createdAt:string;company:{name:string}};
type Page={data:Row[];page:number;limit:number;total:number;totalPages:number};

function App(){
 const[q,setQ]=useState(""),[search,setSearch]=useState(""),[location,setLocation]=useState(""),[category,setCategory]=useState(""),[sort,setSort]=useState("created_desc"),[page,setPage]=useState(1),[data,setData]=useState<Page|null>(null),[opts,setOpts]=useState({locations:[] as string[],categories:[] as string[]}),[selected,setSelected]=useState<Row|null>(null),[error,setError]=useState("");
 useEffect(()=>{const t=setTimeout(()=>{setSearch(q);setPage(1)},350);return()=>clearTimeout(t)},[q]);
 useEffect(()=>{fetch(API+"/internships/options").then(r=>r.ok?r.json():Promise.reject()).then(setOpts).catch(()=>{})},[]);
 useEffect(()=>{const p=new URLSearchParams({search,location,category,sort,page:String(page),limit:"12"});setError("");fetch(API+"/internships?"+p).then(r=>r.ok?r.json():Promise.reject()).then(setData).catch(()=>setError("Unable to load internships.")).finally(()=>{} )},[search,location,category,sort,page]);
 return <main>
  <header><div><small>TalentBridge</small><h1>Internship catalog</h1><p>Optimized server-side search, filters and pagination.</p></div></header>
  <section className="toolbar">
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title or company…" aria-label="Search"/>
   <select value={location} onChange={e=>{setLocation(e.target.value);setPage(1)}}><option value="">All locations</option>{opts.locations.map(x=><option key={x}>{x}</option>)}</select>
   <select value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}}><option value="">All categories</option>{opts.categories.map(x=><option key={x}>{x}</option>)}</select>
   <select value={sort} onChange={e=>{setSort(e.target.value);setPage(1)}}><option value="created_desc">Newest</option><option value="created_asc">Oldest</option><option value="title_asc">Title A–Z</option><option value="title_desc">Title Z–A</option></select>
  </section>
  {error&&<div className="note">{error}</div>}
  {data?.data.length?<div className="grid">{data.data.map(x=><article className="card" key={x.id} onClick={()=>setSelected(x)} tabIndex={0} onKeyDown={e=>e.key==="Enter"&&setSelected(x)}><small>{x.category}</small><h2>{x.title}</h2><b>{x.company.name}</b><p>{x.location}</p><small>{new Date(x.createdAt).toLocaleDateString()}</small></article>)}</div>:<div className="empty"><h2>{error?"":"No internships found"}</h2><p>{error?"Retry after checking the API.":"Clear a filter or change your search."}</p></div>}
  {data&&<nav className="pager"><button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button><span>Page {page} of {Math.max(data.totalPages,1)} · {data.total} results</span><button disabled={page>=data.totalPages} onClick={()=>setPage(page+1)}>Next</button></nav>}
  <Suspense fallback={null}>{selected&&<Details row={selected} onClose={()=>setSelected(null)}/>}</Suspense>
 </main>
}
createRoot(document.getElementById("root")!).render(<App/>);
