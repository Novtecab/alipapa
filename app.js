const products = [
    {
        id: 1,
        name: "Premium Basmati Rice",
        brand: "Exotikmat",
        weight: "10kg x 5 Bags",
        price: 849,
        unitPrice: "16.98/kg",
        discount: "30% OFF",
        category: "Rice",
        icon: "🍚"
    },
    {
        id: 2,
        name: "Red Chili Powder (Fine)",
        brand: "Desibox",
        weight: "5kg Bulk Pack",
        price: 450,
        unitPrice: "90/kg",
        discount: "POPULAR",
        category: "Spices",
        icon: "🌶️"
    },
    {
        id: 3,
        name: "Whole Turmeric Grains",
        brand: "PureDesi",
        weight: "5kg Bulk Pack",
        price: 380,
        unitPrice: "76/kg",
        discount: "NEW",
        category: "Spices",
        icon: "🧪"
    },
    {
        id: 4,
        name: "Red Lentils (Masoor Dal)",
        brand: "Exotikmat",
        weight: "25kg Commercial",
        price: 520,
        unitPrice: "20.80/kg",
        discount: "45% OFF",
        category: "Pulses",
        icon: "🍲"
    },
    {
        id: 5,
        name: "Desi Ghee (Pure)",
        brand: "GoldStaple",
        weight: "5L x 2 Tins",
        price: 1290,
        unitPrice: "129/L",
        discount: "BULK",
        category: "Oils",
        icon: "🍯"
    },
    {
        id: 6,
        name: "Ready-to-eat Biryani Box",
        brand: "Desibox",
        weight: "24 x 400g Box",
        price: 960,
        unitPrice: "40/unit",
        discount: "WHIPPED",
        category: "Ready Meals",
        icon: "📦"
    }
];

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card glass animate-fade-in">
            <div class="discount-tag">${product.discount}</div>
            <div class="product-image">
                <span style="font-size: 5rem;">${product.icon}</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--primary); font-weight: 700;">${product.brand}</p>
            <h3>${product.name}</h3>
            <p style="color: var(--text-muted); font-size: 0.875rem;">Bulk: ${product.weight}</p>
            <div class="product-meta">
                <div class="price-container">
                    <span class="price">${product.price}:-</span>
                    <span class="unit-price">${product.unitPrice}</span>
                </div>
                <button class="btn-add">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
