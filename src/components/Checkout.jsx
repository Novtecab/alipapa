import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, Lock, ShieldCheck, MapPin, Truck, CreditCard, Smartphone, Apple, Globe, LayoutGrid } from 'lucide-react';

/* --- DATA & HELPERS --- */
const STOCKHOLM_ZONES = [
    { id: 'z1', label: 'Zon 1 — Innerstad', desc: '0–5 km (Norrmalm, Södermalm, Östermalm, Kungsholmen)', baseFee: 0 },
    { id: 'z2', label: 'Zon 2 — Söderort / Norrort', desc: '5–15 km (Hägersten, Bromma, Lidingö, Solna)', baseFee: 30 },
    { id: 'z3', label: 'Zon 3 — Ytterstad', desc: '15–30 km (Nacka, Huddinge, Sollentuna, Järfälla)', baseFee: 60 },
    { id: 'z4', label: 'Zon 4 — Storstockholm utanför', desc: '30–50 km (Södertälje, Märsta, Norrtälje)', baseFee: 100 },
];

const STHLM_MODES = [
    { id: 'standard4h', icon: <Truck size={24} />, label: 'Standardleverans', time: 'Idag inom 4 timmar', surcharge: 0, note: 'Estimerat fönster, ej garanterat pga trafik.' },
    { id: 'slot2h', icon: <Truck size={24} />, label: 'Tidsbestämd (2h-fönster)', time: 'Du väljer 2h-block', surcharge: 50, note: 'Vi försöker träffa fönstret.' },
    { id: 'express2h', icon: <Truck size={24} />, label: 'Express 2 timmar', time: 'Inom 2 h', surcharge: 89, note: 'Expressrutt.' },
    { id: 'urgent30', icon: <Truck size={24} />, label: 'Urgent 30 minuter', time: 'Inom ~30 min', surcharge: 149, note: 'Begränsad kapacitet.' },
    { id: 'instabox', icon: <Lock size={24} />, label: 'Paketbox (Instabox/DHL)', time: 'Inom dagen', surcharge: 29, note: 'Kod via SMS.' },
];

const MOCK_CART = [
    { id: 1, name: 'Medjool Dadlar', weight: '500 g', price: 89, qty: 2, img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=80&q=70' },
    { id: 2, name: 'Kashmiri Chai', weight: '100 g', price: 79, qty: 1, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=80&q=70' },
];

function getDeliveryCost(deliveryData) {
    if (deliveryData.region === 'stockholm') {
        const z = STOCKHOLM_ZONES.find(z => z.id === deliveryData.zone) || STOCKHOLM_ZONES[0];
        const m = STHLM_MODES.find(m => m.id === deliveryData.sthlmMode) || STHLM_MODES[0];
        return z.baseFee + m.surcharge;
    }
    return 49; // Default post
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

export default function Checkout() {
    const [step, setStep] = useState(0);
    const [delivery, setDelivery] = useState({
        region: 'stockholm', zone: 'z1', sthlmMode: 'standard4h', first: 'Ali', last: 'Malik',
        email: 'ali.malik@exotikmat.se', phone: '070 123 4567', street: 'Kungsgatan 1', zip: '111 20', district: 'Norrmalm'
    });
    const [payment, setPayment] = useState({ method: 'card', terms: true });

    const updateD = (k, v) => setDelivery(p => ({ ...p, [k]: v }));
    const updateP = (k, v) => setPayment(p => ({ ...p, [k]: v }));
    const deliveryCost = getDeliveryCost(delivery);
    const subtotal = MOCK_CART.reduce((s, i) => s + i.price * i.qty, 0);

    if (step === 2) {
        return (
            <div className="max-w-2xl mx-auto py-20 px-6 text-center">
                <div className="text-8xl mb-8">✅</div>
                <h1 className="font-anton text-5xl md:text-6xl uppercase tracking-tighter mb-4">TACK FÖR DIN ORDER!</h1>
                <p className="text-lg opacity-80 mb-10">Vi har tagit emot din beställning, {delivery.first}. En bekräftelse är på väg till {delivery.email}.</p>
                <Link to="/" className="inline-block px-12 py-5 font-black text-sm tracking-widest uppercase rounded-full border-2 border-white hover:bg-white hover:text-brand transition-all duration-300">
                    ← Tillbaka till butiken
                </Link>
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
                <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                    <div className="md:col-span-7">
                        <StepBar step={step} />

                        {step === 0 ? (
                            <div className="space-y-10">
                                <h2 className="font-anton text-4xl uppercase tracking-wider">Mottagaruppgifter</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2"><p className="text-[11px] font-black tracking-[0.2em] uppercase text-white/40 mb-2">// Personlig information</p></div>
                                    <input value={delivery.first} onChange={e => updateD('first', e.target.value)} placeholder="Förnamn" className="bg-white/10 border-2 border-white/20 rounded-xl p-3" />
                                    <input value={delivery.last} onChange={e => updateD('last', e.target.value)} placeholder="Efternamn" className="bg-white/10 border-2 border-white/20 rounded-xl p-3" />
                                    <div className="md:col-span-2"><input value={delivery.email} onChange={e => updateD('email', e.target.value)} placeholder="E-post" className="bg-white/10 border-2 border-white/20 rounded-xl p-3 w-full" /></div>
                                </div>
                                <button onClick={() => setStep(1)} className="w-full py-5 bg-white text-brand font-black rounded-full uppercase tracking-widest">Fortsätt till betalning</button>
                            </div>
                        ) : (
                            <div className="space-y-10">
                                <h2 className="font-anton text-4xl uppercase tracking-wider">Betalningsmetod</h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {['card', 'swish', 'klarna'].map(m => (
                                        <div key={m} onClick={() => updateP('method', m)} className={`radio-card ${payment.method === m ? 'selected' : ''}`}>
                                            <span className="capitalize font-black">{m}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setStep(2)} className="w-full py-5 bg-white text-brand font-black rounded-full uppercase tracking-widest">Bekräfta Beställning</button>
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-5">
                        <div className="rounded-3xl p-6 bg-black/25 backdrop-blur-3xl border border-white/15 sticky top-24">
                            <h3 className="font-anton text-2xl uppercase tracking-wider mb-5">Din beställning</h3>
                            <div className="space-y-4 mb-6">
                                {MOCK_CART.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span>{item.name} × {item.qty}</span>
                                        <span className="font-bold">{item.price * item.qty} kr</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/10 pt-4 space-y-2">
                                <div className="flex justify-between text-sm opacity-60"><span>Delsumma</span><span>{subtotal} kr</span></div>
                                <div className="flex justify-between text-sm opacity-60"><span>Frakt</span><span>{deliveryCost} kr</span></div>
                                <div className="flex justify-between text-2xl font-black pt-2"><span>Totalt</span><span>{subtotal + deliveryCost} kr</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
