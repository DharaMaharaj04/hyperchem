import React, { useEffect, useMemo, useState } from "react";



// --- Simple Hash Router (no deps) ---
const routes = ["/", "/products", "/careers", "/about", "/contact"];
function useHashRoute() {
  const [path, setPath] = useState(window.location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return routes.includes(path) ? path : "/";
}
const Link = ({ to, children, className="" }) => (
  <a href={`#${to}`} className={className}>{children}</a>
);

// --- Theme helpers ---
const brand = {
  dark: "#131c2b", // navy from logo
  green: "#39b54a", // logo green
};
const gradientBorder = "bg-gradient-to-r from-emerald-400 via-emerald-500 to-lime-400";
const primaryBtn =
  "rounded-2xl px-5 py-2 font-medium shadow-sm ring-1 ring-black/5 hover:shadow transition";

// --- Layout ---
function Shell({ children }) {
  return (
    <div className="min-h-screen text-slate-900" style={{ background: `linear-gradient(180deg, #ffffff 0%, rgba(240,247,244,.6) 100%)` }}>
      <AnnouncementBar />
      <Nav />
      <main className="mx-auto max-w-[90rem] px-6 lg:px-8 pb-24 pt-10">{children}</main>
      <Footer />
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="w-full text-center text-xs md:text-sm py-2" style={{background: brand.dark, color: "white"}}>
      Building India’s semiconductor‑grade chemicals & gases ecosystem.
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200/70">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#/" className="flex items-center gap-3 hover:opacity-80">
          <Logo />
          <span className="font-semibold tracking-tight text-lg md:text-xl" style={{color: brand.dark}}>HyperChem</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:opacity-70">Home</Link>
          <Link to="/products" className="hover:opacity-70">Products</Link>
          <Link to="/careers" className="hover:opacity-70">Careers</Link>
          <Link to="/about" className="hover:opacity-70">About</Link>
          <Link to="/contact" className="hover:opacity-70">Contact</Link>
        </nav>
        <div className="md:hidden"><MobileMenu /></div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="relative">
      <button onClick={() => setOpen(o=>!o)} className={`${primaryBtn}`} style={{backgroundColor: brand.dark, color: "white"}}>Menu</button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-xl p-2 text-sm">
          {[
            ["/", "Home"],
            ["/products", "Products"],
            ["/careers", "Careers"],
            ["/about", "About"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <div key={to} className="px-2 py-2 rounded-lg hover:bg-slate-50">
              <Link to={to} className="block" onClick={()=>setOpen(false)}>{label}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Logo({ size = 36 }) {
  return (
    <div className="flex items-center justify-center rounded-2xl" style={{ width: size, height: size, backgroundColor: brand.dark }}>
      {/* If using your own asset, replace below with <img src="/HyperChem.png" alt="HyperChem" className="w-full h-full object-contain"/> */}
      <svg viewBox="0 0 100 100" className="w-2/3 h-2/3" aria-hidden>
        <path d="M55 48h22v10H55l-9.5 16.5-8.7-5 8.7-15-8.7-15 8.7-5L55 48Z" fill={brand.green}/>
      </svg>
    </div>
  );
}

// --- Pages ---
function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-semibold tracking-tight" style={{color: brand.dark}}>Purity that powers chips.</h1>
        <p className="mt-6 text-lg text-slate-600 max-w-prose">HyperChem manufactures ultra‑high‑purity acids, solvents and specialty gases for wafer cleaning, etching, thin‑film deposition, and advanced packaging. Designed and made in Gujarat with sustainable, zero‑liquid‑discharge operations.</p>
        <div className="mt-8 flex gap-3">
          <Link to="/products" className={`${primaryBtn} text-white`} style={{background: `linear-gradient(90deg, ${brand.green}, #a3e635)`}}>Explore products</Link>
          <Link to="/contact" className={`${primaryBtn}`} style={{border: `1px solid ${brand.dark}`, color: brand.dark}}>Talk to sales</Link>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {["Ultra‑pure (ppb) filtration", "Cleanroom packaging", "Nitrogen‑purged filling", "ESG‑first ZLD plant"].map(t => (
            <div key={t} className="rounded-2xl border border-slate-200 p-4 bg-white/60">
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className={`rounded-[2rem] p-[3px] ${gradientBorder} shadow-xl`}>
          <div className="rounded-[1.9rem] bg-white p-10">
            <HeroDeviceCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroDeviceCard() {
  return (
    <div className="grid gap-6">
      <SpecRow label="Applications" value="Wafer clean, etch, CMP, thin‑film, solar, packaging"/>
      <SpecRow label="Facility" value="50‑acre greenfield, Sanand Industrial Estate (Gujarat)"/>
      <SpecRow label="Process" value="Multi‑stage distillation • Ion‑exchange • Sub‑ppb filtration"/>
      <SpecRow label="Safety" value="PESO‑compliant • Fire & Safety NOC • Cleanroom protocols"/>
    </div>
  );
}
function SpecRow({label, value}){
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-slate-900">{value}</div>
    </div>
  );
}

function Products() {
  return (
    <section className="space-y-12">
      <Header title="Products" subtitle="Semiconductor‑grade chemicals and gases. Each lot undergoes multi‑stage purification and ppb‑level QA."/>

      <Category title="Ultra‑Pure Acids" items={[
        { name: "Hydrofluoric Acid (HF)", details: "For oxide etch & surface prep. Sub‑ppb metal control." },
        { name: "Nitric Acid (HNO₃)", details: "Oxidation, clean and strip processes." },
        { name: "Sulfuric Acid (H₂SO₄)", details: "Piranha clean, resist strip." },
        { name: "Hydrochloric Acid (HCl)", details: "Metal ion removal, wafer clean." },
        { name: "Phosphoric Acid (H₃PO₄)", details: "Dielectric etch & wet bench chemistries." },
      ]} />

      <Category title="Electronic‑grade Solvents" items={[
        { name: "Isopropyl Alcohol (IPA)", details: "Rinse & drying; high purity water‑miscible solvent." },
        { name: "Acetone", details: "Resist removal & tool cleaning." },
        { name: "N‑Methyl‑2‑pyrrolidone (NMP)", details: "Photoresist stripper; high‑boiling polar aprotic." },
        { name: "Dimethyl Sulfoxide (DMSO)", details: "Photoresist and polymer removal." },
        { name: "Ethylene Glycol", details: "Heat transfer & specialty process mixes." },
      ]} />

      <Category title="Specialty Gases" items={[
        { name: "Ultra‑High‑Purity Nitrogen (UHP N₂)", details: "Purge & inerting for tools and packaging." },
        { name: "Hydrogen (H₂)", details: "Reducing atmospheres & deposition processes." },
        { name: "Argon (Ar)", details: "Plasma & sputter processes." },
        { name: "Ammonia (NH₃)", details: "Nitridation and related processes." },
        { name: "Silane (SiH₄)", details: "Thin‑film deposition (handled under PESO)." },
      ]} />

      <section className="grid md:grid-cols-3 gap-6">
        <InfoCard title="QA & Purification" points={["Multi‑stage distillation", "Ion‑exchange impurity removal", "Sub‑ppb filtration", "Nitrogen‑purged filling", "Cleanroom packaging"]} />
        <InfoCard title="Applications" points={["Wafer cleaning", "Etching", "CMP", "Thin‑film deposition", "Solar cell processing", "Advanced packaging"]} />
        <InfoCard title="Supply & Sustainability" points={["Integrated India supply chain", "Zero‑Liquid‑Discharge (ZLD)", "Rainwater harvesting", "Effluent recycling"]} />
      </section>

      <div className="rounded-3xl border border-slate-200 p-8 bg-white">
        <h3 className="text-lg font-semibold">Packaging</h3>
        <p className="mt-2 text-slate-600">High‑density containers with tamper‑evident seals; inert conditions; full traceability with batch certificates and CoA on request.</p>
      </div>
    </section>
  );
}

function Category({ title, items }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold" style={{color: brand.dark}}>{title}</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <div key={it.name} className="rounded-2xl border border-slate-200 p-5 bg-white hover:shadow-sm transition">
            <div className="flex items-start gap-3">
              <div className={`mt-1 h-2 w-2 rounded-full ${gradientBorder}`}></div>
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-slate-600 mt-1 text-sm">{it.details}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ title, points }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-6 bg-white">
      <div className="text-sm uppercase tracking-wide text-slate-500">{title}</div>
      <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-700">
        {points.map((p) => (<li key={p}>{p}</li>))}
      </ul>
    </div>
  );
}

function About() {
  return (
    <section className="space-y-10">
      <Header title="About HyperChem" subtitle="India‑based manufacturer of semiconductor‑grade specialty chemicals and gases."/>
      <div className="grid md:grid-cols-2 gap-8">
        <Panel title="Location">
          <p>Sanand Industrial Estate, Ahmedabad District, Gujarat, India. 50‑acre industrial land with 66 kV substation, GIDC water supply with rainwater harvesting, PNG gas pipeline, and excellent connectivity to Ahmedabad and the airport.</p>
        </Panel>
        <Panel title="Customers">
          <p>Semiconductor fabs under India Semiconductor Mission (ISM), global fabs in the US/EU/Middle East, and manufacturers in solar, PCB, and display.</p>
        </Panel>
        <Panel title="Technology">
          <p>Multi‑stage distillation, ion‑exchange purification, ppb‑level filtration, cleanroom‑grade packaging and nitrogen‑purged filling.</p>
        </Panel>
        <Panel title="R&D">
          <p>Planned collaborations with IIT Gandhinagar and PRL Ahmedabad; in‑house development for CMP slurries and next‑gen solvents.</p>
        </Panel>
      </div>
    </section>
  );
}

function Panel({ title, children }){
  return (
    <div className="rounded-3xl border border-slate-200 p-6 bg-white">
      <div className="text-sm uppercase tracking-wide text-slate-500">{title}</div>
      <div className="mt-2 text-slate-700">{children}</div>
    </div>
  );
}

function Careers() {
  const roles = [
    { key: "chemical_engineer", label: "Chemical Engineer" },
    { key: "qc_chemist", label: "QC Chemist" },
    { key: "plant_supervisor", label: "Plant Supervisor" },
    { key: "safety_officer", label: "Safety Officer" },
    { key: "operator", label: "Operator" },
    { key: "helper", label: "Helper" },
    { key: "maintenance_staff", label: "Maintenance Staff" },
  ];

  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", role: roles[0].key, experience: "0-2", resume: null, message: "" });
  const [submitted, setSubmitted] = useState(false);

  function onFile(e){
    const f = e.target.files?.[0];
    setForm(prev => ({ ...prev, resume: f || null }));
  }
  function onSubmit(e){
    e.preventDefault();
    const payload = { ...form, resumeName: form.resume?.name || null };
    // Save to localStorage and trigger a client-side download so data isn't lost.
    const key = `hyperchem-career-${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(payload));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `application_${form.name.replace(/\s+/g,'_') || 'candidate'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSubmitted(true);
  }

  return (
    <section className="space-y-8">
      <Header title="Careers" subtitle="Join a mission‑driven team building India’s electronics materials future."/>

      <div className="rounded-3xl border border-slate-200 p-6 bg-white">
        <h3 className="font-semibold">Open Roles</h3>
        <p className="mt-2 text-slate-600 text-sm">We’re hiring across production, quality, safety, and operations.</p>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {roles.map(r => (
            <div key={r.key} className="rounded-2xl border border-slate-200 p-4">
              <div className="font-medium">{r.label}</div>
              <div className="text-xs text-slate-500 mt-1">Ahmedabad (Sanand) • Full‑time</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 p-6 bg-white">
        <h3 className="font-semibold">Submit your application</h3>
        <form className="mt-6 grid md:grid-cols-2 gap-6" onSubmit={onSubmit}>
          <TextField label="Full Name" value={form.name} onChange={v=>setForm({...form, name:v})} required/>
          <TextField label="Email" type="email" value={form.email} onChange={v=>setForm({...form, email:v})} required/>
          <TextField label="Phone" value={form.phone} onChange={v=>setForm({...form, phone:v})} required/>
          <TextField label="Location" value={form.location} onChange={v=>setForm({...form, location:v})} />
          <div>
            <Label>Role applying for</Label>
            <select className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})}>
              {roles.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
            </select>
          </div>
          <div>
            <Label>Experience</Label>
            <select className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={form.experience} onChange={(e)=>setForm({...form, experience:e.target.value})}>
              {['0-2','3-5','6-10','10+'].map(x=> <option key={x} value={x}>{x} years</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label>Resume (PDF/DOC)</Label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={onFile} className="mt-2 block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-emerald-600" />
            {form.resume && <div className="mt-2 text-xs text-slate-500">Selected: {form.resume.name}</div>}
          </div>
          <div className="md:col-span-2">
            <Label>Additional details</Label>
            <textarea className="mt-2 w-full rounded-xl border border-slate-300 p-3" rows={4} value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} placeholder="Links to work, notice period, availability…"/>
          </div>
          <div className="md:col-span-2">
            <button className={`${primaryBtn} text-white`} style={{background: `linear-gradient(90deg, ${brand.green}, #a3e635)`}}>Submit</button>
            {submitted && <span className="ml-3 text-sm text-emerald-700">Thanks! Your application data was saved locally and downloaded. Connect a backend to receive it via email or API.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

function Label({children}){ return <div className="text-xs uppercase tracking-wide text-slate-500">{children}</div>; }
function TextField({label, value, onChange, type="text", required}){
  return (
    <div>
      <Label>{label}</Label>
      <input required={required} type={type} className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={value} onChange={(e)=>onChange(e.target.value)} />
    </div>
  );
}

function Contact() {
  const [c, setC] = useState({ name: "", email: "", phone: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`Name: ${c.name}
Email: ${c.email}
Phone: ${c.phone}

${c.message}`);
    window.location.href = `mailto:hello@hyperchem.example?subject=Website inquiry&body=${body}`;
  };
  return (
    <section className="space-y-8">
      <Header title="Contact" subtitle="We’d love to collaborate with fabs, OEMs, and integrators."/>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-slate-200 p-6 bg-white">
          <div className="font-semibold">Corporate HQ</div>
          <p className="text-slate-600 mt-2">A‑610 World Trade Tower, behind Skoda Showroom, Village Makarba, Taluka, Ahmedabad, Gujarat 380054</p>
          <div className="mt-4 text-sm space-y-2">
            <a className="underline block" href="https://maps.google.com/?q=HyperChem%20World%20Trade%20Tower%20Ahmedabad" target="_blank" rel="noreferrer">Open in Maps</a>
            <a className="underline block" href="tel:+910000000000">Call: +91 00000 00000</a>
            <a className="underline block" href="https://wa.me/910000000000" target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="underline block" href="mailto:hello@hyperchem.example">hello@hyperchem.example</a>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 p-6 bg-white">
          <div className="font-semibold">Send us a message</div>
          <form className="mt-4 space-y-4" onSubmit={submit}>
            <div>
              <Label>Your Name</Label>
              <input className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={c.name} onChange={(e)=>setC({...c, name:e.target.value})} required/>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <input type="email" className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={c.email} onChange={(e)=>setC({...c, email:e.target.value})} required/>
              </div>
              <div>
                <Label>Phone</Label>
                <input className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={c.phone} onChange={(e)=>setC({...c, phone:e.target.value})}/>
              </div>
            </div>
            <div>
              <Label>Message</Label>
              <textarea rows={4} className="mt-2 w-full rounded-xl border border-slate-300 p-3" value={c.message} onChange={(e)=>setC({...c, message:e.target.value})} required/>
            </div>
            <button className={`${primaryBtn} text-white`} style={{background: `linear-gradient(90deg, ${brand.green}, #16a34a)`}}>Send</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Header({title, subtitle}){
  return (
    <div className="mb-2">
      <div className={`inline-block rounded-full px-3 py-1 text-xs text-white ${gradientBorder}`}>HyperChem</div>
      <h1 className="mt-4 text-3xl md:text-4xl font-semibold" style={{color: brand.dark}}>{title}</h1>
      {subtitle && <p className="mt-3 text-slate-600 max-w-prose">{subtitle}</p>}
    </div>
  );
}

function Footer(){
  return (
    <footer className="border-t border-slate-200/70 bg-white/60">
      <div className="mx-auto max-w-[90rem] px-6 lg:px-8 py-10 text-sm text-slate-600 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span>HyperChem Speciality Chemicals & Gases Pvt. Ltd.</span>
        </div>
        <div className="text-xs">© {new Date().getFullYear()} HyperChem • All rights reserved.</div>
      </div>
    </footer>
  );
}

function App(){
  
  const path = useHashRoute();
  const Page = useMemo(()=> ({
    "/": Home,
    "/products": Products,
    "/careers": Careers,
    "/about": About,
    "/contact": Contact,
  })[path] || Home, [path]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [path]);

  return (
    <Shell>
      <Page />
    </Shell>
  );
}


export default App;