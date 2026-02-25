import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, Lock, ShieldCheck, MapPin, Truck, CreditCard, Smartphone, Apple, Globe, LayoutGrid, Info, Shield, HelpCircle, Mail, Phone } from 'lucide-react';

/* --- DELIVERY ZONES (Stockholm) --- */
const STOCKHOLM_ZONES = [
    { id: 'z1', label: 'Zon 1 — Innerstad', desc: '0–5 km (Norrmalm, Södermalm, Östermalm, Kungsholmen)', baseFee: 0 },
    { id: 'z2', label: 'Zon 2 — Söderort / Norrort', desc: '5–15 km (Hägersten, Bromma, Lidingö, Solna)', baseFee: 30 },
    { id: 'z3', label: 'Zon 3 — Ytterstad', desc: '15–30 km (Nacka, Huddinge, Sollentuna, Järfälla)', baseFee: 60 },
    { id: 'z4', label: 'Zon 4 — Storstockholm utanför', desc: '30–50 km (Södertälje, Märsta, Norrtälje)', baseFee: 100 },
];

/* --- STOCKHOLM DELIVERY MODES --- */
const STHLM_MODES = [
    { id: 'standard4h', icon: <Truck size={24} />, label: 'Standardleverans', time: 'Idag inom 4 timmar', surcharge: 0, note: 'Estimerat fönster, ej garanterat pga trafik.' },
    { id: 'slot2h', icon: <Truck size={24} />, label: 'Tidsbestämd (2h-fönster)', time: 'Du väljer 2h-block', surcharge: 50, note: 'Vi försöker träffa fönstret men trafik kan påverka.' },
    { id: 'express2h', icon: <Truck size={24} />, label: 'Express 2 timmar', time: 'Inom 2 h från beställning', surcharge: 89, note: 'Expressrutt. Trafikförseningar kan förekomma.' },
    { id: 'urgent30', icon: <Truck size={24} />, label: 'Urgent 30 minuter', time: 'Inom ~30 min (limited)', surcharge: 149, note: 'Begränsad kapacitet. Ej tillgängligt alltid. Trafik kan ge ±15 min.' },
    { id: 'instabox', icon: <Lock size={24} />, label: 'Paketbox (Instabox/DHL)', time: 'Levereras inom dagen', surcharge: 29, note: 'Kod skickas via SMS när paketet är klart.' },
];

/* --- POST MODES (national) --- */
const POST_MODES = [
    { id: 'post_std', icon: <Truck size={24} />, label: 'Myrpaketet (2–4 dagar)', price: 49, note: 'PostNord standardfrakt. Spårbar. Upp till 10 kg.' },
    { id: 'post_exp', icon: <Truck size={24} />, label: 'Expresspaket (1–2 dagar)', price: 99, note: 'DHL Express. Spårbar med SMS-notis.' },
    { id: 'post_home', icon: <Truck size={24} />, label: 'Hemleverans Post', price: 129, note: 'Levereras till angiven adress, dörren. PostNord.' },
];

/* --- SWEDISH CITIES --- */
const CITIES = ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå', 'Gävle', 'Borås', 'Södertälje', 'Eskilstuna', 'Halmstad', 'Växjö', 'Karlstad', 'Sundsvall'];

/* --- TIME SLOTS --- */
const TODAY_SLOTS = ['08:00–10:00', '10:00–12:00', '12:00–14:00', '14:00–16:00', '16:00–18:00', '18:00–20:00'];

/* --- MOCK CART --- */
const MOCK_CART = [
    { id: 1, name: 'Medjool Dadlar', weight: '500 g', price: 89, qty: 2, img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=80&q=70' },
    { id: 2, name: 'Kashmiri Chai', weight: '100 g', price: 79, qty: 1, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=80&q=70' },
    { id: 19, name: 'Torkad Mango', weight: '250 g', price: 65, qty: 1, img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=80&q=70' },
];

const COUPON_CODES = { RAMADAN10: '10%', PASK10: '10%', EXOTIKMAT: '15%' };

/* --- HELPERS --- */
function pct(str) { return parseInt(str) / 100; }
function getDeliveryCost(deliveryData) {
    const { region, zone, sthlmMode, postMode } = deliveryData;
    if (region === 'stockholm') {
        const z = STOCKHOLM_ZONES.find(z => z.id === zone) || STOCKHOLM_ZONES[0];
        const m = STHLM_MODES.find(m => m.id === sthlmMode) || STHLM_MODES[0];
        return z.baseFee + m.surcharge;
    }
    const pm = POST_MODES.find(m => m.id === postMode) || POST_MODES[0];
    return pm.price;
}

/* --- UI COMPONENTS --- */
function StepBar({ step }) {
    const STEPS = ['Leverans', 'Betalning', 'Bekräftelse'];
    return (
        <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s, i) => (
                <React.Fragment key={s}>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${i <= step ? 'bg-white text-brand border-white' : 'border-white/20 text-white/30'}`}>{i + 1}</div>
                        <span className={`text-[12px] font-black tracking-widest uppercase ${i === step ? 'opacity-100' : 'opacity-30'}`}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div className="flex-1 h-0.5 mx-2 bg-white/10" style={{ background: i < step ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)' }} />}
                </React.Fragment>
            ))}
        </div>
    );
}

function OrderSummary({ cart, coupon, setCoupon, couponApplied, setCouponApplied, deliveryCost }) {
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discountRate = couponApplied ? pct(COUPON_CODES[coupon] || '0%') : 0;
    const discountAmt = Math.round(subtotal * discountRate);
    const total = subtotal + deliveryCost - discountAmt;
    const tryApply = () => { if (COUPON_CODES[coupon]) setCouponApplied(true); };

    return (
        <div className="rounded-3xl p-6 flex flex-col gap-5 sticky top-24 shadow-2xl bg-black/25 backdrop-blur-3xl border border-white/15">
            <h3 className="font-anton text-2xl uppercase tracking-wider">Din beställning</h3>
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative shadow-inner">
                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand rounded-full text-[10px] font-black flex items-center justify-center shadow-md">{item.qty}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate text-white/90">{item.name}</p>
                            <p className="text-[10px] opacity-60 font-medium">{item.weight}</p>
                        </div>
                        <p className="text-sm font-black whitespace-nowrap">{item.price * item.qty} kr</p>
                    </div>
                ))}
            </div>

            <div className="pt-2 border-t border-white/10">
                <label className="text-[11px] font-black uppercase opacity-60 mb-2 block tracking-widest">Rabattkod</label>
                <div className="flex gap-2">
                    <input value={coupon} disabled={couponApplied} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="T.ex. RAMADAN10" className="bg-white/10 border-2 border-white/20 rounded-xl p-3 flex-1 text-sm outline-none focus:border-white transition-all" />
                    <button onClick={tryApply} disabled={couponApplied} className="px-5 py-3 text-[11px] font-black tracking-widest uppercase rounded-xl border-2 border-white hover:bg-white hover:text-brand transition-all flex-shrink-0 disabled:opacity-40">
                        {couponApplied ? <Check size={16} /> : 'OK'}
                    </button>
                </div>
                {couponApplied && <p className="text-[11px] text-green-400 mt-2 font-bold flex items-center gap-1.5">🎉 {COUPON_CODES[coupon]} rabatt aktiverad!</p>}
                {!couponApplied && coupon && !COUPON_CODES[coupon] && <p className="text-[11px] text-red-400 mt-2 font-bold">Ogiltig kod</p>}
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm opacity-60"><span>Delsumma</span><span>{subtotal} kr</span></div>
                <div className="flex justify-between text-sm opacity-60"><span>Frakt</span><span>{deliveryCost === 0 ? 'Gratis 🎉' : `${deliveryCost} kr`}</span></div>
                {discountAmt > 0 && <div className="flex justify-between text-sm text-green-400"><span>Rabatt ({COUPON_CODES[coupon]})</span><span>-{discountAmt} kr</span></div>}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="font-black text-sm uppercase tracking-widest opacity-80">Totalt att betala</span>
                <span className="font-anton text-4xl">{total} kr</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2 font-medium">
                {[['🔒', 'Säker'], ['🚚', 'Snabb'], ['↩️', '30 dgr']].map(([ic, l]) => (
                    <div key={l} className="text-center p-2.5 rounded-2xl bg-white/5 border border-white/5">
                        <p className="text-xl mb-1">{ic}</p>
                        <p className="text-[9px] opacity-40 font-black uppercase tracking-tighter">{l}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Checkout() {
    const [step, setStep] = useState(0);
    const [delivery, setDelivery] = useState({
        region: 'stockholm',
        zone: 'z1',
        sthlmMode: 'standard4h',
        postMode: 'post_std',
        first: 'Ali',
        last: 'Malik',
        email: 'ali.malik@exotikmat.se',
        phone: '070 123 4567',
        street: 'Kungsgatan 1',
        zip: '111 20',
        city: 'Stockholm',
        district: 'Norrmalm'
    });
    const [payment, setPayment] = useState({ method: 'card', terms: true });
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const updateD = (k, v) => setDelivery(p => ({ ...p, [k]: v }));
    const updateP = (k, v) => setPayment(p => ({ ...p, [k]: v }));
    const deliveryCost = getDeliveryCost(delivery);

    const canNext = useCallback(() => {
        if (step === 0) return !!(delivery.first && delivery.last && delivery.email && delivery.phone && delivery.street && (delivery.city || delivery.district));
        if (step === 1) return !!(payment.method && payment.terms);
        return true;
    }, [step, delivery, payment]);

    if (step === 2) {
        const orderNum = '#EXO-' + Math.floor(100000 + Math.random() * 900000);
        return (
            <div className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto text-center animate-in zoom-in duration-700">
                    <div className="text-8xl mb-8 drop-shadow-xl">✅</div>
                    <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-tighter mb-4 leading-none">ORDER SLUTFÖRD!</h1>
                    <p className="text-xl font-bold opacity-80 mb-2 whitespace-normal">Tack för att du räddar mat hos EXOTIKMAT, {delivery.first}!</p>
                    <p className="text-sm opacity-60 mb-1">Referens: <span className="text-white font-black tracking-widest">{orderNum}</span></p>
                    <p className="text-[12px] opacity-50 mb-10">Kvitto har skickats till <strong>{delivery.email}</strong>.</p>

                    <div className="text-left rounded-3xl p-8 mb-10 bg-black/20 border border-white/10 shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">🛒</div>
                            <p className="font-black text-xs uppercase tracking-[.25em] opacity-40">Information</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { ic: <MapPin size={24} />, t: 'Status:', v: 'Plockning pågår på lager' },
                                { ic: <Truck size={24} />, t: 'Leverans:', v: delivery.region === 'stockholm' ? 'Express till dörren' : 'Postas inom 24h' },
                                { ic: <ShieldCheck size={24} />, t: 'Adress:', v: `${delivery.street}, ${delivery.city || delivery.district}` },
                                { ic: <Smartphone size={24} />, t: 'Notis:', v: `SMS till ${delivery.phone}` }
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl text-white/60">{s.ic}</div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-0.5">{s.t}</p>
                                        <p className="text-[13px] font-bold text-white/90 leading-tight">{s.v}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link to="/" className="inline-block px-12 py-5 font-black text-sm tracking-widest uppercase rounded-full border-3 border-white hover:bg-white hover:text-brand transition-all duration-300 shadow-2xl active:scale-95">
                        ← Tillbaka till butiken
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="fixed top-0 w-full z-50 px-6 md:px-10 py-5 flex items-center justify-between bg-black/30 backdrop-blur-3xl border-b border-white/10">
                <Link to="/" className="text-xl font-black tracking-widest uppercase flex items-center gap-3">✱ EXOTIKMAT</Link>
                <div className="text-[10px] font-black tracking-widest uppercase opacity-70 flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                    <ShieldCheck size={14} className="text-green-400" /> SÄKER ANSLUTNING
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-10 pt-32">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
                    <div className="lg:col-span-7">
                        <StepBar step={step} />

                        {step === 0 && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <h2 className="font-anton text-4xl uppercase tracking-wider">Mottagaruppgifter</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2"><p className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40 mb-2">// Kontaktinformation</p></div>
                                    <input value={delivery.first} onChange={e => updateD('first', e.target.value)} placeholder="Förnamn" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold outline-none focus:border-white focus:bg-white/15 transition-all" />
                                    <input value={delivery.last} onChange={e => updateD('last', e.target.value)} placeholder="Efternamn" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold outline-none focus:border-white focus:bg-white/15 transition-all" />
                                    <div className="md:col-span-2"><input type="email" value={delivery.email} onChange={e => updateD('email', e.target.value)} placeholder="E-postadress" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold outline-none focus:border-white focus:bg-white/15 transition-all w-full" /></div>
                                    <div className="md:col-span-2"><input type="tel" value={delivery.phone} onChange={e => updateD('phone', e.target.value)} placeholder="Mobilnummer" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold outline-none focus:border-white focus:bg-white/15 transition-all w-full" /></div>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40 mb-4">// Region</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[{ id: 'stockholm', icon: <MapPin size={24} />, label: 'Stockholm', sub: 'Express till dörren' },
                                        { id: 'post', icon: <Globe size={24} />, label: 'Hela Sverige', sub: 'Postleverans' }].map(r => (
                                            <div key={r.id} onClick={() => updateD('region', r.id)} className={`radio-card flex items-center gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all ${delivery.region === r.id ? 'border-white bg-white/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                                                <div className="text-white/60">{r.icon}</div>
                                                <div><p className="font-black text-sm uppercase">{r.label}</p><p className="text-[11px] opacity-60 font-medium">{r.sub}</p></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-black/10 border border-white/5 rounded-3xl p-8 space-y-6">
                                    <p className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40 mb-4">// Leveransadress</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2"><input value={delivery.street} onChange={e => updateD('street', e.target.value)} placeholder="Gatuadress & Nummer" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold w-full outline-none focus:border-white" /></div>
                                        <input value={delivery.zip} onChange={e => updateD('zip', e.target.value)} placeholder="Postnummer" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold w-full outline-none focus:border-white" />
                                        {delivery.region === 'post' ? (
                                            <select value={delivery.city} onChange={e => updateD('city', e.target.value)} className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold w-full outline-none focus:border-white text-white appearance-none">
                                                <option value="" className="bg-brand">Välj Stad</option>
                                                {CITIES.map(c => <option key={c} value={c} className="bg-brand">{c}</option>)}
                                            </select>
                                        ) : (
                                            <input value={delivery.district} onChange={e => updateD('district', e.target.value)} placeholder="Område / Stadsdel" className="bg-white/10 border-2 border-white/20 rounded-xl p-4 text-sm font-bold w-full outline-none focus:border-white" />
                                        )}
                                    </div>
                                </div>

                                <button onClick={() => setStep(1)} disabled={!canNext()} className={`w-full py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 ${canNext() ? 'bg-white text-brand' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>
                                    Gå till Betalning <ArrowUpRight size={18} />
                                </button>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                <h2 className="font-anton text-4xl uppercase tracking-wider">Betalningsmetod</h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 'card', label: 'Kortbetalning', sub: 'VISA, Mastercard, Amex', icon: <CreditCard size={24} /> },
                                        { id: 'swish', label: 'Swish', sub: 'Direkt mobilt', icon: <Smartphone size={24} /> },
                                        { id: 'apple-pay', label: 'Apple Pay', sub: 'Snabb & Säker', icon: <Apple size={24} /> },
                                        { id: 'klarna', label: 'Klarna', sub: 'Delbetala eller Faktura', icon: <LayoutGrid size={24} /> }
                                    ].map(m => (
                                        <div key={m.id} onClick={() => updateP('method', m.id)} className={`radio-card flex items-center justify-between p-5 rounded-2xl cursor-pointer border-2 transition-all ${payment.method === m.id ? 'border-white bg-white/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className="text-white/60">{m.icon}</div>
                                                <div><p className="font-black text-sm uppercase">{m.label}</p><p className="text-[11px] opacity-60 font-medium">{m.sub}</p></div>
                                            </div>
                                            {payment.method === m.id && <Check size={18} />}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <label className="flex items-start gap-4 cursor-pointer p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                        <input type="checkbox" checked={payment.terms} onChange={e => updateP('terms', e.target.checked)} className="w-5 h-5 rounded border-2 border-white opacity-0 absolute" />
                                        <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${payment.terms ? 'bg-white border-white text-brand' : 'border-white/40'}`}>
                                            {payment.terms && <Check size={16} strokeWidth={4} />}
                                        </div>
                                        <span className="text-[12px] opacity-80 font-medium leading-relaxed">
                                            Jag godkänner EXOTIKMAT's <a href="#" className="underline font-bold">köpvillkor</a> och <a href="#" className="underline font-bold">integritetspolicy</a>.
                                        </span>
                                    </label>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => setStep(0)} className="flex-1 py-5 border-2 border-white/20 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">← Frakt</button>
                                    <button onClick={() => setStep(2)} disabled={!canNext()} className={`flex-[2] py-5 rounded-full font-black text-sm tracking-[0.2em] uppercase transition-all shadow-2xl active:scale-95 ${canNext() ? 'bg-white text-brand' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}>
                                        Bekräfta Beställning
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {step < 2 && (
                        <div className="lg:col-span-5">
                            <OrderSummary cart={MOCK_CART} coupon={coupon} setCoupon={setCoupon} couponApplied={couponApplied} setCouponApplied={setCouponApplied} deliveryCost={deliveryCost} />

                            <div className="mt-8 grid grid-cols-1 gap-4">
                                <div className="flex items-start gap-4 p-5 rounded-3xl bg-white/5 border border-white/10">
                                    <Shield size={20} className="text-green-400 mt-1" />
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-widest mb-1">Certifierad e-handel</p>
                                        <p className="text-[11px] opacity-60 leading-relaxed">Säkra transaktioner med 256-bitars SSL-kryptering.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-5 rounded-3xl bg-white/5 border border-white/10">
                                    <HelpCircle size={20} className="text-white/40 mt-1" />
                                    <div>
                                        <p className="text-[11px] font-black uppercase tracking-widest mb-1">Behöver du hjälp?</p>
                                        <p className="text-[11px] opacity-60 leading-relaxed">Ring oss på +46 735 173 132 eller mejla info@exotikmat.se</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
