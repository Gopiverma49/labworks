/**
 * XML Data Service & Parser for Lab 12 Online Store
 * Parses XML catalog DOM using standard DOMParser, handles stock updates,
 * currency conversions, and provides fallback embedded XML for local file:// execution.
 */

const FALLBACK_XML_DATA = `<?xml version="1.0" encoding="UTF-8"?>
<store>
  <metadata>
    <storeName>AURA // BOLD ONLINE ATELIER</storeName>
    <version>2.0</version>
    <currency default="USD" symbol="$">USD</currency>
    <catalogUpdated>2026-11-20</catalogUpdated>
    <totalCategories>4</totalCategories>
  </metadata>
  <catalog>
    <item id="ITM-101" category="Audio" featured="true">
      <title>NovaPro Spatial Headphones</title>
      <tagline>Lossless Cinematic Audio with Neural Noise Cancellation</tagline>
      <price currency="USD">299.00</price>
      <originalPrice currency="USD">389.00</originalPrice>
      <discountPercent>23</discountPercent>
      <stock status="low" quantity="8" urgency="Critical">8</stock>
      <rating score="4.9" totalReviews="512">4.9</rating>
      <badge type="trending">BEST SELLER</badge>
      <coverImage>https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Front Profile" isHero="true">https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Studio Isometric">https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Lifestyle Wearing">https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Acoustic Driver Macro">https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>Forged with precision aerospace magnesium alloy and custom 50mm titanium composite drivers. Delivers hyper-realistic 360-degree soundscapes, 55 hours of playback, and real-time biometric ear-canal tuning.</description>
      <specifications>
        <spec label="Acoustic Architecture">Custom 50mm Titanium Dynamic Drivers</spec>
        <spec label="Noise Cancellation">Quad-Mic Hybrid Active Neural Isolation (-42dB)</spec>
        <spec label="Battery Life">55 Hours (ANC On) / 75 Hours (ANC Off)</spec>
        <spec label="Weight">246 grams</spec>
        <spec label="Connectivity">Lossless 2.4GHz Wireless + BT 5.4 + 3.5mm Hi-Res</spec>
      </specifications>
    </item>
    <item id="ITM-102" category="Wearables" featured="true">
      <title>Chronos Lumina Smartwatch</title>
      <tagline>Grade-5 Titanium Sapphire AMOLED Biometric Tracker</tagline>
      <price currency="USD">449.00</price>
      <originalPrice currency="USD">529.00</originalPrice>
      <discountPercent>15</discountPercent>
      <stock status="in_stock" quantity="23" urgency="Normal">23</stock>
      <rating score="4.8" totalReviews="340">4.8</rating>
      <badge type="new">NEW RELEASE</badge>
      <coverImage>https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Sapphire Dial Center" isHero="true">https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Wrist Strap Side Profile">https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Titanium Bezel Close-Up">https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Active Sports Lifestyle">https://images.unsplash.com/photo-1510017803434-a899398421b3?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>Engineered for high performance and timeless elegance. Features a 1.43-inch 2,000 nit edge-to-edge sapphire AMOLED display, medical-grade ECG tracking, dual-frequency GPS, and 100m water resistance.</description>
      <specifications>
        <spec label="Display">1.43-inch Ultra AMOLED 60Hz 2,000 Nits</spec>
        <spec label="Chassis">Grade-5 Brushed Aviation Titanium</spec>
        <spec label="Water Rating">10 ATM (100 meters diving certified)</spec>
        <spec label="Health Sensors">ECG + SpO2 + Skin Temp + HRV</spec>
        <spec label="Battery Duration">14 Days Normal / 48 Hours Precision GPS</spec>
      </specifications>
    </item>
    <item id="ITM-103" category="Gaming" featured="true">
      <title>Vortex Obsidian Mechanical Keyboard</title>
      <tagline>Custom Gasket-Mounted Hall Effect Magnetic Switches</tagline>
      <price currency="USD">189.00</price>
      <originalPrice currency="USD">229.00</originalPrice>
      <discountPercent>17</discountPercent>
      <stock status="low" quantity="5" urgency="Only 5 Left!">5</stock>
      <rating score="5.0" totalReviews="288">5.0</rating>
      <badge type="limited">LIMITED RUN</badge>
      <coverImage>https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Full Layout Top View" isHero="true">https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Side Gradient Lighting">https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Keycap Texture Macro">https://images.unsplash.com/photo-1595225476474-87563907a212?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Desk Setup Minimal">https://images.unsplash.com/photo-1541140532154-b024d705b909?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>The pinnacle of tactile sensation. Built with CNC solid brass weight bar, PORON 5-layer sound dampening, Rapid Trigger 0.1mm actuation, and per-key RGB backlighting with dynamic acoustic resonance.</description>
      <specifications>
        <spec label="Switch Type">Magnetic Hall Effect 0.1mm - 4.0mm Actuation</spec>
        <spec label="Polling Rate">8,000 Hz Hyper-Polling (0.125ms latency)</spec>
        <spec label="Keycaps">Double-Shot PBT Dye-Sub Cherry Profile</spec>
        <spec label="Mounting">Flex-Cut Brass Gasket Mount</spec>
        <spec label="Software">QMK / VIA On-the-fly Web Configurator</spec>
      </specifications>
    </item>
    <item id="ITM-104" category="Lifestyle" featured="false">
      <title>Prism Lens Horizon Camera</title>
      <tagline>Compact Medium-Format Street Photography Instrument</tagline>
      <price currency="USD">899.00</price>
      <originalPrice currency="USD">1099.00</originalPrice>
      <discountPercent>18</discountPercent>
      <stock status="in_stock" quantity="12" urgency="Normal">12</stock>
      <rating score="4.9" totalReviews="175">4.9</rating>
      <badge type="staff">CURATOR PICK</badge>
      <coverImage>https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Front Lens Element" isHero="true">https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Mechanical Dials Top">https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Rear Monitor View">https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Field Photography Shot">https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>A camera designed to rekindle the joy of visual storytelling. Packed with a 45MP back-illuminated sensor, custom analog film simulations, leaf shutter mechanism, and solid milled aluminum control dials.</description>
      <specifications>
        <spec label="Sensor">45.7MP Full-Frame BSI CMOS</spec>
        <spec label="Lens">Integrated 28mm f/1.8 Aspherical Prime</spec>
        <spec label="Stabilization">5-Axis 7.0-Stop In-Body Sensor Shift</spec>
        <spec label="Viewfinder">5.76M-Dot OLED Hybrid Optical/Electronic</spec>
        <spec label="Storage">Dual UHS-II SD + 128GB Internal High-Speed Flash</spec>
      </specifications>
    </item>
    <item id="ITM-105" category="Audio" featured="false">
      <title>EchoSphere Kinetic Speaker</title>
      <tagline>Levitating 360-Degree Ferrofluid Ambient Sound Sculpture</tagline>
      <price currency="USD">349.00</price>
      <originalPrice currency="USD">419.00</originalPrice>
      <discountPercent>16</discountPercent>
      <stock status="low" quantity="3" urgency="Only 3 Left in Stock!">3</stock>
      <rating score="4.7" totalReviews="194">4.7</rating>
      <badge type="limited">EXCLUSIVE</badge>
      <coverImage>https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Spherical Elevation" isHero="true">https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Ambient Backlight Glow">https://images.unsplash.com/photo-1543512214-318c7553f230?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Base Magnetic Coil">https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Living Space Showcase">https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>Visual art meets audiophile acoustic engineering. Features dancing magnetic ferrofluid synchronized with sound frequencies, omnidirectional acoustic waveguides, and room-filling bass response.</description>
      <specifications>
        <spec label="Power Output">80 Watts RMS Bi-Amplified Output</spec>
        <spec label="Visual Tech">Reactive Nano-Ferrofluid Magnetic Chamber</spec>
        <spec label="Frequency Response">32Hz - 24,000Hz Ultra-Wide</spec>
        <spec label="Connectivity">AirPlay 2, Spotify Connect, Bluetooth LDAC, Optical</spec>
        <spec label="Finish">Hand-Blown Borosilicate Glass + Matte Basalt</spec>
      </specifications>
    </item>
    <item id="ITM-106" category="Gaming" featured="false">
      <title>AeroGrip Phantom Wireless Mouse</title>
      <tagline>Ultra-Lightweight 39g Carbon Fiber Optical Gaming Mouse</tagline>
      <price currency="USD">139.00</price>
      <originalPrice currency="USD">169.00</originalPrice>
      <discountPercent>18</discountPercent>
      <stock status="in_stock" quantity="31" urgency="Normal">31</stock>
      <rating score="4.9" totalReviews="410">4.9</rating>
      <badge type="trending">POPULAR</badge>
      <coverImage>https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Ergonomic Top Silhouette" isHero="true">https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Honeycomb Carbon Shell">https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Underbelly Sensor View">https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Battle Station Setup">https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>Forged with composite woven carbon fibers to achieve an impossibly light 39 grams. Featuring a 30,000 DPI optical sensor, optical switches with zero debounce delay, and zero-friction PTFE skates.</description>
      <specifications>
        <spec label="Weight">39 grams without cable</spec>
        <spec label="Sensor">PixArt 3395 Gen 2 (30,000 DPI / 750 IPS)</spec>
        <spec label="Polling Rate">True 4,000 Hz Wireless (0.25ms response)</spec>
        <spec label="Battery">Up to 90 continuous hours gameplay</spec>
        <spec label="Switches">TTC Gold Optical (100 Million Click Lifecycle)</spec>
      </specifications>
    </item>
    <item id="ITM-107" category="Wearables" featured="false">
      <title>Spectra Augmented Smart Eyewear</title>
      <tagline>Micro-OLED Heads Up Display with Intuitive Gesture Control</tagline>
      <price currency="USD">599.00</price>
      <originalPrice currency="USD">699.00</originalPrice>
      <discountPercent>14</discountPercent>
      <stock status="low" quantity="6" urgency="Low Stock">6</stock>
      <rating score="4.6" totalReviews="118">4.6</rating>
      <badge type="new">INNOVATION</badge>
      <coverImage>https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Floating Frame Isometric" isHero="true">https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="Micro-OLED Prism Lens">https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Temple Touchpad Detail">https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Urban Commuter Profile">https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>Seamlessly superimposes real-time navigation, live speech transcription, and instant alerts into your visual field. Weighs only 48g in stylish prescription-ready acetate frames.</description>
      <specifications>
        <spec label="Display">Dual Sony Micro-OLED Waveguide Optics (1080p equivalent)</spec>
        <spec label="Field of View">43-Degree Virtual 130-inch Screen</spec>
        <spec label="Audio">Directional Open-Ear Acoustic Sound Cavity</spec>
        <spec label="Sensors">6DoF Spatial Head Tracking + Capacitive Touch</spec>
        <spec label="Prescription Support">Magnetic Clip-on Optical Insert Included</spec>
      </specifications>
    </item>
    <item id="ITM-108" category="Lifestyle" featured="false">
      <title>Solarix Kinetic Solar Powerbank</title>
      <tagline>Indestructible 140W Dual GaN Emergency Power Hub</tagline>
      <price currency="USD">119.00</price>
      <originalPrice currency="USD">149.00</originalPrice>
      <discountPercent>20</discountPercent>
      <stock status="in_stock" quantity="45" urgency="Normal">45</stock>
      <rating score="4.9" totalReviews="320">4.9</rating>
      <badge type="trending">HOT</badge>
      <coverImage>https://images.unsplash.com/photo-1609592426867-0803c6fc9ea3?w=800&amp;auto=format&amp;fit=crop&amp;q=80</coverImage>
      <stockPictures>
        <picture id="p1" angle="Monolithic Power Pack" isHero="true">https://images.unsplash.com/photo-1609592426867-0803c6fc9ea3?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p2" angle="High-Efficiency Photovoltaic Cells">https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p3" angle="Multi-Port Output Face">https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
        <picture id="p4" angle="Alpine Expedition Field Test">https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=1200&amp;auto=format&amp;fit=crop&amp;q=80</picture>
      </stockPictures>
      <description>Engineered for high-altitude explorers and digital nomads. Delivers true 140W USB-C Power Delivery 3.1, fast charges laptops in 30 minutes, and recharges autonomously via sun exposure.</description>
      <specifications>
        <spec label="Capacity">27,650mAh (99.8Wh Airline Flight Approved)</spec>
        <spec label="Max Output">140W Single Port / 170W Total Combined Output</spec>
        <spec label="Solar Cells">SunPower Gen 4 Monocrystalline (24% efficiency)</spec>
        <spec label="Armor">IP67 Waterproof &amp; Drop-Tested from 2 Meters</spec>
        <spec label="Display">OLED Real-Time Wattage / Voltage / Battery Health Meter</spec>
      </specifications>
    </item>
  </catalog>
</store>`;

class XMLStoreService {
  constructor() {
    this.xmlDoc = null;
    this.rawXmlText = '';
    this.isLoaded = false;
    this.loadPromise = null;
    this.customStockOverrides = JSON.parse(localStorage.getItem('aura_stock_overrides') || '{}');
  }

  /**
   * Initializes and loads the XML document.
   * Tries fetch('data/products.xml') first; seamlessly falls back to embedded XML string on file:// or CORS failure.
   */
  async init() {
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = (async () => {
      let xmlContent = '';
      const parser = new DOMParser();

      // Check current path depth to find data/products.xml
      const xmlPath = (window.location.pathname.includes('/lab_12/') || window.location.pathname.endsWith('lab_12'))
        ? 'data/products.xml'
        : 'data/products.xml';

      try {
        // Attempt network fetch
        const response = await fetch(xmlPath, { cache: 'no-cache' });
        if (response.ok) {
          xmlContent = await response.text();
          console.info('✓ Loaded XML catalog via fetch() from:', xmlPath);
        } else {
          throw new Error('HTTP status ' + response.status);
        }
      } catch (err) {
        console.warn('Network/file restriction detected. Using embedded XML fallback:', err.message);
        xmlContent = FALLBACK_XML_DATA;
      }

      this.rawXmlText = xmlContent;
      this.xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

      // Check for parsing error
      const parserError = this.xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.error('XML Parse Error:', parserError.textContent);
        this.xmlDoc = parser.parseFromString(FALLBACK_XML_DATA, 'text/xml');
      }

      this.isLoaded = true;
      return this;
    })();

    return this.loadPromise;
  }

  /**
   * Parses an <item> XML DOM Node into a friendly JS object.
   */
  _parseItemNode(node) {
    if (!node) return null;

    const id = node.getAttribute('id') || '';
    const category = node.getAttribute('category') || 'Uncategorized';
    const featured = node.getAttribute('featured') === 'true';

    const title = node.getElementsByTagName('title')[0]?.textContent?.trim() || 'Untitled Product';
    const tagline = node.getElementsByTagName('tagline')[0]?.textContent?.trim() || '';
    const priceStr = node.getElementsByTagName('price')[0]?.textContent?.trim() || '0.00';
    const originalPriceStr = node.getElementsByTagName('originalPrice')[0]?.textContent?.trim() || priceStr;
    const discountStr = node.getElementsByTagName('discountPercent')[0]?.textContent?.trim() || '0';
    
    // Dynamic stock management with local storage overrides
    const stockNode = node.getElementsByTagName('stock')[0];
    let baseStock = parseInt(stockNode?.textContent?.trim() || '0', 10);
    if (this.customStockOverrides[id] !== undefined) {
      baseStock = this.customStockOverrides[id];
    }
    const urgency = baseStock <= 5 ? `Urgent: Only ${baseStock} remaining!` : `${baseStock} units left in stock`;
    const stockStatus = baseStock === 0 ? 'out_of_stock' : (baseStock <= 5 ? 'low' : 'in_stock');

    const ratingScore = parseFloat(node.getElementsByTagName('rating')[0]?.getAttribute('score') || '5.0');
    const totalReviews = parseInt(node.getElementsByTagName('rating')[0]?.getAttribute('totalReviews') || '0', 10);

    const badgeNode = node.getElementsByTagName('badge')[0];
    const badgeText = badgeNode?.textContent?.trim() || '';
    const badgeType = badgeNode?.getAttribute('type') || 'default';

    const coverImage = node.getElementsByTagName('coverImage')[0]?.textContent?.trim() || '';
    const description = node.getElementsByTagName('description')[0]?.textContent?.trim() || '';

    // Parse Stock Pictures
    const stockPictures = [];
    const picNodes = node.getElementsByTagName('picture');
    for (let i = 0; i < picNodes.length; i++) {
      const p = picNodes[i];
      stockPictures.push({
        id: p.getAttribute('id') || `p${i + 1}`,
        angle: p.getAttribute('angle') || `Angle ${i + 1}`,
        isHero: p.getAttribute('isHero') === 'true',
        url: p.textContent.trim()
      });
    }

    // Parse Specifications
    const specifications = [];
    const specNodes = node.getElementsByTagName('spec');
    for (let i = 0; i < specNodes.length; i++) {
      const s = specNodes[i];
      specifications.push({
        label: s.getAttribute('label') || 'Spec',
        value: s.textContent.trim()
      });
    }

    return {
      id,
      category,
      featured,
      title,
      tagline,
      price: parseFloat(priceStr),
      originalPrice: parseFloat(originalPriceStr),
      discountPercent: parseInt(discountStr, 10),
      stock: baseStock,
      stockStatus,
      urgency,
      rating: ratingScore,
      totalReviews,
      badge: { text: badgeText, type: badgeType },
      coverImage,
      stockPictures,
      description,
      specifications
    };
  }

  /**
   * Returns all items parsed from the XML catalog.
   */
  getAllItems() {
    if (!this.xmlDoc) return [];
    const itemNodes = this.xmlDoc.getElementsByTagName('item');
    const items = [];
    for (let i = 0; i < itemNodes.length; i++) {
      items.push(this._parseItemNode(itemNodes[i]));
    }
    return items;
  }

  /**
   * Retrieves single item by its XML ID attribute.
   */
  getItemById(id) {
    if (!this.xmlDoc) return null;
    const itemNode = this.xmlDoc.querySelector(`item[id="${id}"]`);
    return this._parseItemNode(itemNode);
  }

  /**
   * Returns items filtered by category.
   */
  getItemsByCategory(category) {
    const all = this.getAllItems();
    if (!category || category === 'All') return all;
    return all.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }

  /**
   * Performs real-time search across titles, descriptions, and tags.
   */
  search(keyword) {
    const all = this.getAllItems();
    if (!keyword || !keyword.trim()) return all;
    const q = keyword.toLowerCase().trim();
    return all.filter(i =>
      i.title.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      i.tagline.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q)
    );
  }

  /**
   * Decrements stock quantity upon purchase in live memory and persists to localStorage.
   */
  deductStock(itemId, quantity) {
    const item = this.getItemById(itemId);
    if (!item) return false;
    const newStock = Math.max(0, item.stock - quantity);
    this.customStockOverrides[itemId] = newStock;
    localStorage.setItem('aura_stock_overrides', JSON.stringify(this.customStockOverrides));

    // Also update current XML DOM node in memory
    const itemNode = this.xmlDoc.querySelector(`item[id="${itemId}"]`);
    if (itemNode) {
      const stockNode = itemNode.getElementsByTagName('stock')[0];
      if (stockNode) {
        stockNode.textContent = newStock.toString();
        stockNode.setAttribute('quantity', newStock.toString());
        stockNode.setAttribute('status', newStock === 0 ? 'out_of_stock' : (newStock <= 5 ? 'low' : 'in_stock'));
      }
    }
    return newStock;
  }

  /**
   * Reset simulated stock to initial XML defaults.
   */
  resetStock() {
    this.customStockOverrides = {};
    localStorage.removeItem('aura_stock_overrides');
    this.xmlDoc = new DOMParser().parseFromString(this.rawXmlText, 'text/xml');
  }

  /**
   * Formats a raw number into currency string.
   */
  formatPrice(num, currency = 'USD') {
    const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹' };
    const rates = { USD: 1.0, EUR: 0.92, GBP: 0.79, JPY: 154.5, INR: 84.4 };
    
    const rate = rates[currency] || 1.0;
    const converted = num * rate;
    const symbol = symbols[currency] || '$';

    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  }

  /**
   * Returns raw XML for live inspection modal in the UI.
   */
  getRawXML() {
    return this.rawXmlText;
  }
}

// Global singleton instance
window.XMLStore = new XMLStoreService();
