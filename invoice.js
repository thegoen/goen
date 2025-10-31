/*
  Script: Invoice Utils (Sablonify Edition)
  Author: Open-source (customized)
  Description:
    - Formatting ribuan (.)
    - Hitung subtotal, total (minus diskon), dan sisa pembayaran (minus DP)
    - Update judul dokumen dinamis
    - Cetak (window.print) + footer "sablonify.com"
    - Timestamp lokal Indonesia
    - Tanpa dependensi jQuery, tanpa pengecekan lisensi

  Struktur HTML yang diharapkan (contoh minimal):
    <input name="price" />
    <input name="qty" />
    <input name="discount" />
    <input name="downpayment" />
    <table>
      <tbody>
        <tr>
          <td><input name="price"></td>
          <td><input name="qty"></td>
          <td class="amount"></td>
        </tr>
      </tbody>
    </table>
    <div class="subtotal"></div>
    <div class="total"></div>
    <div class="repayment"></div>
    <div class="client-name">Nama Klien</div>
    <div class="data-id">INV-001</div>
    <div class="data-waktu"></div>
    <div class="footer"></div>
    <button id="print">Print</button>

  Catatan: aman untuk diubah sesuai kebutuhan.
*/

(function () {
  // ===== Util: Locale Indonesia =====
  const NAMA_HARI = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jum'at",
    "Sabtu",
  ];
  const NAMA_BULAN = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  function waktu(ms) {
    const d = ms ? new Date(ms) : new Date();
    const hari = NAMA_HARI[d.getDay()];
    const bulan = NAMA_BULAN[d.getMonth()];
    const tgl = d.getDate();
    const th = d.getFullYear();
    return `${hari}, ${tgl} ${bulan} ${th}`;
  }

  // ===== Util: Angka & Format =====
  function onlyDigits(str) {
    return (str || "").replace(/[^0-9]/g, "");
  }

  function formatID(num) {
    const s = String(Math.floor(Math.max(0, Number(num) || 0)));
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function parseID(formatted) {
    const clean = onlyDigits(formatted);
    return Number(clean || 0);
  }

  // ===== DOM Helpers =====
  function q(sel, root) {
    return (root || document).querySelector(sel);
  }
  function qa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  // ===== Perhitungan =====
  function recalc() {
    const rows = qa("table tbody tr");
    let subtotal = 0;

    rows.forEach((tr) => {
      const priceInput = q('[name="price"]', tr);
      const qtyInput = q('[name="qty"]', tr);
      const amountCell = q(".amount", tr);

      const price = parseID(priceInput && priceInput.value);
      const qty = parseID(qtyInput && qtyInput.value);

      const amount = price * qty;
      if (amountCell) amountCell.textContent = amount > 0 ? formatID(amount) : "";
      subtotal += amount;
    });

    const discount = parseID(q('[name="discount"]').value);
    const downpayment = parseID(q('[name="downpayment"]').value);

    const total = Math.max(0, subtotal - discount);
    const repayment = Math.max(0, total - downpayment);

    const subtotalEl = q(".subtotal");
    const totalEl = q(".total");
    const repaymentEl = q(".repayment");

    if (subtotalEl) subtotalEl.textContent = formatID(subtotal);
    if (totalEl) totalEl.textContent = formatID(total);
    if (repaymentEl) repaymentEl.textContent = formatID(repayment);
  }

  // ===== Input formatting (ribuan saat mengetik) =====
  function attachMoneyMask(input) {
    if (!input) return;
    input.addEventListener("input", () => {
      const caretEnd = input.selectionEnd;
      const oldLen = input.value.length;

      const n = parseID(input.value);
      input.value = n ? formatID(n) : "";

      const newLen = input.value.length;
      const delta = newLen - oldLen;
      input.setSelectionRange(Math.max(0, (caretEnd || newLen) + delta), Math.max(0, (caretEnd || newLen) + delta));
    });

    input.addEventListener("focus", () => input.select());
    input.addEventListener("change", recalc);
  }

  // ===== Inisialisasi =====
  function init() {
    const baseTitle = document.title || "Invoice";
    const clientName = (q(".client-name")?.textContent || "").trim();
    const year = new Date().getFullYear();
    document.title = clientName ? `${baseTitle} - ${clientName} - ${year}` : `${baseTitle} - ${year}`;

    const waktuEl = q(".data-waktu");
    if (waktuEl) waktuEl.textContent = waktu(Date.now());

    qa('input[name="price"], input[name="qty"], input[name="discount"], input[name="downpayment"]').forEach(attachMoneyMask);

    recalc();

    const tbody = q("table tbody");
    if (tbody) {
      tbody.addEventListener("input", (e) => {
        const t = e.target;
        if (t && (t.matches('[name="price"]') || t.matches('[name="qty"]'))) recalc();
      });
      tbody.addEventListener("change", recalc);
    }

    const btnPrint = q("#print");
    if (btnPrint) {
      btnPrint.addEventListener("click", (ev) => {
        ev.preventDefault();
        // Tambahkan footer "sablonify.com" sebelum print
        const footer = q(".footer");
        if (footer) footer.textContent = "sablonify.com";
        window.print();
      });
    }

    if (typeof window.custom_js === "function") {
      try { window.custom_js(); } catch (e) { console.warn("custom_js error:", e); }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.InvoiceUtils = {
    waktu,
    formatID,
    parseID,
    recalc,
  };
})();

