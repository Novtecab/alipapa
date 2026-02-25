import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowUpRight, Check, Info, Mail, Phone, MapPin, Search } from 'lucide-react';

/* --- MIGRATED PRODUCT DATA --- */
const products = [
    { id: 1, name: 'Choco-doppade Majsskruvar', weight: '100 g', price: 45, unit: '22.50/st (2-pack)', discount: '-18%', cat: 'Snacks', desc: 'Krispiga majsskruvar doppade i mjölkchoklad. Perfekt mellanmål för hela familjen.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80' },
    { id: 2, name: 'Majssnacks Inferno Chili', weight: '150 g', price: 35, unit: '23.33/100g', discount: '-68%', cat: 'Snacks', desc: 'Eldheta majssnacks för dig som älskar stark mat. Varsamt: riktig hetta!', reason: 'Räddad: Kort bäst före-datum', origin: 'Mexico', img: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&q=80' },
    { id: 3, name: 'Mellanmålsbar Mjölkchoklad 4-pack', weight: '4 × 30 g', price: 40, unit: '10.00/bar', discount: '-20%', cat: 'Snacks', desc: 'Mjuk chokladbar med krispig kärna. Smidigt 4-pack för fika eller träning.', reason: 'Räddad: Förpackning bytt utseende', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80' },
    { id: 4, name: 'Kexchoklad Classic', weight: '60 g', price: 40, unit: '10.00/st (4-pack)', discount: '-16%', cat: 'Snacks', desc: 'En svensk klassiker — krispigt kex täckt med slät mjölkchoklad. Alltid populär.', reason: 'Standard: Bra pris, bra smak', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' },
    { id: 5, name: 'Blandat Original — Lösgodis', weight: '160 g', price: 30, unit: '15.00/st (2-pack)', discount: '-19%', cat: 'Godis', desc: 'Klassisk godisblandning med sura, söta och salta favoriter. Alltid en hit.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80' },
    { id: 6, name: 'Apelsinchoklad Rundade Bitar', weight: '120 g', price: 30, unit: '15.00/st (2-pack)', discount: '-60%', cat: 'Godis', desc: 'Mjölkchoklad med naturlig apelsinsmak. En söt och fruktig kombination.', reason: 'Räddad: Kort bäst före-datum', origin: 'Finland', img: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400&q=80' },
    { id: 7, name: 'Mjölkchoklad Kokos 30-pack', weight: '30 × 60 g', price: 299, unit: '9.97/bar', discount: '-33%', cat: 'Godis', desc: 'Storsäljaren i storpack — mjölkchoklad med kokosfyllning. Perfekt för kontoret.', reason: 'Räddad: Närmade sig bäst före', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80' },
    { id: 8, name: 'Pasta Mista Tricolore', weight: '400 g', price: 60, unit: '20.00/st (3-pack)', discount: '-32%', cat: 'Mat', desc: 'Trepack med färgglad blandad pasta. Enkel vardagsmat i italiensk tradition.', reason: 'Räddad: Förpackning bytt utseende', origin: 'Italien', img: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&q=80' },
    { id: 9, name: 'Nudelsoppa Spicy Kyckling', weight: '70 g', price: 12, unit: '12 kr/st', discount: '-48%', cat: 'Mat', desc: 'Snabblagad kryddig kycklingnudel — klar på 3 minuter. Asiens favoritkomfortmat.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sydkorea', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80' },
    { id: 10, name: 'Peanut Butter Naturell', weight: '500 g', price: 55, unit: '110/kg', discount: '-26%', cat: 'Mat', desc: '100% naturlig jordnötssmör utan tillsatser. Bra till frukost, smoothies eller bakning.', reason: 'Standard: Överskottslager', origin: 'USA', img: 'https://images.unsplash.com/photo-1639359028743-2fbf35b26e83?w=400&q=80' },
    { id: 11, name: 'Honung Wildblomster Eko', weight: '750 g', price: 79, unit: '105/kg', discount: '-21%', cat: 'Mat', desc: 'Ekologisk honung från vildblomster. Perfekt som sötning eller direkt på smörgåsen.', reason: 'Räddad: Kort bäst före-datum', origin: 'Frankrike', img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80' },
    { id: 12, name: 'Krossade Tomater', weight: '390 g', price: 15, unit: '13.25/förp', discount: '-20%', cat: 'Mat', desc: 'Smakrika krossade tomater — basen i en god pastasås, pizza eller soppa.', reason: 'Räddad: Förpackning bytt utseende', origin: 'Italien', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { id: 13, name: 'Torkad Mango Premium', weight: '250 g', price: 65, unit: '260/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Saftiga mangoremsor torkade på naturligt vis — söta, sega och oemotståndliga.', reason: 'Hållbar: Lång hållbarhet utan kylförvaring', origin: 'Pakistan / Thailand', img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&q=80' },
    { id: 14, name: 'Medjool Dadlar', weight: '500 g', price: 89, unit: '178/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Kungliga Medjool-dadlar — naturligt söta, perfekt för Ramadan och varje dag.', reason: 'Hållbar: Naturlig preservering', origin: 'Jordanien', img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400&q=80' },
    { id: 15, name: 'Torkade Aprikoser Naturell', weight: '300 g', price: 55, unit: '183/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Mjuka, naturliga aprikoser utan svavel eller tillsatser. Rik på järn och fiber.', reason: 'Hållbar: Naturlig preservering', origin: 'Turkiet', img: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&q=80' },
    { id: 16, name: 'Blandad Nöt & Fruktmix', weight: '400 g', price: 79, unit: '197/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Energirik blandning av mandlar, cashew, russin och torkad tranbär. Perfekt snack.', reason: 'Hållbar: Lång hållbarhet', origin: 'Blandat ursprung', img: 'https://images.unsplash.com/photo-1604589313744-859dc88f4a30?w=400&q=80' },
    { id: 17, name: 'Ekologiska Russin', weight: '500 g', price: 49, unit: '98/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Ekologiska solrosade russin — naturligt söta och mättande. Bra i gröt eller müsli.', reason: 'Hållbar: Ekologiskt odlat', origin: 'Turkiet', img: 'https://images.unsplash.com/photo-1596277122975-0ec3283e6b6e?w=400&q=80' },
    { id: 18, name: 'Pistagenötter Rostade & Saltade', weight: '250 g', price: 95, unit: '380/kg', discount: 'EGET', cat: 'Torkad Frukt', desc: 'Knapriga pistagenötter rostade med havssalt. Omöjliga att sluta äta.', reason: 'Hållbar: Lång hållbarhet', origin: 'Iran', img: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&q=80' },
    { id: 19, name: 'Kashmiri Chai (Rosa Te)', weight: '100 g · 50 koppar', price: 79, unit: '1.58/kopp', discount: 'EGET', cat: 'Te & Dryck', desc: 'Det ikoniska rosa teet från Kashmir — krämigt, aromatiskt och fyllt av tradition.', reason: 'Hållbar: Torr förvaring, lång hållbarhet', origin: 'Pakistan', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
    { id: 20, name: 'Masala Chai Blend', weight: '150 g · 75 koppar', price: 89, unit: '1.19/kopp', discount: 'EGET', cat: 'Te & Dryck', desc: 'Klassisk indisk masala chai med ingefära, kardemumma och kanel. Värmer inifrån.', reason: 'Hållbar: Torr förvaring, lång hållbarhet', origin: 'Indien', img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80' },
    { id: 21, name: 'Grönt Te Ingefära & Citron', weight: '30 påsar', price: 45, unit: '1.50/påse', discount: 'EGET', cat: 'Te & Dryck', desc: 'Friskt grönt te med naturlig ingefära och citron. Perfekt på morgonen eller efter maten.', reason: 'Hållbar: Lång hållbarhet', origin: 'Sri Lanka', img: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&q=80' },
    { id: 22, name: 'Hibiskus & Rosenblad Te', weight: '30 påsar', price: 49, unit: '1.63/påse', discount: 'EGET', cat: 'Te & Dryck', desc: 'Vackert rött te med naturlig blommighet. Serveras varmt eller iskallt.', reason: 'Hållbar: Lång hållbarhet', origin: 'Egypten', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80' },
    { id: 23, name: 'Tamarind Dryckkoncentrat', weight: '500 ml', price: 69, unit: '138/L', discount: 'EGET', cat: 'Te & Dryck', desc: 'Syrlig och söt tamarindsirap — späd ut med vatten för en autentisk sydasiatisk dryck.', reason: 'Hållbar: Naturliga konserveringsmedel', origin: 'Bangladesh', img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80' },
    { id: 24, name: 'Winter Glow Vitamingodis', weight: '150 g', price: 99, unit: '99 kr', discount: '-50%', cat: 'Hälsa', desc: 'Vitaminberikade tuggbara godisbitar med A, C och E. Smakar gott — gör gott.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf6?w=400&q=80' },
    { id: 25, name: 'Omega-3 Citron Tuggis', weight: '180 g', price: 129, unit: '129 kr', discount: '-28%', cat: 'Hälsa', desc: 'Omega-3 i tuggbar form med naturlig citronsmak. Bra för hjärta och hjärna.', reason: 'Räddad: Kort bäst före-datum', origin: 'Norge', img: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&q=80' },
    { id: 26, name: 'Proteinbar Fizzy Cola 18-pack', weight: '18 × 40 g', price: 199, unit: '11.06/bar', discount: '-47%', cat: 'Hälsa', desc: '20 g protein per bar med brustablettseffekt av cola. Träningens godaste belöning.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1622484211498-ec9e5b5e9a04?w=400&q=80' },
    { id: 27, name: 'Spicy Ramen Cheese 6-pack', weight: '6 × 70 g', price: 86, unit: '14.33/påse', discount: '-47%', cat: 'Storpack', desc: 'Koreanska nudelkoppar med het kyckling och krämig ost-twist. Perfekt att ha ett lager av.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sydkorea', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80' },
    { id: 28, name: 'Energidryck Cosmic Vibe 24-pack', weight: '24 × 355 ml', price: 249, unit: '10.38/burk', discount: '-45%', cat: 'Storpack', desc: '24-pack med fräsch energidryck. Perfekt för office, gymmet eller lagerlokal.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&q=80' },
    { id: 29, name: 'Ramlösa Päron 12-pack', weight: '12 × 330 ml', price: 59, unit: '4.92/burk', discount: 'POPULÄR', cat: 'Storpack', desc: 'Uppfriskande kolsyrat vatten med päronsmak. Bästa alternativet till läsk.', reason: 'Räddad: Förpackning bytt utseende', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&q=80' },
    { id: 30, name: 'Hönsbuljong 20-pack', weight: '20 × 10 g', price: 20, unit: '1.00/tärning', discount: '-33%', cat: 'Storpack', desc: 'Välsmakande kycklingbuljong att ha som baslagret i soppor, såser och grytor.', reason: 'Räddad: Kort bäst före-datum', origin: 'Schweiz', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80' },
    { id: 31, name: 'Proteinbar Crunch & Cream 24-pk', weight: '24 × 35 g', price: 199, unit: '8.29/bar', discount: '-39%', cat: 'Storpack', desc: '24-pack proteinbars i knapriga och krämiga smaker. Räcker hela träningsperioden.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1622484211498-ec9e5b5e9a04?w=400&q=80' },
    { id: 32, name: 'Specialgröt Havre & Vanilj', weight: '500 g', price: 50, unit: '25.00/st (2-pack)', discount: '-70%', cat: 'Frukost', desc: 'Krämig havregröt med naturlig vaniljarom. Redo på 3 minuter — perfekt morgonstart.', reason: 'Räddad: Kort bäst före-datum', origin: 'Sverige', img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&q=80' },
];

const categories = ['Alla', 'Torkad Frukt', 'Te & Dryck', 'Snacks', 'Godis', 'Mat', 'Storpack', 'Hälsa', 'Frukost'];

const ramadanOffers = [
    { id: 'r1', name: 'Medjool Dadlar Storpack', weight: '1 kg', price: 159, oldPrice: 210, img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=400&q=80', desc: 'Kungliga dadlar för iftar — naturligt söta, rika på energi. Ramadan Mubarak 🌙' },
    { id: 'r2', name: 'Kashmiri Chai Ramadan Set', weight: '200 g · 100 koppar', price: 139, oldPrice: 180, img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', desc: 'Det rosa teet som hör ramadan till. Brygges klart under Suhoor och Iftar.' },
    { id: 'r3', name: 'Blandad Torkad Frukt & Nöt', weight: '800 g', price: 129, oldPrice: 180, img: 'https://images.unsplash.com/photo-1604589313744-859dc88f4a30?w=400&q=80', desc: 'Perfekt iftar-snacksblandning — dadlar, mango, aprikoser och nötter i ett.' },
    { id: 'r4', name: 'Masala Chai Familjepack', weight: '300 g · 150 koppar', price: 149, oldPrice: 199, img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&q=80', desc: 'Doftar av kardemumma och ingefära. Perfekt att dela med hela familjen.' },
];

const easterOffers = [
    { id: 'e1', name: 'Chokladägg Mjölkchoklad 6-pack', weight: '6 × 60 g', price: 79, oldPrice: 120, img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&q=80', desc: 'Klassiska chokladägg till påskkorgen. Göm dem väl — de försvinner snabbt!' },
    { id: 'e2', name: 'Blandad Godispåse Påsk', weight: '300 g', price: 45, oldPrice: 70, img: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80', desc: 'Färgglatt påskgodis i en läcker blandning — surt, sött och allt däremellan.' },
    { id: 'e3', name: 'Hibiskus Påskté Tin', weight: '40 påsar', price: 59, oldPrice: 89, img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80', desc: 'Vackert rött hibiskuste i en presentlåda — perfekt påskgåva eller bordsdekor.' },
    { id: 'e4', name: 'Nöt & Fruktmix Påskbox', weight: '500 g', price: 89, oldPrice: 130, img: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&q=80', desc: 'Byt ut godis mot något nyttigare — en vacker låda med nötter och torkad frukt.' },
];

const RECIPES = [
    { id: 'rec1', cat: 'Frukost', icon: '☀️', name: 'Exotikmat Energifrukost', time: '5 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=500&q=80', desc: 'Krämig havregröt toppad med torkad mango, russin och pistagenötter. Perfekt Suhoor-start.', tags: ['Vegansk', 'Glutenfri', 'Ramadan'], ings: [{ n: 'Specialgröt Havre & Vanilj', qty: 1, ref: 32, price: 50 }, { n: 'Torkad Mango Premium', qty: 1, ref: 13, price: 65 }, { n: 'Ekologiska Russin', qty: 1, ref: 17, price: 49 }, { n: 'Pistagenötter Rostade', qty: 1, ref: 18, price: 95 }] },
    { id: 'rec2', cat: 'Iftar', icon: '🌙', name: 'Klassisk Iftar-bricka', time: '10 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?w=500&q=80', desc: 'Traditionell Iftar med Medjool-dadlar, Kashmiri chai och blandad nöt & fruktmix.', tags: ['Ramadan', 'Familjerecept'], ings: [{ n: 'Medjool Dadlar', qty: 2, ref: 14, price: 89 }, { n: 'Kashmiri Chai', qty: 1, ref: 19, price: 79 }, { n: 'Blandad Nöt & Fruktmix', qty: 1, ref: 16, price: 79 }] },
    { id: 'rec3', cat: 'Smoothie', icon: '🥤', name: 'Tropisk Exotikmat Smoothie', time: '5 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80', desc: 'Kraftfull smoothie med mango, dadlar, honung och mandelmjölk. Naturligt söt energiboost.', tags: ['Vegansk', 'Rå', 'Hälsosam'], ings: [{ n: 'Torkad Mango Premium', qty: 1, ref: 13, price: 65 }, { n: 'Medjool Dadlar', qty: 1, ref: 14, price: 89 }, { n: 'Honung Wildblomster Eko', qty: 1, ref: 11, price: 79 }] },
    { id: 'rec4', cat: 'Lunch', icon: '🍲', name: 'Snabb Nudelsoppa från Grunden', time: '15 min', diff: 'Medel', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80', desc: 'Häll het kyckling-nudelsoppa över färsk lök och toppa med sesam. Asiens snabbaste lunch.', tags: ['Snabb', 'Varm', 'Spicy'], ings: [{ n: 'Nudelsoppa Spicy Kyckling', qty: 2, ref: 9, price: 12 }, { n: 'Hönsbuljong 20-pack', qty: 1, ref: 30, price: 20 }, { n: 'Krossade Tomater', qty: 1, ref: 12, price: 15 }] },
    { id: 'rec5', cat: 'Middag', icon: '🍝', name: 'Enkel Pastamiddag med Tomatsås', time: '20 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500&q=80', desc: 'Tricolore pasta i klassisk tomatsås med vitlök och olivolja. Vardagsmat på en kvart.', tags: ['Vegetarisk', 'Familj', 'Snabb'], ings: [{ n: 'Pasta Mista Tricolore', qty: 1, ref: 8, price: 60 }, { n: 'Krossade Tomater', qty: 2, ref: 12, price: 15 }, { n: 'Honung Wildblomster Eko', qty: 1, ref: 11, price: 79 }] },
    { id: 'rec6', cat: 'Snack', icon: '🥜', name: 'Hälsosam Eftermiddagssnack', time: '2 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1604589313744-859dc88f4a30?w=500&q=80', desc: 'Jordnötssmör på rågknäcke med aprikoser och pistagenötter. Fyllig och nyttig.', tags: ['Hälsa', 'Vegansk', 'Rå'], ings: [{ n: 'Peanut Butter Naturell', qty: 1, ref: 10, price: 55 }, { n: 'Torkade Aprikoser Naturell', qty: 1, ref: 15, price: 55 }, { n: 'Pistagenötter Rostade', qty: 1, ref: 18, price: 95 }] },
    { id: 'rec7', cat: 'Påsk', icon: '🐣', name: 'Påskfika med Choklad & Hibiskuste', time: '5 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80', desc: 'Servera mjölkchoklad med kokos och ett vackert hibiskus-påskté till din påskbuffé.', tags: ['Påsk', 'Fika', 'Vegansk'], ings: [{ n: 'Mjölkchoklad Kokos 30-pack', qty: 1, ref: 7, price: 299 }, { n: 'Hibiskus & Rosenblad Te', qty: 1, ref: 22, price: 49 }, { n: 'Honung Wildblomster Eko', qty: 1, ref: 11, price: 79 }] },
    { id: 'rec8', cat: 'Chai', icon: '🫖', name: 'Masala Chai med Honung', time: '10 min', diff: 'Lätt', img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80', desc: 'Brygga Masala Chai med mjölk, sötad med vildblomsterhonung och servera med dadlar.', tags: ['Varm dryck', 'Ramadan', 'Vegansk'], ings: [{ n: 'Masala Chai Blend', qty: 1, ref: 20, price: 89 }, { n: 'Honung Wildblomster Eko', qty: 1, ref: 11, price: 79 }, { n: 'Medjool Dadlar', qty: 1, ref: 14, price: 89 }] },
];

const RECIPE_CATS = ['Alla', 'Frukost', 'Iftar', 'Smoothie', 'Lunch', 'Middag', 'Snack', 'Påsk', 'Chai'];

/* --- UI COMPONENTS --- */
function Navbar({ cartCount, onCartOpen, scrolled }) {
    return (
        <nav className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-300 ${scrolled ? 'bg-black/20 backdrop-blur-md' : ''}`}>
            <Link to="/" className="text-xl md:text-2xl font-black tracking-widest uppercase leading-none">✱ EXOTIKMAT</Link>
            <div className="hidden lg:flex gap-8 text-[11px] font-black tracking-[0.2em] uppercase">
                {['Produkter', 'Recept', 'Ramadan', 'Påsk', 'Storpack', 'Grossist'].map(l => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="hover-line hover:opacity-70 transition-opacity">{l}</a>
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

function RecipeCard({ recipe, onAddAll }) {
    const [added, setAdded] = useState(false);
    const total = recipe.ings.reduce((s, i) => s + i.price * i.qty, 0);
    const handleAdd = () => {
        recipe.ings.forEach(ing => {
            const p = products.find(pr => pr.id === ing.ref);
            if (p) {
                for (let j = 0; j < ing.qty; j++) onAddAll(p);
            }
        });
        setAdded(true); setTimeout(() => setAdded(false), 2000);
    };
    return (
        <div className="product-card rounded-2xl flex flex-col overflow-hidden bg-black/20 backdrop-blur-md border border-white/20">
            <div className="relative aspect-video">
                <img src={recipe.img} alt={recipe.name} className="card-img absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
                    {recipe.tags.map(t => <span key={t} className="text-[9px] font-black px-2 py-0.5 rounded-full bg-brand/85">{t}</span>)}
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <p className="font-black text-sm leading-tight drop-shadow-md">{recipe.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] font-bold opacity-90">
                        <span>⏱ {recipe.time}</span>
                        <span>📊 {recipe.diff}</span>
                        <span>{recipe.icon} {recipe.cat}</span>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
                <p className="text-[11px] opacity-70 leading-relaxed">{recipe.desc}</p>
                <div>
                    <p className="text-[10px] font-black tracking-widest uppercase opacity-40 mb-2">// Inkluderade varor</p>
                    <ul className="space-y-1">
                        {recipe.ings.map(ing => (
                            <li key={ing.n} className="flex justify-between text-[11px] leading-tight">
                                <span className="opacity-70">{ing.qty > 1 ? `×${ing.qty} ` : ''}{ing.n}</span>
                                <span className="font-bold opacity-60 whitespace-nowrap">{ing.price * ing.qty} kr</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <div>
                        <p className="text-[10px] opacity-50">Paketpris</p>
                        <p className="font-black text-lg leading-tight">{total} kr</p>
                    </div>
                    <button onClick={handleAdd} className={`text-[10px] font-black uppercase px-3 py-2 rounded-full border-2 border-white transition-all ${added ? 'bg-white text-brand' : ''}`}>
                        {added ? '✓ Alla tillagda' : '+ Lägg alla i korg'}
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

function OfferCard({ item, onAdd, accent }) {
    const [added, setAdded] = useState(false);
    const saved = item.oldPrice - item.price;
    const pct = Math.round(saved / item.oldPrice * 100);
    return (
        <div className="product-card rounded-2xl overflow-hidden flex flex-col bg-black/20 backdrop-blur-md" style={{ border: `1px solid ${accent}40` }}>
            <div className="relative aspect-video">
                <img src={item.img} alt={item.name} className="card-img absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-1 rounded-full" style={{ background: accent }}>-{pct}%</span>
                <span className="absolute top-2 right-2 text-[10px] font-black px-2 py-1 rounded-full bg-white text-black">Spara {saved} kr</span>
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                <p className="text-[11px] opacity-50">{item.weight}</p>
                <p className="text-[10px] opacity-60 leading-relaxed italic mt-1">{item.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black">{item.price}:-</span>
                        <span className="text-[11px] line-through opacity-40">{item.oldPrice}:-</span>
                    </div>
                    <button onClick={() => { onAdd(item); setAdded(true); setTimeout(() => setAdded(false), 1500); }}
                        className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full border-2 border-white transition-all ${added ? 'bg-white text-brand' : ''}`}>
                        {added ? '✓' : 'Köp'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function WholesaleCTA() {
    return (
        <section id="grossist" className="relative z-10 px-6 md:px-10 py-24">
            <div className="max-w-7xl mx-auto">
                <div className="rounded-3xl p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 bg-black/30 backdrop-blur-xl border border-white/15">
                    <div className="flex-1">
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-4">// Grossistprogram</p>
                        <h2 className="font-anton text-5xl md:text-7xl uppercase leading-[0.9] mb-8">SPARA MER.<br />KÖP BULK.</h2>
                        <ul className="space-y-4 mb-10">
                            {['Skattefaktura inkluderad', 'Gratis leverans i Stockholm över 2 000 kr', 'Exklusiva volymrabatter upp till 70%', 'Nyinkommet varje dag'].map(item => (
                                <li key={item} className="flex items-center gap-4 text-sm font-medium opacity-90">
                                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black flex-shrink-0">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Link to="/checkout" className="inline-block px-10 py-5 font-black text-xs tracking-widest uppercase rounded-full border-2 border-white hover:bg-white hover:text-brand transition-all duration-300 shadow-xl">
                            Ansök om Grossistkonto →
                        </Link>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                        {[{ l: 'Spara upp till', v: '70%', ic: '📉' }, { l: 'Leveranstid', v: '24h', ic: '⚡' }, { l: 'Produkter i lager', v: '500+', ic: '🥫' }, { l: 'Aktiva grossister', v: '1 400+', ic: '🤝' }].map(s => (
                            <div key={s.l} className="rounded-2xl p-8 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <span className="text-2xl mb-3 block">{s.ic}</span>
                                <p className="font-anton text-4xl leading-none mb-1">{s.v}</p>
                                <p className="text-[9px] font-black tracking-widest uppercase opacity-50">{s.l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/10 px-6 md:px-10 py-16 bg-black/20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 mb-20 opacity-30">
                    {['MARABOU', 'CELSIUS', 'SAMYANG', 'BAREBELLS', 'CORNY', 'KNORR', 'MALACO', 'VITAYUMMY'].map(b => (
                        <span key={b} className="font-black text-sm tracking-[0.3em] uppercase">{b}</span>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="lg:col-span-2">
                        <Link to="/" className="font-anton text-4xl mb-6 block tracking-tighter uppercase leading-none">✱ EXOTIKMAT</Link>
                        <p className="text-sm opacity-60 leading-relaxed max-w-sm">
                            Vi räddar mat — du sparar pengar. Äkta varor, egna importerade delikatesser och Sveriges bästa grossistpriser direkt till din dörr.
                        </p>
                        <div className="flex gap-4 mt-8">
                            {[Mail, Phone, MapPin].map((Icon, i) => (
                                <div key={i} className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center text-sm hover:border-white transition-all cursor-pointer bg-white/5">
                                    <Icon size={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-[11px] tracking-[0.2em] uppercase mb-6 opacity-40">Butiken</h4>
                        <ul className="space-y-4">
                            {['Torkad Frukt', 'Te & Dryck', 'Snacks & Godis', 'Storpack', 'Hälsa & Vitaminer', 'Frukost'].map(l => (
                                <li key={l}><a href="#produkter" className="text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-brand scale-0 group-hover:scale-100 transition-transform" />{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-[11px] tracking-[0.2em] uppercase mb-6 opacity-40">Support</h4>
                        <ul className="space-y-4">
                            {['Vanliga frågor', 'Leverans & frakt', 'Integritetspolicy', 'Allmänna villkor', 'Kontakta oss'].map(l => (
                                <li key={l}><a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity flex items-center gap-2 group"><div className="w-1 h-1 rounded-full bg-brand scale-0 group-hover:scale-100 transition-transform" />{l}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                    <p className="text-[10px] font-black opacity-30 tracking-widest uppercase text-center md:text-left">© 2026 EXOTIKMAT. Alla rättigheter förbehållna.</p>
                    <div className="flex gap-8">
                        <span className="text-[10px] font-black opacity-30 tracking-wider">PAKISTAN · INDIEN · SVERIGE</span>
                        <span className="text-[10px] font-black opacity-40 hover:opacity-100 transition-opacity cursor-pointer">INFO@EXOTIKMAT.SE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [cat, setCat] = useState('Alla');
    const [recipeCat, setRecipeCat] = useState('Alla');

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

    const filtered = cat === 'Alla' ? products : products.filter(p => p.cat === cat);
    const filteredRecipes = recipeCat === 'Alla' ? RECIPES : RECIPES.filter(r => r.cat === recipeCat);

    return (
        <div className="relative">
            <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} onCartOpen={() => setCartOpen(true)} scrolled={scrolled} />

            {/* Hero */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
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
                            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Hero" className="w-full h-full object-cover brush-shape shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Seasonal */}
            <section id="ramadan" className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
                <div className="mb-12">
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-3">// Ramadan Mubarak</p>
                    <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none">RAMADAN 🌙</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ramadanOffers.map(o => <OfferCard key={o.id} item={o} onAdd={addToCart} accent="#8B5CF6" />)}
                </div>
            </section>

            <section id="påsk" className="px-6 md:px-10 py-24 max-w-7xl mx-auto border-t border-white/5">
                <div className="mb-12">
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-3">// Glad Påsk</p>
                    <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none">PÅSKERBJUDANDEN 🐣</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {easterOffers.map(o => <OfferCard key={o.id} item={o} onAdd={addToCart} accent="#FACC15" />)}
                </div>
            </section>

            {/* Recipes */}
            <section id="recept" className="px-6 md:px-10 py-24 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 mb-12">
                    <div>
                        <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 mb-3">// Matinspiration</p>
                        <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none">HÄLSOSAMMA RECEPT</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {RECIPE_CATS.map(c => (
                            <button key={c} onClick={() => setRecipeCat(c)} className={`text-[10px] font-black uppercase px-4 py-2 rounded-full border-2 border-white transition-all ${recipeCat === c ? 'bg-white text-brand' : 'hover:bg-white/5'}`}>{c}</button>
                        ))}
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 mb-10">
                    <span className="text-2xl">💡</span>
                    <p className="text-sm font-medium opacity-80 leading-relaxed">Klicka på "Lägg alla i korg" för att snabbt lägga till receptets alla ingredienser.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredRecipes.map(r => <RecipeCard key={r.id} recipe={r} onAddAll={addToCart} />)}
                </div>
            </section>

            {/* Products */}
            <section id="produkter" className="px-6 md:px-10 py-24 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <h2 className="font-anton text-5xl md:text-8xl uppercase leading-none">PRODUKTER</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <button key={c} onClick={() => setCat(c)} className={`text-[10px] font-black uppercase px-4 py-2 rounded-full border-2 border-white transition-all ${cat === c ? 'bg-white text-brand' : 'hover:bg-white/5'}`}>{c}</button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filtered.map(p => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
                </div>
            </section>

            <WholesaleCTA />
            <Footer />

            <CartDrawer cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
        </div>
    );
}
