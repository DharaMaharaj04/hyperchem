import React, { useEffect, useMemo, useState } from "react";
import logo from "./assets/images/HyperChem.png";

/*
  HyperChem – Website V2 (Apple‑style minimal)
  • Clean, airy layout with generous whitespace
  • Subtle brand gradients (logo green on navy)
  • Simple hash router (no external deps)
  • Pages separated (Home, Products, Careers, About, Contact)
  • Careers form saves JSON locally + prompts download (backend‑ready)
  • Product detail sections with spec tables & accordions

  TailwindCSS expected in host app. Drop this component in your React app
  and render <App/>. Replace <Logo/> with your PNG if preferred.
*/

// ---- Brand Tokens ----
const BRAND = {
  ink: "#0f172a", // deep slate/ink
  navy: "#121a2a", // logo background
  green: "#39b54a", // logo green
};
const GRADIENT = (from = BRAND.green, to = "#a3e635") => `linear-gradient(90deg, ${from}, ${to})`;

// ---- Tiny Hash Router ----
const ROUTES = ["/", "/products", "/careers", "/about", "/contact"];
function useHashRoute() {
  const [path, setPath] = useState(window.location.hash.replace("#", "") || "/");
  useEffect(() => {
    const onHash = () => setPath(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return ROUTES.includes(path) ? path : "/";
}
const Link = ({ to, children, className = "" }) => (
  <a href={`#${to}`} className={className}>{children}</a>
);

// ---- Primitives ----
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-6 lg:px-8 ${className}`}>{children}</div>
);
const Button = ({ className = "", ...props }) => (
  <button {...props} className={`rounded-2xl px-5 py-2 font-medium shadow-sm ring-1 ring-black/5 hover:shadow transition ${className}`} />
);
const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs text-white" style={{ background: BRAND.navy }}>{children}</span>
);
const SectionTitle = ({ eyebrow, title, caption }) => (
  <div className="mb-6">
    {eyebrow && <Badge>{eyebrow}</Badge>}
    <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight" style={{ color: BRAND.ink }}>{title}</h2>
    {caption && <p className="mt-3 text-slate-600 max-w-prose">{caption}</p>}
  </div>
);

// ---- Layout ----
function Shell({ children }) {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f6faf7 100%)" }}>
      <TopBar />
      <Container className="pb-24 pt-10">{children}</Container>
      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200/70">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="hover:opacity-70">Home</Link>
          <Link to="/products" className="hover:opacity-70">Products</Link>
          <Link to="/careers" className="hover:opacity-70">Careers</Link>
          <Link to="/about" className="hover:opacity-70">About</Link>
          <Link to="/contact" className="hover:opacity-70">Contact</Link>
        </nav>
        <MobileMenu />
      </Container>
      <div className="text-center text-xs md:text-sm py-2" style={{ background: BRAND.navy, color: "#fff" }}>Semiconductor‑grade chemicals & gases. Made in India.</div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden relative">
      <Button onClick={() => setOpen(o => !o)} className="text-white" style={{ background: GRADIENT() }}>Menu</Button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-xl p-2 text-sm">
          {["/", "/products", "/careers", "/about", "/contact"].map((to) => (
            <div key={to} className="px-3 py-2 rounded-lg hover:bg-slate-50">
              <Link to={to} className="block" onClick={() => setOpen(false)}>{to === "/" ? "Home" : to.slice(1).replace(/^[a-z]/, (m) => m.toUpperCase())}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Logo({ width = 200, height = 200, className="" }) {
  return (
    <img
      src={logo}
      alt="HyperChem logo"
      width={width}
      height={height}
      className={`object-contain rounded-xl ${className}`}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

// ---- Pages ----
function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight" style={{ color: BRAND.ink }}>Purity that powers chips.</h1>
        <p className="mt-6 text-lg text-slate-600 max-w-prose">Ultra‑high‑purity acids, solvents and specialty gases for wafer clean, etch, thin‑film deposition and advanced packaging. ESG‑first operations with ZLD and cleanroom packaging.</p>
        <div className="mt-10 flex gap-3">
          <Link to="/products">
            <Button className="text-white" style={{ background: GRADIENT() }}>Explore products</Button>
          </Link>
          <Link to="/contact">
            <Button style={{ border: `1px solid ${BRAND.ink}`, color: BRAND.ink, background: "white" }}>Talk to sales</Button>
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {["Sub‑ppb filtration", "Cleanroom packaging", "N₂‑purged filling", "ZLD facility"].map((t) => (
            <div key={t} className="rounded-2xl border border-slate-200 p-4 bg-white/70">{t}</div>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="rounded-[2rem] p-[3px] shadow-xl" style={{ background: GRADIENT() }}>
          <div className="rounded-[1.9rem] bg-white p-10">
            <Specs />
          </div>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const rows = [
    ["Applications", "Wafer clean, etch, CMP, thin‑film, solar, packaging"],
    ["Facility", "50‑acre greenfield, Sanand Industrial Estate (Gujarat)"],
    ["Process", "Multi‑stage distillation • Ion‑exchange • Sub‑ppb filtration"],
    ["Safety", "PESO‑compliant • Fire & Safety NOC • Cleanroom protocols"],
  ];
  return (
    <div className="divide-y divide-slate-200">
      {rows.map(([k, v]) => (
        <div key={k} className="py-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">{k}</div>
          <div className="mt-1 text-slate-900">{v}</div>
        </div>
      ))}
    </div>
  );
}

function Products() {
  return (
    <section className="space-y-14">
      <SectionTitle eyebrow="Products" title="Semiconductor‑grade portfolio" caption="Each lot is purified and qualified to electronics standards. Full CoA available on request." />

      <ProductBlock
        title="Ultra‑Pure Acids"
        items={[
          { name: "Hydrofluoric Acid (HF)", use: "Oxide etch & surface prep", specs: { Purity: ">= 49% / 70%", Metals: "< 1 ppb", Particles: "< 50 ppt", Packaging: "PE, PTFE, cleanroom sealed" } },
          { name: "Nitric Acid (HNO₃)", use: "Oxidation, clean & strip", specs: { Purity: ">= 69%", Metals: "< 1 ppb", Particles: "< 50 ppt", Packaging: "HDPE, PTFE" } },
          { name: "Sulfuric Acid (H₂SO₄)", use: "Piranha clean, resist strip", specs: { Purity: ">= 96%", Metals: "< 1 ppb", Particles: "< 50 ppt", Packaging: "HDPE, PTFE" } },
          { name: "Hydrochloric Acid (HCl)", use: "Metal ion removal", specs: { Purity: ">= 37%", Metals: "< 1 ppb", Particles: "< 50 ppt", Packaging: "HDPE, PTFE" } },
          { name: "Phosphoric Acid (H₃PO₄)", use: "Dielectric etch", specs: { Purity: ">= 85%", Metals: "< 1 ppb", Particles: "< 50 ppt", Packaging: "HDPE, PTFE" } },
        ]}
      />

      <ProductBlock
        title="Electronic‑grade Solvents"
        items={[
          { name: "Isopropyl Alcohol (IPA)", use: "Rinse & drying; water‑miscible", specs: { Purity: ">= 99.9%", Water: "< 100 ppm", Metals: "< 1 ppb", Packaging: "SS / HDPE" } },
          { name: "Acetone", use: "Resist removal & tool cleaning", specs: { Purity: ">= 99.9%", Water: "< 200 ppm", Metals: "< 1 ppb", Packaging: "SS / HDPE" } },
          { name: "NMP", use: "Photoresist stripper", specs: { Purity: ">= 99.9%", Water: "< 200 ppm", Metals: "< 1 ppb", Packaging: "SS" } },
          { name: "DMSO", use: "Polymer removal", specs: { Purity: ">= 99.9%", Water: "< 200 ppm", Metals: "< 1 ppb", Packaging: "SS" } },
        ]}
      />

      <ProductBlock
        title="Specialty Gases"
        items={[
          { name: "UHP Nitrogen (N₂)", use: "Purge & inerting", specs: { Purity: ">= 99.999%", H2O: "< 1 ppm", O2: "< 1 ppm", Packaging: "Cylinders / bulk" } },
          { name: "Hydrogen (H₂)", use: "Reducing atmospheres", specs: { Purity: ">= 99.999%", H2O: "< 1 ppm", O2: "< 1 ppm", Packaging: "Cylinders / tube trailer" } },
          { name: "Argon (Ar)", use: "Plasma & sputter", specs: { Purity: ">= 99.999%", H2O: "< 1 ppm", O2: "< 1 ppm", Packaging: "Cylinders / bulk" } },
          { name: "Ammonia (NH₃)", use: "Nitridation", specs: { Purity: ">= 99.999%", H2O: "< 1 ppm", O2: "< 1 ppm", Packaging: "Cylinders" } },
          { name: "Silane (SiH₄)", use: "Thin‑film deposition", specs: { Purity: ">= 99.999%", Stabilization: "PESO‑compliant", Packaging: "Cylinders" } },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="QA & Purification" items={["Multi‑stage distillation", "Ion‑exchange impurity removal", "Sub‑ppb filtration", "N₂‑purged filling", "Cleanroom packaging"]} />
        <Card title="Applications" items={["Wafer cleaning", "Etching", "CMP", "Thin‑film deposition", "Solar", "Advanced packaging"]} />
        <Card title="Sustainability" items={["Zero‑Liquid‑Discharge (ZLD)", "Effluent recycling", "Rainwater harvesting", "Energy‑efficient utilities"]} />
      </div>
    </section>
  );
}

function Card({ title, items }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-6 bg-white">
      <div className="text-sm uppercase tracking-wide text-slate-500">{title}</div>
      <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-700">
        {items.map(i => <li key={i}>{i}</li>)}
      </ul>
    </div>
  );
}

function ProductBlock({ title, items }) {
  return (
    <section>
      <h3 className="text-2xl font-semibold mb-6" style={{ color: BRAND.ink }}>{title}</h3>
      <div className="space-y-4">
        {items.map((p) => (
          <details key={p.name} className="group rounded-2xl border border-slate-200 bg-white open:shadow-sm">
            <summary className="cursor-pointer list-none p-5 flex items-start justify-between gap-6">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-slate-600 mt-1">{p.use}</div>
              </div>
              <span className="mt-1 text-xs px-2 py-1 rounded-full text-white" style={{ background: BRAND.navy }}>Specs</span>
            </summary>
            <div className="border-t border-slate-100 p-5">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(p.specs).map(([k, v]) => (
                    <tr key={k} className="border-b last:border-b-0 border-slate-100">
                      <td className="py-3 text-slate-500 w-40">{k}</td>
                      <td className="py-3">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="space-y-10">
      <SectionTitle eyebrow="About" title="HyperChem Speciality Chemicals & Gases Pvt. Ltd." caption="India‑based manufacturer serving fabs and advanced electronics manufacturing." />
      <div className="grid md:grid-cols-2 gap-8">
        <Panel title="Location">Sanand Industrial Estate, Ahmedabad, Gujarat. 50‑acre site with 66 kV sub‑station, PNG gas pipeline and GIDC water supply with rainwater harvesting.</Panel>
        <Panel title="Customers">ISM‑linked fabs in India, and global fabs across US/EU/ME; plus solar, PCB and display manufacturers.</Panel>
        <Panel title="Technology">Multi‑stage distillation, ion‑exchange purification, sub‑ppb filtration; cleanroom packaging and N₂‑purged filling.</Panel>
        <Panel title="R&D">Collaborations planned with IIT Gandhinagar & PRL Ahmedabad; internal development of CMP slurries & next‑gen solvents.</Panel>
      </div>
    </section>
  );
}

function Panel({ title, children }) {
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
  const onFile = (e) => setForm(f => ({ ...f, resume: e.target.files?.[0] || null }));
  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, resumeName: form.resume?.name || null };
    const key = `hyperchem-career-${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(payload));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `application_${(form.name || "candidate").replace(/\s+/g, '_')}.json`;
    a.click(); URL.revokeObjectURL(url);
    setSubmitted(true);
  };

  return (
    <section className="space-y-10">
      <SectionTitle eyebrow="Careers" title="Build India’s electronics materials future" caption="We’re hiring across production, quality, safety and operations in Ahmedabad (Sanand)." />

      <div className="rounded-3xl border border-slate-200 p-6 bg-white">
        <div className="grid md:grid-cols-3 gap-4">
          {roles.map(r => (
            <div key={r.key} className="rounded-2xl border border-slate-200 p-4">
              <div className="font-medium">{r.label}</div>
              <div className="text-xs text-slate-500 mt-1">Ahmedabad • Full‑time</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 p-6 bg-white">
        <h3 className="font-semibold">Submit your application</h3>
        <form className="mt-6 grid md:grid-cols-2 gap-6" onSubmit={onSubmit}>
          <Input label="Full Name" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
          <Input label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
          <Input label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })} required />
          <Input label="Location" value={form.location} onChange={v => setForm({ ...form, location: v })} />
          <Select label="Role applying for" value={form.role} onChange={v => setForm({ ...form, role: v })} options={roles.map(r => ({ label: r.label, value: r.key }))} />
          <Select label="Experience" value={form.experience} onChange={v => setForm({ ...form, experience: v })} options={["0-2", "3-5", "6-10", "10+"].map(x => ({ label: `${x} years`, value: x }))} />
          <div className="md:col-span-2">
            <Label>Resume (PDF/DOC)</Label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={onFile} className="mt-2 block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:px-4 file:py-2 file:text-white file:cursor-pointer" style={{ background: GRADIENT(BRAND.green, "#16a34a") }} />
            {form.resume && <div className="mt-2 text-xs text-slate-500">Selected: {form.resume.name}</div>}
          </div>
          <div className="md:col-span-2">
            <Label>Additional details</Label>
            <textarea className="mt-2 w-full rounded-xl border border-slate-300 p-3" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Links to work, notice period, availability…" />
          </div>
          <div className="md:col-span-2">
            <Button className="text-white" style={{ background: GRADIENT() }}>Submit</Button>
            {submitted && <span className="ml-3 text-sm text-emerald-700">Thanks! Your application data was saved locally and downloaded. Add a backend to receive submissions by email/API.</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

function Label({ children }) { return <div className="text-xs uppercase tracking-wide text-slate-500">{children}</div>; }
function Input({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <Label>{label}</Label>
      <input required={required} type={type} className="mt-2 w-full rounded-xl border border-slate-300 p-3 bg-white" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <div>
      <Label>{label}</Label>
      <select className="mt-2 w-full rounded-xl border border-slate-300 p-3 bg-white" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Contact() {
  return (
    <section className="space-y-8">
      <SectionTitle eyebrow="Contact" title="Let’s collaborate" caption="For product inquiries, vendor onboarding, or partnerships, reach out to our team." />
      <div className="grid md:grid-cols-2 gap-8">
        <AddressCard title="Corporate HQ">A‑610 World Trade Tower, behind Skoda Showroom, Village Makarba, Taluka, Ahmedabad, Gujarat 380054</AddressCard>
        <AddressCard title="Gujarat Facility (Plant)">Sanand Industrial Estate, Ahmedabad District, Gujarat, India</AddressCard>
      </div>
    </section>
  );
}
function AddressCard({ title, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-6 bg-white">
      <div className="font-semibold">{title}</div>
      <p className="text-slate-600 mt-2">{children}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70 mt-12">
      <Container className="py-2 text-sm text-slate-600 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo width={100} height={40} />
          <span>HyperChem Speciality Chemicals & Gases Pvt. Ltd.</span>
        </div>
        <div className="text-xs">© {new Date().getFullYear()} HyperChem • All rights reserved.</div>
      </Container>
    </footer>
  );
}

export default function App() {
  const path = useHashRoute();
  const Page = useMemo(() => ({
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
