const At = globalThis, Ut = At.ShadowRoot && (At.ShadyCSS === void 0 || At.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Bt = /* @__PURE__ */ Symbol(), de = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Bt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ut && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = de.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && de.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Me = (n) => new Ae(typeof n == "string" ? n : n + "", void 0, Bt), F = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new Ae(e, n, Bt);
}, Ue = (n, t) => {
  if (Ut) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = At.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  }
}, he = Ut ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return Me(e);
})(n) : n;
const { is: Be, defineProperty: Ie, getOwnPropertyDescriptor: He, getOwnPropertyNames: Ye, getOwnPropertySymbols: Ve, getPrototypeOf: We } = Object, zt = globalThis, ce = zt.trustedTypes, qe = ce ? ce.emptyScript : "", Ke = zt.reactiveElementPolyfillSupport, vt = (n, t) => n, Ct = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? qe : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, It = (n, t) => !Be(n, t), ue = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: It };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), zt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let rt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ue) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Ie(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: o } = He(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(vt("elementProperties"))) return;
    const t = We(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(vt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(vt("properties"))) {
      const e = this.properties, i = [...Ye(e), ...Ve(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(he(s));
    } else t !== void 0 && e.push(he(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ue(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (i.converter?.toAttribute !== void 0 ? i.converter : Ct).toAttribute(e, i.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const o = i.getPropertyOptions(s), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Ct;
      this._$Em = s;
      const a = r.fromAttribute(e, o.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (o = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? It)(o, e) || i.useDefault && i.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: o }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: r } = o, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
rt.elementStyles = [], rt.shadowRootOptions = { mode: "open" }, rt[vt("elementProperties")] = /* @__PURE__ */ new Map(), rt[vt("finalized")] = /* @__PURE__ */ new Map(), Ke?.({ ReactiveElement: rt }), (zt.reactiveElementVersions ??= []).push("2.1.2");
const Ht = globalThis, pe = (n) => n, Et = Ht.trustedTypes, fe = Et ? Et.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Ce = "$lit$", G = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + G, Ge = `<${Ee}>`, et = document, yt = () => et.createComment(""), xt = (n) => n === null || typeof n != "object" && typeof n != "function", Yt = Array.isArray, Ze = (n) => Yt(n) || typeof n?.[Symbol.iterator] == "function", Lt = `[ 	
\f\r]`, mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, ge = />/g, J = RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, ve = /"/g, Te = /^(?:script|style|textarea|title)$/i, Xe = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), h = Xe(1), dt = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), $e = /* @__PURE__ */ new WeakMap(), tt = et.createTreeWalker(et, 129);
function Ne(n, t) {
  if (!Yt(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fe !== void 0 ? fe.createHTML(t) : t;
}
const Je = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = mt;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let d, g, c = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, g = r.exec(l), g !== null); ) p = r.lastIndex, r === mt ? g[1] === "!--" ? r = me : g[1] !== void 0 ? r = ge : g[2] !== void 0 ? (Te.test(g[2]) && (s = RegExp("</" + g[2], "g")), r = J) : g[3] !== void 0 && (r = J) : r === J ? g[0] === ">" ? (r = s ?? mt, c = -1) : g[1] === void 0 ? c = -2 : (c = r.lastIndex - g[2].length, d = g[1], r = g[3] === void 0 ? J : g[3] === '"' ? ve : be) : r === ve || r === be ? r = J : r === me || r === ge ? r = mt : (r = J, s = void 0);
    const u = r === J && n[a + 1].startsWith("/>") ? " " : "";
    o += r === mt ? l + Ge : c >= 0 ? (i.push(d), l.slice(0, c) + Ce + l.slice(c) + G + u) : l + G + (c === -2 ? a : u);
  }
  return [Ne(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class wt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [d, g] = Je(t, e);
    if (this.el = wt.createElement(d, i), tt.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = tt.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Ce)) {
          const p = g[r++], u = s.getAttribute(c).split(G), $ = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: $[2], strings: u, ctor: $[1] === "." ? ti : $[1] === "?" ? ei : $[1] === "@" ? ii : Dt }), s.removeAttribute(c);
        } else c.startsWith(G) && (l.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Te.test(s.tagName)) {
          const c = s.textContent.split(G), p = c.length - 1;
          if (p > 0) {
            s.textContent = Et ? Et.emptyScript : "";
            for (let u = 0; u < p; u++) s.append(c[u], yt()), tt.nextNode(), l.push({ type: 2, index: ++o });
            s.append(c[p], yt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) l.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf(G, c + 1)) !== -1; ) l.push({ type: 7, index: o }), c += G.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = et.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ht(n, t, e = n, i) {
  if (t === dt) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const o = xt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== o && (s?._$AO?.(!1), o === void 0 ? s = void 0 : (s = new o(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = ht(n, s._$AS(n, t.values), s, i)), t;
}
class Qe {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? et).importNode(e, !0);
    tt.currentNode = s;
    let o = tt.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let d;
        l.type === 2 ? d = new kt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new ni(o, this, t)), this._$AV.push(d), l = i[++a];
      }
      r !== l?.index && (o = tt.nextNode(), r++);
    }
    return tt.currentNode = et, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class kt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = ht(this, t, e), xt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== dt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ze(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && xt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(et.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = wt.createElement(Ne(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const o = new Qe(s, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = $e.get(t.strings);
    return e === void 0 && $e.set(t.strings, e = new wt(t)), e;
  }
  k(t) {
    Yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t) s === e.length ? e.push(i = new kt(this.O(yt()), this.O(yt()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = pe(t).nextSibling;
      pe(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Dt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = ht(this, t, e, 0), r = !xt(t) || t !== this._$AH && t !== dt, r && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = ht(this, a[i + l], e, l), d === dt && (d = this._$AH[l]), r ||= !xt(d) || d !== this._$AH[l], d === m ? t = m : t !== m && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ti extends Dt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ei extends Dt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class ii extends Dt {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ht(this, t, e, 0) ?? m) === dt) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ni {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ht(this, t);
  }
}
const si = Ht.litHtmlPolyfillSupport;
si?.(wt, kt), (Ht.litHtmlVersions ??= []).push("3.3.3");
const oi = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = e?.renderBefore ?? null;
    i._$litPart$ = s = new kt(t.insertBefore(yt(), o), o, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
const Vt = globalThis;
class L extends rt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return dt;
  }
}
L._$litElement$ = !0, L.finalized = !0, Vt.litElementHydrateSupport?.({ LitElement: L });
const ri = Vt.litElementPolyfillSupport;
ri?.({ LitElement: L });
(Vt.litElementVersions ??= []).push("4.2.2");
const ze = /* @__PURE__ */ Symbol.for(""), ai = (n) => {
  if (n?.r === ze) return n?._$litStatic$;
}, Wt = (n) => ({ _$litStatic$: n, r: ze }), ye = /* @__PURE__ */ new Map(), li = (n) => (t, ...e) => {
  const i = e.length;
  let s, o;
  const r = [], a = [];
  let l, d = 0, g = !1;
  for (; d < i; ) {
    for (l = t[d]; d < i && (o = e[d], (s = ai(o)) !== void 0); ) l += s + t[++d], g = !0;
    d !== i && a.push(o), r.push(l), d++;
  }
  if (d === i && r.push(t[i]), g) {
    const c = r.join("$$lit$$");
    (t = ye.get(c)) === void 0 && (r.raw = r, ye.set(c, t = r)), e = a;
  }
  return n(t, ...e);
}, qt = li(h);
const di = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: It }, hi = (n = di, t, e) => {
  const { kind: i, metadata: s } = e;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function f(n) {
  return (t, e) => typeof e == "object" ? hi(n, t, e) : ((i, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(n, t, e);
}
function _(n) {
  return f({ ...n, state: !0, attribute: !1 });
}
function bt(n, t = {}) {
  return n.length < 2 ? h`${n[0] ?? m}` : h`<span class="joined ${t.whole ? "whole" : ""}">${n.map(
    (e, i) => h`${i ? h`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : m}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function $t(n, t = {}) {
  return bt(n.split(" · "), t);
}
function Tt(n, t) {
  n.querySelectorAll(".joined").forEach((e) => {
    const i = `${t}|${e.textContent}`;
    if (e.dataset.fit === i) return;
    e.classList.remove("stacked", "flow", "probe");
    const s = [...e.querySelectorAll(":scope > .joined-sep")];
    s.forEach((l) => l.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], r = o.map((l) => l.getBoundingClientRect());
    if (!r.length || !r[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = i;
    const a = s.filter((l, d) => r[d + 1].top > r[d].top + 1);
    if (a.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), a.forEach((l) => l.classList.add("break"));
    }
  });
}
const Kt = F`
  .joined {
    min-width: 0;
  }

  .joined-part {
    white-space: nowrap;
  }

  .joined-only {
    display: none;
  }

  .joined.stacked .joined-only {
    display: inline;
  }

  /* Where the line breaks the dot goes; the space stays, so a copied or read text keeps its words apart. */
  .joined.stacked .joined-sep.break .joined-dot {
    display: none;
  }

  .joined.stacked .joined-sep.break::after {
    content: "\\A";
    white-space: pre;
  }

  /* Measuring only: every part on its own line. */
  .joined.probe {
    display: block;
  }

  .joined.probe .joined-part {
    display: block;
  }

  .joined.flow .joined-part {
    white-space: normal;
  }

  /* A part on its own line that is still too long (measured before the font or the width settled, iPhone) wraps
     rather than pushing the card wider than the screen. */
  .joined.stacked .joined-part {
    white-space: normal;
  }

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`, ci = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', De = F`
  :host {
    font-family: ${Me(ci)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`, Pe = 25, Gt = ["off", "cool", "wind_free", "heat", "fan_only", "dry", "auto", "sleep"], ui = ["plan", "manual", "boost", "off"];
function Zt(n) {
  return n === void 0 || n === "" || n === "unavailable" || n === "unknown";
}
function Z(n) {
  return Array.isArray(n) ? n.filter((t) => typeof t == "string") : [];
}
function it(n) {
  const t = typeof n == "string" ? Number.parseFloat(n) : n;
  return typeof t == "number" && Number.isFinite(t) ? t : void 0;
}
function lt(n, t) {
  const e = t?.state;
  if (!t || Zt(e)) return;
  if (n === "heating")
    return e === "auto" ? "plan" : e === "off" ? "off" : e === "heat" ? it(t.attributes.temperature) === Pe ? "boost" : "manual" : void 0;
  const i = String(t.attributes.preset_mode ?? "");
  return e === "off" ? "off" : e === "cool" && i === "wind_free" ? "wind_free" : i === "sleep" ? "sleep" : e === "heat_cool" ? "auto" : Gt.includes(e) ? e : void 0;
}
function Nt(n, t) {
  const e = lt(n, t);
  return e === void 0 ? void 0 : e !== "off";
}
function pi(n, t, e, i, s) {
  if (i.includes(s)) return i.length > 1 ? i.filter((r) => r !== s) : i;
  const o = Nt(n, t?.states[s]);
  return o === void 0 ? i : e.filter((r) => Nt(n, t?.states[r.entity]) === o).map((r) => r.entity);
}
function fi(n, t) {
  return t.flatMap((e) => {
    const i = it(n?.states[e]?.attributes.temperature);
    return i === void 0 ? [] : [{ entity: e, value: i }];
  });
}
function mi(n, t, e) {
  const i = new Set(e.map((s) => lt(n, t?.states[s])).filter((s) => s !== void 0));
  return i.size === 1 ? [...i][0] : void 0;
}
function gi(n, t) {
  const e = n === "heating" ? 0.5 : 1, i = it(t?.attributes.min_temp) ?? (n === "heating" ? 5 : 16), s = it(t?.attributes.max_temp) ?? (n === "heating" ? 25 : 30);
  return { min: Math.ceil(i / e) * e, max: Math.floor(s / e) * e, step: e };
}
function bi(n) {
  const t = Z(n?.attributes.hvac_modes), e = Z(n?.attributes.preset_modes);
  return Gt.filter((i) => i === "wind_free" ? t.includes("cool") && e.includes("wind_free") : i === "sleep" ? e.includes("sleep") : i === "auto" ? t.includes("auto") || t.includes("heat_cool") : t.includes(i));
}
function vi(n, t, e) {
  const i = t.map((s) => Z(n?.states[s]?.attributes[e])).filter((s) => s.length);
  return i.length ? i[0].filter((s) => i.every((o) => o.includes(s))) : [];
}
function $i(n, t, e) {
  const i = new Set(t.map((s) => n?.states[s]?.attributes[e]).filter((s) => typeof s == "string"));
  return i.size === 1 ? [...i][0] : void 0;
}
function Rt(n) {
  return !!n?.services?.tado_ce?.set_climate_timer;
}
function yi(n) {
  return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}:00`;
}
function xi(n, t, e, i) {
  const s = e.mode ?? (e.temperature !== void 0 ? "manual" : lt("heating", t));
  if (s === void 0) return [];
  if (s === "plan") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: n, hvac_mode: "auto" } }];
  if (s === "off") return [{ domain: "climate", service: "set_hvac_mode", data: { entity_id: n, hvac_mode: "off" } }];
  const o = s === "boost" ? Pe : e.temperature ?? it(t?.attributes.temperature) ?? 21;
  if (!i)
    return s === "manual" ? [{ domain: "climate", service: "set_temperature", data: { entity_id: n, temperature: o, hvac_mode: "heat" } }] : [];
  const r = e.manualFor ?? (s === "boost" ? "30" : "next"), a = { entity_id: n, temperature: o };
  return r === "next" ? a.overlay = "next_time_block" : r === "forever" ? a.overlay = "manual" : a.time_period = yi(Number(r)), [{ domain: "tado_ce", service: "set_climate_timer", data: a }];
}
function wi(n, t, e) {
  const i = [], s = { entity_id: n }, o = Z(t?.attributes.hvac_modes), r = Z(t?.attributes.preset_modes), a = String(t?.attributes.preset_mode ?? ""), l = e.mode;
  if (l !== void 0) {
    const d = (c) => i.push({ domain: "climate", service: "set_hvac_mode", data: { ...s, hvac_mode: c } }), g = (c) => i.push({ domain: "climate", service: "set_preset_mode", data: { ...s, preset_mode: c } });
    l === "wind_free" ? (d("cool"), g("wind_free")) : l === "sleep" ? ((t?.state === "off" || Zt(t?.state)) && d("cool"), g("sleep")) : (d(l === "auto" ? o.includes("auto") ? "auto" : "heat_cool" : l), l !== "off" && (a === "wind_free" || a === "sleep") && r.includes("none") && g("none"));
  }
  return e.temperature !== void 0 && l !== "off" && i.push({ domain: "climate", service: "set_temperature", data: { ...s, temperature: Math.round(e.temperature) } }), e.fan !== void 0 && Z(t?.attributes.fan_modes).includes(e.fan) && i.push({ domain: "climate", service: "set_fan_mode", data: { ...s, fan_mode: e.fan } }), e.swing !== void 0 && Z(t?.attributes.swing_modes).includes(e.swing) && i.push({ domain: "climate", service: "set_swing_mode", data: { ...s, swing_mode: e.swing } }), i;
}
function ki(n, t) {
  const e = t.mode;
  return e === void 0 ? n?.state : e === "wind_free" || e === "sleep" && (n?.state === "off" || Zt(n?.state)) ? "cool" : e === "sleep" ? n?.state : e === "auto" ? Z(n?.attributes.hvac_modes).includes("auto") ? "auto" : "heat_cool" : e;
}
function _i(n, t, e) {
  const i = Math.round(t * 60), s = [{ delay: { hours: Math.floor(i / 3600), minutes: Math.floor(i % 3600 / 60), seconds: i % 60 } }];
  return e !== void 0 && s.push({ condition: "state", entity_id: n, state: e }), s.push({ action: "climate.set_hvac_mode", target: { entity_id: n }, data: { hvac_mode: "off" } }), { type: "execute_script", sequence: s };
}
var Si = Object.defineProperty, j = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Si(t, e, s), s;
};
const Ai = ["next", "30", "60", "180", "forever"], Mi = [0, 60, 180, 480], Qt = class Qt extends L {
  constructor() {
    super(...arguments), this.system = "heating", this.rooms = [], this.selected = [], this.prefix = "hdk", this.delayMs = 2e3, this.draft = {}, this.busy = !1, this.error = "";
  }
  updated() {
    Tt(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.flush();
  }
  willUpdate(t) {
    (t.has("system") && t.get("system") !== void 0 || t.has("rooms") && t.get("rooms") !== void 0) && this.flush(t.get("selected") ?? this.selected, t.get("system") ?? this.system);
  }
  /** Sends what waits at once (the sheet closes). */
  async flush(t = this.selected, e = this.system) {
    window.clearTimeout(this.timer), this.timer = void 0;
    const i = this.draft;
    Object.keys(i).length && (this.draft = {}, await this.send(i, t, e));
  }
  change(t) {
    this.draft = { ...this.draft, ...t }, this.error = "", this.busy = !0, window.clearTimeout(this.timer), this.timer = window.setTimeout(() => {
      this.flush();
    }, this.delayMs);
  }
  /** Sends a draft to the rooms it was made for, with the system it was made in (the popup may have switched since). */
  async send(t, e, i) {
    const s = this.hass;
    if (!s) return;
    this.busy = !0;
    const o = Rt(s);
    try {
      for (const r of e) {
        const a = s.states[r];
        if (!a || lt(i, a) === void 0) continue;
        const l = i === "heating" ? xi(r, a, t, o) : wi(r, a, t);
        for (const c of l) await s.callService(c.domain, c.service, c.data);
        const d = t.offAfter ?? 0, g = i === "cooling" ? ki(a, t) : void 0;
        d > 0 && g !== void 0 && g !== "off" && await s.callWS(_i(r, d, g));
      }
      this.dispatchEvent(new CustomEvent("hdk-sent", { bubbles: !0, composed: !0 }));
    } catch (r) {
      this.error = `${this.texts?.failed ?? "Failed"}: ${r instanceof Error ? r.message : String(r)}`, this.dispatchEvent(new CustomEvent("hdk-error", { detail: { message: this.error }, bubbles: !0, composed: !0 }));
    } finally {
      this.busy = this.timer !== void 0;
    }
  }
  name(t) {
    return this.rooms.find((e) => e.entity === t)?.name ?? t;
  }
  degrees(t) {
    const e = this.i18n;
    return `${e ? this.system === "heating" ? e.half(t) : e.whole(t) : String(t)}°`;
  }
  /** The state of a room in words for its tile ("Chlazení · 22°", "Plán · 21°", "Vypnuto"). */
  roomText(t) {
    const e = this.texts, i = this.hass?.states[t], s = lt(this.system, i);
    if (s === void 0) return e.unavailable;
    const o = it(i?.attributes.temperature);
    return s !== "off" && s !== "boost" && s !== "fan_only" && o !== void 0 ? `${e.modes[s]} · ${this.degrees(o)}` : e.modes[s];
  }
  selectRoom(t) {
    const e = pi(this.system, this.hass, this.rooms, this.selected, t);
    e.join() !== this.selected.join() && (this.flush(this.selected), this.selected = e, this.dispatchEvent(new CustomEvent("hdk-select-rooms", { detail: { selected: e }, bubbles: !0, composed: !0 })));
  }
  render() {
    const t = this.texts, e = this.i18n;
    if (!t || !e) return m;
    const i = this.hass, s = i?.states[this.selected[0]], { min: o, max: r, step: a } = gi(this.system, s), l = fi(i, this.selected), d = [...new Set(l.map((v) => v.value))], g = mi(this.system, i, this.selected), c = this.draft.mode ?? g, p = this.draft.temperature === void 0 && d.length > 1, u = this.draft.temperature ?? (c === "boost" ? 25 : d[0]), $ = c === "off" || c === "fan_only", b = $ && c !== void 0 ? t.modes[c] : p ? `${this.degrees(Math.min(...d)).replace(/°$/, "")}–${this.degrees(Math.max(...d))}` : u !== void 0 ? this.degrees(u) : "––", N = this.selected.flatMap((v) => {
      const H = it(i?.states[v]?.attributes.current_temperature);
      return H === void 0 ? [] : [{ id: v, text: `${e.one(H)} °C` }];
    }), I = this.system === "heating" && this.selected.length === 1 && i?.states[this.selected[0]]?.attributes.hvac_action === "heating", q = p ? t.targets(l.map((v) => `${this.name(v.entity)} ${this.degrees(v.value)}`).join(" · ")) : N.length ? t.now(this.selected.length === 1 ? `${N[0].text}${I ? ` · ${t.heats}` : ""}` : N.map((v) => `${this.name(v.id)} ${v.text}`).join(" · ")) : "", st = this.system === "heating" ? ui.filter((v) => v !== "boost" || Rt(i)) : Gt.filter((v) => this.selected.some((H) => bi(i?.states[H]).includes(v))), X = this.draft.mode === void 0 && g === void 0 && this.selected.length > 1, x = this.system === "cooling" && (c === "off" || c === "fan_only");
    return h`
      <div class="rooms" role="group" aria-label=${t.rooms}>
        ${this.rooms.map((v) => {
      const H = i?.states[v.entity], ut = Nt(this.system, H), pt = this.selected.includes(v.entity);
      return xe(this.prefix, {
        name: v.name,
        text: this.roomText(v.entity),
        state: pt ? "on" : ut ? "idle" : "off",
        disabled: ut === void 0,
        pressed: pt,
        onPress: () => this.selectRoom(v.entity)
      });
    })}
      </div>
      <div class="target">
        <div class="big ${$ ? "word" : ""}" aria-live="polite">${b}</div>
        <div class="sub">${q}</div>
        ${this.busy ? h`<span class="busy" role="status" aria-label=${t.sending}
              ><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 2.5a7.5 7.5 0 1 1-7.5 7.5"></path></svg
            ></span>` : m}
      </div>
      <div class="slider">
        ${Ci(this.prefix, {
      min: o,
      max: r,
      step: a,
      value: u ?? o,
      mixed: p,
      marks: p ? d : [],
      label: t.temperature,
      valueText: u !== void 0 ? this.degrees(u) : "",
      minLabel: this.degrees(o),
      maxLabel: this.degrees(r),
      disabled: x || !this.selected.length,
      onChange: (v) => (
        // Moving the temperature of the heating is Ručně (spec: „Posunutí teploty přepne Plán na Ručně“).
        this.change(this.system === "heating" && c !== "manual" ? { temperature: v, mode: "manual" } : { temperature: v })
      )
    })}
      </div>
      <h3>${t.mode}</h3>
      ${this.system === "heating" ? _t(this.prefix, {
      label: t.mode,
      options: st.map((v) => ({ value: v, label: t.modes[v] })),
      value: c ?? "",
      onSelect: (v) => this.change({ mode: v, ...v === "plan" || v === "off" ? { temperature: void 0 } : {} })
    }) : h`<div class="modes" role="group" aria-label=${t.mode}>
            ${st.map(
      (v) => xe(this.prefix, {
        centered: !0,
        name: t.modes[v],
        state: c === v ? "on" : "idle",
        pressed: c === v,
        onPress: () => this.change({ mode: v })
      })
    )}
          </div>`}
      ${X ? h`<div class="note">${$t(t.mixedModes(this.selected.map((v) => `${this.name(v)} ${t.modes[lt(this.system, i?.states[v]) ?? "off"] ?? ""}`).join(" · ")))}</div>` : m}
      ${(p || X) && !Object.keys(this.draft).length ? h`<div class="note">${t.firstChange}</div>` : m}
      ${this.system === "heating" ? this.renderManualFor(c) : [this.renderAttribute("fan"), this.renderAttribute("swing"), this.renderOffAfter(c)]}
      ${this.error ? h`<div class="error" role="alert">${this.error}</div>` : m}
      ${this.selected.length === 1 ? h`<button
            class="detail"
            type="button"
            @click=${() => this.dispatchEvent(new CustomEvent("hdk-more-info", { detail: { entityId: this.selected[0] }, bubbles: !0, composed: !0 }))}
          >
            ${t.detail}<span aria-hidden="true"> ›</span>
          </button>` : m}
    `;
  }
  renderManualFor(t) {
    const e = this.texts;
    if (!Rt(this.hass)) return m;
    const i = t === "manual" || t === "boost", s = this.draft.manualFor ?? (t === "boost" ? "30" : "next"), o = Number(s), r = i ? s === "next" ? e.untilNextPlan : s === "forever" ? e.untilChanged : e.untilTime(this.i18n.time(Date.now() + o * 6e4)) : "";
    return h`<h3>${e.manualFor}</h3>
      ${_t(this.prefix, {
      label: e.manualFor,
      options: Ai.map((a) => ({ value: a, label: e.manualForChoices[a] })),
      value: s,
      disabled: !i,
      wrap: !0,
      onSelect: (a) => this.change({ manualFor: a, ...this.draft.mode === void 0 && t ? { mode: t } : {} })
    })}
      <div class="footer">${r}</div>`;
  }
  /** Síla větru or Směr proudění: the choices every selected air conditioner offers; none, no section. */
  renderAttribute(t) {
    const e = this.texts, i = vi(this.hass, this.selected, t === "fan" ? "fan_modes" : "swing_modes");
    if (!i.length) return m;
    const s = t === "fan" ? e.fanModes : e.swingModes, o = this.draft[t] ?? $i(this.hass, this.selected, t === "fan" ? "fan_mode" : "swing_mode") ?? "", r = t === "fan" ? e.fan : e.swing;
    return h`<h3>${r}</h3>
      ${_t(this.prefix, {
      label: r,
      options: i.map((a) => ({ value: a, label: s[a] ?? a })),
      value: o,
      onSelect: (a) => this.change(t === "fan" ? { fan: a } : { swing: a })
    })}`;
  }
  renderOffAfter(t) {
    const e = this.texts, i = this.draft.offAfter ?? 0, s = t !== void 0 ? t !== "off" : this.selected.length > 0 && this.selected.every((r) => Nt(this.system, this.hass?.states[r]) === !0), o = s ? i === 0 ? e.runsUntilOff : e.offAt(this.i18n.time(Date.now() + i * 6e4)) : "";
    return h`<h3>${e.offAfter}</h3>
      ${_t(this.prefix, {
      label: e.offAfter,
      options: Mi.map((r) => ({ value: String(r), label: e.offAfterChoices[String(r)] })),
      value: String(i),
      disabled: !s,
      onSelect: (r) => this.change({ offAfter: Number(r) })
    })}
      <div class="footer">${o}</div>`;
  }
};
Qt.styles = [De, Kt, F`
    :host {
      display: block;
    }
    .rooms {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .target {
      position: relative;
      margin: 18px 0 4px;
      text-align: center;
    }
    .big {
      font-size: 64px;
      font-weight: 600;
      line-height: 72px;
      letter-spacing: -1px;
      font-variant-numeric: tabular-nums;
    }
    .big.word {
      font-size: 40px;
      line-height: 72px;
    }
    .sub,
    .note,
    .footer {
      color: var(--hdk-secondary, #98989f);
      font-size: 15px;
      line-height: 20px;
    }
    .sub {
      min-height: 20px;
    }
    .busy {
      position: absolute;
      top: 6px;
      right: 0;
      width: 20px;
      height: 20px;
      color: var(--hdk-secondary, #98989f);
    }
    .busy svg {
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .busy svg {
        animation: none;
      }
    }
    .slider {
      margin: 12px 0 0;
    }
    h3 {
      margin: 20px 4px 8px;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      font-weight: 400;
      line-height: 18px;
      text-transform: uppercase;
    }
    .modes {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }
    .note,
    .footer {
      margin: 8px 4px 0;
      min-height: 20px;
    }
    .detail {
      display: block;
      min-height: 44px;
      margin: 12px 0 0;
      padding: 0 4px;
      border: 0;
      background: none;
      color: var(--hdk-accent, #0a84ff);
      font: inherit;
      font-size: 17px;
      line-height: 22px;
      cursor: pointer;
    }
    .detail:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
      border-radius: 8px;
    }
    .error {
      margin: 8px 4px 0;
      color: var(--hdk-error, #ff6961);
      font-size: 15px;
      line-height: 20px;
    }
  `];
let E = Qt;
j([
  f({ attribute: !1 })
], E.prototype, "hass");
j([
  f({ attribute: !1 })
], E.prototype, "i18n");
j([
  f({ attribute: !1 })
], E.prototype, "texts");
j([
  f()
], E.prototype, "system");
j([
  f({ attribute: !1 })
], E.prototype, "rooms");
j([
  f({ attribute: !1 })
], E.prototype, "selected");
j([
  f()
], E.prototype, "prefix");
j([
  f({ type: Number })
], E.prototype, "delayMs");
j([
  _()
], E.prototype, "draft");
j([
  _()
], E.prototype, "busy");
j([
  _()
], E.prototype, "error");
function xe(n, t) {
  const e = Wt(`${n}-tile`);
  return qt`<${e}
    kind="action"
    ?centered=${t.centered ?? !1}
    .name=${t.name}
    .text=${t.text ?? ""}
    .state=${t.state}
    .disabled=${t.disabled ?? !1}
    .label=${t.label ?? ""}
    .pressed=${t.pressed}
    @hdk-press=${(i) => {
    i.stopPropagation(), t.onPress();
  }}
  ></${e}>`;
}
function _t(n, t) {
  const e = Wt(`${n}-segmented`);
  return qt`<${e}
    .label=${t.label}
    .options=${t.options}
    .value=${t.value}
    .disabled=${t.disabled ?? !1}
    ?wrap=${t.wrap ?? !1}
    @hdk-select=${(i) => {
    i.stopPropagation(), t.onSelect(i.detail.value);
  }}
  ></${e}>`;
}
function Ci(n, t) {
  const e = Wt(`${n}-slider`);
  return qt`<${e}
    .min=${t.min}
    .max=${t.max}
    .step=${t.step}
    .tickStep=${1}
    .value=${t.value}
    ?mixed=${t.mixed}
    .marks=${t.marks}
    .label=${t.label}
    .valueText=${t.valueText}
    .minLabel=${t.minLabel}
    .maxLabel=${t.maxLabel}
    .disabled=${t.disabled}
    @hdk-input=${(i) => i.stopPropagation()}
    @hdk-change=${(i) => {
    i.stopPropagation(), t.onChange(i.detail.value);
  }}
  ></${e}>`;
}
function Ei(n) {
  if (!customElements.get(`${n}-climate`)) {
    const t = class extends E {
      constructor() {
        super(), this.prefix = n;
      }
    };
    customElements.define(`${n}-climate`, t);
  }
}
var Ti = Object.defineProperty, ct = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Ti(t, e, s), s;
};
const te = class te extends L {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, i = (t - e) / 2, s = 2 * Math.PI * i, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), r = t / 2;
    return h`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${r} cy=${r} r=${i} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${r}
          cy=${r}
          r=${i}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(s * o).toFixed(1)} ${s.toFixed(1)}"
          transform="rotate(-90 ${r} ${r})"
        ></circle>
      </svg>
      ${this.num ? h`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? h`<span class="unit">${this.unit}</span>` : m}` : m}
    </div>`;
  }
};
te.styles = F`
    :host {
      display: inline-block;
      position: relative;
      flex: none;
      line-height: 0;
    }
    .ring {
      position: relative;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .track {
      stroke: var(--hdk-ring-track, rgb(118 118 128 / 24%));
    }
    .fill {
      stroke: var(--hdk-ring-fill, var(--hdk-accent, #0a84ff));
    }
    .num,
    .unit {
      position: absolute;
      inset: 50% 0 auto;
      text-align: center;
    }
    .num {
      transform: translateY(-50%);
      color: var(--hdk-ring-text, currentColor);
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    /* With a unit the number rises a little to make room for it under the number. */
    .num.with-unit {
      transform: translateY(-62%);
    }
    .unit {
      margin-top: 8px;
      color: var(--hdk-ring-sub, var(--hdk-secondary, #98989f));
      font-size: 10px;
      line-height: 1;
    }
  `;
let V = te;
ct([
  f({ type: Number })
], V.prototype, "fraction");
ct([
  f({ type: Number })
], V.prototype, "size");
ct([
  f({ type: Number })
], V.prototype, "stroke");
ct([
  f()
], V.prototype, "num");
ct([
  f()
], V.prototype, "unit");
ct([
  f()
], V.prototype, "label");
class Pt {
  /** `times` is read at every press, so changed properties apply at once. */
  constructor(t) {
    this.times = t, this.pressing = !1, this.fired = !1;
  }
  /** A press began: `onHold` runs when it lasts `holdMs`. */
  start(t) {
    window.clearTimeout(this.timer), this.pressing = !0, this.fired = !1, this.timer = window.setTimeout(() => {
      this.fired = !0, this.last = void 0, t();
    }, this.times().holdMs);
  }
  /** The pointer was lifted or left: a hold that has not fired yet is cancelled. */
  release() {
    window.clearTimeout(this.timer);
  }
  /** The press was interrupted (pointercancel, leaving the control): nothing follows. */
  cancel() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1;
  }
  /**
   * The press ended in a tap on `key` at `time` (ms, monotonic). "none": the press was a hold that
   * has fired already (or no press began); "double": the second tap of `key` within `doubleTapMs`;
   * "single": the first tap, remembered for a following second one.
   */
  tap(t, e) {
    window.clearTimeout(this.timer);
    const i = this.pressing, s = this.fired;
    return this.pressing = !1, this.fired = !1, !i || s ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
  }
  /** Whether `key` was tapped once and no second tap has followed yet. */
  pending(t) {
    return this.last?.key === t;
  }
  /** Forget the remembered first tap (a hint was shown, the action was sent …). */
  forget() {
    this.last = void 0;
  }
  dispose() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1, this.last = void 0;
  }
}
class Xt {
  constructor(t) {
    this.host = t, this.nudge = !1, this.hint = !1;
  }
  show(t) {
    this.nudge = !0, this.hint = !0, window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudgeTimer = window.setTimeout(() => {
      this.nudge = !1, this.host.requestUpdate();
    }, 450), this.hintTimer = window.setTimeout(() => {
      this.hint = !1, this.host.requestUpdate();
    }, t * 1e3), this.host.requestUpdate();
  }
  hide() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudge = !1, this.hint = !1, this.host.requestUpdate();
  }
  dispose() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer);
  }
}
const Ot = F`
  .hint {
    position: absolute;
    z-index: 6;
    right: 0;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--hdk-bubble, #3a3a3c);
    color: var(--hdk-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    width: max-content;
    max-width: 240px;
    pointer-events: none;
    animation: hint-in 0.18s ease-out;
  }
  .hint.below {
    top: calc(100% + 10px);
  }
  .hint.above {
    bottom: calc(100% + 4px);
  }
  .hint.center {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    animation-name: hint-in-center;
  }
  .hint i {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--hdk-bubble, #3a3a3c);
    transform: rotate(45deg);
  }
  .hint.below i {
    top: -5px;
  }
  .hint.above i {
    bottom: -5px;
  }
  .hint.end i {
    right: var(--arrow, 25px);
  }
  .hint.center i {
    left: 50%;
    margin-left: -5px;
  }
  @keyframes hint-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hint-in-center {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateX(-50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hint {
      animation: none;
    }
  }
`;
var Ni = Object.defineProperty, D = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Ni(t, e, s), s;
};
const ee = class ee extends L {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Xt(this), this.nudgeIndex = 0, this.gesture = new Pt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((a) => a.value === this.value), e = this.options.filter((a) => !a.disabled), i = this.options[t]?.value ?? e[0]?.value, s = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !s ? Math.sign(this.nudgeIndex - t) * 14 : 0, r = this._dragging ? this._dx : o;
    return h`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((a) => a.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${r}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(a) => this.guarded && a.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (a, l) => h`<button
            type="button"
            role="radio"
            aria-checked=${a.value === this.value ? "true" : "false"}
            tabindex=${a.value === i ? 0 : -1}
            ?disabled=${this.disabled || a.disabled}
            data-value=${a.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, a.value, l)}
          >
            <span>${a.label}</span>${a.detail ? h`<span class="detail">${a.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? h`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (this.gesture.release(), this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, e, i) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const s = this.gesture.tap(String(i), t.timeStamp);
    if (this.swallowClick || s === "none") {
      this.swallowClick = !1;
      return;
    }
    s === "double" ? this.select(e) : (this.nudgeIndex = i, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, i = this.options.findIndex((a) => a.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: i, moved: !1, id: t.pointerId };
    const s = t.target.closest("button[data-index]"), o = s ? Number(s.dataset.index) : -1, r = o >= 0 && o !== i && !this.options[o]?.disabled;
    this.gesture.start(() => {
      r && (this.drag = void 0, this.select(this.options[o].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const i = t.clientX - e.x;
    if (!e.moved && Math.abs(i) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const s = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((s - e.index) * e.width, i)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const i = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const s = this.options[i];
    s && !s.disabled && i !== e.index && this.select(s.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const i = this.options.filter((a) => !a.disabled);
    if (!i.length) return;
    const s = i.findIndex((a) => a.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, r = i[(s + o + i.length) % i.length];
    t.preventDefault(), this.select(r.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${r.value}"]`)?.focus());
  }
};
ee.styles = [
  Ot,
  F`
      :host {
        position: relative;
        display: block;
      }
      .track {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--n), minmax(0, 1fr));
        box-sizing: border-box;
        min-height: 48px;
        padding: 3px;
        border-radius: 999px;
        background: var(--hdk-track, #2c2c2e);
        user-select: none;
        -webkit-user-select: none;
      }
      .track.guarded {
        touch-action: pan-y;
      }
      .track.compact {
        min-height: 40px;
        background: var(--hdk-track-compact, #3a3a3c);
      }
      .track.tall {
        min-height: 66px;
      }
      .track.wrap button {
        padding: 0 4px;
        font-size: 13px;
        line-height: 17px;
        text-align: center;
      }
      /* A control that cannot be used now does not look chosen: the thumb fades with the labels. */
      .track.off .thumb {
        opacity: 0.5;
        box-shadow: none;
      }
      .thumb {
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 3px;
        width: calc((100% - 6px) / var(--n));
        box-sizing: border-box;
        border-radius: 999px;
        background: var(--hdk-seg-thumb, #fff);
        box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
        transform: translateX(calc(var(--i) * 100% + var(--dx, 0px)));
        transition: transform 0.28s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      .track.dragging .thumb {
        transition: none;
      }
      .thumb[hidden] {
        display: none;
      }
      button {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 44px;
        padding: 0 8px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--hdk-seg-text, #ebebf5);
        font: inherit;
        font-size: 17px;
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;
        transition: color 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
      }
      .track.compact button {
        min-height: 34px;
        padding: 0 2px;
        font-size: 14px;
        line-height: 20px;
      }
      .track.guarded button {
        touch-action: pan-y;
      }
      button .detail {
        font-size: 13px;
        line-height: 18px;
      }
      button[aria-checked="true"] {
        color: var(--hdk-seg-selected, #000);
        font-weight: 600;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: -3px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.5;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        .thumb,
        button {
          transition: none;
        }
      }
    `
];
let A = ee;
D([
  f({ attribute: !1 })
], A.prototype, "options");
D([
  f()
], A.prototype, "value");
D([
  f()
], A.prototype, "label");
D([
  f({ type: Boolean })
], A.prototype, "disabled");
D([
  f({ type: Boolean })
], A.prototype, "compact");
D([
  f({ type: Boolean })
], A.prototype, "wrap");
D([
  f({ type: Boolean })
], A.prototype, "guarded");
D([
  f({ type: Number })
], A.prototype, "holdMs");
D([
  f({ type: Number })
], A.prototype, "doubleTapMs");
D([
  f({ type: Number })
], A.prototype, "hintSeconds");
D([
  f()
], A.prototype, "hint");
D([
  _()
], A.prototype, "_dx");
D([
  _()
], A.prototype, "_dragging");
var zi = Object.defineProperty, nt = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && zi(t, e, s), s;
};
const Di = 100, Pi = 0.6, Oi = 6, ie = class ie extends L {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const i = t.composedPath(), s = e.findIndex((r) => i.includes(r)), o = t.shiftKey ? e[s <= 0 ? e.length - 1 : s - 1] : e[s === -1 || s === e.length - 1 ? 0 : s + 1];
      t.preventDefault(), o.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((e) => e instanceof HTMLElement && (e.localName.endsWith("-slider") || "drag" in e.dataset || e instanceof HTMLInputElement && e.type === "range"));
    }, this.touchMove = (t) => {
      !this.touchOnSlider && t.cancelable && this.cannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this.touchY ?? 0)) && t.preventDefault();
    }, this.wheel = (t) => {
      t.cancelable && !t.ctrlKey && this.cannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this.drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now() });
    }, this.dragMove = (t) => {
      const e = this.drag;
      if (!e || e.pointerId !== t.pointerId) return;
      const i = t.clientY - e.startY;
      if (!this.dragging) {
        if (i < Oi) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, i);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const i = Math.max(0, t.clientY - e.startY), s = i / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (i > Di || s > Pi) ? this.close() : this.dragY = 0;
    };
  }
  willUpdate(t) {
    if (t.has("open") && this.open && !t.get("open")) {
      let e = document.activeElement;
      for (; e?.shadowRoot?.activeElement; ) e = e.shadowRoot.activeElement;
      this.returnFocus = e, this.dragY = 0;
    }
  }
  updated(t) {
    t.has("open") && (this.open ? this.renderRoot.querySelector(".panel")?.focus() : t.get("open") && (this.returnFocus?.focus?.(), this.returnFocus = void 0));
  }
  close() {
    this.dispatchEvent(new CustomEvent("hdk-close", { bubbles: !0, composed: !0 }));
  }
  /** The focusable elements of the sheet: its ✕ and the slotted content, inside shadow roots too (the controls of the kit). */
  focusable() {
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', e = (s) => [...s.querySelectorAll("*")].flatMap((o) => [
      ...o.matches(t) ? [o] : [],
      ...o.shadowRoot ? e(o.shadowRoot) : []
    ]), i = this.renderRoot.querySelector(".close");
    return [...i ? [i] : [], ...e(this).filter((s) => s.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const i = this.renderRoot.querySelector(".panel");
    return !i || !t.composedPath().includes(i) ? !0 : !(i.scrollHeight > i.clientHeight + 1) || e > 0 && i.scrollTop <= 0 || e < 0 && i.scrollTop + i.clientHeight >= i.scrollHeight - 1;
  }
  render() {
    return this.open ? h`<div
      class="backdrop"
      part="backdrop"
      style=${`--backdrop-opacity: ${Math.max(0, 1 - this.dragY / 400).toFixed(2)}`}
      @click=${() => this.close()}
      @keydown=${this.keydown}
      @touchstart=${this.touchStart}
      @touchmove=${this.touchMove}
      @wheel=${this.wheel}
    >
      <div
        class="panel ${this.wide ? "wide" : ""} ${this.dragging ? "dragging" : ""}"
        part="sheet"
        style=${this.dragY > 0 ? `transform: translateY(${this.dragY}px)` : ""}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
        tabindex="-1"
        @click=${(t) => t.stopPropagation()}
      >
        <div class="top" @pointerdown=${this.dragStart} @pointermove=${this.dragMove} @pointerup=${this.dragEnd} @pointercancel=${this.dragEnd}>
          <div class="grabber" aria-hidden="true"></div>
          <div class="head">
            <div>
              <h2 id="title">${this.heading}</h2>
              ${this.sub ? h`<div class="sub">${this.sub}</div>` : m}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : m;
  }
};
ie.styles = [De, F`
    :host {
      display: contents;
    }
    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: rgb(0 0 0 / calc(var(--hdk-sheet-backdrop, 60%) * var(--backdrop-opacity, 1)));
      overscroll-behavior: contain;
      touch-action: none;
    }
    .panel {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: var(--hdk-sheet-bg, #1c1c1e);
      color: var(--hdk-sheet-text, #ffffff);
      animation: rise 220ms ease-out;
      transition: transform 220ms ease-out;
    }
    .panel:focus {
      outline: none;
    }
    .panel.dragging {
      transition: none;
    }
    .top {
      margin: -8px -16px 0;
      padding: 8px 16px 0;
      touch-action: none;
      cursor: grab;
    }
    .grabber {
      width: 36px;
      height: 5px;
      margin: 0 auto 10px;
      border-radius: 3px;
      background: var(--hdk-sheet-grabber, rgb(255 255 255 / 28%));
    }
    .head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }
    /* The type scale of DASHBOARD_UX_SYSTEM.md (Písmo): Title 2 22/28 and Subhead 15/20 (uživatel 13. 11. 2026: „Q209 ano“). */
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
    }
    .sub {
      color: var(--hdk-secondary, #9a9aa0);
      font-size: 15px;
      line-height: 20px;
    }
    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 44px;
      width: 44px;
      height: 44px;
      margin: -8px -8px 0 0;
      padding: 0;
      border: 0;
      background: none;
      color: var(--hdk-secondary, #9a9aa0);
      cursor: pointer;
    }
    .close span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--hdk-sheet-button, rgb(118 118 128 / 24%));
    }
    .close svg {
      width: 12px;
      height: 12px;
    }
    .close:focus-visible {
      border-radius: 50%;
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
    }
    @keyframes rise {
      from {
        transform: translateY(24px);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .panel {
        animation: none;
        transition: none;
      }
    }
    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }
      .panel {
        border-bottom: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
        border-radius: 24px;
      }
      .grabber {
        display: none;
      }
    }
    @media (orientation: landscape) and (max-height: 600px) {
      .panel.wide {
        max-width: min(960px, calc(100% - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
        max-height: calc(100% - 16px);
      }
    }
  `];
let B = ie;
nt([
  f({ type: Boolean, reflect: !0 })
], B.prototype, "open");
nt([
  f()
], B.prototype, "heading");
nt([
  f()
], B.prototype, "sub");
nt([
  f()
], B.prototype, "closeLabel");
nt([
  f({ type: Boolean })
], B.prototype, "wide");
nt([
  _()
], B.prototype, "dragY");
nt([
  _()
], B.prototype, "dragging");
var Li = Object.defineProperty, P = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Li(t, e, s), s;
};
const ne = class ne extends L {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, i = Math.max(0, Math.min(1, (t - this.min) / e)), s = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${i})`, o = this.mixed && this._drag === void 0 ? this.marks.map((d) => h`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], r = this.tickStep || this.step || 1, a = Math.floor(e / r + 1e-9) + 1, l = a >= 2 && a <= 40 ? Array.from({ length: a }, (d, g) => h`<i style="left:${(g * r / e * 100).toFixed(2)}%"></i>`) : [];
    return h`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${s}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${l}</div>
        ${o.length ? h`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? h`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
ne.styles = F`
    :host {
      display: block;
    }
    .wrap {
      position: relative;
      height: 52px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 52px;
      margin: 0;
      padding: 0 14px;
      border-radius: 26px;
      background: var(--hdk-track, #2c2c2e);
      cursor: pointer;
      touch-action: pan-y;
    }
    input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    input::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, var(--hdk-accent, #0a84ff) 0%, var(--hdk-accent, #0a84ff) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) 100%);
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      margin-top: -9px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    input::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-bar, rgb(255 255 255 / 14%));
    }
    input::-moz-range-progress {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-accent, #0a84ff);
    }
    input::-moz-range-thumb {
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    :host([mixed]) input::-webkit-slider-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-progress {
      background: transparent;
    }
    .marks {
      position: absolute;
      left: 33px;
      right: 33px;
      top: 16px;
      height: 20px;
      pointer-events: none;
    }
    .marks i {
      position: absolute;
      top: 0;
      margin-left: -1.5px;
      width: 3px;
      height: 20px;
      border-radius: 1.5px;
      background: var(--hdk-accent, #0a84ff);
    }
    input:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: 2px;
    }
    /* Ticks at the steps, between the thumb centres at both ends. */
    .ticks {
      position: absolute;
      left: 33px;
      right: 33px;
      bottom: 7px;
      height: 5px;
      pointer-events: none;
    }
    .ticks i {
      position: absolute;
      top: 0;
      margin-left: -1px;
      width: 2px;
      height: 5px;
      border-radius: 1px;
      background: var(--hdk-tick, rgb(255 255 255 / 28%));
    }
    .ends {
      display: flex;
      justify-content: space-between;
      padding: 4px 14px 0;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      line-height: 18px;
    }
  `;
let M = ne;
P([
  f({ type: Number })
], M.prototype, "min");
P([
  f({ type: Number })
], M.prototype, "max");
P([
  f({ type: Number })
], M.prototype, "step");
P([
  f({ type: Number })
], M.prototype, "tickStep");
P([
  f({ type: Number })
], M.prototype, "value");
P([
  f()
], M.prototype, "label");
P([
  f()
], M.prototype, "valueText");
P([
  f()
], M.prototype, "minLabel");
P([
  f()
], M.prototype, "maxLabel");
P([
  f({ type: Boolean })
], M.prototype, "disabled");
P([
  f({ type: Boolean, reflect: !0 })
], M.prototype, "mixed");
P([
  f({ attribute: !1 })
], M.prototype, "marks");
P([
  _()
], M.prototype, "_drag");
var Ri = Object.defineProperty, W = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Ri(t, e, s), s;
};
const se = class se extends L {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Xt(this), this.gesture = new Pt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return h`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(t) => this.guarded && t.preventDefault()}
      ><span class="thumb"></span></button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? h`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  emit() {
    this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-toggle", { detail: { checked: !this.checked }, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.guarded || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.guarded) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const e = this.gesture.tap("switch", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
se.styles = [
  Ot,
  F`
      :host {
        position: relative;
        display: inline-block;
        flex: none;
      }
      button {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 60px;
        height: 32px;
        padding: 0;
        border: 0;
        border-radius: 16px;
        background: var(--hdk-switch-off, rgb(120 120 128 / 36%));
        cursor: pointer;
        transition: background 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      button[aria-checked="true"] {
        background: var(--hdk-accent, #0a84ff);
      }
      /* Invisible extension of the touch target to 44 px. */
      button::after {
        content: "";
        position: absolute;
        inset: -6px -4px;
      }
      .thumb {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 40px;
        height: 26px;
        box-sizing: border-box;
        border-radius: 13px;
        background: #fff;
        box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
        transition: left 0.25s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      button[aria-checked="true"] .thumb {
        left: 17px;
      }
      /* One tap on a protected switch: the thumb moves toward the new position and back. */
      button.nudge[aria-checked="false"] .thumb {
        left: 9px;
      }
      button.nudge[aria-checked="true"] .thumb {
        left: 11px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 3px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        button,
        .thumb {
          transition: none;
        }
        button.nudge[aria-checked="false"] .thumb {
          left: 3px;
        }
        button.nudge[aria-checked="true"] .thumb {
          left: 17px;
        }
      }
    `
];
let R = se;
W([
  f({ type: Boolean })
], R.prototype, "checked");
W([
  f({ type: Boolean })
], R.prototype, "disabled");
W([
  f()
], R.prototype, "label");
W([
  f({ type: Boolean })
], R.prototype, "guarded");
W([
  f({ type: Number })
], R.prototype, "holdMs");
W([
  f({ type: Number })
], R.prototype, "doubleTapMs");
W([
  f({ type: Number })
], R.prototype, "hintSeconds");
W([
  f()
], R.prototype, "hintPlacement");
W([
  f()
], R.prototype, "hint");
var Fi = Object.defineProperty, C = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && Fi(t, e, s), s;
};
const oe = class oe extends L {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new Xt(this), this.gesture = new Pt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    Tt(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : h`<span class="count">${this.count}</span>`;
    return h`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : m}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : m}
        aria-busy=${this.pending ? "true" : m}
        aria-haspopup=${this.kind === "open" ? "dialog" : m}
        aria-label=${this.label || m}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(i) => this.protected && i.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? h`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : h`<span class="text">${$t(this.text)}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? h`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  /** Opening a popup changes nothing, so an `open` tile is never protected. */
  get protected() {
    return this.guarded && this.kind !== "open";
  }
  emit() {
    this.hints.hide();
    const [t, e] = this.kind === "toggle" ? ["hdk-toggle", { checked: this.state !== "on" }] : this.kind === "open" ? ["hdk-open", {}] : ["hdk-press", {}];
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.protected || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.protected) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const e = this.gesture.tap("tile", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
oe.styles = [
  Ot,
  Kt,
  F`
      :host {
        position: relative;
        display: block;
        min-width: 0;
      }
      button {
        position: relative;
        /* The name starts at the top in every tile of a row, whatever the height of the tallest one. */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 60px;
        margin: 0;
        padding: 10px 12px;
        border: 0;
        border-radius: 12px;
        background: var(--hdk-tile, #1c1c1e);
        color: var(--hdk-tile-text, #fff);
        font: inherit;
        text-align: start;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      :host([state="off"]) button {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--hdk-tile-border, rgb(84 84 88 / 65%));
      }
      :host([state="on"]) button {
        background: var(--hdk-tile-on, #0a6ed1);
        color: var(--hdk-tile-on-text, #fff);
        box-shadow: inset 0 0 0 1.5px var(--hdk-tile-on-border, transparent);
      }
      :host([state="mixed"]) button {
        background: var(--hdk-tile-mixed, #17395d);
      }
      /* Sent and on its way: the fill goes between its own and the accent until Home Assistant reports the result. */
      :host([pending]) button {
        animation: hdk-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-pending {
        to {
          background: var(--hdk-tile-on, #0a6ed1);
          color: var(--hdk-tile-on-text, #fff);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          background: var(--hdk-tile-mixed, #17395d);
          /* Not by colour alone: a dashed accent outline marks the command on its way. */
          outline: 1.5px dashed var(--hdk-tile-on, #0a6ed1);
          outline-offset: -1.5px;
        }
      }
      .name {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
        overflow-wrap: anywhere;
      }
      .name > span:first-child {
        flex: 1;
        min-width: 0;
      }
      .chevron {
        flex: none;
        font-weight: 400;
        color: var(--hdk-secondary, #98989f);
      }
      .text {
        display: block;
        font-size: 13px;
        line-height: 18px;
        color: var(--hdk-secondary, #98989f);
      }
      :host([state="on"]) .text,
      :host([state="on"]) .chevron {
        color: var(--hdk-tile-on-sub, #fff);
      }
      :host([centered]) button {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 52px;
        text-align: center;
      }
      :host([centered]) .name {
        font-size: 17px;
        line-height: 22px;
      }
      :host([centered]) .name > span:first-child {
        flex: none;
      }
      .count {
        flex: none;
        display: grid;
        place-items: center;
        min-width: 22px;
        height: 22px;
        box-sizing: border-box;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--hdk-tile-badge, rgb(255 255 255 / 16%));
        font-size: 13px;
        line-height: 18px;
        font-weight: 600;
      }
      button:active:not(:disabled),
      button.nudge {
        filter: brightness(1.18);
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 2px;
      }
      .hint.start {
        right: auto;
        left: 0;
      }
      .hint.start i {
        left: 25px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    `
];
let w = oe;
C([
  f()
], w.prototype, "name");
C([
  f()
], w.prototype, "text");
C([
  f({ reflect: !0 })
], w.prototype, "state");
C([
  f()
], w.prototype, "kind");
C([
  f({ type: Number })
], w.prototype, "count");
C([
  f({ type: Boolean, reflect: !0 })
], w.prototype, "centered");
C([
  f({ type: Boolean })
], w.prototype, "disabled");
C([
  f({ type: Boolean, reflect: !0 })
], w.prototype, "pending");
C([
  f({ type: Boolean })
], w.prototype, "pressed");
C([
  f()
], w.prototype, "label");
C([
  f({ type: Boolean })
], w.prototype, "guarded");
C([
  f({ type: Number })
], w.prototype, "holdMs");
C([
  f({ type: Number })
], w.prototype, "doubleTapMs");
C([
  f({ type: Number })
], w.prototype, "hintSeconds");
C([
  f()
], w.prototype, "hint");
C([
  f()
], w.prototype, "hintAlign");
function ji(n) {
  const t = [
    [`${n}-switch`, R],
    [`${n}-segmented`, A],
    [`${n}-slider`, M],
    [`${n}-ring`, V],
    [`${n}-tile`, w],
    [`${n}-sheet`, B]
  ];
  for (const [e, i] of t)
    customElements.get(e) || customElements.define(e, i);
}
const Ui = ["cs", "en", "sv"];
class Oe extends Error {
}
function y(n) {
  throw new Oe(n);
}
function Bi(n, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Oe ? new Error(`${n}: ${e.message}`) : e;
  }
}
function Y(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n);
}
function ot(n, t) {
  return n == null ? {} : (Y(n) || y(`"${t}" must be a mapping of keys.`), n);
}
function O(n, t, e) {
  for (const i of Object.keys(n))
    t.includes(i) || y(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function k(n, t, e = {}) {
  if (n == null)
    return;
  const i = typeof n == "string" ? n.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || y(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !i.startsWith(`${e.domain}.`) && y(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${i}.`), i;
}
function Ii(n, t) {
  if (n != null)
    return (typeof n != "string" || !n.trim()) && y(`${t} must be a non-empty text.`), n.trim();
}
function Q(n, t) {
  if (n != null) {
    if (typeof n == "string" && n.trim())
      return n.trim();
    if (Y(n) && Object.keys(n).length > 0) {
      const e = Object.entries(n);
      if (e.every(([i, s]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(i) && typeof s == "string" && s.trim()))
        return Object.fromEntries(e.map(([i, s]) => [i, s.trim()]));
    }
    return y(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Hi(n, t) {
  if (n === void 0 || typeof n == "string")
    return n;
  const e = t.toLowerCase();
  return n[e] ?? n[e.split("-")[0]] ?? n.en ?? Object.values(n)[0];
}
const we = ["auto", ...Ui];
function Yi(n) {
  const t = n ?? "auto";
  return we.includes(t) || y(`language must be one of ${we.join(", ")}.`), t;
}
const Vi = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Mt(n) {
  return Vi.has(n);
}
function S(n, t) {
  return t ? n?.states?.[t] : void 0;
}
function z(n, t) {
  const e = S(n, t)?.state;
  return e === void 0 || Mt(e) ? void 0 : e;
}
function St(n, t) {
  const e = z(n, t);
  if (e === void 0)
    return;
  const i = Number(e);
  return Number.isFinite(i) ? i : void 0;
}
const Wi = 168 * 36e5;
function Le(n) {
  if (n == null) return;
  const t = typeof n == "number" ? n < 1e11 ? n * 1e3 : n : Date.parse(n);
  return Number.isFinite(t) ? t : void 0;
}
function qi(n) {
  let t;
  for (const e of n ?? []) {
    const i = e.s ?? e.state, s = Le(e.lu ?? e.last_updated);
    i === void 0 || s === void 0 || i === "unavailable" || i === "unknown" || i === "" || (t === void 0 || t.state !== i) && (t = { state: i, start: s });
  }
  return t;
}
class Ki {
  constructor(t, e = Date.now) {
    this.onChange = t, this.now = e, this.known = /* @__PURE__ */ new Map(), this.wanted = /* @__PURE__ */ new Map(), this.pending = /* @__PURE__ */ new Map(), this.scheduled = !1;
  }
  /** The moment (ms) the entity got its current state; undefined when the entity is missing or has no time. */
  of(t, e) {
    const i = S(t, e);
    if (!t || !e || !i) return;
    const s = Le(i.last_changed), o = `${i.state}|${i.last_changed ?? ""}`, r = this.known.get(e);
    return r?.key === o ? r.start === void 0 ? s : Math.min(r.start, s ?? r.start) : (this.hass = t, this.wanted.get(e) !== o && this.pending.get(e) !== o && (this.wanted.set(e, o), this.schedule()), s);
  }
  schedule() {
    this.scheduled || (this.scheduled = !0, Promise.resolve().then(() => this.flush()));
  }
  async flush() {
    this.scheduled = !1;
    const t = this.hass, e = new Map(this.wanted);
    if (this.wanted.clear(), !t || !e.size) return;
    for (const [o, r] of e) this.pending.set(o, r);
    const i = this.now();
    let s;
    try {
      s = await t.callWS({
        type: "history/history_during_period",
        start_time: new Date(i - Wi).toISOString(),
        end_time: new Date(i).toISOString(),
        entity_ids: [...e.keys()],
        include_start_time_state: !0,
        significant_changes_only: !1,
        minimal_response: !0,
        no_attributes: !0
      });
    } catch {
      s = void 0;
    }
    for (const [o, r] of e) {
      if (this.pending.get(o) === r && this.pending.delete(o), this.wanted.has(o)) continue;
      const a = qi(s?.[o]), l = S(this.hass, o)?.state;
      this.known.set(o, { key: r, start: a && a.state === l ? a.start : void 0 });
    }
    this.onChange();
  }
}
class Gi {
  /** `changed` is called whenever a control starts or stops pulsing (the card re-renders). */
  constructor(t, e = 5e3) {
    this.changed = t, this.stallMs = e, this.watches = /* @__PURE__ */ new Map();
  }
  has(t) {
    return this.watches.has(t);
  }
  /** The command was sent. A state that is already there pulses not at all. */
  start(t, e, i) {
    if (this.stop(t, !1), e && i.done(e)) {
      this.changed();
      return;
    }
    const s = { ...i, signature: ke(e, i.entities) };
    this.watches.set(t, s), this.arm(t, s), this.changed();
  }
  /** The call failed, or the card goes away. */
  stop(t, e = !0) {
    const i = this.watches.get(t);
    i && (clearTimeout(i.timer), this.watches.delete(t), e && this.changed());
  }
  /** On every update of Home Assistant: arrived ones stop, moving ones get the full stall time again. */
  check(t) {
    if (t)
      for (const [e, i] of [...this.watches]) {
        if (i.done(t)) {
          this.stop(e);
          continue;
        }
        const s = ke(t, i.entities);
        s !== i.signature && (i.signature = s, this.arm(e, i));
      }
  }
  clear() {
    for (const t of [...this.watches.keys()]) this.stop(t, !1);
  }
  arm(t, e) {
    clearTimeout(e.timer), e.timer = setTimeout(() => this.stop(t), this.stallMs);
  }
}
function ke(n, t) {
  return t.map((e) => {
    const i = n?.states[e];
    return i ? `${i.state}|${JSON.stringify(i.attributes)}` : "";
  }).join("§");
}
const Zi = [
  { name: { cs: "Den", en: "Day", sv: "Dag" }, position: 100, tilt: 100 },
  { name: { cs: "Stín", en: "Shade", sv: "Skugga" }, position: 0, tilt: 100 },
  { name: { cs: "Tma", en: "Dark", sv: "Mörker" }, position: 0, tilt: 0 }
];
function at(n, t) {
  return n == null ? [] : (Array.isArray(n) || y(`"${t}" must be a list.`), n);
}
function K(n, t, e, i, s) {
  return n == null ? e : ((typeof n != "number" || !Number.isFinite(n) || n < i || n > s) && y(`${t} must be a number from ${i} to ${s}.`), n);
}
function gt(n, t, e) {
  return at(n, t).map((i, s) => {
    const o = `${t}[${s}]`;
    Y(i) || y(`${o} must be a mapping with name and entity.`), O(i, ["name", "entity"], o);
    const r = Q(i.name, `${o}.name`) ?? y(`${o}.name is missing.`), a = k(i.entity, `${o}.entity`, { example: `${e[0]}.example` }) ?? y(`${o}.entity is missing.`);
    return e.includes(a.split(".")[0]) || y(`${o}.entity must be one of ${e.join(", ")}, not ${a}.`), { name: r, entity: a };
  });
}
function Xi(n) {
  Y(n) || y("the configuration must be a mapping of keys.");
  const t = ot(n.covers, "covers");
  O(t, ["script", "entities", "last_action", "presets", "tolerance"], "covers");
  const e = {}, i = at(t.entities, "covers.entities").map((u, $) => {
    const b = `covers.entities[${$}]`;
    if (!Y(u)) return k(u, b, { domain: "cover" }) ?? y(`${b} is missing.`);
    O(u, ["name", "entity"], b);
    const N = k(u.entity, `${b}.entity`, { domain: "cover" }) ?? y(`${b}.entity is missing.`), I = Q(u.name, `${b}.name`);
    return I !== void 0 && (e[N] = I), N;
  }), s = ot(n.ventilation, "ventilation");
  O(s, ["mode", "fans"], "ventilation");
  const o = ot(n.heating, "heating");
  O(o, ["resume", "rooms"], "heating");
  const r = ot(n.cooling, "cooling");
  O(r, ["rooms"], "cooling");
  const a = ot(n.guard, "guard");
  O(a, ["hold_ms", "double_tap_ms", "hint_seconds"], "guard");
  const l = ot(n.house_modes, "house_modes");
  O(l, ["winter", "summer"], "house_modes");
  const d = at(t.presets, "covers.presets").map((u, $) => {
    const b = `covers.presets[${$}]`;
    return Y(u) || y(`${b} must be a mapping with name, position and tilt.`), O(u, ["name", "position", "tilt"], b), {
      name: Q(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      position: K(u.position, `${b}.position`, 0, 0, 100),
      tilt: K(u.tilt, `${b}.tilt`, 0, 0, 100)
    };
  }), g = at(n.batteries, "batteries").map((u, $) => {
    const b = `batteries[${$}]`;
    return Y(u) || y(`${b} must be a mapping with name and low.`), O(u, ["name", "low", "level", "type"], b), {
      name: Q(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      low: k(u.low, `${b}.low`, { domain: "binary_sensor" }) ?? y(`${b}.low is missing.`),
      level: k(u.level, `${b}.level`, { domain: "sensor" }),
      type: k(u.type, `${b}.type`, { domain: "sensor" })
    };
  }), c = at(n.filters, "filters").map((u, $) => {
    const b = `filters[${$}]`;
    return Y(u) || y(`${b} must be a mapping with name, hours and threshold.`), O(u, ["name", "hours", "threshold"], b), {
      name: Q(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      hours: k(u.hours, `${b}.hours`, { domain: "input_number" }) ?? y(`${b}.hours is missing.`),
      threshold: k(u.threshold, `${b}.threshold`, { domain: "select" }) ?? y(`${b}.threshold is missing.`)
    };
  }), p = at(n.maintenance, "maintenance").map((u, $) => {
    const b = `maintenance[${$}]`;
    return Y(u) || y(`${b} must be a mapping with name, task, counter and every.`), O(u, ["name", "task", "counter", "every"], b), {
      name: Q(u.name, `${b}.name`) ?? y(`${b}.name is missing.`),
      task: Q(u.task, `${b}.task`) ?? y(`${b}.task is missing.`),
      counter: k(u.counter, `${b}.counter`, { domain: "counter" }) ?? y(`${b}.counter is missing.`),
      every: K(u.every, `${b}.every`, 30, 1, 1e3)
    };
  });
  return {
    language: Yi(n.language),
    houseMode: k(n.house_mode_entity, "house_mode_entity", { domain: "input_select" }),
    summer: Ii(l.summer, "house_modes.summer") ?? "Léto",
    failedActions: k(n.failed_actions, "failed_actions", { domain: "sensor" }),
    clearFailed: k(n.clear_failed_script, "clear_failed_script", { domain: "script" }),
    snoozed: k(n.snoozed, "snoozed", { domain: "sensor" }),
    snoozeScript: k(n.snooze_script, "snooze_script", { domain: "script" }),
    batteries: g,
    filters: c,
    laundry: gt(n.laundry, "laundry", ["input_boolean"]),
    maintenance: p,
    running: gt(n.running, "running", ["input_boolean", "binary_sensor", "switch", "vacuum"]),
    covers: {
      script: k(t.script, "covers.script", { domain: "script" }) ?? "script.zaluzie_posun",
      entities: i,
      names: e,
      lastAction: k(t.last_action, "covers.last_action", { domain: "sensor" }),
      presets: d.length ? d : Zi,
      tolerance: K(t.tolerance, "covers.tolerance", 5, 0, 20)
    },
    ventilation: {
      mode: k(s.mode, "ventilation.mode", { domain: "input_boolean" }),
      fans: gt(s.fans, "ventilation.fans", ["switch", "fan"])
    },
    heating: {
      resume: k(o.resume, "heating.resume", { domain: "button" }),
      rooms: gt(o.rooms, "heating.rooms", ["climate"])
    },
    cooling: { rooms: gt(r.rooms, "cooling.rooms", ["climate"]) },
    sendDelaySeconds: K(n.send_delay_seconds, "send_delay_seconds", 2, 0, 30),
    guard: {
      holdMs: K(a.hold_ms, "guard.hold_ms", 550, 200, 3e3),
      doubleTapMs: K(a.double_tap_ms, "guard.double_tap_ms", 400, 150, 1500),
      hintSeconds: K(a.hint_seconds, "guard.hint_seconds", 3, 1, 10)
    }
  };
}
function Ji(n) {
  return Bi("Dům Dashboard", () => Xi(n));
}
function Re(n) {
  return (n?.locale?.language || n?.language || "").trim();
}
function Jt(n) {
  const t = n.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Qi(n, t) {
  return n === "auto" ? Jt(Re(t)) : n;
}
function tn() {
  return Jt(document.documentElement.lang || navigator.language || "");
}
const _e = /* @__PURE__ */ new WeakMap(), en = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, nn = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), sn = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Ft(n, t) {
  const e = n?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function on(n, t, e) {
  const i = Re(e).replace("_", "-"), s = i !== "" && Jt(i) === t ? i : en[t], o = Ft(e, "number_format"), r = Ft(e, "time_format"), a = Ft(e, "date_format"), l = [t, s, o, r, a].join("|");
  let d = _e.get(n);
  d || (d = /* @__PURE__ */ new Map(), _e.set(n, d));
  let g = d.get(l);
  return g || (g = ln(n[t], t, s, o, r, a), d.set(l, g)), g;
}
function rn(n) {
  try {
    return new Intl.NumberFormat(n), n;
  } catch {
    return "en";
  }
}
function an(n, t) {
  if (n === "12")
    return !0;
  if (n === "24")
    return !1;
  const e = n === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function ln(n, t, e, i, s, o) {
  const r = rn(e), a = i === "system" ? void 0 : i === "none" ? "en-US" : sn[i] ?? r, l = i === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(a, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), g = new Intl.NumberFormat(a, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), c = new Intl.NumberFormat(a, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(a, { maximumFractionDigits: 0, ...l }), u = an(s, r), $ = u ? "h12" : "h23", b = new Intl.DateTimeFormat(r, { hour: u ? "numeric" : "2-digit", minute: "2-digit", hourCycle: $ }), N = new Intl.DateTimeFormat(r, u ? { hour: "numeric", hourCycle: $ } : { hour: "2-digit", minute: "2-digit", hourCycle: $ }), I = o === "system" ? void 0 : r, q = new Intl.DateTimeFormat(I, { day: "numeric", month: "numeric" }), st = (x) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return q.format(x);
    const v = q.formatToParts(x), H = v.find((ft) => ft.type === "literal")?.value ?? "/", ut = v[v.length - 1], pt = ut?.type === "literal" ? ut.value : "", ae = v.find((ft) => ft.type === "day")?.value ?? "", le = v.find((ft) => ft.type === "month")?.value ?? "";
    return o === "DMY" ? `${ae}${H}${le}${pt}` : `${le}${H}${ae}${pt}`;
  }, X = nn.has(r.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: r,
    t: n,
    one: (x) => d.format(x),
    two: (x) => g.format(x),
    half: (x) => c.format(Math.round(x * 2) / 2),
    tick: (x) => c.format(x),
    whole: (x) => p.format(x),
    percent: (x) => `${x}${X}%`,
    time: (x) => b.format(x),
    hour: (x) => N.format(x),
    day: st
  };
}
const dn = {
  cardDescription: "Řídicí centrum domu: co tě potřebuje a ovládání na jednom místě.",
  title: "Dům",
  needsYou: "Potřebuje tebe",
  nothingWaits: "Nic na tebe nečeká",
  retry: "Zkusit znovu",
  snooze: "Odložit",
  snoozeFor: { day: "O den", weekend: "Na víkend", week: "O týden", month: "O měsíc" },
  done: "Hotovo",
  battery: (n) => n ? `Baterie ${n}` : "Slabá baterie",
  filter: (n, t) => `Vyčistit filtr · ${n} z ${t}`,
  laundry: (n) => n ? `Prádlo čeká · od ${n}` : "Prádlo čeká",
  cycles: (n, t) => `${n} z ${t} cyklů`,
  running: "Teď běží",
  nothingRuns: "Nic neběží",
  minutes: (n) => `${n} min`,
  hours: (n, t) => t ? `${n} h ${t} min` : `${n} h`,
  covers: "Žaluzie",
  coversDetail: "Podrobnosti žaluzií",
  close: "Zavřít",
  log: "Co se stalo",
  logNew: (n, t) => `${n} ${n === 1 ? "nová událost" : n < 5 ? "nové události" : "nových událostí"} od ${t}`,
  logToday: (n) => `${n} ${n === 1 ? "událost" : n < 5 ? "události" : "událostí"} dnes`,
  logNothingNew: "Nic nového",
  logSince: "Od minulého otevření",
  logEarlier: "Dříve dnes",
  logEmpty: "Dnes se nic nestalo.",
  logFailed: "Deník se nepodařilo načíst.",
  logRuns: "Běží",
  logFinished: "Doběhla",
  logLaundryWaits: "Prádlo čeká",
  logLaundryOut: "Prádlo vyndáno",
  climate: {
    rooms: "Místnosti",
    temperature: "Cílová teplota",
    mode: "Režim",
    modes: { plan: "Plán", manual: "Ručně", boost: "Boost", off: "Vypnuto", cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto", sleep: "Spánek" },
    unavailable: "Nedostupné",
    now: (n) => `Teď ${n}`,
    heats: "topí",
    targets: (n) => `Cíl: ${n}`,
    mixedModes: (n) => `Různé režimy: ${n}`,
    firstChange: "První změna nastaví všechny vybrané stejně.",
    manualFor: "Ručně platí",
    manualForChoices: { next: "Do změny plánu", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Trvale" },
    offAfter: "Vypnout za",
    offAfterChoices: { 0: "Nevypínat", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Do další změny plánu, potom zpět na plán.",
    untilTime: (n) => `Do ${n}, potom zpět na plán.`,
    untilChanged: "Platí, dokud ho nezměníš.",
    runsUntilOff: "Běží, dokud ji nevypneš.",
    offAt: (n) => `Běží do ${n}, potom se vypne.`,
    fan: "Síla větru",
    swing: "Směr proudění",
    fanModes: { auto: "Auto", low: "Nízká", medium: "Střední", high: "Vysoká", turbo: "Turbo", quiet: "Tichá" },
    swingModes: { off: "Pevně", vertical: "Svisle", horizontal: "Vodorovně", both: "Vše" },
    detail: "Detail a historie",
    sending: "Odesílá se",
    failed: "Nepodařilo se"
  },
  who: { morning: "Ranní fáze", noon: "Polední fáze", evening: "Večerní fáze", night: "Noční fáze", vetrani: "Větrací režim", aplikace: "Aplikace", automatika: "Automatika", rucne: "Ručně" },
  notArrived: (n) => `Nedojela ${n}`,
  ventilation: "Větrání",
  ventilationMode: "Větrací režim",
  heating: "Topení",
  cooling: "Klimatizace",
  off: "Vypnuto",
  on: "Zapnuto",
  runs: (n) => `Běží ${n}`,
  unavailable: "Nedostupné",
  schedule: "Plán",
  manual: "Ručně",
  manualCount: (n) => `${n} ručně`,
  resume: "Zpět na plán",
  allOff: "Vypnout vše",
  hint: "Podrž nebo klepni dvakrát",
  mode: { cool: "Chlazení", wind_free: "WindFree", heat: "Topení", fan_only: "Větrání", dry: "Sušení", auto: "Auto" },
  failed: "Nepodařilo se"
}, hn = {
  cardDescription: "The control centre of the house: what needs you and the controls in one place.",
  title: "House",
  needsYou: "Needs you",
  nothingWaits: "Nothing is waiting for you",
  retry: "Try again",
  snooze: "Later",
  snoozeFor: { day: "A day", weekend: "To the weekend", week: "A week", month: "A month" },
  done: "Done",
  battery: (n) => n ? `Battery ${n}` : "Low battery",
  filter: (n, t) => `Clean the filter · ${n} of ${t}`,
  laundry: (n) => n ? `Laundry waiting · since ${n}` : "Laundry waiting",
  cycles: (n, t) => `${n} of ${t} cycles`,
  running: "Running now",
  nothingRuns: "Nothing is running",
  minutes: (n) => `${n} min`,
  hours: (n, t) => t ? `${n} h ${t} min` : `${n} h`,
  covers: "Blinds",
  coversDetail: "Blinds in detail",
  close: "Close",
  log: "What happened",
  logNew: (n, t) => `${n} new ${n === 1 ? "event" : "events"} since ${t}`,
  logToday: (n) => `${n} ${n === 1 ? "event" : "events"} today`,
  logNothingNew: "Nothing new",
  logSince: "Since you last looked",
  logEarlier: "Earlier today",
  logEmpty: "Nothing happened today.",
  logFailed: "The logbook could not be loaded.",
  logRuns: "Running",
  logFinished: "Finished",
  logLaundryWaits: "Laundry waiting",
  logLaundryOut: "Laundry taken out",
  climate: {
    rooms: "Rooms",
    temperature: "Target temperature",
    mode: "Mode",
    modes: { plan: "Schedule", manual: "Manual", boost: "Boost", off: "Off", cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto", sleep: "Sleep" },
    unavailable: "Unavailable",
    now: (n) => `Now ${n}`,
    heats: "heating",
    targets: (n) => `Target: ${n}`,
    mixedModes: (n) => `Different modes: ${n}`,
    firstChange: "The first change sets all selected rooms the same.",
    manualFor: "Manual holds",
    manualForChoices: { next: "Until schedule", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Always" },
    offAfter: "Turn off in",
    offAfterChoices: { 0: "Never", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Until the next change of the schedule, then back to the schedule.",
    untilTime: (n) => `Until ${n}, then back to the schedule.`,
    untilChanged: "Holds until you change it.",
    runsUntilOff: "Runs until you turn it off.",
    offAt: (n) => `Runs until ${n}, then turns off.`,
    fan: "Fan speed",
    swing: "Air direction",
    fanModes: { auto: "Auto", low: "Low", medium: "Medium", high: "High", turbo: "Turbo", quiet: "Quiet" },
    swingModes: { off: "Fixed", vertical: "Vertical", horizontal: "Horizontal", both: "Both" },
    detail: "Details and history",
    sending: "Sending",
    failed: "It did not work"
  },
  who: { morning: "Morning phase", noon: "Noon phase", evening: "Evening phase", night: "Night phase", vetrani: "Airing mode", aplikace: "App", automatika: "Automation", rucne: "By hand" },
  notArrived: (n) => `Did not arrive ${n}`,
  ventilation: "Ventilation",
  ventilationMode: "Airing mode",
  heating: "Heating",
  cooling: "Air conditioning",
  off: "Off",
  on: "On",
  runs: (n) => `Running ${n}`,
  unavailable: "Unavailable",
  schedule: "Schedule",
  manual: "Manual",
  manualCount: (n) => `${n} manual`,
  resume: "Back to schedule",
  allOff: "Turn all off",
  hint: "Hold or tap twice",
  mode: { cool: "Cooling", wind_free: "WindFree", heat: "Heating", fan_only: "Fan", dry: "Drying", auto: "Auto" },
  failed: "It did not work"
}, cn = {
  cardDescription: "Husets kontrollcenter: vad som behöver dig och styrningen på ett ställe.",
  title: "Hus",
  needsYou: "Behöver dig",
  nothingWaits: "Inget väntar på dig",
  retry: "Försök igen",
  snooze: "Senare",
  snoozeFor: { day: "En dag", weekend: "Till helgen", week: "En vecka", month: "En månad" },
  done: "Klart",
  battery: (n) => n ? `Batteri ${n}` : "Svagt batteri",
  filter: (n, t) => `Rengör filtret · ${n} av ${t}`,
  laundry: (n) => n ? `Tvätt väntar · sedan ${n}` : "Tvätt väntar",
  cycles: (n, t) => `${n} av ${t} cykler`,
  running: "Körs nu",
  nothingRuns: "Inget körs",
  minutes: (n) => `${n} min`,
  hours: (n, t) => t ? `${n} h ${t} min` : `${n} h`,
  covers: "Persienner",
  coversDetail: "Persienner i detalj",
  close: "Stäng",
  log: "Vad hände",
  logNew: (n, t) => `${n} ${n === 1 ? "ny händelse" : "nya händelser"} sedan ${t}`,
  logToday: (n) => `${n} ${n === 1 ? "händelse" : "händelser"} i dag`,
  logNothingNew: "Inget nytt",
  logSince: "Sedan du tittade senast",
  logEarlier: "Tidigare i dag",
  logEmpty: "Inget har hänt i dag.",
  logFailed: "Loggboken kunde inte läsas in.",
  logRuns: "Kör",
  logFinished: "Klar",
  logLaundryWaits: "Tvätten väntar",
  logLaundryOut: "Tvätten urtagen",
  climate: {
    rooms: "Rum",
    temperature: "Måltemperatur",
    mode: "Läge",
    modes: { plan: "Schema", manual: "Manuellt", boost: "Boost", off: "Av", cool: "Kylning", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Avfuktning", auto: "Auto", sleep: "Sömn" },
    unavailable: "Ej tillgänglig",
    now: (n) => `Nu ${n}`,
    heats: "värmer",
    targets: (n) => `Mål: ${n}`,
    mixedModes: (n) => `Olika lägen: ${n}`,
    firstChange: "Första ändringen ställer alla valda rum lika.",
    manualFor: "Manuellt gäller",
    manualForChoices: { next: "Till schemat", 30: "30 min", 60: "1 h", 180: "3 h", forever: "Alltid" },
    offAfter: "Stäng av om",
    offAfterChoices: { 0: "Aldrig", 60: "1 h", 180: "3 h", 480: "8 h" },
    untilNextPlan: "Till nästa ändring i schemat, sedan tillbaka till schemat.",
    untilTime: (n) => `Till ${n}, sedan tillbaka till schemat.`,
    untilChanged: "Gäller tills du ändrar det.",
    runsUntilOff: "Går tills du stänger av den.",
    offAt: (n) => `Går till ${n}, stängs sedan av.`,
    fan: "Fläkthastighet",
    swing: "Luftriktning",
    fanModes: { auto: "Auto", low: "Låg", medium: "Medel", high: "Hög", turbo: "Turbo", quiet: "Tyst" },
    swingModes: { off: "Fast", vertical: "Vertikalt", horizontal: "Horisontellt", both: "Båda" },
    detail: "Detaljer och historik",
    sending: "Skickar",
    failed: "Det gick inte"
  },
  who: { morning: "Morgonfas", noon: "Middagsfas", evening: "Kvällsfas", night: "Nattfas", vetrani: "Vädringsläge", aplikace: "Appen", automatika: "Automatik", rucne: "För hand" },
  notArrived: (n) => `Kom inte fram ${n}`,
  ventilation: "Ventilation",
  ventilationMode: "Vädringsläge",
  heating: "Värme",
  cooling: "Luftkonditionering",
  off: "Av",
  on: "På",
  runs: (n) => `Går ${n}`,
  unavailable: "Otillgänglig",
  schedule: "Schema",
  manual: "Manuellt",
  manualCount: (n) => `${n} manuellt`,
  resume: "Tillbaka till schemat",
  allOff: "Stäng av alla",
  hint: "Håll eller tryck två gånger",
  mode: { cool: "Kyla", wind_free: "WindFree", heat: "Värme", fan_only: "Fläkt", dry: "Torkning", auto: "Auto" },
  failed: "Det gick inte"
}, un = { cs: dn, en: hn, sv: cn };
function Fe(n, t) {
  return on(un, n, t);
}
const pn = F`
  :host {
    display: block;
    --dd-page: #000000;
    --dd-card: #1c1c1e;
    --dd-el: #2c2c2e;
    --dd-text: #ffffff;
    --dd-secondary: #98989f;
    --dd-sep: rgb(84 84 88 / 65%);
    --dd-button: rgb(118 118 128 / 24%);
    --dd-menu: #2c2c2e;
    --dd-accent: #0a84ff;
    --dd-warning: #ff9230;
    --dd-warning-bg: rgb(255 146 48 / 16%);
    --hdk-accent: var(--dd-accent);
    --hdk-secondary: var(--dd-secondary);
    --hdk-tile: var(--dd-card);
    --hdk-tile-text: var(--dd-text);
    --hdk-tile-border: var(--dd-sep);
    --hdk-tile-on: #0a6ed1;
    --hdk-tile-on-text: #ffffff;
    --hdk-tile-on-sub: #ffffff;
    --hdk-tile-on-border: transparent;
    --hdk-tile-mixed: #17395d;
    --hdk-tile-badge: rgb(255 255 255 / 16%);
    /* Slider and segmented control of the popup Topení / Klimatizace: the values of Energie (one visual language). */
    --hdk-track: #2c2c2e;
    --hdk-track-compact: #3a3a3c;
    --hdk-bar: rgb(255 255 255 / 14%);
    --hdk-tick: rgb(255 255 255 / 28%);
    --hdk-seg-thumb: #ffffff;
    --hdk-seg-text: #ebebf5;
    --hdk-seg-selected: #000000;
    --hdk-bubble: #3a3a3c;
    --hdk-bubble-text: #ffffff;
    color: var(--dd-text);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif;
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
  :host([data-light]) {
    --dd-page: #f2f2f7;
    --dd-card: #ffffff;
    --dd-el: #f2f2f7;
    --dd-text: #000000;
    --dd-secondary: #5f5f66;
    --dd-sep: rgb(60 60 67 / 29%);
    --dd-button: rgb(118 118 128 / 16%);
    --dd-menu: #ffffff;
    --dd-accent: #0a6ed1;
    --dd-warning: #8f4a12;
    --dd-warning-bg: rgb(168 82 0 / 12%);
    --hdk-tile-on: #d8e8f8;
    --hdk-tile-on-text: #000000;
    --hdk-tile-on-sub: #0a5cb0;
    --hdk-tile-on-border: #0a6ed1;
    --hdk-tile-mixed: #e6eff9;
    --hdk-tile-badge: rgb(60 60 67 / 14%);
    --hdk-track: #f2f2f7;
    --hdk-track-compact: #e5e5ea;
    --hdk-bar: rgb(60 60 67 / 18%);
    --hdk-tick: rgb(60 60 67 / 30%);
    --hdk-seg-text: #000000;
  }
  ha-card {
    padding: 4px 16px 20px;
    background: var(--dd-page);
    border: 0;
    box-shadow: none;
    color: inherit;
  }
  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    min-height: 44px;
    margin: 4px 4px 0;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    text-transform: uppercase;
  }
  .chevron {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin: 0 -10px 0 0;
    padding: 0;
    border: 0;
    border-radius: 22px;
    background: none;
    color: var(--dd-secondary);
    font: inherit;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }
  .chevron:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  dd-sheet {
    --hdk-sheet-bg: var(--dd-card);
    --hdk-sheet-text: var(--dd-text);
    --hdk-sheet-button: var(--dd-button);
    --hdk-tile: var(--dd-el);
  }
  :host([data-light]) dd-sheet {
    --hdk-sheet-button: rgb(118 118 128 / 12%);
    --hdk-sheet-backdrop: 35%;
    --hdk-sheet-border: rgb(0 0 0 / 8%);
    --hdk-sheet-grabber: rgb(60 60 67 / 30%);
  }
  /* „Co se stalo“ has no heading: the gap of a section heading keeps it apart from the tiles above. */
  .group[data-part="log"] {
    margin-top: 24px;
  }
  .link-row {
    width: 100%;
    border: 0;
    background: none;
    color: var(--dd-text);
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .link-row:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
    border-radius: 12px;
  }
  .chevron-mark {
    flex: none;
    color: var(--dd-secondary);
    font-size: 24px;
  }
  .detail h3 {
    margin: 16px 0 4px;
    color: var(--dd-secondary);
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    text-transform: uppercase;
  }
  .log-row {
    display: flex;
    gap: 12px;
    padding: 8px 0;
    border-top: 0.5px solid var(--dd-sep);
  }
  .log-time {
    flex: none;
    width: 48px;
    color: var(--dd-secondary);
    font-size: 15px;
    line-height: 22px;
  }
  .log-row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  .log-members {
    display: block;
    font-size: 15px;
    line-height: 20px;
    color: var(--dd-secondary);
  }
  .log-row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .log-empty {
    color: var(--dd-secondary);
    font-size: 15px;
  }
  .cover-row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 64px;
    padding: 8px 0;
    border-top: 0.5px solid var(--dd-sep);
  }
  .cover-row:first-child {
    border-top: 0;
  }
  .cover-row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  .cover-row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .cover-row small.warn {
    color: var(--dd-warning);
  }
  .presets {
    display: grid;
    grid-template-columns: repeat(3, 64px);
    gap: 6px;
    flex: none;
  }
  @media (max-width: 359px) {
    .presets {
      grid-template-columns: repeat(3, 52px);
      gap: 4px;
    }
  }
  .link {
    position: relative;
    min-height: 44px;
    margin: 0 -4px 0 0;
    padding: 0 4px;
    border: 0;
    background: none;
    color: var(--dd-accent);
    font: inherit;
    font-size: 15px;
    line-height: 20px;
    text-transform: none;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-touch-callout: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .link .count {
    color: var(--dd-secondary);
  }
  .link:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
    border-radius: 8px;
  }
  .group {
    border-radius: 12px;
    background: var(--dd-card);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 60px;
    box-sizing: border-box;
    padding: 8px 12px;
    border-top: 0.5px solid var(--dd-sep);
  }
  .row:first-child {
    border-top: 0;
  }
  .row .main {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    line-height: 22px;
  }
  /* A row with two buttons: they go under the text when the text would have less than about 160 px. */
  .row.two {
    flex-wrap: wrap;
    row-gap: 8px;
  }
  .row.two .main {
    flex: 1 1 160px;
  }
  /* The menu "Odložit" keeps to the right edge of the row, so it never leaves the card. */
  .actions {
    position: relative;
    display: flex;
    gap: 8px;
    margin-inline-start: auto;
  }
  .actions .snooze {
    position: static;
  }
  .row small {
    display: block;
    color: var(--dd-secondary);
    font-size: 13px;
    line-height: 18px;
  }
  .mark {
    display: grid;
    place-items: center;
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--dd-el);
    color: var(--dd-secondary);
    font-size: 17px;
    font-weight: 700;
  }
  .mark.warn {
    background: var(--dd-warning-bg);
    color: var(--dd-warning);
  }
  .mark svg {
    width: 24px;
    height: 24px;
  }
  .button {
    flex: none;
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 22px;
    background: var(--dd-button);
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    cursor: pointer;
    white-space: nowrap;
  }
  /* Sent and on its way (spec kitu, Odezva): like a tile, the fill (button) or the colour (link) goes between its
     own and the accent until Home Assistant reports the result; with reduced motion a dashed accent outline. */
  .button.pending {
    animation: dd-pending-fill 1.3s ease-in-out infinite alternate;
  }
  .button.primary.pending {
    animation-name: dd-pending-primary;
  }
  .link.pending {
    animation: dd-pending-text 1.3s ease-in-out infinite alternate;
  }
  @keyframes dd-pending-fill {
    to {
      background: var(--dd-accent);
      color: #fff;
    }
  }
  @keyframes dd-pending-primary {
    to {
      background: var(--dd-button);
      color: var(--dd-text);
    }
  }
  @keyframes dd-pending-text {
    to {
      color: var(--dd-secondary);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .button.pending,
    .link.pending {
      animation: none;
      outline: 1.5px dashed var(--dd-accent);
      outline-offset: 2px;
    }
  }
  .button.primary {
    background: #0a6ed1;
    color: #ffffff;
    font-weight: 600;
  }
  .button:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: 2px;
  }
  .snooze {
    position: relative;
    flex: none;
  }
  .menu {
    position: absolute;
    z-index: 5;
    top: calc(100% + 6px);
    right: 0;
    width: 230px;
    border-radius: 14px;
    background: var(--dd-menu);
    box-shadow: 0 8px 30px rgb(0 0 0 / 45%);
    overflow: hidden;
  }
  .menu button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 11px 16px;
    border: 0;
    border-top: 0.5px solid var(--dd-sep);
    background: none;
    color: var(--dd-text);
    font: inherit;
    font-size: 17px;
    line-height: 22px;
    text-align: start;
    cursor: pointer;
  }
  .menu button:first-child {
    border-top: 0;
  }
  .menu .until {
    color: var(--dd-secondary);
  }
  .menu button:focus-visible {
    outline: 2px solid var(--dd-accent);
    outline-offset: -2px;
  }
  .now {
    min-height: 52px;
    font-size: 15px;
    line-height: 20px;
  }
  .now.none {
    color: var(--dd-secondary);
  }
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }
  .error {
    margin: 8px 4px 0;
    color: var(--dd-warning);
    font-size: 13px;
    line-height: 18px;
  }
`, fn = ["unavailable", "unknown", ""], mn = ["opening", "closing"], gn = 2 * 6e4;
function jt(n) {
  return typeof n.when == "number" ? n.when * 1e3 : Date.parse(n.when);
}
function Se(n) {
  return n.context_name || n.context_entity_id_name || (n.context_user_id ? "app" : "");
}
function bn(n, t) {
  const e = n.filter((r) => typeof r.entity_id == "string" && r.state !== void 0).sort((r, a) => jt(r) - jt(a)), i = /* @__PURE__ */ new Map(), s = [];
  for (const r of e) {
    const a = String(r.state);
    if (mn.includes(a)) {
      const d = Se(r);
      d && i.set(r.entity_id, d);
      continue;
    }
    const l = Se(r) || i.get(r.entity_id) || "";
    i.delete(r.entity_id), !fn.includes(a) && s.push({ time: jt(r), entries: [r], state: a, reason: l, kind: t(r.entity_id) });
  }
  const o = [];
  for (const r of s) {
    const a = o.find(
      (l) => l.kind === r.kind && l.state === r.state && l.reason === r.reason && r.time - l.time <= gn && !l.entries.some((d) => d.entity_id === r.entries[0].entity_id)
    );
    a && r.kind ? (a.entries.push(r.entries[0]), a.time = r.time) : o.push(r);
  }
  return o.sort((r, a) => a.time - r.time);
}
function vn(n) {
  const t = n.map((i) => i.split(" "));
  let e = 0;
  for (; t.every((i) => i.length > e + 1 && i[e] === t[0][e]); ) e += 1;
  return t.map((i) => {
    const s = i.slice(e).join(" ");
    return s.charAt(0).toLocaleUpperCase() + s.slice(1);
  });
}
var $n = Object.defineProperty, U = (n, t, e, i) => {
  for (var s = void 0, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = r(t, e, s) || s);
  return s && $n(t, e, s), s;
};
const je = "dum-dashboard.log-seen";
function yn() {
  try {
    return Number(localStorage.getItem(je)) || 0;
  } catch {
    return 0;
  }
}
function xn(n) {
  try {
    localStorage.setItem(je, String(n));
  } catch {
  }
}
const wn = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="8" width="16" height="8" rx="2"></rect><path d="M21 11v2" stroke-linecap="round"></path><rect x="5" y="10" width="3" height="4" fill="currentColor" stroke="none"></rect></svg>`, kn = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2.5"></rect><path d="M8 8v8M12 8v8M16 8v8"></path></svg>`, _n = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5"></rect><circle cx="12" cy="13" r="4.5"></circle><path d="M7.5 6.5h2" stroke-linecap="round"></path></svg>`, Sn = h`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"></path></svg>`, re = class re extends L {
  constructor() {
    super(...arguments), this._error = "", this._now = Date.now(), this._seen = yn(), this.pending = new Gi(() => this.requestUpdate()), this._climateSelected = [], this._fit = "", this.starts = new Ki(() => this.requestUpdate()), this.gesture = new Pt(() => ({
      holdMs: this._config?.guard.holdMs ?? 550,
      doubleTapMs: this._config?.guard.doubleTapMs ?? 400
    })), this.closeMenu = (t) => {
      this._menu && (t instanceof KeyboardEvent ? t.key === "Escape" : !t.composedPath().some((e) => e instanceof Element && e.classList.contains("snooze"))) && (this._menu = void 0);
    };
  }
  setConfig(t) {
    this._config = Ji(t);
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this._now = Date.now(), 3e4), window.addEventListener("pointerdown", this.closeMenu), window.addEventListener("keydown", this.closeMenu), this.resize = new ResizeObserver(() => this._fit = `${Math.round(this.getBoundingClientRect().width)}|${this._fit.split("|")[1] ?? ""}`), this.resize.observe(this), document.fonts?.ready.then(() => this._fit = `${this._fit.split("|")[0] ?? ""}|${document.fonts.size}`), this.logTimer = window.setInterval(() => {
      this.loadLog();
    }, 5 * 6e4);
  }
  updated(t) {
    Tt(this.renderRoot, this._fit), t.has("_detail") && this._detail && this.renderRoot.querySelector("dd-sheet")?.updateComplete?.then(() => Tt(this.renderRoot, this._fit));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearInterval(this.logTimer), this.pending.clear(), window.clearTimeout(this.hintTimer), window.removeEventListener("pointerdown", this.closeMenu), window.removeEventListener("keydown", this.closeMenu), this.resize?.disconnect(), this.gesture.dispose();
  }
  willUpdate(t) {
    t.has("hass") && (this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1), this._now = Date.now(), t.get("hass") || this.loadLog(), this.pending.check(this.hass));
  }
  get i18n() {
    return Fe(Qi(this._config?.language ?? "auto", this.hass), this.hass);
  }
  name(t) {
    return Hi(t, this.i18n.language) ?? "";
  }
  render() {
    const t = this._config;
    if (!t) return m;
    const e = this.i18n, s = t.houseMode !== void 0 && z(this.hass, t.houseMode) === t.summer ? [this.renderCooling(t, e), this.renderHeating(t, e)] : [this.renderHeating(t, e), this.renderCooling(t, e)];
    return h`<ha-card>
      ${this.renderQueue(t, e)} ${this.renderRunning(t, e)} ${this.renderCovers(t, e)}
      ${this.renderVentilation(t, e)} ${s} ${this.renderLogRow(t, e)}
      ${this._error ? h`<div class="error" role="alert">${this._error}</div>` : m}
    </ha-card>
    ${this.renderCoversDetail(t, e)} ${this.renderClimate(t, e)} ${this.renderLog(t, e)}`;
  }
  /* ---------- Co se stalo ---------- */
  /** The entities the card shows or switches: what happened to them today is the journal (uživatel 13. 11. 2026: „Q212 a“). */
  logEntities(t) {
    return [
      ...t.covers.entities,
      ...t.ventilation.mode ? [t.ventilation.mode] : [],
      ...t.ventilation.fans.map((e) => e.entity),
      ...t.heating.rooms.map((e) => e.entity),
      ...t.cooling.rooms.map((e) => e.entity),
      ...t.running.map((e) => e.entity),
      ...t.laundry.map((e) => e.entity)
    ];
  }
  async loadLog() {
    const t = this._config, e = this.hass;
    if (!t || !e?.callWS) return;
    const i = this.logEntities(t);
    if (!i.length) return;
    const s = /* @__PURE__ */ new Date();
    s.setHours(0, 0, 0, 0);
    try {
      const o = await e.callWS({ type: "logbook/get_events", start_time: s.toISOString(), entity_ids: i });
      this._log = Array.isArray(o) ? o : [];
    } catch {
    }
  }
  /** Which entities are one kind: one action on several of them is one row. */
  logKind(t) {
    const e = /* @__PURE__ */ new Map();
    return t.covers.entities.forEach((i) => e.set(i, "covers")), [t.ventilation.mode, ...t.ventilation.fans.map((i) => i.entity)].forEach((i) => i && e.set(i, "ventilation")), t.heating.rooms.forEach((i) => e.set(i.entity, "heating")), t.cooling.rooms.forEach((i) => e.set(i.entity, "cooling")), (i) => e.get(i) ?? "";
  }
  /** Pračka, sušička, myčka in words („Sušička · Doběhla“), not their helpers („Sušička běží · Vypnuto“). */
  logTitle(t, e, i, s) {
    const o = s.t, r = t.running.find((l) => l.entity === e.entity_id);
    if (r) return `${this.name(r.name)} · ${i === "on" ? o.logRuns : o.logFinished}`;
    const a = t.laundry.find((l) => l.entity === e.entity_id);
    return a ? `${this.name(a.name)} · ${i === "on" ? o.logLaundryWaits : o.logLaundryOut}` : `${this.logName(e)} · ${this.logState(e, i)}`;
  }
  /**
   * The reason of a blind when the logbook has none: the helper of the last action of each blind says who sent it
   * (the same source as the detail of the blinds), when its time is just before the entry.
   */
  coverReason(t, e, i) {
    if (e.reason || e.kind !== "covers") return e.reason === "app" ? i.t.who.aplikace : e.reason;
    const s = S(this.hass, t.covers.lastAction)?.attributes.polozky, o = s && typeof s == "object" ? s[e.entries[0].entity_id] : void 0, r = typeof o?.cas == "string" ? Date.parse(o.cas) : NaN;
    return !o || typeof o.kdo != "string" || !(r <= e.time && e.time - r <= 3 * 6e4) ? "" : i.t.who[o.kdo] ?? o.kdo;
  }
  /** „Sušička - konec cyklu“ under „Sušička · Doběhla“ says the name twice: the reason without it („Konec cyklu“). */
  withoutName(t, e, i) {
    const s = e.entries[0].entity_id, o = [...i.running, ...i.laundry].find((l) => l.entity === s), r = o ? this.name(o.name) : this.logName(e.entries[0]);
    if (!t.toLocaleLowerCase().startsWith(r.toLocaleLowerCase())) return t;
    const a = t.slice(r.length).replace(/^[\s\-–—·:]+/, "");
    return a ? a.charAt(0).toLocaleUpperCase() + a.slice(1) : t;
  }
  logName(t) {
    const e = S(this.hass, t.entity_id);
    return t.name || (typeof e?.attributes.friendly_name == "string" ? e.attributes.friendly_name : t.entity_id);
  }
  logState(t, e) {
    const i = this.hass, s = S(this.hass, t.entity_id);
    return s && i?.formatEntityState ? i.formatEntityState(s, e) : e;
  }
  logRows(t) {
    return bn(this._log ?? [], this.logKind(t));
  }
  renderLogRow(t, e) {
    if (!this.logEntities(t).length) return m;
    const i = e.t, s = this.logRows(t).filter((l) => l.time > this._seen).length, o = /* @__PURE__ */ new Date();
    o.setHours(0, 0, 0, 0);
    const r = this._seen < o.getTime(), a = this._log === void 0 ? "" : s ? r ? i.logToday(s) : i.logNew(s, e.time(this._seen)) : i.logNothingNew;
    return h`<div class="group" data-part="log">
      <button class="row link-row" type="button" aria-haspopup="dialog" @click=${() => this.openLog()}>
        <span class="main">${i.log}${a ? h`<small>${a}</small>` : m}</span>
        <span class="chevron-mark" aria-hidden="true">›</span>
      </button>
    </div>`;
  }
  openLog() {
    this._detail = "log", this.loadLog();
  }
  closeLog() {
    this._detail = void 0, this._seen = Date.now(), xn(this._seen);
  }
  renderLog(t, e) {
    if (!this.logEntities(t).length) return m;
    const i = e.t, s = this._detail === "log", o = this.logRows(t), r = o.filter((g) => g.time > this._seen), a = o.filter((g) => g.time <= this._seen), l = { covers: i.covers, ventilation: i.ventilation, heating: i.heating, cooling: i.cooling }, d = (g) => g.map((c) => {
      const p = this.withoutName(this.coverReason(t, c, e), c, t), u = c.entries.length > 1, $ = u ? `${l[c.kind] ?? ""} · ${this.logState(c.entries[0], c.state)}` : this.logTitle(t, c.entries[0], c.state, e);
      return h`<div class="log-row"><span class="log-time">${e.time(c.time)}</span><span class="main"
            >${$}${u ? h`<span class="log-members">${vn(c.entries.map((b) => this.logName(b))).join(", ")}</span>` : m}${p ? h`<small>${p}</small>` : m}</span
          ></div>`;
    });
    return h`<dd-sheet .open=${s} .heading=${i.log} .closeLabel=${i.close} @hdk-close=${() => this.closeLog()}>
      ${s ? h`<div class="detail" data-part="log-detail">
            ${this._log === void 0 ? h`<p class="log-empty">${i.logFailed}</p>` : o.length ? h`${r.length ? h`<h3>${i.logSince}</h3>${d(r)}` : m}${a.length ? h`<h3>${i.logEarlier}</h3>${d(a)}` : m}` : h`<p class="log-empty">${i.logEmpty}</p>`}
          </div>` : m}
    </dd-sheet>`;
  }
  /* ---------- Potřebuje tebe ---------- */
  failed(t) {
    const e = S(this.hass, t.failedActions)?.attributes.polozky;
    return Array.isArray(e) ? e.filter((i) => typeof i == "object" && i !== null && typeof i.entita == "string") : [];
  }
  renderQueue(t, e) {
    if (!t.failedActions && !t.batteries.length && !t.filters.length && !t.laundry.length && !t.maintenance.length) return m;
    const i = e.t, s = this.failed(t), o = this.snoozed(t), r = t.batteries.filter((p) => z(this.hass, p.low) === "on" && !o.has(`battery:${p.low}`)), a = this.dirtyFilters(t).filter(({ filter: p }) => !o.has(`filter:${p.hours}`)), l = t.laundry.filter((p) => z(this.hass, p.entity) === "on"), d = t.maintenance.flatMap((p) => {
      const u = St(this.hass, p.counter);
      return u !== void 0 && u >= p.every && !o.has(`maintenance:${p.counter}`) ? [{ item: p, cycles: u }] : [];
    }), g = s.length + r.length + a.length + l.length + d.length, c = [
      ...s.map((p, u) => {
        const $ = t.covers.names[p.entita], b = S(this.hass, p.entita)?.attributes.friendly_name, N = typeof b == "string" ? b : $ !== void 0 ? this.name($) : void 0, I = p.cas ? Date.parse(p.cas) : NaN, q = p.duvod || p.akce, st = bt([q ? q.charAt(0).toLocaleUpperCase(e.language) + q.slice(1) : void 0, Number.isFinite(I) ? e.time(I) : void 0].filter(Boolean)), X = this.retryOf(t, p);
        return h`<div class="row" data-row="failed">
          <span class="mark warn" aria-hidden="true">!</span>
          <span class="main">${typeof N == "string" ? N : p.entita}<small>${st}</small></span>
          ${X ? h`<button class="button ${u === 0 ? "primary" : ""} ${this.pending.has(`retry:${p.entita}`) ? "pending" : ""}" type="button" aria-busy=${this.pending.has(`retry:${p.entita}`) ? "true" : m} @click=${X}>${i.retry}</button>` : t.clearFailed ? h`<button class="button" type="button" @click=${() => this.call("script", t.clearFailed.split(".")[1], { entita: p.entita })}>${i.done}</button>` : m}
        </div>`;
      }),
      ...r.map((p) => {
        const u = St(this.hass, p.level), $ = z(this.hass, p.type), b = bt([i.battery(u === void 0 ? void 0 : e.percent(Math.round(u))), $].filter(Boolean));
        return h`<div class="row" data-row="battery">
          <span class="mark">${wn}</span>
          <span class="main">${this.name(p.name)}<small>${b}</small></span>
          ${this.snoozeButton(t, `battery:${p.low}`, e)}
        </div>`;
      }),
      ...a.map(({ filter: p, hours: u, threshold: $ }) => {
        const b = (N) => `${e.whole(Math.floor(N))} h`;
        return h`<div class="row two" data-row="filter">
          <span class="mark">${kn}</span>
          <span class="main">${this.name(p.name)}<small>${$t(i.filter(b(u), b($)))}</small></span>
          <span class="actions">
            ${this.snoozeButton(t, `filter:${p.hours}`, e)}
            <button class="button" type="button" @click=${() => this.call("input_number", "set_value", { entity_id: p.hours, value: 0 })}>${i.done}</button>
          </span>
        </div>`;
      }),
      ...d.map(({ item: p, cycles: u }) => h`<div class="row two" data-row="maintenance">
        <span class="mark">${Sn}</span>
        <span class="main">${this.name(p.name)}<small>${bt([this.name(p.task), i.cycles(u, p.every)])}</small></span>
        <span class="actions">
          ${this.snoozeButton(t, `maintenance:${p.counter}`, e)}
          <button class="button" type="button" @click=${() => this.call("counter", "reset", { entity_id: p.counter })}>${i.done}</button>
        </span>
      </div>`),
      ...l.map((p) => {
        const u = this.starts.of(this.hass, p.entity), $ = u !== void 0 && new Date(u).toDateString() === new Date(this._now).toDateString(), b = u === void 0 ? "" : $ ? e.time(u) : e.day(u);
        return h`<div class="row" data-row="laundry">
          <span class="mark">${_n}</span>
          <span class="main">${this.name(p.name)}<small>${$t(i.laundry(b))}</small></span>
          <button class="button" type="button" @click=${() => this.call("input_boolean", "turn_off", { entity_id: p.entity })}>${i.done}</button>
        </div>`;
      })
    ];
    return h`<h2><span>${g ? `${i.needsYou} · ${g}` : i.needsYou}</span></h2>
      <div class="group" data-part="queue">
        ${c.length ? c : h`<div class="row"><span class="main">${i.nothingWaits}</span></div>`}
      </div>`;
  }
  /** Air conditioners that ran at least their threshold since the filter was cleaned; a missing value is no task. */
  dirtyFilters(t) {
    return t.filters.flatMap((e) => {
      const i = St(this.hass, e.hours), s = St(this.hass, e.threshold);
      return i !== void 0 && s !== void 0 && s > 0 && i >= s ? [{ filter: e, hours: i, threshold: s }] : [];
    });
  }
  /* ---------- Odložit ---------- */
  day(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  /** The keys of the items postponed to a later day than today. */
  snoozed(t) {
    const e = S(this.hass, t.snoozed)?.attributes.polozky, i = this.day(new Date(this._now)), s = /* @__PURE__ */ new Set();
    if (Array.isArray(e))
      for (const o of e)
        typeof o?.klic == "string" && typeof o.do == "string" && o.do > i && s.add(o.klic);
    return s;
  }
  /** "Odložit" with its menu (a day, to the weekend, a week, a month; without a time, it is no alarm). The menu only covers what is under it. */
  snoozeButton(t, e, i) {
    if (!t.snoozed || !t.snoozeScript) return m;
    const s = i.t, o = new Date(this._now), r = (p) => new Date(o.getFullYear(), o.getMonth(), o.getDate() + p), a = (6 - o.getDay() + 7) % 7 || 7, l = new Date(o.getFullYear(), o.getMonth() + 1, o.getDate()), d = [[s.snoozeFor.day, r(1)], [s.snoozeFor.weekend, r(a)], [s.snoozeFor.week, r(7)], [s.snoozeFor.month, l]], g = this._menu === e, c = (p) => {
      this._menu = void 0, this.call("script", t.snoozeScript.split(".")[1], { klic: e, do: this.day(p) });
    };
    return h`<span class="snooze">
      <button class="button" type="button" aria-haspopup="menu" aria-expanded=${g ? "true" : "false"} @click=${() => this._menu = g ? void 0 : e}>${s.snooze}</button>
      ${g ? h`<div class="menu" role="menu">
            ${d.map(([p, u]) => h`<button type="button" role="menuitem" @click=${() => c(u)}><span>${p}</span><span class="until">${i.day(u.getTime())}</span></button>`)}
          </div>` : m}
    </span>`;
  }
  /** A failed command of a blind can be sent again when the sensor kept its target. */
  retryOf(t, e) {
    const i = e.cil;
    if (!e.entita.startsWith("cover.") || !i || i.pos === void 0 || i.tilt === void 0) return;
    const s = Number(i.pos), o = Number(i.tilt);
    if (!Number.isFinite(s) || !Number.isFinite(o)) return;
    const r = { name: "", position: s, tilt: o };
    return () => this.send(
      `retry:${e.entita}`,
      { entities: [e.entita], done: () => this.coverDone(t, e.entita, r) },
      "script",
      t.covers.script.split(".")[1],
      { entity: e.entita, pos: s, tilt: o }
    );
  }
  /* ---------- Teď běží ---------- */
  duration(t, e) {
    const i = this.starts.of(this.hass, t);
    if (i === void 0) return "";
    const s = Math.max(0, Math.floor((this._now - i) / 6e4));
    return s < 60 ? e.t.minutes(s) : e.t.hours(Math.floor(s / 60), s % 60);
  }
  renderRunning(t, e) {
    if (!t.running.length) return m;
    const i = t.running.filter((o) => ["on", "cleaning", "returning"].includes(z(this.hass, o.entity) ?? "")), s = i.map((o) => `${this.name(o.name)} ${this.duration(o.entity, e)}`.trim());
    return h`<h2><span>${e.t.running}</span></h2>
      <div class="group" data-part="running"><div class="row now ${i.length ? "" : "none"}"><span class="main" style="font-size:inherit;line-height:inherit">${s.length ? bt(s) : e.t.nothingRuns}</span></div></div>`;
  }
  /* ---------- Žaluzie ---------- */
  /** Whether one blind is in the preset: undefined when it does not report its position. */
  coverIn(t, e, i) {
    const s = S(this.hass, e);
    if (!s || Mt(s.state)) return;
    const o = Number(s.attributes.current_position), r = Number(s.attributes.current_tilt_position);
    if (!(!Number.isFinite(o) || !Number.isFinite(r)))
      return Math.abs(o - i.position) <= t.covers.tolerance && Math.abs(r - i.tilt) <= t.covers.tolerance;
  }
  /** How many blinds are in the preset, and how many report their position at all. */
  inPreset(t, e) {
    let i = 0, s = 0;
    for (const o of t.covers.entities) {
      const r = this.coverIn(t, o, e);
      r !== void 0 && (s += 1, r && (i += 1));
    }
    return { count: i, known: s };
  }
  renderCovers(t, e) {
    if (!t.covers.entities.length) return m;
    const i = t.covers.presets.length - 1;
    return h`<h2>
        <span>${e.t.covers}</span>
        <button class="chevron" type="button" data-open="covers" aria-haspopup="dialog" aria-label=${e.t.coversDetail} @click=${() => this._detail = "covers"}>
          <span aria-hidden="true">›</span>
        </button>
      </h2>
      <div class="tiles" data-part="covers">
        ${t.covers.presets.map((s, o) => {
      const { count: r, known: a } = this.inPreset(t, s), l = a === t.covers.entities.length && r === a, d = l ? "on" : r > 0 ? "mixed" : "idle";
      return h`<dd-tile
            kind="action"
            centered
            guarded
            .name=${this.name(s.name)}
            .state=${d}
            .count=${r > 0 && !l ? r : void 0}
            .hint=${e.t.hint}
            .hintAlign=${o === 0 ? "start" : o === i ? "end" : "center"}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`covers:${o}`)}
            @hdk-press=${() => this.setCovers(t, s, `covers:${o}`)}
          ></dd-tile>`;
    })}
      </div>`;
  }
  /** When something happened: the time today, else the day. */
  when(t, e) {
    return new Date(t).toDateString() === new Date(this._now).toDateString() ? e.time(t) : e.day(t);
  }
  /** The last action of one blind: a failed command first (warning), else who moved it and when. */
  coverAction(t, e, i) {
    const s = i.t, o = this.failed(t).find((d) => d.entita === e);
    if (o) {
      const d = o.cas ? Date.parse(o.cas) : NaN;
      return { text: [Number.isFinite(d) ? s.notArrived(this.when(d, i)) : s.notArrived("").trim(), o.duvod].filter(Boolean).join(" · "), warn: !0 };
    }
    const r = S(this.hass, t.covers.lastAction)?.attributes.polozky, a = r && typeof r == "object" ? r[e] : void 0;
    if (!a || typeof a.kdo != "string") return;
    const l = typeof a.cas == "string" ? Date.parse(a.cas) : NaN;
    return { text: [s.who[a.kdo] ?? a.kdo, Number.isFinite(l) ? this.when(l, i) : ""].filter(Boolean).join(" "), warn: !1 };
  }
  /** Detail of the blinds: every room with its last action and the three presets just for it (one tap: the sheet was opened on purpose). */
  renderCoversDetail(t, e) {
    if (!t.covers.entities.length) return m;
    const i = e.t, s = this._detail === "covers";
    return h`<dd-sheet .open=${s} .heading=${i.covers} .closeLabel=${i.close} @hdk-close=${() => this._detail = void 0}>
      ${s ? h`<div class="detail" data-part="covers-detail">
            ${t.covers.entities.map((o) => {
      const r = S(this.hass, o), a = t.covers.names[o], l = r?.attributes.friendly_name, d = a !== void 0 ? this.name(a) : typeof l == "string" ? l : o, g = this.coverAction(t, o, e);
      return h`<div class="cover-row" data-cover=${o}>
                <span class="main">${d}${g ? h`<small class=${g.warn ? "warn" : ""}>${$t(g.text)}</small>` : m}</span>
                <span class="presets">
                  ${t.covers.presets.map(
        (c, p) => h`<dd-tile
                      kind="action"
                      centered
                      .name=${this.name(c.name)}
                      .label=${`${d}: ${this.name(c.name)}`}
                      .state=${this.coverIn(t, o, c) ? "on" : "idle"}
                      .pending=${this.pending.has(`cover:${o}:${p}`)}
                      @hdk-press=${() => this.send(`cover:${o}:${p}`, { entities: [o], done: () => this.coverDone(t, o, c) }, "script", t.covers.script.split(".")[1], {
          entity: o,
          pos: c.position,
          tilt: c.tilt
        })}
                    ></dd-tile>`
      )}
                </span>
              </div>`;
    })}
          </div>` : m}
    </dd-sheet>`;
  }
  setCovers(t, e, i) {
    const s = t.covers.script.split(".")[1];
    if (!this.pending.has(i)) {
      this.pending.start(i, this.hass, { entities: t.covers.entities, done: () => t.covers.entities.every((o) => this.coverDone(t, o, e)) });
      for (const o of t.covers.entities)
        this.call("script", s, { entity: o, pos: e.position, tilt: e.tilt }, i);
    }
  }
  /* ---------- Větrání ---------- */
  align(t) {
    return t % 3 === 0 ? "start" : t % 3 === 2 ? "end" : "center";
  }
  renderVentilation(t, e) {
    const i = e.t, s = [...t.ventilation.mode ? [{ name: i.ventilationMode, entity: t.ventilation.mode }] : [], ...t.ventilation.fans];
    return s.length ? h`<h2><span>${i.ventilation}</span></h2>
      <div class="tiles" data-part="ventilation">
        ${s.map((o, r) => {
      const a = S(this.hass, o.entity), l = !a || Mt(a.state), d = a?.state === "on";
      return h`<dd-tile
            kind="toggle"
            guarded
            data-entity=${o.entity}
            .name=${this.name(o.name)}
            .text=${l ? i.unavailable : d ? i.runs(this.duration(o.entity, e)).trim() : i.off}
            .state=${d ? "on" : "off"}
            .disabled=${l}
            .hint=${i.hint}
            .hintAlign=${this.align(r)}
            .holdMs=${t.guard.holdMs}
            .doubleTapMs=${t.guard.doubleTapMs}
            .hintSeconds=${t.guard.hintSeconds}
            .pending=${this.pending.has(`toggle:${o.entity}`)}
            @hdk-toggle=${(g) => {
        const c = g.detail.checked ? "on" : "off";
        this.send(`toggle:${o.entity}`, { entities: [o.entity], done: () => z(this.hass, o.entity) === c }, "homeassistant", g.detail.checked ? "turn_on" : "turn_off", {
          entity_id: o.entity
        });
      }}
          ></dd-tile>`;
    })}
      </div>` : m;
  }
  /* ---------- Topení a Klimatizace ---------- */
  target(t, e, i) {
    const s = Number(S(this.hass, t)?.attributes.temperature);
    return Number.isFinite(s) ? `${i ? e.half(s) : e.whole(s)}°` : "";
  }
  renderHeating(t, e) {
    if (!t.heating.rooms.length) return m;
    const i = e.t, s = t.heating.rooms.filter((o) => z(this.hass, o.entity) === "heat").length;
    return h`<h2>
        <span>${i.heating}</span>
        ${s && t.heating.resume ? this.link(
      "resume",
      h`<span class="count">${i.manualCount(s)} · </span>${i.resume}`,
      () => this.send(
        "resume",
        { entities: t.heating.rooms.map((o) => o.entity), done: () => !t.heating.rooms.some((o) => z(this.hass, o.entity) === "heat") },
        "button",
        "press",
        { entity_id: t.heating.resume }
      )
    ) : m}
      </h2>
      <div class="tiles" data-part="heating">
        ${t.heating.rooms.map((o) => {
      const r = z(this.hass, o.entity), a = r === void 0 ? i.unavailable : r === "off" ? i.off : [r === "auto" ? i.schedule : i.manual, this.target(o.entity, e, !0)].filter(Boolean).join(" · "), l = r === void 0 || r === "off" ? "off" : r === "auto" ? "idle" : "on";
      return this.openTile("heating", o, a, l, r === void 0);
    })}
      </div>`;
  }
  renderCooling(t, e) {
    if (!t.cooling.rooms.length) return m;
    const i = e.t, s = t.cooling.rooms.filter((o) => !["off", void 0].includes(z(this.hass, o.entity)));
    return h`<h2>
        <span>${i.cooling}</span>
        ${s.length ? this.link(
      "alloff",
      i.allOff,
      () => this.send(
        "alloff",
        { entities: s.map((o) => o.entity), done: () => s.every((o) => ["off", void 0].includes(z(this.hass, o.entity))) },
        "climate",
        "turn_off",
        { entity_id: s.map((o) => o.entity) }
      )
    ) : m}
      </h2>
      <div class="tiles" data-part="cooling">
        ${t.cooling.rooms.map((o) => {
      const r = z(this.hass, o.entity), a = String(S(this.hass, o.entity)?.attributes.preset_mode ?? ""), l = r === "cool" && a === "wind_free" ? "wind_free" : r === "heat_cool" ? "auto" : r ?? "", d = r === void 0 ? i.unavailable : r === "off" ? i.off : [i.mode[l] ?? i.on, r === "fan_only" ? "" : this.target(o.entity, e, !1)].filter(Boolean).join(" · ");
      return this.openTile("cooling", o, d, r === void 0 || r === "off" ? "off" : "on", r === void 0);
    })}
      </div>`;
  }
  /** A tile that opens the popup Topení / Klimatizace with its room selected: one tap, it changes nothing by itself. */
  openTile(t, e, i, s, o) {
    return h`<dd-tile
      kind="open"
      data-entity=${e.entity}
      .name=${this.name(e.name)}
      .text=${i}
      .state=${s}
      .disabled=${o}
      @hdk-open=${() => {
      this._climateSelected = [e.entity], this._detail = t;
    }}
    ></dd-tile>`;
  }
  /** The shared popup of the kit for one system (spec of the kit: in the card Dům only one system, no switch). */
  renderClimate(t, e) {
    const i = this._detail === "heating" || this._detail === "cooling" ? this._detail : void 0, s = (i ?? "heating") === "heating" ? t.heating.rooms : t.cooling.rooms;
    if (!t.heating.rooms.length && !t.cooling.rooms.length) return m;
    const o = async () => {
      await this.renderRoot.querySelector("dd-climate")?.flush(), this._detail = void 0;
    };
    return h`<dd-sheet .open=${i !== void 0} .heading=${i === "cooling" ? e.t.cooling : e.t.heating} .closeLabel=${e.t.close} @hdk-close=${o}>
      ${i ? h`<dd-climate
            .hass=${this.hass}
            .i18n=${e}
            .texts=${e.t.climate}
            .system=${i}
            .rooms=${s.map((r) => ({ name: this.name(r.name), entity: r.entity }))}
            .selected=${this._climateSelected}
            .delayMs=${t.sendDelaySeconds * 1e3}
            @hdk-select-rooms=${(r) => this._climateSelected = r.detail.selected}
            @hdk-error=${(r) => this._error = r.detail.message}
            @hdk-more-info=${async (r) => {
      await o(), this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: r.detail.entityId }, bubbles: !0, composed: !0 }));
    }}
          ></dd-climate>` : m}
    </dd-sheet>`;
  }
  /* ---------- Chráněný odkaz v nadpisu oddílu ---------- */
  link(t, e, i) {
    const s = (a) => {
      if (a.detail === 0) {
        this.gesture.cancel(), i();
        return;
      }
      const l = this.gesture.tap(t, a.timeStamp);
      l === "double" ? (this._hint = void 0, i()) : l === "single" && (this._hint = t, window.clearTimeout(this.hintTimer), this.hintTimer = window.setTimeout(() => this._hint = void 0, (this._config?.guard.hintSeconds ?? 3) * 1e3));
    }, o = (a) => {
      a.button > 0 || this.gesture.start(() => {
        this._hint = void 0, i();
      });
    }, r = () => this.gesture.release();
    return h`<button class="link ${this.pending.has(t) ? "pending" : ""}" type="button" data-link=${t} aria-busy=${this.pending.has(t) ? "true" : m} @click=${s} @pointerdown=${o} @pointerup=${r} @pointerleave=${r} @pointercancel=${r} @contextmenu=${(a) => a.preventDefault()}>
      ${e}${this._hint === t ? h`<div class="hint above end" aria-hidden="true"><i></i><span style="position: relative">${this.i18n.t.hint}</span></div>` : m}
    </button>`;
  }
  /* ---------- Volání Home Assistantu ---------- */
  call(t, e, i, s) {
    this._error = "", this.hass?.callService(t, e, i).catch((o) => {
      s && this.pending.stop(s), this._error = `${this.i18n.t.failed}: ${o instanceof Error ? o.message : String(o)}`;
    });
  }
  /** Sends and pulses the control `key` until `command` is done (or nothing changes for a while, or the call fails). */
  send(t, e, i, s, o) {
    this.pending.has(t) || (this.pending.start(t, this.hass, e), this.call(i, s, o, t));
  }
  /** A blind in a preset and still (its way is over). */
  coverDone(t, e, i) {
    const s = S(this.hass, e)?.state;
    return s === void 0 || Mt(s) || this.coverIn(t, e, i) === !0 && s !== "opening" && s !== "closing";
  }
};
re.styles = [Ot, Kt, pn];
let T = re;
U([
  f({ attribute: !1 })
], T.prototype, "hass");
U([
  _()
], T.prototype, "_config");
U([
  _()
], T.prototype, "_error");
U([
  _()
], T.prototype, "_hint");
U([
  _()
], T.prototype, "_now");
U([
  _()
], T.prototype, "_detail");
U([
  _()
], T.prototype, "_log");
U([
  _()
], T.prototype, "_seen");
U([
  _()
], T.prototype, "_climateSelected");
U([
  _()
], T.prototype, "_menu");
U([
  _()
], T.prototype, "_fit");
ji("dd");
Ei("dd");
customElements.get("ha-dum-dashboard") || customElements.define("ha-dum-dashboard", T);
window.customCards = window.customCards ?? [];
window.customCards.some((n) => n.type === "ha-dum-dashboard") || window.customCards.push({
  type: "ha-dum-dashboard",
  name: "Dům Dashboard",
  description: Fe(tn()).t.cardDescription,
  preview: !1
});
console.info("%c DUM-DASHBOARD %c 0.10.2 · 2026-11-13 21:35 UTC · po 504f4b3 ", "color:#fff;background:#0A6ED1;font-weight:700", "color:inherit");
