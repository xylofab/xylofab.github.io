/* XyloFab — código partilhado: línguas, cabeçalho, rodapé, carrinho, conta e portes.
   Fase 1: tudo funciona no browser (modo de teste). Na fase 2, XF.API passa a apontar
   para a app fab3d e as contas, encomendas e pagamentos passam a ser reais. */
(function () {
  'use strict';

  var XF = window.XF = {};
  XF.API = ''; // fase 2: endereço da app fab3d (túnel Cloudflare)
  XF.TEST = true;
  XF.EMAIL = 'print.xylofab@gmail.com';

  /* ---------- guardar no browser, sem rebentar se não der ---------- */
  XF.load = function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  XF.save = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  XF.drop = function (k) { try { localStorage.removeItem(k); } catch (e) {} };

  /* ---------- línguas ---------- */
  var NAMES = { pt: 'Português', en: 'English', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', nl: 'Nederlands', pl: 'Polski', ro: 'Română', sv: 'Svenska', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά', cs: 'Čeština', sk: 'Slovenčina', hu: 'Magyar', bg: 'Български', hr: 'Hrvatski', sl: 'Slovenščina', et: 'Eesti', lv: 'Latviešu', lt: 'Lietuvių', mt: 'Malti', ga: 'Gaeilge' };
  var K = ['shop', 'about', 'login', 'cart', 'hint', 'mani', 'shop1', 'shop2', 'custom1', 'custom2', 'lab1', 'lab2', 'rev', 'add'];
  var R = {
    pt: ['Loja', 'Quem somos', 'Entrar', 'Carrinho', 'DESCE DEVAGAR. ESTAMOS A IMPRIMIR.', 'Não fazemos coisas normais. Imprimimos as que faltam.', 'Saiu da impressora.', 'Pode ir para tua casa.', 'Tens uma ideia esquisita?', 'Ótimo.', 'Coisas que ainda', 'não existem.', 'Quem já tem uma.', 'Adicionar'],
    en: ['Shop', 'About us', 'Sign in', 'Cart', "SCROLL SLOWLY. WE'RE PRINTING.", "We don't make normal things. We print the ones that are missing.", 'Fresh off the printer.', 'Ready to go home with you.', 'Got a weird idea?', 'Great.', "Things that don't", 'exist yet.', 'People who already have one.', 'Add'],
    es: ['Tienda', 'Quiénes somos', 'Entrar', 'Carrito', 'BAJA DESPACIO. ESTAMOS IMPRIMIENDO.', 'No hacemos cosas normales. Imprimimos las que faltan.', 'Recién salido de la impresora.', 'Listo para ir a tu casa.', '¿Tienes una idea rara?', 'Genial.', 'Cosas que todavía', 'no existen.', 'Quien ya tiene una.', 'Añadir'],
    fr: ['Boutique', 'Qui sommes-nous', 'Se connecter', 'Panier', 'DÉFILEZ LENTEMENT. ON IMPRIME.', 'Nous ne faisons pas des choses normales. Nous imprimons celles qui manquent.', "Tout juste sorti de l'imprimante.", 'Prêt à rentrer chez vous.', 'Une idée bizarre ?', 'Parfait.', 'Des choses qui', "n'existent pas encore.", 'Ceux qui en ont déjà un.', 'Ajouter'],
    de: ['Shop', 'Über uns', 'Anmelden', 'Warenkorb', 'LANGSAM SCROLLEN. WIR DRUCKEN GERADE.', 'Wir machen keine normalen Dinge. Wir drucken die, die fehlen.', 'Frisch aus dem Drucker.', 'Bereit für dein Zuhause.', 'Eine verrückte Idee?', 'Super.', 'Dinge, die es', 'noch nicht gibt.', 'Die schon eins haben.', 'Hinzufügen'],
    it: ['Negozio', 'Chi siamo', 'Accedi', 'Carrello', 'SCORRI PIANO. STIAMO STAMPANDO.', 'Non facciamo cose normali. Stampiamo quelle che mancano.', 'Appena uscito dalla stampante.', 'Pronto per casa tua.', "Hai un'idea strana?", 'Perfetto.', 'Cose che ancora', 'non esistono.', 'Chi ne ha già uno.', 'Aggiungi'],
    nl: ['Winkel', 'Over ons', 'Inloggen', 'Winkelwagen', 'SCROL RUSTIG. WE ZIJN AAN HET PRINTEN.', 'We maken geen normale dingen. We printen wat er nog ontbreekt.', 'Vers uit de printer.', 'Klaar om mee naar huis te gaan.', 'Een raar idee?', 'Top.', 'Dingen die nog', 'niet bestaan.', 'Wie er al een heeft.', 'Toevoegen'],
    pl: ['Sklep', 'O nas', 'Zaloguj się', 'Koszyk', 'PRZEWIJAJ POWOLI. DRUKUJEMY.', 'Nie robimy zwykłych rzeczy. Drukujemy te, których brakuje.', 'Prosto z drukarki.', 'Gotowe, by jechać do ciebie.', 'Masz dziwny pomysł?', 'Świetnie.', 'Rzeczy, których', 'jeszcze nie ma.', 'Ci, którzy już mają.', 'Dodaj'],
    ro: ['Magazin', 'Despre noi', 'Autentificare', 'Coș', 'DERULEAZĂ ÎNCET. PRINTĂM.', 'Nu facem lucruri normale. Le printăm pe cele care lipsesc.', 'Proaspăt ieșit din imprimantă.', 'Gata să ajungă la tine acasă.', 'Ai o idee ciudată?', 'Excelent.', 'Lucruri care încă', 'nu există.', 'Cei care au deja unul.', 'Adaugă'],
    sv: ['Butik', 'Om oss', 'Logga in', 'Varukorg', 'SCROLLA LÅNGSAMT. VI SKRIVER UT.', 'Vi gör inga vanliga saker. Vi skriver ut dem som saknas.', 'Nyss ur skrivaren.', 'Redo att följa med hem.', 'Har du en konstig idé?', 'Toppen.', 'Saker som inte', 'finns än.', 'De som redan har en.', 'Lägg till'],
    da: ['Butik', 'Om os', 'Log ind', 'Kurv', 'SCROLL LANGSOMT. VI PRINTER.', 'Vi laver ikke normale ting. Vi printer dem, der mangler.', 'Lige ud af printeren.', 'Klar til at komme hjem til dig.', 'Har du en skør idé?', 'Fedt.', 'Ting, der ikke', 'findes endnu.', 'Dem, der allerede har en.', 'Tilføj'],
    fi: ['Kauppa', 'Meistä', 'Kirjaudu', 'Ostoskori', 'VIERITÄ HITAASTI. TULOSTAMME.', 'Emme tee tavallisia asioita. Tulostamme ne, jotka puuttuvat.', 'Suoraan tulostimesta.', 'Valmis lähtemään kotiisi.', 'Onko sinulla outo idea?', 'Mahtavaa.', 'Asioita, joita ei', 'vielä ole.', 'Ne, joilla on jo sellainen.', 'Lisää'],
    el: ['Κατάστημα', 'Ποιοι είμαστε', 'Σύνδεση', 'Καλάθι', 'ΚΑΤΕΒΑ ΑΡΓΑ. ΤΥΠΩΝΟΥΜΕ.', 'Δεν φτιάχνουμε συνηθισμένα πράγματα. Τυπώνουμε αυτά που λείπουν.', 'Μόλις βγήκε από τον εκτυπωτή.', 'Έτοιμο να έρθει σπίτι σου.', 'Έχεις μια περίεργη ιδέα;', 'Τέλεια.', 'Πράγματα που', 'δεν υπάρχουν ακόμα.', 'Όσοι έχουν ήδη ένα.', 'Προσθήκη'],
    cs: ['Obchod', 'O nás', 'Přihlásit se', 'Košík', 'SCROLLUJ POMALU. TISKNEME.', 'Neděláme normální věci. Tiskneme ty, které chybí.', 'Čerstvě z tiskárny.', 'Připraveno jít k tobě domů.', 'Máš divný nápad?', 'Skvělé.', 'Věci, které', 'ještě neexistují.', 'Ti, kdo už ho mají.', 'Přidat'],
    sk: ['Obchod', 'O nás', 'Prihlásiť sa', 'Košík', 'SCROLUJ POMALY. TLAČÍME.', 'Nerobíme normálne veci. Tlačíme tie, ktoré chýbajú.', 'Čerstvo z tlačiarne.', 'Pripravené ísť k tebe domov.', 'Máš čudný nápad?', 'Super.', 'Veci, ktoré', 'ešte neexistujú.', 'Tí, čo už jeden majú.', 'Pridať'],
    hu: ['Bolt', 'Rólunk', 'Belépés', 'Kosár', 'GÖRGESS LASSAN. NYOMTATUNK.', 'Nem csinálunk hétköznapi dolgokat. Azokat nyomtatjuk, amik hiányoznak.', 'Frissen a nyomtatóból.', 'Készen áll, hogy hazamenjen veled.', 'Fura ötleted van?', 'Remek.', 'Dolgok, amik', 'még nem léteznek.', 'Akiknek már van egy.', 'Hozzáadás'],
    bg: ['Магазин', 'За нас', 'Вход', 'Количка', 'СКРОЛВАЙ БАВНО. ПЕЧАТАМЕ.', 'Не правим нормални неща. Печатаме тези, които липсват.', 'Току-що от принтера.', 'Готово да тръгне към дома ти.', 'Имаш странна идея?', 'Чудесно.', 'Неща, които', 'още не съществуват.', 'Тези, които вече имат.', 'Добави'],
    hr: ['Trgovina', 'O nama', 'Prijava', 'Košarica', 'LISTAJ POLAKO. PRINTAMO.', 'Ne radimo normalne stvari. Printamo one koje nedostaju.', 'Tek izašlo iz printera.', 'Spremno za tvoj dom.', 'Imaš čudnu ideju?', 'Odlično.', 'Stvari koje', 'još ne postoje.', 'Oni koji ga već imaju.', 'Dodaj'],
    sl: ['Trgovina', 'O nas', 'Prijava', 'Košarica', 'POČASI POMIKAJ. TISKAMO.', 'Ne delamo običajnih stvari. Tiskamo tiste, ki manjkajo.', 'Sveže iz tiskalnika.', 'Pripravljeno za tvoj dom.', 'Imaš čudno idejo?', 'Odlično.', 'Stvari, ki', 'še ne obstajajo.', 'Tisti, ki ga že imajo.', 'Dodaj'],
    et: ['Pood', 'Meist', 'Logi sisse', 'Ostukorv', 'KERI AEGLASELT. ME PRINDIME.', 'Me ei tee tavalisi asju. Me prindime need, mis puuduvad.', 'Otse printerist.', 'Valmis sinuga koju minema.', 'Kas sul on veider idee?', 'Suurepärane.', 'Asjad, mida', 'veel pole.', 'Need, kellel see juba on.', 'Lisa'],
    lv: ['Veikals', 'Par mums', 'Pieslēgties', 'Grozs', 'RITINI LĒNĀM. MĒS DRUKĀJAM.', 'Mēs nedarām parastas lietas. Mēs drukājam tās, kuru trūkst.', 'Tikko no printera.', 'Gatavs doties pie tevis mājās.', 'Tev ir dīvaina ideja?', 'Lieliski.', 'Lietas, kuru', 'vēl nav.', 'Tie, kuriem jau ir.', 'Pievienot'],
    lt: ['Parduotuvė', 'Apie mus', 'Prisijungti', 'Krepšelis', 'SLINK LĖTAI. SPAUSDINAME.', 'Mes nedarome įprastų dalykų. Spausdiname tuos, kurių trūksta.', 'Ką tik iš spausdintuvo.', 'Pasiruošęs keliauti pas tave.', 'Turi keistą idėją?', 'Puiku.', 'Dalykai, kurių', 'dar nėra.', 'Tie, kurie jau turi.', 'Pridėti'],
    mt: ['Ħanut', 'Dwarna', 'Idħol', 'Karrettun', 'INŻEL BIL-MOD. QEGĦDIN NIPPRINTJAW.', 'Ma nagħmlux affarijiet normali. Nipprintjaw dawk li jonqsu.', 'Għadu kemm ħareġ mill-printer.', 'Lest biex jiġi d-dar tiegħek.', 'Għandek idea stramba?', 'Tajjeb ħafna.', 'Affarijiet li', 'għadhom ma jeżistux.', 'Dawk li diġà għandhom waħda.', 'Żid'],
    ga: ['Siopa', 'Fúinn', 'Sínigh isteach', 'Cart', 'SCROLLÁIL GO MALL. TÁIMID AG PRIONTÁIL.', 'Ní dhéanaimid gnáthrudaí. Priontálaimid na cinn atá in easnamh.', 'Díreach as an bprintéir.', 'Réidh le dul abhaile leat.', 'An bhfuil smaoineamh aisteach agat?', 'Iontach.', 'Rudaí nach', 'bhfuil ann fós.', 'Iad siúd a bhfuil ceann acu cheana.', 'Cuir leis']
  };
  /* Textos da interface (português e inglês completos; as outras línguas usam inglês aqui). */
  var UI = {
    pt: { myAccount: 'A minha conta', custom: 'Custom', lab: 'Lab', shipping: 'Envios', terms: 'Termos e condições', privacy: 'Política de privacidade', allProducts: 'Todos os produtos', help: 'Ajuda', returns: 'Trocas e devoluções', contacts: 'Contactos', securePay: 'PAGAMENTOS SEGUROS', tagline: 'Impressão 3D por encomenda. Produtos nossos, peças à medida e umas invenções.', made: 'Feito com filamento e teimosia.', testMode: 'MODO DE TESTE · NENHUM PAGAMENTO É FEITO', langNote: 'Escolhe a tua língua.', added: 'no carrinho.', soon: 'Em breve' },
    en: { myAccount: 'My account', custom: 'Custom', lab: 'Lab', shipping: 'Shipping', terms: 'Terms and conditions', privacy: 'Privacy policy', allProducts: 'All products', help: 'Help', returns: 'Returns', contacts: 'Contact', securePay: 'SECURE PAYMENTS', tagline: 'Made-to-order 3D printing. Our own products, custom parts and a few inventions.', made: 'Made with filament and stubbornness.', testMode: 'TEST MODE · NO PAYMENT IS TAKEN', langNote: 'Choose your language.', added: 'added to your cart.', soon: 'Coming soon' }
  };

  var DICT = {};
  Object.keys(R).forEach(function (c) { var o = { name: NAMES[c] }; K.forEach(function (k, i) { o[k] = R[c][i]; }); DICT[c] = o; });

  function detect() {
    var saved = XF.load('xf-lang', null);
    if (saved && DICT[saved]) return saved;
    var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || 'pt').slice(0, 2).toLowerCase();
    return DICT[nav] ? nav : 'pt';
  }
  XF.lang = detect();
  XF.isPT = function () { return XF.lang === 'pt'; };
  XF.I18N = XF.I18N || {};
  var norm = function (x) { return String(x).replace(/\s+/g, ' ').trim(); };
  XF.norm = norm;
  /* Traduz um texto inglês para a língua escolhida (dicionários em assets/i18n/xx.js). */
  XF.tr = function (en) {
    if (XF.lang === 'pt' || XF.lang === 'en' || en == null) return en;
    var d = XF.I18N[XF.lang], v = d && d[norm(en)];
    if (v == null) return en;
    var m = String(en).match(/^(\s*)[\s\S]*?(\s*)$/);
    return m[1] + v + m[2];
  };
  XF.L = function (pt, en) { return XF.lang === 'pt' ? pt : XF.tr(en); };
  XF.f = function (obj) { return XF.L(obj.pt, obj.en); };
  XF.t = function (key) {
    var d = DICT[XF.lang] || {};
    if (d[key] != null) return d[key];
    if (XF.lang === 'pt' && UI.pt[key] != null) return UI.pt[key];
    if (UI.en[key] != null) return XF.tr(UI.en[key]);
    return DICT.en[key] != null ? DICT.en[key] : key;
  };
  var dictSrc = function (c) { return 'assets/i18n/' + c + '.js?v=4'; };
  XF.loadDict = function (c, cb) {
    if (c === 'pt' || c === 'en' || XF.I18N[c]) { cb(); return; }
    var sc = document.createElement('script'); sc.src = dictSrc(c);
    sc.onload = cb; sc.onerror = cb; document.head.appendChild(sc);
  };
  /* carrega já o dicionário da língua guardada, antes do código da página correr */
  if (XF.lang !== 'pt' && XF.lang !== 'en' && document.readyState === 'loading') {
    document.write('<script src="' + dictSrc(XF.lang) + '"><\/script>');
  }
  XF.setLang = function (c) {
    if (!DICT[c]) return;
    XF.lang = c; XF.save('xf-lang', c);
    XF.loadDict(c, function () {
      XF.applyLang();
      document.dispatchEvent(new CustomEvent('xf:lang'));
    });
  };
  var INLINE = { A: 1, EM: 1, STRONG: 1, B: 1, BR: 1, I: 1, SUP: 1, SPAN: 1, CODE: 1 };
  function isLeaf(el) {
    for (var i = 0; i < el.children.length; i++) {
      var c = el.children[i];
      if (!INLINE[c.tagName] || c.children.length && !isLeaf(c)) return false;
    }
    return true;
  }
  function trBlock(el) {
    if (el.hasAttribute && el.hasAttribute('data-notr')) return;
    if (isLeaf(el)) {
      if (el._xsrc == null) el._xsrc = el.innerHTML;
      if (!norm(el.textContent)) return;
      var d = XF.I18N[XF.lang], v = (XF.lang !== 'en' && d) ? d[norm(el._xsrc)] : null;
      el.innerHTML = v != null ? v : el._xsrc;
      return;
    }
    for (var i = 0; i < el.children.length; i++) trBlock(el.children[i]);
  }
  XF.trBlock = trBlock;
  XF.applyLang = function () {
    document.documentElement.lang = XF.lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = XF.t(el.getAttribute('data-i18n')); });
    var showPT = XF.lang === 'pt';
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = (el.getAttribute('data-lang') === 'pt') !== showPT;
      if (el.getAttribute('data-lang') === 'en' && !showPT) trBlock(el);
    });
    document.querySelectorAll('[data-tr-placeholder]').forEach(function (el) {
      el.placeholder = XF.L(el.getAttribute('data-ph-pt') || el.placeholder, el.getAttribute('data-tr-placeholder'));
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) { b.textContent = XF.lang.toUpperCase(); });
    document.querySelectorAll('.lang-grid button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.code === XF.lang)); });
  };

  /* ---------- dinheiro ---------- */
  XF.euro = function (n) {
    return new Intl.NumberFormat(XF.lang === 'pt' ? 'pt-PT' : XF.lang, { style: 'currency', currency: 'EUR' }).format(n);
  };

  /* ---------- produtos (fase 1: exemplos da app; fase 2: vêm da API) ---------- */
  XF.PRODUCTS = [
    { id: 'chaves', cat: 'nome', personal: true, price: 5, grams: 8, pack: 20, tile: '#FFE3D6', art: 'chaves',
      pt: { name: 'Porta-chaves com nome', line: 'Escreves o nome, nós imprimimos. Perder as chaves continua contigo.', tag: 'COM O TEU NOME' },
      en: { name: 'Name keychain', line: 'You type the name, we print it. Losing your keys is still on you.', tag: 'WITH YOUR NAME' } },
    { id: 'vaso', cat: 'casa', price: 19, grams: 78, pack: 90, tile: '#F1E4DA', art: 'vaso',
      pt: { name: 'Vaso geométrico pequeno', line: 'Para uma planta pequena com personalidade grande.', tag: 'CASA' },
      en: { name: 'Small geometric planter', line: 'For a small plant with a big personality.', tag: 'HOME' } },
    { id: 'suporte', cat: 'secretaria', price: 16, grams: 48, pack: 60, tile: '#262D40', art: 'suporte',
      pt: { name: 'Suporte de telemóvel Ondas', line: 'Segura o telemóvel. Não segura as notificações.', tag: 'SECRETÁRIA' },
      en: { name: 'Waves phone stand', line: 'Holds your phone. Does not hold back the notifications.', tag: 'DESK' } },
    { id: 'marcador', cat: 'leitura', price: 7, grams: 12, pack: 20, tile: '#E3EADF', art: 'marcador',
      pt: { name: 'Marcador de livros Folha', line: 'Para quem dobra os cantos às páginas e tem vergonha.', tag: 'LEITURA' },
      en: { name: 'Leaf bookmark', line: 'For people who fold page corners and feel bad about it.', tag: 'READING' } }
  ];
  XF.COLORS = [
    { id: 'laranja', hex: '#FF5A1F', text: '#0A0F1F', pt: 'Laranja XyloFab', en: 'XyloFab orange' },
    { id: 'terracota', hex: '#C9643E', text: '#FFFFFF', pt: 'Terracota', en: 'Terracotta' },
    { id: 'branco', hex: '#EDEDED', text: '#0A0F1F', pt: 'Branco', en: 'White' },
    { id: 'preto', hex: '#1E1E1E', text: '#FFFFFF', pt: 'Preto', en: 'Black' },
    { id: 'verde', hex: '#8FA68A', text: '#0A0F1F', pt: 'Verde salva', en: 'Sage green' }
  ];
  XF.pt = function (obj) {
    if (XF.isPT()) return obj.pt;
    var o = {}; Object.keys(obj.en).forEach(function (k) { o[k] = XF.tr(obj.en[k]); }); return o;
  };
  XF.product = function (id) { return XF.PRODUCTS.filter(function (p) { return p.id === id; })[0]; };
  XF.art = function (kind, name) {
    var A = {
      vaso: '<svg viewBox="0 0 200 200" aria-hidden="true"><polygon points="60,36 140,36 162,100 132,172 68,172 38,100" fill="#C9643E"/><polyline points="60,36 100,100 140,36" fill="none" stroke="#E08A66" stroke-width="4"/><polyline points="38,100 162,100" fill="none" stroke="#A9502F" stroke-width="4"/><polyline points="68,172 100,100 132,172" fill="none" stroke="#E08A66" stroke-width="4"/></svg>',
      suporte: '<svg viewBox="0 0 200 200" aria-hidden="true"><rect x="86" y="36" width="20" height="110" rx="8" transform="rotate(-14 96 146)" fill="#EDEDED"/><path d="M30 150 Q55 118 80 150 T130 150 T170 150 L170 168 L30 168 Z" fill="#EDEDED"/></svg>',
      marcador: '<svg viewBox="0 0 200 200" aria-hidden="true"><path d="M100 24 C152 58 152 142 100 178 C48 142 48 58 100 24 Z" fill="#8FA68A"/><path d="M100 40 L100 170" stroke="#6E8769" stroke-width="5" stroke-linecap="round"/><path d="M100 80 L76 64 M100 108 L124 92 M100 134 L78 120" stroke="#6E8769" stroke-width="4" stroke-linecap="round"/></svg>',
      chaves: '<svg viewBox="0 0 220 200" aria-hidden="true"><circle cx="34" cy="100" r="20" fill="none" stroke="#0A0F1F" stroke-width="7"/><rect x="48" y="64" width="160" height="72" rx="36" fill="#FF5A1F"/><circle cx="72" cy="100" r="10" fill="#FFE3D6"/><text x="138" y="113" text-anchor="middle" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#0A0F1F">' + (name || 'ANA') + '</text></svg>'
    };
    return A[kind] || '';
  };
  XF.LOGO = '<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="#0A0F1F" stroke="#FF5A1F" stroke-width="10"/><circle cx="100" cy="8" r="9" fill="#FFFFFF"/><rect x="70" y="40" width="60" height="38" rx="6" fill="#FFFFFF"/><polygon points="80,78 120,78 108,114 92,114" fill="#FFFFFF"/><rect x="94" y="113" width="12" height="10" rx="2" fill="#FFFFFF"/><circle cx="100" cy="140" r="7" fill="#FF5A1F"/><rect x="62" y="158" width="76" height="12" rx="6" fill="#FF5A1F"/></svg>';

  /* ---------- portes CTT 2026 (preços de balcão) ---------- */
  var BANDS = [250, 500, 1000, 2000];
  XF.SHIP = {
    'pt-cont': { pt: 'Portugal Continental', en: 'Mainland Portugal', service: 'Encomenda Postal', days: { pt: 'cerca de 3 dias úteis', en: 'about 3 working days' }, prices: [9.6, 9.6, 9.6, 9.6] },
    'pt-mad': { pt: 'Madeira', en: 'Madeira', service: 'Encomenda Postal (via aérea)', days: { pt: 'cerca de 5 dias úteis', en: 'about 5 working days' }, prices: [11.8, 11.8, 11.8, 11.8] },
    'pt-acr': { pt: 'Açores', en: 'Azores', service: 'Encomenda Postal (via aérea)', days: { pt: '7 a 15 dias úteis', en: '7 to 15 working days' }, prices: [12.85, 12.85, 12.85, 12.85] },
    eu: { pt: 'Europa', en: 'Europe', service: 'Correio Azul Internacional', days: { pt: 'cerca de 3 dias úteis', en: 'about 3 working days' }, prices: [7.55, 9.8, 13.2, 21.2] },
    us: { pt: 'Estados Unidos', en: 'United States', service: 'Correio Azul Internacional', days: { pt: 'cerca de 5 dias úteis', en: 'about 5 working days' }, prices: [10.1, 15.7, 26.75, 39.25] },
    rw: { pt: 'Resto do mundo', en: 'Rest of the world', service: 'Correio Azul Internacional', days: { pt: 'cerca de 5 dias úteis', en: 'about 5 working days' }, prices: [9.3, 14.15, 23.95, 36.15] }
  };
  XF.BANDS = BANDS;
  XF.shipping = function (zone, grams) {
    var z = XF.SHIP[zone]; if (!z) return null;
    for (var i = 0; i < BANDS.length; i++) if (grams <= BANDS[i]) return z.prices[i];
    return null; // mais de 2 kg: orçamento à parte
  };
  var EUROPE = 'AD AL AT BA BE BG BY CH CY CZ DE DK EE ES FI FO FR GB GI GR HR HU IE IS IT LI LT LU LV MC MD ME MK MT NL NO PL RO RS SE SI SK SM UA VA'.split(' ');
  var OTHERS = 'US CA BR AO MZ CV ST GW TL MO CN JP KR IN AU NZ ZA MX AR CL CO PE UY VE AE SA IL TR MA EG SG TH'.split(' ');
  XF.countries = function () {
    var dn = null; try { dn = new Intl.DisplayNames([XF.lang], { type: 'region' }); } catch (e) {}
    var name = function (c) { try { return dn ? dn.of(c) : c; } catch (e) { return c; } };
    var list = EUROPE.concat(OTHERS).map(function (c) { return { code: c, name: name(c) }; });
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return [{ code: 'PT', name: name('PT') }].concat(list).concat([{ code: 'XX', name: XF.L('Outro país', 'Other country') }]);
  };
  XF.zoneOf = function (country, region) {
    if (country === 'PT') return region === 'mad' ? 'pt-mad' : region === 'acr' ? 'pt-acr' : 'pt-cont';
    if (country === 'US') return 'us';
    if (EUROPE.indexOf(country) >= 0) return 'eu';
    return 'rw';
  };
  XF.defaultZone = function () { return XF.lang === 'pt' ? 'pt' : XF.lang === 'en' ? 'int' : 'eu'; };

  /* ---------- carrinho ---------- */
  XF.cart = function () { return XF.load('xf-cart', []); };
  XF.setCart = function (c) { XF.save('xf-cart', c); XF.renderCartCount(); };
  XF.addToCart = function (id, opts) {
    opts = opts || {};
    var c = XF.cart(), key = id + '|' + (opts.color || '') + '|' + (opts.custom || '');
    var line = c.filter(function (l) { return l.key === key; })[0];
    if (line) line.qty = Math.min(20, line.qty + (opts.qty || 1));
    else c.push({ key: key, id: id, color: opts.color || 'laranja', custom: opts.custom || '', qty: opts.qty || 1 });
    XF.setCart(c);
    var p = XF.product(id);
    XF.toast(XF.pt(p).name + (opts.custom ? ' "' + opts.custom + '"' : '') + ' ' + XF.t('added'));
  };
  XF.cartCount = function () { return XF.cart().reduce(function (a, l) { return a + l.qty; }, 0); };
  XF.renderCartCount = function () { document.querySelectorAll('[data-cart-count]').forEach(function (b) { b.textContent = XF.cartCount(); }); };

  /* ---------- conta (fase 1: no browser) ---------- */
  XF.user = function () { return XF.load('xf-user', null); };
  XF.hash = function (text) {
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode('xylofab:' + text)).then(function (b) {
        return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
      });
    }
    return Promise.resolve('h' + text.length + text.charCodeAt(0));
  };
  XF.signup = function (name, email, password, lab) {
    var users = XF.load('xf-users', {});
    email = email.trim().toLowerCase();
    if (users[email]) return Promise.reject(new Error(XF.L('Já existe uma conta com esse email. Entra em vez disso.', 'There is already an account with that email. Sign in instead.')));
    return XF.hash(password).then(function (h) {
      users[email] = { name: name.trim(), email: email, pw: h, lab: !!lab, notifyEmail: true, created: new Date().toISOString(), addresses: [], names: [], favs: [] };
      XF.save('xf-users', users);
      XF.save('xf-user', { email: email });
      return users[email];
    });
  };
  XF.login = function (email, password) {
    var users = XF.load('xf-users', {}); email = email.trim().toLowerCase();
    var u = users[email];
    if (!u) return Promise.reject(new Error(XF.L('Não há nenhuma conta com esse email.', 'There is no account with that email.')));
    return XF.hash(password).then(function (h) {
      if (h !== u.pw) throw new Error(XF.L('A palavra-passe não está certa.', 'That password is not right.'));
      XF.save('xf-user', { email: email });
      return u;
    });
  };
  XF.logout = function () { XF.drop('xf-user'); };
  XF.profile = function () { var s = XF.user(); if (!s) return null; return XF.load('xf-users', {})[s.email] || null; };
  XF.saveProfile = function (p) { var users = XF.load('xf-users', {}); users[p.email] = p; XF.save('xf-users', users); };
  XF.orders = function () { return XF.load('xf-orders', []); };
  XF.validEmail = function (e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test((e || '').trim()); };

  /* ---------- aviso rápido ---------- */
  XF.toast = function (text) {
    var t = document.getElementById('xf-toast');
    if (!t) { t = document.createElement('div'); t.id = 'xf-toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.innerHTML = ''; var s = document.createElement('span'); s.textContent = text; t.appendChild(s);
    clearTimeout(XF._toast); XF._toast = setTimeout(function () { t.innerHTML = ''; }, 2600);
  };
  XF.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  /* ---------- cabeçalho e rodapé ---------- */
  function header(page) {
    var u = XF.profile();
    var cur = function (p) { return page === p ? ' aria-current="page"' : ''; };
    var acct = u
      ? '<a class="pill" href="conta.html"' + cur('conta') + '><span class="avatar">' + XF.esc(u.name.charAt(0).toUpperCase()) + '</span>' + XF.esc(u.name.split(' ')[0]) + '</a>'
      : '<a class="pill" href="conta.html"' + cur('conta') + ' data-i18n="login">' + XF.t('login') + '</a>';
    return '<div class="bar"><a class="brand" href="index.html"><span style="width:40px;height:40px;display:inline-flex">' + XF.LOGO + '</span><span>XYLOFAB</span></a>' +
      '<nav class="nav" aria-label="Principal">' +
      '<a class="navlink" href="loja.html"' + cur('loja') + ' data-i18n="shop">' + XF.t('shop') + '</a>' +
      '<a class="navlink" href="index.html#custom">Custom</a>' +
      '<a class="navlink" href="index.html#lab">Lab</a>' +
      '<a class="navlink" href="quem-somos.html"' + cur('quem') + ' data-i18n="about">' + XF.t('about') + '</a>' +
      '<button type="button" class="pill" id="xf-lang-btn" aria-haspopup="true" aria-expanded="false" aria-label="Língua / Language"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" fill="none" stroke="#fff" stroke-width="1.8"/></svg><span data-lang-btn>' + XF.lang.toUpperCase() + '</span></button>' +
      acct +
      '<a class="pill pill-white" href="carrinho.html"' + cur('carrinho') + '><span data-i18n="cart">' + XF.t('cart') + '</span> <span class="badge" data-cart-count>' + XF.cartCount() + '</span></a>' +
      '</nav></div>' +
      '<div class="lang-menu" id="xf-lang-menu" role="dialog" aria-label="Língua / Language"><div class="lang-grid">' +
      Object.keys(DICT).map(function (c) { return '<button type="button" lang="' + c + '" data-code="' + c + '" aria-pressed="' + (c === XF.lang) + '">' + NAMES[c] + '</button>'; }).join('') +
      '</div><p class="small" style="margin:0;color:#3B4664" data-i18n="langNote">' + XF.t('langNote') + '</p></div>';
  }
  XF.PAY = [['mbway', 'MB WAY'], ['multibanco', 'Multibanco'], ['visa', 'Visa'], ['mastercard', 'Mastercard']];
  /* logótipos oficiais em assets/pay/<id>.svg; se o ficheiro faltar mostra só o nome */
  XF.payLogos = function (ids) {
    return XF.PAY.filter(function (p) { return !ids || ids.indexOf(p[0]) >= 0; }).map(function (p) {
      return '<span class="pay-chip pay-logo"><img src="assets/pay/' + p[0] + '.svg" alt="' + p[1] + '" height="36" onerror="this.replaceWith(document.createTextNode(this.alt))"></span>';
    }).join('');
  };
  function footer() {
    return '<div class="inner"><div class="foot-cols">' +
      '<div style="flex:1 1 260px;display:flex;flex-direction:column;gap:14px"><a class="brand" href="index.html"><span style="width:52px;height:52px;display:inline-flex">' + XF.LOGO + '</span><span style="font-size:26px;font-weight:800">XYLOFAB</span></a><p class="muted" style="margin:0;max-width:300px" data-i18n="tagline">' + XF.t('tagline') + '</p></div>' +
      '<nav aria-label="Loja"><b data-i18n="shop">' + XF.t('shop') + '</b><a href="loja.html" data-i18n="allProducts">' + XF.t('allProducts') + '</a><a href="index.html#custom">XyloFab Custom</a><a href="index.html#lab">XyloFab Lab</a></nav>' +
      '<nav aria-label="Ajuda"><b data-i18n="help">' + XF.t('help') + '</b><a href="envios.html" data-i18n="shipping">' + XF.t('shipping') + '</a><a href="envios.html#devolucoes" data-i18n="returns">' + XF.t('returns') + '</a><a href="quem-somos.html#contactos" data-i18n="contacts">' + XF.t('contacts') + '</a><a href="conta.html" data-i18n="myAccount">' + XF.t('myAccount') + '</a></nav>' +
      '<nav aria-label="XyloFab"><b>XYLOFAB</b><a href="quem-somos.html" data-i18n="about">' + XF.t('about') + '</a><a href="termos.html" data-i18n="terms">' + XF.t('terms') + '</a><a href="privacidade.html" data-i18n="privacy">' + XF.t('privacy') + '</a></nav>' +
      '</div><div class="pay-row"><span class="mono small" style="font-weight:700;letter-spacing:.14em;margin-right:6px" data-i18n="securePay">' + XF.t('securePay') + '</span>' + XF.payLogos() + '</div>' +
      '<div class="foot-legal"><p style="margin:0">Any Larissa &amp; Tiago Febra · <a href="mailto:' + XF.EMAIL + '" style="color:#fff">' + XF.EMAIL + '</a></p><p style="margin:0;color:#8D99B5">© XyloFab. <span data-i18n="made">' + XF.t('made') + '</span></p></div></div>';
  }
  XF.mount = function () {
    var page = document.body.getAttribute('data-page') || '';
    var h = document.getElementById('site-header');
    if (h) { h.className = 'site-header'; h.innerHTML = header(page); }
    var f = document.getElementById('site-footer');
    if (f) { f.className = 'site-footer'; f.innerHTML = footer(); }
    var btn = document.getElementById('xf-lang-btn'), menu = document.getElementById('xf-lang-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () { var o = !menu.classList.contains('open'); menu.classList.toggle('open', o); btn.setAttribute('aria-expanded', String(o)); });
      menu.addEventListener('click', function (e) { var b = e.target.closest('button[data-code]'); if (!b) return; XF.setLang(b.dataset.code); menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu.classList.remove('open'); });
    }
    XF.applyLang();
    XF.renderCartCount();
    /* se o dicionário da língua ainda não chegou, carrega-o e volta a desenhar a página */
    if (XF.lang !== 'pt' && XF.lang !== 'en' && !XF.I18N[XF.lang]) {
      XF.loadDict(XF.lang, function () { XF.applyLang(); document.dispatchEvent(new CustomEvent('xf:lang')); });
    }
  };
  document.addEventListener('DOMContentLoaded', XF.mount);
})();
