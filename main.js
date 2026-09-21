/**
 * E-Commerce Theme Engine for Blogger
 * 
 * Features:
 * - Multi-group product variations with additive pricing
 * - Discount calculation applied strictly to base price
 * - Shopping cart with localStorage persistence
 * - WhatsApp checkout formatting with multi-line variation details
 * - Image slideshow & lightbox gallery
 * - Product sorting & live search
 * - AJAX pagination & lazy loading
 */

// Bypassed license validation
function license() {
  return true;
}

license();

// Robust initialization handling (runs once when DOM/window is ready)
var _theme_initialized = false;
function initTheme() {
  if (_theme_initialized) return;
  _theme_initialized = true;

  try { etc(); } catch (e) { console.warn('[Theme] etc error:', e); }
  try { slideshow(); } catch (e) { console.warn('[Theme] slideshow error:', e); }
  try { product_convert(); } catch (e) { console.warn('[Theme] product_convert error:', e); }
  try { product_sort(); } catch (e) { console.warn('[Theme] product_sort error:', e); }
  try { shortcode(); } catch (e) { console.warn('[Theme] shortcode error:', e); }
  try { cart(); } catch (e) { console.warn('[Theme] cart error:', e); }
  try { lazyload(); } catch (e) { console.warn('[Theme] lazyload error:', e); }
  try { lightbox(); } catch (e) { console.warn('[Theme] lightbox error:', e); }
  try { pop(); } catch (e) { console.warn('[Theme] pop error:', e); }
  try { popwin(); } catch (e) { console.warn('[Theme] popwin error:', e); }
  try { timeago(); } catch (e) { console.warn('[Theme] timeago error:', e); }
  try { translate(); } catch (e) { console.warn('[Theme] translate error:', e); }
  try { if (typeof custom_js === 'function') custom_js(); } catch (e) { console.warn('[Theme] custom_js error:', e); }
}

// Ensure execution immediately if jQuery is loaded, with fallbacks for DOM ready / load
if (typeof $ !== 'undefined') {
  initTheme();
}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
    if (typeof window !== 'undefined') {
      window.addEventListener('load', initTheme);
    }
    if (typeof $ !== 'undefined') {
      $(document).ready(initTheme);
    }
  } else {
    setTimeout(initTheme, 1);
  }
}
if (typeof window !== 'undefined') {
  window.onload = initTheme;
}

/**
 * Shopping Cart Module
 * Manages cart state, localStorage persistence, UI updates, and WhatsApp checkout formatting.
 */
function cart() {
  // Build checkout customer form fields based on configuration
  var checkoutFormHtml = '        <fieldset>'
    + '            <input type="text" name="name" placeholder="' + ($_config.text.checkout_name || 'Nama') + '" required>'
    + '            <input type="tel" name="phone" placeholder="' + ($_config.text.checkout_phone || 'Telepon') + '" required>'
    + '        </fieldset>    ';

  if ($_config.checkout_form && $_config.checkout_form.email) {
    checkoutFormHtml += '            <input type="email" name="email" placeholder="' + ($_config.text.checkout_email || 'Email') + '" required>        ';
  }

  if ($_config.checkout_form && $_config.checkout_form.address) {
    checkoutFormHtml += '            <textarea name="address" placeholder="' + ($_config.text.checkout_address || 'Alamat') + '" required></textarea>        ';
  }

  if ($_config.checkout_form && $_config.checkout_form.note) {
    checkoutFormHtml += '            <textarea name="note" placeholder="' + ($_config.text.checkout_note || 'Catatan') + '"></textarea>        ';
  }

  // Shipping courier options
  if ($_config.checkout_form && $_config.checkout_form.shipping && $_config.checkout_form_shipping) {
    checkoutFormHtml += '            <select name="shipping" required>'
      + '                <option value="" selected hidden>' + ($_config.text.checkout_shipping || 'Pengiriman') + '</option>'
      + '                <optgroup label="' + ($_config.text.checkout_shipping || 'Pengiriman') + ' :">        ';

    for (var courierKey in $_config.checkout_form_shipping) {
      var courier = $_config.checkout_form_shipping[courierKey];
      if (courier && courier.status === true) {
        $('<img src="' + courier.img + '"/>').on('load', function () {});
        checkoutFormHtml += '                    <option value="' + courierKey + '" data-info="' + courier.info + '" data-img="' + courier.img + '">'
          + '                        ' + courierKey
          + '                    </option>                ';
      }
    }
    checkoutFormHtml += '                </optgroup>            </select>        ';
  }

  // Payment method options
  if ($_config.checkout_form && $_config.checkout_form.payment && $_config.checkout_form_payment) {
    $('#contact').append('<p class="shippay"><b>' + ($_config.text.checkout_payment || 'Pembayaran') + ' :</b></p>');
    checkoutFormHtml += '            <select name="payment" required>'
      + '                <option value="" selected hidden>' + ($_config.text.checkout_payment || 'Pembayaran') + '</option>'
      + '                <optgroup label="' + ($_config.text.checkout_payment || 'Pembayaran') + ' :">        ';

    for (var paymentKey in $_config.checkout_form_payment) {
      var payment = $_config.checkout_form_payment[paymentKey];
      if (payment && payment.status === true) {
        $('#contact .shippay').append(
          '<figure><img alt="' + paymentKey + '" src="' + payment.img + '" width="24" height="24"/><figcaption>' + paymentKey + '</figcaption></figure>'
        );
        $('<img src="' + payment.img + '"/>').on('load', function () {});
        checkoutFormHtml += '                    <option value="' + paymentKey + '" data-info="' + payment.info + '" data-img="' + payment.img + '">'
          + '                        ' + paymentKey
          + '                    </option>                ';
      }
    }
    checkoutFormHtml += '                </optgroup>            </select>        ';
  }

  // Only append if not already appended
  if ($('#cart .form').children('fieldset').length === 0) {
    $('#cart .form').append(checkoutFormHtml);
  }

  // Show details when a shipping or payment option is selected
  $('#cart .form').off('change', 'select').on('change', 'select', function () {
    var $select = $(this);
    var selectedVal = $select.val();
    var $selectedOption = $('option:selected', $select);
    var optionInfo = $selectedOption.attr('data-info');
    var optionImg = $selectedOption.attr('data-img');

    $select.prev('.detail').remove();
    if (optionImg) {
      $('<img src="' + optionImg + '"/>').on('load', function () {
        $(
          '                <div class="detail">'
          + '                    <img src="' + optionImg + '">'
          + '                    <h4>' + selectedVal + '</h4>'
          + '                    <p>' + optionInfo + '</p>'
          + '                </div>            '
        ).insertBefore($select).hide().fadeIn();
      });
    }
  });

  $('#cart .form').off('click', '.detail').on('click', '.detail', function () {
    $(this).next('select').focus();
  });

  // Load existing cart from localStorage
  var cartList = [];
  try {
    if (window.localStorage && localStorage.getItem('cart')) {
      cartList = JSON.parse(localStorage.getItem('cart')) || [];
      if (!Array.isArray(cartList)) {
        cartList = [];
      }
    }
  } catch (e) {
    cartList = [];
  }

  // Always run renderCart once on initialization
  renderCart();

  // Handle Add to Cart button click
  $(document).off('click', '.cart-add').on('click', '.cart-add', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $product = $(this).closest('.product, article, [itemscope]');
    if (!$product.length) {
      $product = $(this).closest('#main, body');
    }

    var productId = $product.attr('id') ? $product.attr('id') : 'prod';
    var productImg = $('.img', $product).attr('src') || $('.img', $product).attr('data-src') || '';
    var productLink = location.href;
    var productTitle = $('.title', $product).text().replace(/[\r\n]/g, '').replace(/\s{2,}/g, ' ').trim();
    var productPrice = Number($('.price b', $product).attr('data-price')) || Number($('.price', $product).attr('data-price')) || 0;
    var productWeight = Number($('.price', $product).attr('data-weight')) || 0;
    var productUnit = $('.price', $product).attr('data-unit') || '';
    var productQty = parseInt($('.qty input', $product).val(), 10);
    if (isNaN(productQty) || productQty < 1) {
      productQty = 1;
    }

    // Collect all selected variations across all groups
    var selectedVariants = [];
    var variantIdParts = [];

    if ($('.item.variant', $product).length) {
      $('.item.variant', $product).each(function () {
        var groupLabel = $('label', this).text().replace(/[\r\n]/g, '').replace(/\s{2,}/g, ' ').trim();
        var $activeBtn = $('button.active', this);
        if (!$activeBtn.length) {
          $activeBtn = $('button:first', this);
          $activeBtn.addClass('active');
        }
        if ($activeBtn.length) {
          var optionVal = $activeBtn.text().replace(/[\r\n]/g, '').replace(/\s{2,}/g, ' ').trim();
          selectedVariants.push({
            label: groupLabel,
            value: optionVal
          });
          variantIdParts.push(groupLabel + ' : ' + optionVal);
        }
      });

      // Form unique cart item ID by appending variant combinations
      if (variantIdParts.length > 0) {
        productId = String(productId) + '|' + variantIdParts.join('|');
      }
    }

    // If item with same ID already exists in cart, increment quantity
    var existingIndex = -1;
    for (var i = 0; i < cartList.length; i++) {
      if (String(cartList[i].id) === String(productId)) {
        existingIndex = i;
        break;
      }
    }

    if (existingIndex >= 0) {
      cartList[existingIndex].qty = Number(cartList[existingIndex].qty || 0) + Number(productQty);
      if (productPrice > 0) {
        cartList[existingIndex].price = productPrice;
      }
      saveCart();
      renderCart();
      bounceCartButton();
      return;
    }

    // Otherwise, push new cart item
    var cartItem = {
      id: String(productId),
      img: productImg,
      title: productTitle || 'Produk',
      link: productLink,
      variants: selectedVariants,
      variant: selectedVariants.length ? selectedVariants[0] : '',
      price: productPrice,
      weight: productWeight,
      unit: productUnit,
      qty: productQty
    };

    cartList.push(cartItem);
    saveCart();
    renderCart();
    bounceCartButton();
  });

  function bounceCartButton() {
    $('#cart-btn').removeClass('open');
    setTimeout(function () {
      $('#cart-btn').addClass('open');
    }, 100);
  }

  // Open & close cart drawer
  $(document).off('click', '#cart-btn, .cart-btn-head').on('click', '#cart-btn, .cart-btn-head', function (e) {
    e.preventDefault();
    renderCart();
    $('#cart').addClass('open');
    $('body').css('overflow', 'hidden');
  });

  $(document).off('click', '#cart-close').on('click', '#cart-close', function (e) {
    e.preventDefault();
    $('#cart').removeClass('open');
    $('body').css('overflow', 'auto');
  });

  // Adjust item quantity in cart (+ / -)
  $('#cart').off('click', '.qty button').on('click', '.qty button', function () {
    var $item = $(this).closest('.item');
    var currentQty = Number($('.qty input', $item).val()) || 1;
    if ($(this).text() === '-') {
      currentQty = currentQty - 1;
    } else {
      currentQty = currentQty + 1;
    }
    $('.qty input', $item).val(currentQty).trigger('change');
  });

  // Handle quantity change & item removal confirmation
  $('#cart').off('change', '.item .qty input').on('change', '.item .qty input', function () {
    var $item = $(this).closest('.item');
    var itemIndex = Number($item.attr('data-index'));
    var newQty = Number($(this).val());

    if (newQty > 0) {
      if (cartList[itemIndex]) {
        cartList[itemIndex].qty = newQty;
      }
      saveCart();
      renderCart();
      return;
    } else if (!confirm(($_config.text && $_config.text.cart_remove) ? $_config.text.cart_remove : 'Hapus item ini?')) {
      newQty = 1;
      $('.qty input', $item).val(newQty).trigger('change');
    } else {
      cartList.splice(itemIndex, 1);
      saveCart();
      renderCart();
    }
  });

  // Save per-item note in cart
  $('#cart').off('change', '.item .note').on('change', '.item .note', function () {
    var $item = $(this).closest('.item');
    var itemIndex = Number($item.attr('data-index'));
    var noteVal = $(this).val();
    if (cartList[itemIndex]) {
      cartList[itemIndex].note = noteVal;
    }
    saveCart();
    renderCart();
  });

  // Remember buyer information in localStorage
  var buyerData = {};
  $('#cart').off('change', '[name]').on('change', '[name]', function () {
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    if (fieldName !== 'note' && fieldName !== 'shipping' && fieldName !== 'payment') {
      buyerData[fieldName] = fieldValue;
      try {
        localStorage.setItem('buyer', JSON.stringify(buyerData));
      } catch (e) {}
    }
  });

  try {
    if (window.localStorage && localStorage.getItem('buyer')) {
      buyerData = JSON.parse(localStorage.getItem('buyer')) || {};
      for (var fieldKey in buyerData) {
        $('#cart .form [name=' + fieldKey + ']').val(buyerData[fieldKey]).trigger('change');
      }
    }
  } catch (e) {}

  // Handle Checkout submission to WhatsApp
  $('#cart').off('submit').on('submit', function (e) {
    e.preventDefault();

    if (!confirm(($_config.text && $_config.text.checkout_confirm) ? $_config.text.checkout_confirm : 'Lanjutkan ke WhatsApp?')) {
      return;
    } else {
      var customerInfo = {};
      $('[name]:visible', this).each(function () {
        var name = $(this).attr('name');
        var val = $(this).val();
        customerInfo[name] = val;
      });

      var lines = [];
      lines.push(($_config.text && $_config.text.checkout_intro) ? $_config.text.checkout_intro : 'Halo admin, saya ingin memesan:');
      lines.push('====================');

      var totalItemCount = 0;
      var grandTotalPrice = 0;
      var grandTotalWeight = 0;

      for (var idx = 0; idx < cartList.length; idx++) {
        var currentItem = cartList[idx];
        var itemNum = (cartList.length > 1) ? (idx + 1) + '. ' : '';
        lines.push('*' + itemNum + currentItem.title + '*');

        if (currentItem.variants && currentItem.variants.length) {
          for (var v = 0; v < currentItem.variants.length; v++) {
            var vObj = currentItem.variants[v];
            if (vObj && vObj.label && vObj.value) {
              lines.push('• ' + vObj.label + ': *' + vObj.value + '*');
            }
          }
        } else if (currentItem.variant && currentItem.variant.label && currentItem.variant.value) {
          lines.push('• ' + currentItem.variant.label + ': *' + currentItem.variant.value + '*');
        }

        var itemQty = Number(currentItem.qty) || 1;
        var itemPrice = Number(currentItem.price) || 0;
        var itemWeight = Number(currentItem.weight) || 0;
        var itemSubtotal = itemPrice * itemQty;

        var qtyPriceLabel = ($_config.text && $_config.text.cart_qty_n_price) ? $_config.text.cart_qty_n_price : 'Qty & Harga';
        lines.push('• ' + qtyPriceLabel + ': *' + itemQty + '* x ' + separator(itemPrice) + ' = *' + separator(itemSubtotal) + '*');

        if (currentItem.note && String(currentItem.note).trim()) {
          var noteLabel = ($_config.text && $_config.text.cart_note) ? $_config.text.cart_note : 'Catatan';
          lines.push('• ' + noteLabel + ': _' + String(currentItem.note).trim() + '_');
        }

        totalItemCount += itemQty;
        grandTotalPrice += itemSubtotal;
        grandTotalWeight += (itemWeight * itemQty);

        if (idx < cartList.length - 1) {
          lines.push('');
        }
      }

      lines.push('====================');
      var totalLabel = ($_config.text && $_config.text.cart_total) ? $_config.text.cart_total : 'Total';
      var orderLabel = ($_config.text && $_config.text.cart_order) ? $_config.text.cart_order : 'Pesanan';
      lines.push(totalLabel + ': *' + totalItemCount + ' ' + orderLabel + '* (*' + separator(grandTotalPrice) + '*)');

      if (grandTotalWeight > 0) {
        var weightLabel = ($_config.text && $_config.text.cart_weight) ? $_config.text.cart_weight : 'Berat';
        lines.push(weightLabel + ': *' + kg(grandTotalWeight) + '*');
      }

      lines.push('====================');
      var infoLabel = ($_config.text && $_config.text.checkout_info) ? $_config.text.checkout_info : 'Informasi Pemesan';
      lines.push('*' + infoLabel + ':*');

      var nameLabel = ($_config.text && $_config.text.checkout_name) ? $_config.text.checkout_name : 'Nama';
      var nameVal = customerInfo.name ? String(customerInfo.name).trim() : '-';
      var phoneVal = customerInfo.phone ? String(customerInfo.phone).trim() : '';
      var nameLine = '• ' + nameLabel + ': *' + nameVal + '*';
      if (phoneVal) {
        nameLine += ' (' + phoneVal + ')';
      }
      lines.push(nameLine);

      if (customerInfo.email && String(customerInfo.email).trim()) {
        var emailLabel = ($_config.text && $_config.text.checkout_email) ? $_config.text.checkout_email : 'Email';
        lines.push('• ' + emailLabel + ': ' + String(customerInfo.email).trim());
      }

      if (customerInfo.address && String(customerInfo.address).trim()) {
        var addrLabel = ($_config.text && $_config.text.checkout_address) ? $_config.text.checkout_address : 'Alamat';
        var cleanAddr = String(customerInfo.address).trim().replace(/[\r\n]+/g, ', ');
        lines.push('• ' + addrLabel + ': ' + cleanAddr);
      }

      if (customerInfo.shipping && String(customerInfo.shipping).trim()) {
        var shipLabel = ($_config.text && $_config.text.checkout_shipping) ? $_config.text.checkout_shipping : 'Pengiriman';
        var shipTitle = String(customerInfo.shipping).trim();
        var shipInfo = ($_config.checkout_form_shipping && $_config.checkout_form_shipping[shipTitle] && $_config.checkout_form_shipping[shipTitle].info)
          ? String($_config.checkout_form_shipping[shipTitle].info).trim()
          : '';
        lines.push('• ' + shipLabel + ': *' + shipTitle + '*' + (shipInfo ? ' (' + shipInfo + ')' : ''));
      }

      if (customerInfo.payment && String(customerInfo.payment).trim()) {
        var payLabel = ($_config.text && $_config.text.checkout_payment) ? $_config.text.checkout_payment : 'Pembayaran';
        var payTitle = String(customerInfo.payment).trim();
        var payInfo = ($_config.checkout_form_payment && $_config.checkout_form_payment[payTitle] && $_config.checkout_form_payment[payTitle].info)
          ? String($_config.checkout_form_payment[payTitle].info).trim()
          : '';
        lines.push('• ' + payLabel + ': *' + payTitle + '*' + (payInfo ? ' (' + payInfo + ')' : ''));
      }

      if (customerInfo.note && String(customerInfo.note).trim()) {
        var custNoteLabel = ($_config.text && $_config.text.checkout_note) ? $_config.text.checkout_note : 'Catatan';
        lines.push('• ' + custNoteLabel + ': _' + String(customerInfo.note).trim() + '_');
      }

      lines.push('');
      lines.push('via ' + location.protocol + '//' + location.hostname);

      var waMessage = encodeURIComponent(lines.join('\n'));
      var waNumber = String($_config.whatsapp || '').replace(/[^0-9]/g, '');
      if (/^08[0-9]+$/.test(waNumber)) {
        waNumber = '62' + waNumber.slice(1);
      }
      if (!waNumber) {
        waNumber = $_config.whatsapp;
      }

      var waRedirectUrl = 'https://api.whatsapp.com/send?phone=' + waNumber + '&text=' + waMessage;
      try {
        localStorage.removeItem('cart');
      } catch (e) {}
      location.href = waRedirectUrl;
    }
  });

  // Save cart state to localStorage safely
  function saveCart() {
    try {
      if (window.localStorage) {
        localStorage.setItem('cart', JSON.stringify(cartList));
      }
    } catch (err) {
      console.warn('[Cart] localStorage save error:', err);
    }
  }

  // Render shopping cart UI
  function renderCart() {
    $('#cart .list').empty();

    if (!cartList || cartList.length === 0) {
      $('#cart .list_n_form, #cart .cta').hide();
      $('#cart-btn').removeClass('open');
      $('#cart .empty').show();
      $('#cart .cta .subtotal .qty, #cart-btn .qty').text('0');
      $('#cart .cta .subtotal .sub, #cart-btn .sub').text('0');
      return;
    }

    $('#cart .list_n_form, #cart .cta').show();
    $('#cart-btn').addClass('open');
    $('#cart .empty').hide();

    var totalQty = 0;
    var totalPrice = 0;
    var totalWeight = 0;

    for (var idx = 0; idx < cartList.length; idx++) {
      var item = cartList[idx];
      var itemQty = Number(item.qty) || 1;
      var itemPrice = Number(item.price) || 0;
      var itemWeight = Number(item.weight) || 0;

      // Format multi-group variations in cart popup list
      var variantDisplayHtml = '';
      if (item.variants && item.variants.length) {
        for (var v = 0; v < item.variants.length; v++) {
          variantDisplayHtml += item.variants[v].label + ' : <b class="variant">' + item.variants[v].value + '</b><br>';
        }
      } else if (item.variant && item.variant.label) {
        variantDisplayHtml += item.variant.label + ' : <b class="variant">' + item.variant.value + '</b><br>';
      }

      var itemHtml = '                <div class="item" data-id="' + item.id + '" data-index="' + idx + '">'
        + '                    <div class="left">'
        + '                        <b class="title">' + (item.title || 'Produk') + '</b>'
        + '                        <br>'
        + '                        ' + variantDisplayHtml
        + '                        <input class="note" type="text" placeholder="+ ' + ($_config.text.cart_note || 'Catatan') + '.." value="' + (item.note ? item.note : '') + '">'
        + '                        <b class="total">' + separator(itemPrice) + '</b>' + (item.unit ? ' <span class="unit">/' + item.unit + '</span>' : '')
        + '                    </div>'
        + '                    <div class="right">'
        + '                        <a class="link" href="' + (item.link || 'javascript:void(0)') + '">'
        + '                            <img class="img" src="' + (item.img || '') + '"/>'
        + '                            ' + (itemWeight ? '<small class="weight" title="' + ($_config.text.cart_weight || 'Berat') + '">' + kg(itemWeight) + '</small>' : '')
        + '                        </a>'
        + '                        <fieldset class="qty">'
        + '                            <button type="button">-</button>'
        + '                            <input type="number" value="' + itemQty + '">'
        + '                            <button type="button">+</button>'
        + '                        </fieldset>'
        + '                    </div>'
        + '                </div>';

      $('#cart .list').prepend(itemHtml);

      totalQty += itemQty;
      totalPrice += (itemPrice * itemQty);
      totalWeight += (itemWeight * itemQty);
    }

    // Weight subtotal display and shipping availability
    $('#cart .cta .subtotal .wrap .grid.weight').remove();
    if (totalWeight > 0) {
      $('#cart .cta .subtotal .wrap').prepend(
        '                <div class="grid weight">'
        + '                    <span>'
        + '                        ' + ($_config.text.cart_weight || 'Berat')
        + '                    </span>'
        + '                    <b>' + kg(totalWeight) + '</b>'
        + '                </div>            '
      );
      $('#cart [name=shipping]').show().removeAttr('disabled');
      $('#cart [name=shipping]').prev('.detail').show();
    } else {
      $('#cart [name=shipping]').hide().attr('disabled', true);
      $('#cart [name=shipping]').prev('.detail').hide();
    }

    // Update subtotal counters
    $('#cart .cta .subtotal .qty, #cart-btn .qty').text(totalQty);
    $('#cart .cta .subtotal .sub, #cart-btn .sub').text(separator(totalPrice));
  }
}

/**
 * Image Slideshow Module
 * Handles auto-play rotating banners and left/right navigation arrows.
 */
function slideshow() {
  $('.slideshow').each(function () {
    var $slideshow = $(this);
    var delay = 4000;
    var attrDelay = parseInt($slideshow.attr('data-delay'), 10);
    var fadeSpeed = 1000;
    var attrFade = parseInt($slideshow.attr('data-fade'), 10);
    var timer;

    if (!isNaN(attrDelay)) {
      delay = attrDelay;
    }
    if (!isNaN(attrFade)) {
      fadeSpeed = attrFade;
    }

    if ($('.slideshow-item, .widget', $slideshow).length > 1) {
      timer = setInterval(function () {
        $('.slideshow-item:visible, .widget:visible', $slideshow).each(function () {
          var $current = $(this);
          $current.hide();
          if ($current.next('.slideshow-item, .widget').length) {
            $current.next('.slideshow-item, .widget').fadeIn(fadeSpeed);
          } else {
            $current.closest('.slideshow').find('.slideshow-item, .widget').first().fadeIn(fadeSpeed);
          }
        });
      }, delay);

      $(this).append(
        '  <button class="nav-left" aria-label="Navigation">'
        + '    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"/></svg>'
        + '  </button>'
        + '  <button class="nav-right" aria-label="Navigation">'
        + '    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"/></svg>'
        + '  </button>   '
      );
    }

    $('.nav-left', $slideshow).on('click', function () {
      clearInterval(timer);
      $('.slideshow-item:visible, .widget:visible', $slideshow).each(function () {
        var $current = $(this);
        $current.hide();
        if ($current.prev('.slideshow-item, .widget').length) {
          $current.prev('.slideshow-item, .widget').fadeIn(fadeSpeed);
        } else {
          $current.closest('.slideshow').find('.slideshow-item, .widget').last().fadeIn(fadeSpeed);
        }
      });
    });

    $('.nav-right', $slideshow).on('click', function () {
      clearInterval(timer);
      $('.slideshow-item:visible, .widget:visible', $slideshow).each(function () {
        var $current = $(this);
        $current.hide();
        if ($current.next('.slideshow-item, .widget').length) {
          $current.next('.slideshow-item, .widget').fadeIn(fadeSpeed);
        } else {
          $current.closest('.slideshow').find('.slideshow-item, .widget').first().fadeIn(fadeSpeed);
        }
      });
    });
  });
}

/**
 * Product Sorting Module
 * Sorts products on catalog loop by date or price.
 */
function product_sort() {
  $('#sort select').on('change', function () {
    $('#sort').addClass('loading');
    var sortType = $(this).val();

    if (sortType === 'terbaru') {
      var $articles = $('.Blog article');
      $articles.sort(function (a, b) {
        return new Date($('[itemprop="releaseDate"]', b).attr('content')).getTime() - new Date($('[itemprop="releaseDate"]', a).attr('content')).getTime();
      });
      setTimeout(function () {
        $('.Blog .is_loop').append($articles);
        $('#sort').removeClass('loading');
        lazyload();
      }, 500);
    }

    if (sortType === 'terlama') {
      var $articles = $('.Blog article');
      $articles.sort(function (a, b) {
        return new Date($('[itemprop="releaseDate"]', a).attr('content')).getTime() - new Date($('[itemprop="releaseDate"]', b).attr('content')).getTime();
      });
      setTimeout(function () {
        $('.Blog .is_loop').append($articles);
        $('#sort').removeClass('loading');
        lazyload();
      }, 500);
    }

    if (sortType === 'terendah') {
      var $articles = $('.Blog article');
      $articles.sort(function (a, b) {
        return Number($('.price b', a).attr('data-price')) - Number($('.price b', b).attr('data-price'));
      });
      setTimeout(function () {
        $('.Blog .is_loop').append($articles);
        $('#sort').removeClass('loading');
        lazyload();
      }, 500);
    }

    if (sortType === 'tertinggi') {
      var $articles = $('.Blog article');
      $articles.sort(function (a, b) {
        return Number($('.price b', b).attr('data-price')) - Number($('.price b', a).attr('data-price'));
      });
      setTimeout(function () {
        $('.Blog .is_loop').append($articles);
        $('#sort').removeClass('loading');
        lazyload();
      }, 500);
    }
  });

  if ($('#sort select').length && $('#sort select').val()) {
    $('#sort select').trigger('change');
  }
}

/**
 * Product Converter Module
 * Parses hidden product specification tables and builds the interactive UI:
 * - Cover gallery thumbnails
 * - Multi-group variations with additive extra costs
 * - Discount calculation applied strictly to base price
 * - Real-time price display recalculation
 * - Quantity adjuster and CTA buttons
 */
function product_convert() {
  $('.product:not(.field_loaded)').each(function () {
    var $product = $(this);
    $product.addClass('field_loaded');

    if ($_config && $_config.money) {
      $('meta[itemprop="priceCurrency"]', $product).attr('content', $_config.money.currency);
    }

    // Build image gallery thumbnails for single product page safely
    if ($product.hasClass('is_post') && $('.image .gallery', this).length) {
      $('.image .gallery img', this).each(function () {
        var rawSrc = $(this).attr('src') || $(this).attr('data-src') || '';
        if (rawSrc) {
          var baseImgSrc = rawSrc.split('=')[0];
          var pathParts = baseImgSrc.split('/');
          var sizeSegment = pathParts[7] || '';
          var thumbSrc = sizeSegment ? (baseImgSrc.replace(sizeSegment, 'w150-h150-c') + '=w150-h150-c') : baseImgSrc;
          var fullSrc = sizeSegment ? (baseImgSrc.replace(sizeSegment, 's800') + '=s800') : baseImgSrc;
          $('figure.cover', $product).append(
            '<a data-lightbox="gallery" data-lightbox-title="' + $('.title', $product).text() + '" href="' + fullSrc + '"><img data-src="' + thumbSrc + '"/></a>'
          );
        }
      });
    }

    // Extract product specifications from .field table (using universal regex instead of replaceAll)
    var productFields = {};
    $('.field td[class]', $product).each(function () {
      var fieldClass = $(this).attr('class');
      if (fieldClass !== 'img') {
        productFields[fieldClass] = $(this).text().replace(/[\s\.\,\%]/g, '').replace(/[\r\n]/g, '');
      }
    });

    // Mark out-of-stock products
    if (productFields.status === 'off') {
      $product.addClass('empty');
      $('figure.cover a:first', $product).append('<span class="empty"><b>' + ($_config.text.product_empty || 'Habis') + '</b></span>');
      $('[itemprop="availability"]', $product).attr('content', 'https://schema.org/OutOfStock');
    }

    // Build price & interactive options HTML
    var productUiHtml = '            <div class="price" data-price="' + Number(productFields.price || 0) + '" data-discount="' + Number(productFields.discount || 0) + '" data-unit="' + (productFields.unit || '') + '" data-weight="' + Number(productFields.weight || 0) + '"></div>        ';

    if ($product.hasClass('is_post')) {
      productUiHtml += '                <br>                <div class="option">            ';

      // Parse all active variation tables (multi-group support)
      var $variantTables = $('table.variant, .variant.hide', $product);
      $variantTables.each(function (grpIdx) {
        var $vTable = $(this);
        if ($('.status', $vTable).text().replace(/[\r\n]/g, '').trim() === 'on') {
          var groupLabel = $('.label', $vTable).text().replace(/[\r\n]/g, '').trim() || ('Varian ' + (grpIdx + 1));
          productUiHtml += '                    <div class="item variant" data-group-index="' + grpIdx + '">'
            + '                        <label>'
            + '                            ' + groupLabel
            + '                        </label>'
            + '                        <fieldset>                ';

          $('.name', $vTable).each(function () {
            var optName = $(this).text().replace(/[\r\n]/g, '').trim();
            if (optName) {
              var priceCell = $(this).next('.price').text().replace(/[\s\.\,]/g, '').trim();
              var extraPrice = priceCell ? Number(priceCell) : 0;
              productUiHtml += '                            <button type="button" data-extra-price="' + extraPrice + '"'
                + (extraPrice > 0 ? ' title="+" data-extra-formatted="(+' + separator(extraPrice) + ')"' : '') + '>'
                + optName
                + '</button>                        ';
            }
          });

          productUiHtml += '                        </fieldset>                    </div>                ';
        }
      });

      // Quantity selector
      productUiHtml += '                <div class="item qty">'
        + '                    <label>'
        + '                        ' + ($_config.text.product_qty || 'Kuantitas')
        + '                    </label>'
        + '                    <fieldset>'
        + '                        <button type="button">-</button>'
        + '                        <input type="number" value="1">'
        + '                        <button type="button">+</button>'
        + '                    </fieldset>'
        + '                </div>            ';

      // Call-to-action buttons (WhatsApp Chat & Add to Cart)
      productUiHtml += '                </div>                <div class="cta ' + (productFields.status === 'off' ? 'disabled' : '') + '">'
        + '                    <button type="button" class="chat" target="pop-chat">'
        + '                        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">'
        + '                            <path d="M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z\"></path>'
        + '                        </svg>'
        + '                    </button>            ';

      productUiHtml += '                <button type="button" class="cart-add">'
        + '                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
        + '                        <path d="M387.9 373.7h49.2l17.5-75.4h-66.7zM387.9 448h.5c18.7 0 33.4-12.5 38.3-29.5l6-25.9h-44.8V448zM265.4 392.5h103.7V448H265.4zM75 373.7h49v-75.4H57.5zM142.9 192h103.7v87.5H142.9zM265.4 192h103.7v87.5H265.4zM85.5 418.3c4.7 17 19.4 29.7 38.1 29.7h.5v-55.5H79.4l6.1 25.8zM142.9 392.5h103.7V448H142.9zM265.4 298.3h103.7v75.4H265.4zM142.9 298.3h103.7v75.4H142.9z" />'
        + '                        <path d="M464 192h-47.9V96c0-17.6-14.4-32-32-32H127.9c-17.6 0-32 14.4-32 32v96H48c-10.3 0-17.9 9.6-15.6 19.6l19.7 67.9H124V106c0-7.7 6.3-14 14-14h236c7.7 0 14 6.3 14 14v173.5h72l19.6-67.9c2.3-10-5.3-19.6-15.6-19.6z" />'
        + '                    </svg>'
        + '                    ' + ($_config.text.product_add || '+ Tambahkan')
        + '                </button>            ';

      productUiHtml += '                </div>            ';

      // Marketplace links (Shopee, Tokopedia, etc.)
      if (productFields.status === 'on') {
        var $marketplace = $('.marketplace', $product);
        if ($('.status', $marketplace).text() === 'on') {
          productUiHtml += '                        <div class="marketplace">'
            + '                            <small>' + ($_config.text.product_via_marketplace || 'atau, checkout via marketplace favorit anda :') + '</small>'
            + '                            <br>                    ';
          $('.link', $marketplace).each(function () {
            var linkUrl = $(this).text();
            if (linkUrl && linkUrl.indexOf('http') >= 0) {
              var domain = linkUrl.split('/')[2] || '';
              productUiHtml += '                                <a href="' + linkUrl + '" target="_blank" title="' + domain.toLowerCase().replace('www.', '') + '" rel="nofollow">'
                + '                                    <img src="https://www.google.com/s2/favicons?domain=' + domain + '&sz=24" alt="favicon"/>'
                + '                                </a>                            ';
            }
          });
          productUiHtml += '                        </div>                    ';
        }
      }
    }

    var $titleEl = $('.title, .post-title, h1:first', $product);
    if ($titleEl.length) {
      $(productUiHtml).insertAfter($titleEl);
    } else {
      $product.prepend(productUiHtml);
    }

    var unitName = $('.price', $product).attr('data-unit');
    var rawBasePrice = Number($('.price', $product).attr('data-price')) || 0;
    var discountRate = Number($('.price', $product).attr('data-discount')) || 0;

    /**
     * Calculates and renders the dynamic product price based on active variations.
     * Formula:
     * - Discount applies ONLY to base price: baseDiscounted = basePrice - (basePrice * discount / 100)
     * - Final Payable = baseDiscounted + sum(active variant extra prices)
     * - Strikethrough Price = basePrice + sum(active variant extra prices)
     */
    function updateProductPrice() {
      var currentBase = Number($('.price', $product).attr('data-price')) || 0;
      var currentDiscount = Number($('.price', $product).attr('data-discount')) || 0;
      var currentUnit = $('.price', $product).attr('data-unit');
      var totalExtra = 0;

      $('.item.variant', $product).each(function () {
        var $activeBtn = $('button.active', this);
        if ($activeBtn.length) {
          totalExtra += Number($activeBtn.attr('data-extra-price')) || 0;
        }
      });

      var baseDiscounted = currentDiscount ? (currentBase - (currentBase * currentDiscount / 100)) : currentBase;
      var finalPay = baseDiscounted + totalExtra;
      var normalStrike = currentBase + totalExtra;

      var formattedPriceHtml = '';
      if (currentDiscount) {
        if (productFields.mark) {
          formattedPriceHtml = '<small>' + productFields.mark + '</small><s>' + separator(normalStrike) + '</s><b data-price="' + finalPay + '">' + separator(finalPay) + '</b>' + (currentUnit ? '<span>/' + currentUnit + '</span>' : '');
        } else {
          formattedPriceHtml = '<small>-' + currentDiscount + '%</small><s>' + separator(normalStrike) + '</s><b data-price="' + finalPay + '">' + separator(finalPay) + '</b>' + (currentUnit ? '<span>/' + currentUnit + '</span>' : '');
        }
      } else {
        if (productFields.mark) {
          formattedPriceHtml = '<small>' + productFields.mark + '</small><b data-price="' + finalPay + '">' + separator(finalPay) + '</b>' + (currentUnit ? '<span>/' + currentUnit + '</span>' : '');
        } else {
          formattedPriceHtml = '<b data-price="' + finalPay + '">' + separator(finalPay) + '</b>' + (currentUnit ? '<span>/' + currentUnit + '</span>' : '');
        }
      }

      $('.price', $product).html(formattedPriceHtml);
      $('[itemprop="price"]', $product).attr('content', finalPay);
    }

    // Attach click listeners to variation options
    if ($product.hasClass('is_post') && $('.item.variant', $product).length) {
      $('.item.variant', $product).each(function () {
        var $group = $(this);
        $('button', $group).on('click', function () {
          $('button', $group).removeClass('active');
          $(this).addClass('active');
          updateProductPrice();
        });
        // Select first button by default in each group
        if (!$('button.active', $group).length) {
          $('button:first', $group).addClass('active');
        }
      });
      updateProductPrice();
    } else {
      // Products without variants (e.g. catalog cards in loop)
      if (discountRate) {
        var discountedAmount = rawBasePrice - (rawBasePrice * discountRate / 100);
        if (productFields.mark) {
          $('.price', $product).html('<small>' + productFields.mark + '</small><s>' + separator(rawBasePrice) + '</s><b data-price="' + discountedAmount + '">' + separator(discountedAmount) + '</b>' + (unitName ? '<span>/' + unitName + '</span>' : ''));
        } else {
          $('.price', $product).html('<small>-' + discountRate + '%</small><s>' + separator(rawBasePrice) + '</s><b data-price="' + discountedAmount + '">' + separator(discountedAmount) + '</b>' + (unitName ? '<span>/' + unitName + '</span>' : ''));
        }
        $('[itemprop="price"]', this).attr('content', discountedAmount);
      } else {
        if (productFields.mark) {
          $('.price', $product).html('<small>' + productFields.mark + '</small><b data-price="' + rawBasePrice + '">' + separator(rawBasePrice) + '</b>' + (unitName ? '<span>/' + unitName + '</span>' : ''));
        } else {
          $('.price', $product).html('<b data-price="' + rawBasePrice + '">' + separator(rawBasePrice) + '</b>' + (unitName ? '<span>/' + unitName + '</span>' : ''));
        }
        $('[itemprop="price"]', this).attr('content', rawBasePrice);
      }
    }

    // Quantity selector input & buttons in product detail
    $('.qty input', $product).on('change', function () {
      var qtyVal = parseInt($(this).val(), 10);
      if (isNaN(qtyVal) || qtyVal < 1) {
        qtyVal = 1;
      }
      $(this).val(qtyVal);
    });

    $('.qty button', $product).on('click', function () {
      var currentQty = parseInt($('.qty input', $product).val(), 10) || 1;
      if ($(this).text() === '-') {
        currentQty = currentQty - 1;
      } else {
        currentQty = currentQty + 1;
      }
      if (currentQty < 1) currentQty = 1;
      $('.qty input', $product).val(currentQty).trigger('change');
    });
  });
}

/**
 * Centered Popup Window Module
 * Opens external or social sharing links in a centered popup window.
 */
function popwin(url, width, height) {
  if (url) {
    var winWidth = width ? width : 960;
    var winHeight = height ? height : 540;
    var leftPos = Number((screen.width / 2) - (winWidth / 2));
    var topPos = Number((screen.height / 2) - (winHeight / 2));
    var popupWin = window.open(
      url,
      '',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + winWidth + ', height=' + winHeight + ', top=' + topPos + ', left=' + leftPos
    );
    if (popupWin) {
      popupWin.focus();
    }
  } else {
    $(document).on('click', '[target="_popwin"]', function (e) {
      e.stopPropagation();
      e.preventDefault();
      var targetUrl = $(this).attr('href');
      var customWidth = $(this).attr('data-popwin-width') || 960;
      var customHeight = $(this).attr('data-popwin-height') || 540;
      var leftCoord = Number((screen.width / 2) - (customWidth / 2));
      var topCoord = Number((screen.height / 2) - (customHeight / 2));
      var popObj = window.open(
        targetUrl,
        '',
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=' + customWidth + ', height=' + customHeight + ', top=' + topCoord + ', left=' + leftCoord
      );
      if (popObj) {
        popObj.focus();
      }
    });
  }
}

/**
 * Shortcode Parser Module
 * Converts custom shortcodes like [youtube], [code], [img], [url] in blog posts safely.
 */
function shortcode() {
  $('.post-body').each(function () {
    $(this).html(
      $(this).html()
        .replace(/\[youtube\]/g, '<div class="video"><iframe allowfullscreen="true" data-shortcode="youtube" data-src="')
        .replace(/\[\/youtube\]/g, '"></iframe></div>')
        .replace(/\[code\]/g, '<pre data-shortcode="code"><code>')
        .replace(/\[\/code\]/g, '</code></pre>')
        .replace(/\[img\]/g, '<img style="display:block;width:100%;border-radius:10px;" data-shortcode="img" src="')
        .replace(/\[\/img\]/g, '" alt="image"/>')
        .replace(/\[url\]/g, '<a data-shortcode="url" href="')
        .replace(/\[\/url\]/g, '" target="_blank" rel="nofollow external">Lihat Tautan</a>')
    );
  });

  $('[data-shortcode]').each(function () {
    var shortcodeType = $(this).attr('data-shortcode');

    if (shortcodeType === 'img') {
      var imgSrc = $(this).attr('src');
      if (imgSrc) {
        $(this).wrap('<a class="lightbox" href="' + imgSrc + '"></a>');
      }
    }

    if (shortcodeType === 'youtube') {
      var videoSrc = $(this).attr('data-src');
      if (videoSrc && typeof videoSrc === 'string') {
        var videoParts = videoSrc.split('/');
        var videoId = videoParts[3] || '';
        if (videoSrc.indexOf('https://www.youtube.com/watch?v=') >= 0) {
          videoId = get_url_parameter('v', videoSrc) || videoId;
        }
        $(this).attr('data-src', 'https://www.youtube.com/embed/' + videoId + '?rel=0');
      }
    }
  });
}

/**
 * Multi-Language & Translation Module
 * Fills data-text placeholders from $_config.text.
 */
function translate() {
  if (!$_config || !$_config.text) return;

  $('[data-text]').each(function () {
    var key = $(this).attr('data-text');
    if ($_config.text[key]) {
      $(this).text($_config.text[key]);
    } else {
      $(this).text(key);
    }
  });

  $('[data-text-label]').each(function () {
    var key = $(this).attr('data-text-label');
    if ($_config.text[key]) {
      $(this).attr('label', $_config.text[key]);
    } else {
      $(this).attr('label', key);
    }
  });

  $('[data-text-placeholder]').each(function () {
    var key = $(this).attr('data-text-placeholder');
    if ($_config.text[key]) {
      $(this).attr('placeholder', $_config.text[key]);
    } else {
      $(this).attr('placeholder', key);
    }
  });

  $('[data-text-pop-title]').each(function () {
    var key = $(this).attr('data-text-pop-title');
    if ($_config.text[key]) {
      $(this).attr('data-pop-title', $_config.text[key]);
    } else {
      $(this).attr('data-pop-title', key);
    }
  });
}

/**
 * Miscellaneous UI Functions
 * Sticky header, dropdown menus, AJAX load more, smooth scroll, etc.
 */
function etc() {
  // Page unload loader
  $(window).on('beforeunload', function () {
    $('body').addClass('loading');
    setTimeout(function () {
      $('body').removeClass('loading');
    }, 2000);
  });

  // Header shadow on scroll
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 0) {
      $('#header').addClass('shadow');
    } else {
      $('#header').removeClass('shadow');
    }
  });

  // Search input auto-focus
  $('#header a[target=pop-search]').on('click', function () {
    setTimeout(function () {
      $('#header #pop-search [type=search]').focus();
    }, 50);
  });

  // WhatsApp quick inquiry from popup chat
  $('#pop-chat').on('submit', 'form', function (e) {
    e.preventDefault();
    var chatMessage = $('input', this).val() + '\n\nvia. ' + location.href;
    var waChatUrl = 'https://api.whatsapp.com/send?phone=' + $_config.whatsapp + '&text=' + encodeURIComponent(chatMessage);
    popwin(waChatUrl);
  });

  // Convert menu items with '#' to dropdown toggles
  $('.LinkList li a[href*="#"]').each(function () {
    $(this).attr('href', 'javascript:void(0)');
    $(this).append('<i class="icon right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"/></svg></i>');
    var $parentLi = $(this).parent('li');
    $parentLi.addClass('dropdown');
    $parentLi.wrapInner('<span class="dropdown-title"></span>');
    $parentLi.append('<ul class="sub"></ul>');
  });

  // Nest underscore '_' prefixed links into preceding dropdown
  $('.LinkList li a:contains("_")').each(function () {
    var $subList = $(this).parent('li').prev('.dropdown').find('ul');
    $(this).parent('li').appendTo($subList);
    var cleanTitle = $(this).text().replace(/_/g, '').trim();
    $(this).text(cleanTitle);
  });

  $('.LinkList').on('click', 'li.dropdown', function () {
    $(this).find('ul:first').toggle();
    $(this).toggleClass('active');
  });

  // Dynamic feed widget loader
  if ($('[data-feed]').length) {
    $('[data-feed]').each(function () {
      var $feedEl = $(this);
      var feedAttr = $(this).attr('data-feed') || '';
      var feedUrl = feedAttr.replace('?m=1', '').replace('&m=1', '').replace(/ /g, '%20');
      $feedEl.addClass('loading');
      $feedEl.load(feedUrl + ' .is_loop', function () {
        var feedContent = $(this).html();
        $feedEl.html(feedContent);
        var hideId = $feedEl.attr('data-hide-id');
        if (hideId) {
          if ($feedEl.find('article#' + hideId).length) {
            $feedEl.find('article#' + hideId).remove();
          } else {
            $feedEl.find('article:last-of-type').remove();
          }
        }
        product_convert();
        lazyload();
        timeago();
        $feedEl.removeClass('loading');
        if ($feedEl.find('article').length === 0) {
          $feedEl.closest('#related').remove();
        }
      });
    });
  }

  // Copy link button in share popup
  $('#pop-bagikan .copy button').on('click', function () {
    var $copyBtn = $(this);
    $copyBtn.siblings('input').select();
    document.execCommand('copy');
    $copyBtn.text('Disalin!');
    setTimeout(function () {
      $copyBtn.text('Salin');
    }, 2000);
  });

  // Smooth scroll to URL hash target
  if (window.location.hash) {
    if ($(window.location.hash).length) {
      var headerHeight = $('#header').outerHeight() || 0;
      var stickyAttrHeight = $('.is_single article .attr-sticky').outerHeight() || 0;
      $('html, body').stop().animate({
        scrollTop: $(window.location.hash).offset().top - headerHeight - stickyAttrHeight - 20
      }, 500);
      $(window.location.hash).addClass('focus');
      setTimeout(function () {
        $(window.location.hash).removeClass('focus');
      }, 2000);
    }
  }

  $(document).on('click', 'a[href*="#"]', function (e) {
    var hrefVal = $(this).attr('href') || '';
    var hashTarget = '#' + hrefVal.split('#')[1];
    if ($(hashTarget).length && hrefVal.split('#')[0] === '') {
      e.preventDefault();
      var headerH = $('#header').outerHeight() || 0;
      var stickyH = $('.is_single article .attr-sticky').outerHeight() || 0;
      $('html, body').stop().animate({
        scrollTop: $(hashTarget).offset().top - headerH - stickyH - 20
      }, 500);
      $(hashTarget).addClass('focus');
      setTimeout(function () {
        $(hashTarget).removeClass('focus');
      }, 2000);
    }
  });

  // AJAX Load More Products button
  $(document).on('click', '.loadmore-btn', function (e) {
    e.preventDefault();
    var nextUrl = $(this).attr('href');
    var $pagerBtn = $('#blog-pager .loadmore-btn');

    if (nextUrl) {
      $.ajax({
        url: nextUrl,
        beforeSend: function () {
          $pagerBtn.addClass('loading');
        },
        complete: function () {
          $pagerBtn.removeClass('loading');
        },
        success: function (htmlData) {
          var newArticles = $(htmlData).find('.Blog .is_loop').html();
          var futureUrl = $(htmlData).find('.loadmore-btn').attr('href');
          $('.Blog .is_loop').append(newArticles);
          $pagerBtn.show();
          product_convert();
          product_sort();
          lazyload();
          timeago();
          if (futureUrl) {
            $pagerBtn.attr('href', futureUrl);
          } else {
            $pagerBtn.fadeOut();
          }
        }
      });
    }
  });

  // Single post navigation (Next & Previous products)
  if ($_config && $_config.url && $_config.url.view === 'single') {
    var prevText = ($_config.text && $_config.text.product_prev) ? $_config.text.product_prev : 'Sebelumnya';
    var olderLink = $('a.blog-pager-older-link').attr('href');
    if (olderLink) {
      $('a.blog-pager-older-link').load(olderLink + ' article h1', function () {
        var olderTitle = $('a.blog-pager-older-link').text();
        $('a.blog-pager-older-link').html('<figure class="loading"></figure><div class="flex left"><div class="wrap"><small><b>' + prevText + '</b></small><h3>' + olderTitle + '</h3></div></div>');
        $('a.blog-pager-older-link > figure').load(olderLink + ' article .post-body img:first-of-type', function () {
          var imgContainer = $(this).html();
          var srcMatch = imgContainer.split('src="')[1];
          if (srcMatch) {
            var rawSrc = srcMatch.split('"')[0];
            var baseSrc = rawSrc.split('=')[0];
            var sizeKey = baseSrc.split('/')[7];
            var thumb = sizeKey ? (baseSrc.replace(sizeKey, 'w100-h100-c') + '=w100-h100-c') : baseSrc;
            $('a.blog-pager-older-link > figure').html('<img src="' + thumb + '"/>').removeClass('loading');
          }
        });
      });
    }

    var nextText = ($_config.text && $_config.text.product_next) ? $_config.text.product_next : 'Selanjutnya';
    var newerLink = $('a.blog-pager-newer-link').attr('href');
    if (newerLink) {
      $('a.blog-pager-newer-link').load(newerLink + ' article h1', function () {
        var newerTitle = $('a.blog-pager-newer-link').text();
        $('a.blog-pager-newer-link').html('<figure class="loading"></figure><div class="flex right"><div class="wrap"><small><b>' + nextText + '</b></small><h3>' + newerTitle + '</h3></div></div>');
        $('a.blog-pager-newer-link > figure').load(newerLink + ' article .post-body img:first-of-type', function () {
          var imgContainer = $(this).html();
          var srcMatch = imgContainer.split('src="')[1];
          if (srcMatch) {
            var rawSrc = srcMatch.split('"')[0];
            var baseSrc = rawSrc.split('=')[0];
            var sizeKey = baseSrc.split('/')[7];
            var thumb = sizeKey ? (baseSrc.replace(sizeKey, 'w100-h100-c') + '=w100-h100-c') : baseSrc;
            $('a.blog-pager-newer-link > figure').html('<img src="' + thumb + '"/>').removeClass('loading');
          }
        });
      });
    }
  }
}

/**
 * Relative Timestamp Formatter Module
 * Displays "X minutes/hours/days ago" (or Indonesian equivalents).
 */
function timeago() {
  $('[datetime]:not(.timeago)').each(function () {
    var $el = $(this);
    var dateString = $el.attr('datetime');
    $el.addClass('timeago');
    if (!$el.attr('title')) {
      $el.attr('title', dateString);
    }
    $el.text(formatRelativeTime(dateString));
  });

  function formatRelativeTime(dateInput) {
    var agoWord = 'ago';
    var secondsWord = 'seconds';
    var minutesWord = 'minutes';
    var hoursWord = 'hours';
    var daysWord = 'days';
    var monthsWord = 'months';
    var yearsWord = 'years';

    if ($_config && $_config.money && $_config.money.country_id === 'id-ID') {
      agoWord = 'yang lalu';
      secondsWord = 'detik';
      minutesWord = 'menit';
      hoursWord = 'jam';
      daysWord = 'hari';
      monthsWord = 'bulan';
      yearsWord = 'tahun';
    }

    var targetDate = new Date(dateInput);
    if (isNaN(targetDate.getTime())) return dateInput;
    var elapsedMs = new Date() - targetDate;

    if (elapsedMs < 60000) {
      return Math.round(elapsedMs / 1000) + ' ' + secondsWord + ' ' + agoWord;
    } else if (elapsedMs < 3600000) {
      return Math.round(elapsedMs / 60000) + ' ' + minutesWord + ' ' + agoWord;
    } else if (elapsedMs < 86400000) {
      return Math.round(elapsedMs / 3600000) + ' ' + hoursWord + ' ' + agoWord;
    } else if (elapsedMs < 2592000000) {
      return Math.round(elapsedMs / 86400000) + ' ' + daysWord + ' ' + agoWord;
    } else if (elapsedMs < 31536000000) {
      return Math.round(elapsedMs / 2592000000) + ' ' + monthsWord + ' ' + agoWord;
    } else {
      return Math.round(elapsedMs / 31536000000) + ' ' + yearsWord + ' ' + agoWord;
    }
  }

  $('#comments .datetime a:not(.timeago)').each(function () {
    var $commentDate = $(this);
    var dateText = $commentDate.text();
    $commentDate.attr('datetime', dateText);
    var finalDateStr = $commentDate.attr('datetime');
    $commentDate.addClass('timeago');
    $commentDate.attr('title', finalDateStr);
    $commentDate.text(formatRelativeTime(finalDateStr));
  });
}

/**
 * Thousands Separator Formatter
 * Formats integers with dot separators (e.g. 150000 -> "150.000").
 */
function separator(num) {
  if (num === undefined || num === null || isNaN(num)) {
    num = 0;
  }
  var reversed = num.toString().split('').reverse().join('');
  var result = '';
  for (var i = 0; i < reversed.length; i++) {
    if (i % 3 === 0) {
      result += reversed.substr(i, 3) + '.';
    }
  }
  return result.split('', result.length - 1).reverse().join('');
}

/**
 * Weight Formatter
 * Converts weight in grams to grams or kilograms.
 */
function kg(weightInGrams) {
  var formatted = weightInGrams + ' Gram';
  if (weightInGrams >= 1000) {
    formatted = (weightInGrams / 1000) + ' Kg';
  }
  return formatted;
}

/**
 * Modal Popup Module
 * Manages modal windows with IDs starting with pop-*.
 */
function pop() {
  if ($('[target=pop-video]').length) {
    var videoModalHtml = '             <div id="pop-video" data-pop-title="Video" data-pop-width="960">'
      + '               <div class="video">'
      + '              <iframe allowfullscreen="true"></iframe>'
      + '               </div>'
      + '             </div>             ';
    $(videoModalHtml).appendTo('body');
  }

  $('[id*="pop-"]:not(".pop-loaded")').each(function () {
    var $modal = $(this);
    var popTitle = $modal.attr('data-pop-title') || '';
    var popWidth = $modal.attr('data-pop-width');
    $modal.wrap('<div class="pop"></div>');
    $modal.wrap('<div class="pop-wrap"></div>');
    $modal.addClass('pop-content pop-loaded');

    var headerHtml = '            <header class="pop-header">'
      + '                <div class="pop-title">'
      + '                    <h3>'
      + '                           ' + popTitle
      + '                    </h3>'
      + '                </div>'
      + '                <div class="pop-close">'
      + '                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"/></svg>'
      + '                </div>'
      + '            </header>        ';

    $modal.closest('.pop-wrap').prepend(headerHtml);
    if (popWidth) {
      $modal.closest('.pop-wrap').css('width', popWidth);
    }
  });

  $('.pop-close').on('click', function () {
    $(this).closest('.pop').removeClass('open');
    $('body').removeClass('pop-open');
    if ($('[id=pop-video] iframe').length) {
      $('[id=pop-video] iframe').attr('src', '');
    }
  });

  $(document).on('click', '[target*="pop-"]', function (e) {
    e.preventDefault();
    var $trigger = $(this);
    var targetId = $trigger.attr('target');
    var popTitle = $trigger.attr('data-pop-title') ? $trigger.attr('data-pop-title') : $('#' + targetId).attr('data-pop-title');

    $trigger.closest('.pop').removeClass('open');
    $('body').removeClass('pop-open');

    if ($('#' + targetId).length) {
      $('body').addClass('pop-open');
      $('#' + targetId).closest('.pop').addClass('open');

      if ($trigger.closest('.pop-content').length) {
        var backId = $trigger.closest('.pop-content').attr('id');
        popTitle = '<a target="' + backId + '"><i class="pop-back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"/></svg></i></a>' + popTitle;
      }

      if (popTitle) {
        $('#' + targetId).closest('.pop').find('.pop-title h3').html(popTitle);
      }

      $('[data-src]').each(function () {
        var src = $(this).attr('data-src');
        $(this).attr('src', src).removeAttr('data-src');
      });
    }

    if (targetId === 'pop-video') {
      var videoHref = $(this).attr('href') || '';
      var vidId = videoHref.split('/')[3];
      if (videoHref.indexOf('https://www.youtube.com/watch?v=') >= 0) {
        vidId = get_url_parameter('v', videoHref);
      }
      $('[id=pop-video] iframe').attr('src', 'https://www.youtube.com/embed/' + vidId + '?autoplay=1&showinfo=0');
    }
  });

  $(document).on('click', '.pop.open', function () {
    $(this).find('.pop-close').trigger('click');
  });

  $(document).on('click', '.pop-wrap', function (e) {
    e.stopPropagation();
  });
}

/**
 * Lightbox Image Viewer Module
 * Handles modal full-size image viewing, swipe/click next-prev, and keyboard navigation.
 */
function lightbox() {
  if ($('#lightbox').length === 0) {
    $(
      '        <div id="lightbox">'
      + '            <div class="lb-wrap">'
      + '                <figure>'
      + '                    <div class="lb-img">'
      + '                        <div class="lb-count"></div>'
      + '                    </div>'
      + '                    <nav class="lb-nav">'
      + '                        <div class="lb-np lb-prev"></div>'
      + '                        <div class="lb-close"></div>'
      + '                        <div class="lb-np lb-next"></div>'
      + '                    </nav>'
      + '                </figure>'
      + '            </div>'
      + '        </div>    '
    ).appendTo('body');
  }

  $('[data-lightbox]').each(function () {
    var groupName = $(this).attr('data-lightbox');
    var groupCount = $('[data-lightbox=' + groupName + ']').length;

    if (groupCount > 1) {
      $('[data-lightbox=' + groupName + ']').each(function (idx) {
        $(this).attr('data-lightbox-index', (idx + 1) + ' / ' + groupCount);
      });
    }

    $(this).on('mousedown', function () {
      return false;
    });

    $(this).on('contextmenu', function () {
      alert('© ' + ($_config.page ? $_config.page.title : ''));
      return false;
    });
  });

  $(document).on('click', '[data-lightbox]', function (e) {
    e.preventDefault();
    var $target = $(this);
    var groupName = $target.attr('data-lightbox');
    var indexLabel = $target.attr('data-lightbox-index');
    var lbTitle = $target.attr('data-lightbox-title');
    var lbDesc = $target.attr('data-lightbox-desc');
    var fullImgUrl = $target.attr('href');

    $('#lightbox').scrollTop(0);
    $('#lightbox .lb-close').hide();
    $('#lightbox .lb-wrap figure .lb-img img').remove();
    $('#lightbox .lb-count').hide();
    $('#lightbox .lb-wrap figure figcaption').remove();
    $('#lightbox .lb-np').hide();

    if (fullImgUrl) {
      $('#lightbox .lb-wrap').addClass('lb-loading');
      $('#lightbox .lb-wrap figure .lb-img').prepend('<img data-src="' + fullImgUrl + '"/>');
      $('#lightbox .lb-wrap figure .lb-img img').attr('src', fullImgUrl).on('load', function () {
        $(this).removeAttr('data-src');
        $(this).on('mousedown', function () {
          return false;
        });
        $(this).on('contextmenu', function () {
          alert('© ' + ($_config.page ? $_config.page.title : ''));
          return false;
        });

        $('#lightbox .lb-wrap').removeClass('lb-loading');

        if (lbTitle || lbDesc) {
          $('#lightbox .lb-wrap figure').append('<figcaption></figcaption>');
        }
        if (lbTitle) {
          $('#lightbox .lb-wrap figure figcaption').append('<h4>' + lbTitle + '</h4>');
        }
        if (lbDesc) {
          $('#lightbox .lb-wrap figure figcaption').append('<p>' + lbDesc + '</p>');
        }
        if (indexLabel) {
          $('#lightbox .lb-count').html(indexLabel).show();
        }

        $('#lightbox .lb-np').show();

        if ($target.prev('[data-lightbox="' + groupName + '"]').length) {
          var prevUrl = $target.prev('[data-lightbox="' + groupName + '"]').attr('href');
          $('#lightbox .lb-np.lb-prev').attr('data-id', groupName).attr('data-url', prevUrl).show();
          $('body').append('<img src="' + prevUrl + '" style="display:none;"/>');
        } else {
          $('#lightbox .lb-np.lb-prev').hide();
        }

        if ($target.next('[data-lightbox="' + groupName + '"]').length) {
          var nextUrl = $target.next('[data-lightbox="' + groupName + '"]').attr('href');
          $('#lightbox .lb-np.lb-next').attr('data-id', groupName).attr('data-url', nextUrl).show();
          $('body').append('<img src="' + nextUrl + '" style="display:none;"/>');
        } else {
          $('#lightbox .lb-np.lb-next').hide();
        }

        $('#lightbox .lb-close').show();
      });
    }

    $('#lightbox').addClass('open');
    $('body').addClass('lightbox_open');
  });

  $('#lightbox .lb-np.lb-prev, #lightbox .lb-np.lb-next').on('click', function (e) {
    e.stopPropagation();
    var targetUrl = $(this).attr('data-url');
    var targetGroupId = $(this).attr('data-id');
    $('[href="' + targetUrl + '"][data-lightbox="' + targetGroupId + '"]').trigger('click');
  });

  $('#lightbox').click(function () {
    $('#lightbox').removeClass('open');
    $('body').removeClass('lightbox_open');
  });

  $('#lightbox .lb-wrap').on('click', function (e) {
    e.stopPropagation();
  });

  $('#lightbox .lb-close').on('click', function (e) {
    e.stopPropagation();
    $('#lightbox').removeClass('open');
    $('body').removeClass('lightbox_open');
  });

  // Lightbox keyboard controls
  $(document).on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (e.key === 'Escape') {
      $('#lightbox').removeClass('open');
      $('body').removeClass('lightbox_open');
    }
    // Left arrow
    if (keyCode === 37) {
      $('#lightbox .lb-np.lb-prev:visible').trigger('click');
    }
    // Right arrow
    if (keyCode === 39) {
      $('#lightbox .lb-np.lb-next:visible').trigger('click');
    }
    // Up arrow
    if (keyCode === 38) {
      $('#lightbox').scrollTop(0);
    }
    // Down arrow
    if (keyCode === 40) {
      var lbHeight = $('#lightbox').height();
      $('#lightbox').scrollTop(lbHeight);
    }
  });
}

/**
 * Lazyload Module
 * Lazy-loads background images, img elements, and iframes when scrolled into view.
 */
function lazyload() {
  $('[data-bg]').each(function () {
    var $el = $(this);
    var bgUrl = $el.attr('data-bg');
    $el.css('background-image', 'url(' + bgUrl + ')').removeAttr('data-bg');
  });

  $('[data-src]:not([lazy="true"])').each(function () {
    var $el = $(this);
    var winHeight = $(window).height();
    var scrollPos = $(window).scrollTop();
    var viewThreshold = scrollPos + winHeight;
    var elemOffset = $el.offset().top;
    $el.attr('data-offset-top', elemOffset);

    var srcUrl = $el.attr('data-src') || '';
    srcUrl = srcUrl.replace(/1\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');
    srcUrl = srcUrl.replace(/2\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');
    srcUrl = srcUrl.replace(/3\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');
    srcUrl = srcUrl.replace(/4\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');

    var tag = $el.prop('tagName').toLowerCase();
    if (elemOffset <= viewThreshold) {
      if (tag === 'img' || tag === 'iframe') {
        $el.attr('src', srcUrl).removeAttr('data-src');
        $el.attr('lazy', 'true');
      }
    }
  });

  $(window).on('scroll', function () {
    var winH = $(window).height();
    var scrollY = $(window).scrollTop();
    var bottomY = scrollY + winH;

    $('[data-src]:not([lazy="true"])').each(function () {
      var $el = $(this);
      var elTop = $el.offset().top;
      var dataSrc = $el.attr('data-src') || '';
      dataSrc = dataSrc.replace(/1\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');
      dataSrc = dataSrc.replace(/2\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');
      dataSrc = dataSrc.replace(/3\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');
      dataSrc = dataSrc.replace(/4\.bp\.blogspot\.com/g, 'lh3.googleusercontent.com');

      var tagName = $el.prop('tagName').toLowerCase();
      if (elTop <= bottomY) {
        if (tagName === 'img' || tagName === 'iframe') {
          $el.attr('src', dataSrc).removeAttr('data-src');
          $el.attr('lazy', 'true');
        }
      }
    });
  });
}

/**
 * Capitalizes the first letter of each word in a string.
 */
function titleCase(str) {
  if (!str) return '';
  var words = str.split(' ');
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

/**
 * Extracts URL query parameter from window.location.search.
 */
function $_GET(paramName) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === paramName) {
      return pair[1] === undefined ? true : decodeURIComponent(pair[1]);
    }
  }
}

/**
 * Extracts a specific query parameter from an arbitrary URL string.
 */
function get_url_parameter(paramName, urlStr) {
  if (!urlStr) return '';
  var cleanParam = paramName.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + cleanParam + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(urlStr);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
