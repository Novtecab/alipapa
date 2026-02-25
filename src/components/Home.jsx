import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowUpRight, Check, Info, Mail, Phone, MapPin, Search } from 'lucide-react';

/* --- DATA MIGRATION --- */
const products = [
    { id: 1, name: 'Choco-doppade Majsskruvar', weight: '100 g', price: 45, unit: '22.50/st (2-pack)', discount: '-18%', cat: 'Snacks', desc: 'Krispiga majsskruvar doppade i mjölkchoklad.', reason: 'Räddad: Kort datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
    { id: 2, name: 'Majssnacks Inferno Chili', weight: '150 g', price: 35, unit: '23.33/100g', discount: '-68%', cat: 'Snacks', desc: 'Eldheta majssnacks.', reason: 'Räddad: Kort datum', origin: 'Mexico', img: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&q=80' },
    { id: 14, name: 'Medjool Dadlar', weight: '500 g', price: 89, unit: '178/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Kungliga Medjool-dadlar.', reason: 'Hållbar', origin: 'Jordanien', img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400&q=80' },
    { id: 19, name: 'Kashmiri Chai (Rosa Te)', weight: '100 g', price: 79, unit: '1.58/kopp', discount: 'EGET', cat: 'Te & Dryck', desc: 'Det ikoniska rosa teet.', reason: 'Hållbar', origin: 'Pakistan', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
    { id: 13, name: 'Torkad Mango Premium', weight: '250 g', price: 65, unit: '260/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Saftiga mangoremsor.', reason: 'Hållbar', origin: 'Thailand', img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80' }
];

const RECIPES = [
    {
        id: 'rec1', name: 'Exotikmat Energifrukost', cat: 'Frukost', img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=500&q=80',
        desc: 'Krämig havregröt toppad med torkad mango, russin och pistagenötter.', tags: ['Vegansk', 'Ramadan'],
        ings: [{ n: 'Torkad Mango', qty: 1, ref: 13, price: 65 }, { n: 'Dadlar', qty: 1, ref: 14, price: 89 }]
    }
];

/* --- UI COMPONENTS --- */
function Navbar({ cartCount, onCartOpen, scrolled }) {
    return (
        <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-md' : ''}`}>
            <Link to="/" className="text-xl md:text-2xl font-black tracking-widest uppercase leading-none">✱ EXOTIKMAT</Link>
            <div className="hidden md:flex gap-8 text-[11px] font-black tracking-[0.2em] uppercase">
                {['Torkad Frukt', 'Te & Dryck', 'Ramadan', 'Påsk', 'Storpack'].map(l => (
                    <a key={l} href="#produkter" className="hover-line hover:opacity-70 transition-opacity">{l}</a>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <button onClick={onCartOpen} className="relative flex items-center gap-2 group">
                    <span className="text-[11px] font-black tracking-widest uppercase hidden md:block">Varukorg</span>
                    <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-brand transition-all duration-300 relative">
                        <ShoppingCart size={16} strokeWidth={3} />
                        {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-brand rounded-full text-[10px] font-black flex items-center justify-center">{cartCount}</span>}
                    </div>
                </button>
                <Link to="/checkout" className="flex items-center gap-3 group">
                    <span className="text-[11px] font-black tracking-widest uppercase hidden md:block">BESTÄLL NU</span>
                    <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-brand transition-all duration-300">
                        <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                </Link>
            </div>
        </nav>
    );
}

function ProductCard({ product, onAdd }) {
    const [added, setAdded] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    return (
        <div className="product-card rounded-2xl flex flex-col overflow-hidden bg-black/20 backdrop-blur-md border border-white/20">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img src={product.img} alt={product.name} className="card-img absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2">
                    <span className="text-[9px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full bg-brand/85 backdrop-blur-sm">✱ EXOTIKMAT</span>
                </div>
                <span className="absolute top-2 right-2 text-[10px] font-black tracking-wide px-2 py-1 rounded-full bg-white text-brand">{product.discount}</span>
                <button onClick={() => setShowDesc(!showDesc)} className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-[10px] font-black hover:bg-black/70 transition-colors">
                    <Info size={12} />
                </button>
            </div>
            {showDesc && (
                <div className="px-4 pt-3 pb-1 bg-black/25">
                    <p className="text-[11px] leading-relaxed opacity-90">{product.desc}</p>
                    <p className="text-[10px] mt-1.5 opacity-50 flex items-center gap-1">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400" />
                        {product.reason} · {product.origin}
                    </p>
                </div>
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
                <div>
                    <p className="text-[10px] font-black tracking-[0.15em] uppercase opacity-50 mb-0.5">{product.cat}</p>
                    <h3 className="font-bold text-sm leading-snug">{product.name}</h3>
                    <p className="text-[11px] opacity-50 mt-0.5">{product.weight}</p>
                </div>
                <div className="flex items-end justify-between mt-auto pt-2 border-t border-white/10">
                    <div>
                        <p className="text-xl font-black leading-none">{product.price}:-</p>
                        <p className="text-[10px] opacity-50 mt-0.5">{product.unit || '1 st'}</p>
                    </div>
                    <button onClick={() => { onAdd(product); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                        className={`text-[10px] font-black tracking-wide uppercase px-3 py-1.5 rounded-full border-2 border-white transition-all duration-300 ${added ? 'bg-white text-brand' : ''}`}>
                        {added ? '✓ Tillagd' : 'Lägg i korg'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function CartDrawer({ cart, isOpen, onClose, onRemove }) {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={onClose} />}
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`} style={{ background: 'rgba(20,7,4,0.97)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="font-anton text-2xl uppercase">Varukorg ({cart.reduce((s, i) => s + i.qty, 0)})</h2>
                    <button onClick={onClose} className="w-9 h-9 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center opacity-40 mt-20"><div className="text-5xl mb-4">🛒</div><p className="text-sm">Din varukorg är tom</p></div>
                    ) : cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-xs truncate">{item.name}</p>
                                <p className="text-[11px] opacity-60">{item.qty} × {item.price} kr</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="font-black text-base">{item.price * item.qty} kr</p>
                                <button onClick={() => onRemove(item.id)} className="text-[10px] opacity-40 hover:opacity-100 transition-opacity">Ta bort</button>
                            </div>
                        </div>
                    ))}
                </div>
                {cart.length > 0 && (
                    <div className="p-6 border-t border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-sm uppercase tracking-widest opacity-70">Totalt</span>
                            <span className="font-anton text-3xl">{total} kr</span>
                        </div>
                        <Link to="/checkout" className="block w-full py-4 font-black text-sm tracking-widest uppercase rounded-full bg-white text-brand hover:bg-brand hover:text-white border-2 border-white transition-all duration-300 text-center">
                            Gå till kassan →
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        const f = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', f);
        return () => window.removeEventListener('scroll', f);
    }, []);

    const addToCart = (p) => setCart(prev => {
        const e = prev.find(i => i.id === p.id);
        return e ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });

    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

    return (
        <div className="relative">
            <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} onCartOpen={() => setCartOpen(true)} scrolled={scrolled} />

            {/* Hero */}
            <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                    <span className="font-anton text-[28vw] text-white select-none leading-none opacity-10 blur-sm">EXOTIKMAT</span>
                </div>
                <div className="relative w-full max-w-7xl mx-auto">
                    <div className="font-anton text-massive text-center uppercase pointer-events-none select-none">
                        <div className="hidden md:block">VI RÄDDAR MAT</div>
                        <div className="md:hidden flex flex-col items-center leading-none"><span>VI</span><span>RÄDDAR</span><span>MAT</span></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-[240px] h-[320px] md:w-[420px] md:h-[540px]">
                            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Hero" className="w-full h-full object-cover brush-shape shadow-2xl grayscale-[20%] brightness(110%)" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Grid */}
            <section id="produkter" className="relative z-10 px-6 md:px-10 py-24 max-w-7xl mx-auto">
                <h2 className="font-anton text-5xl md:text-7xl uppercase leading-none mb-10">POPULÄRT JUST NU</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
                </div>
            </section>

            <CartDrawer cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
        </div>
    );
}
