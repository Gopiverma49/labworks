/**
 * AURA Storefront Core Application
 * Coordinates shopping cart, purchase checkout, XML stock deduction,
 * notification toasts, and currency conversion.
 */

class AuraApp {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('aura_cart') || '[]');
    this.currentCurrency = localStorage.getItem('aura_currency') || 'USD';
    this.couponDiscountPercent = 0;
    this.activeCouponCode = '';
  }

  async init() {
    await window.XMLStore.init();
    this.updateCartBadge();
    this.initCartDrawer();
    this.initXmlInspector();
    this.initCurrencyButtons();
  }

  /* ================= CART MANAGEMENT ================= */
  saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(this.cart));
    this.updateCartBadge();
    this.renderCartDrawerItems();
  }

  addToCart(itemId, quantity = 1) {
    const item = window.XMLStore.getItemById(itemId);
    if (!item) {
      this.showToast('Item not found in catalog', 'error');
      return;
    }

    if (item.stock <= 0) {
      this.showToast(`Sorry, "${item.title}" is out of stock!`, 'error');
      return;
    }

    const existing = this.cart.find(c => c.id === itemId);
    if (existing) {
      if (existing.qty + quantity > item.stock) {
        this.showToast(`Cannot add more. Only ${item.stock} in stock!`, 'error');
        return;
      }
      existing.qty += quantity;
    } else {
      this.cart.push({
        id: item.id,
        title: item.title,
        price: item.price,
        coverImage: item.coverImage,
        qty: quantity
      });
    }

    this.saveCart();
    this.showToast(`Added "${item.title}" to your cart!`, 'success');
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter(c => c.id !== itemId);
    this.saveCart();
    this.showToast('Item removed from cart', 'info');
  }

  updateQuantity(itemId, delta) {
    const entry = this.cart.find(c => c.id === itemId);
    const item = window.XMLStore.getItemById(itemId);
    if (!entry || !item) return;

    const newQty = entry.qty + delta;
    if (newQty <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    if (newQty > item.stock) {
      this.showToast(`Maximum available stock reached (${item.stock})`, 'error');
      return;
    }
    entry.qty = newQty;
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  updateCartBadge() {
    const countEl = document.querySelectorAll('.cart-count');
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.forEach(el => {
      el.textContent = totalCount;
    });
  }

  getCartTotal() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = subtotal * (this.couponDiscountPercent / 100);
    const tax = (subtotal - discount) * 0.08; // 8% sales tax
    const total = Math.max(0, subtotal - discount + (subtotal > 0 ? tax : 0));
    return { subtotal, discount, tax, total };
  }

  /* ================= BUY NOW DIRECT TRIGGER ================= */
  buyNow(itemId) {
    this.addToCart(itemId, 1);
    window.location.href = 'purchase.html';
  }

  /* ================= CART DRAWER UI ================= */
  initCartDrawer() {
    const drawerHtml = `
      <div id="cart-drawer-overlay" class="modal-overlay">
        <div class="modal-content" style="max-width: 480px; height: 90vh; display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span>Your Cart</span>
              <span class="badge badge-trending cart-count">0</span>
            </h3>
            <button class="modal-close-btn" id="close-cart-btn">&times;</button>
          </div>
          
          <div id="drawer-items-list" style="flex: 1; overflow-y: auto; padding-right: 0.5rem;">
            <!-- Cart items injected here -->
          </div>

          <div style="padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); margin-top: auto;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.1rem; font-weight: 800;">
              <span>Subtotal:</span>
              <span id="drawer-subtotal">$0.00</span>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
              <button class="btn btn-glass" id="drawer-clear-btn">Clear</button>
              <a href="purchase.html" class="btn btn-primary">Checkout &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHtml);

    const overlay = document.getElementById('cart-drawer-overlay');
    const closeBtn = document.getElementById('close-cart-btn');
    const clearBtn = document.getElementById('drawer-clear-btn');
    const navCartBtns = document.querySelectorAll('.btn-cart-nav, [data-trigger="cart"]');

    navCartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderCartDrawerItems();
        overlay.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });

    clearBtn.addEventListener('click', () => {
      this.clearCart();
      this.renderCartDrawerItems();
    });
  }

  renderCartDrawerItems() {
    const listEl = document.getElementById('drawer-items-list');
    const subtotalEl = document.getElementById('drawer-subtotal');
    if (!listEl) return;

    if (this.cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-dim);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🛍️</div>
          <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-muted);">Your shopping bag is empty</p>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">Explore our high-performance gear in the catalog!</p>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = window.XMLStore.formatPrice(0, this.currentCurrency);
      return;
    }

    listEl.innerHTML = this.cart.map(item => `
      <div class="order-item-row">
        <img src="${item.coverImage}" alt="${item.title}" />
        <div class="order-item-info">
          <div class="name">${item.title}</div>
          <div class="qty-price">${window.XMLStore.formatPrice(item.price, this.currentCurrency)} each</div>
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem; background: rgba(255,255,255,0.06); padding: 0.2rem 0.5rem; border-radius: var(--radius-full);">
            <button onclick="window.App.updateQuantity('${item.id}', -1)" style="background:none;border:none;color:#fff;cursor:pointer;font-weight:bold;padding:0 4px;">-</button>
            <span style="font-size: 0.85rem; font-weight: 700;">${item.qty}</span>
            <button onclick="window.App.updateQuantity('${item.id}', 1)" style="background:none;border:none;color:#fff;cursor:pointer;font-weight:bold;padding:0 4px;">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 800; color: var(--accent-volt);">${window.XMLStore.formatPrice(item.price * item.qty, this.currentCurrency)}</div>
          <button onclick="window.App.removeFromCart('${item.id}')" style="background:none;border:none;color:var(--accent-secondary);font-size:0.75rem;cursor:pointer;margin-top:0.3rem;">Remove</button>
        </div>
      </div>
    `).join('');

    const totals = this.getCartTotal();
    if (subtotalEl) subtotalEl.textContent = window.XMLStore.formatPrice(totals.subtotal, this.currentCurrency);
  }

  /* ================= XML CODE INSPECTOR ================= */
  initXmlInspector() {
    const modalHtml = `
      <div id="xml-inspector-overlay" class="modal-overlay">
        <div class="modal-content" style="max-width: 760px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <div>
              <span class="section-tag" style="margin:0;">XML DOM Engine</span>
              <h3 style="font-size: 1.4rem;">Live Parsed XML Catalog Document</h3>
            </div>
            <button class="modal-close-btn" id="close-xml-btn">&times;</button>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Data is dynamically retrieved from <code>products.xml</code> and queried using standard JavaScript XML DOM methods (<code>DOMParser</code>, <code>getElementsByTagName</code>, and <code>getAttribute</code>).
          </p>
          <pre class="xml-code-viewer" id="raw-xml-code-block"></pre>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById('xml-inspector-overlay');
    const closeBtn = document.getElementById('close-xml-btn');
    const triggerBtns = document.querySelectorAll('[data-trigger="view-xml"]');
    const codeBlock = document.getElementById('raw-xml-code-block');

    triggerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        codeBlock.textContent = window.XMLStore.getRawXML();
        overlay.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  /* ================= CURRENCY SWITCHER ================= */
  initCurrencyButtons() {
    const buttons = document.querySelectorAll('.currency-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCurrency = btn.dataset.currency;
        localStorage.setItem('aura_currency', this.currentCurrency);
        this.showToast(`Switched currency to ${this.currentCurrency}`, 'info');

        // Re-render components if hooks exist
        if (typeof window.refreshCatalogPrices === 'function') {
          window.refreshCatalogPrices();
        }
        if (typeof window.refreshPurchaseSummary === 'function') {
          window.refreshPurchaseSummary();
        }
        this.renderCartDrawerItems();
      });
    });
  }

  /* ================= TOAST NOTIFICATION ================= */
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : ''}`;
    const icon = type === 'success' ? '✓' : (type === 'error' ? '⚠' : 'ℹ');
    toast.innerHTML = `<span style="font-weight:900;">${icon}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Global Application Instance
window.App = new AuraApp();
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
