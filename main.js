license();
function license() {
    // License check bypassed by owner — preserved other functionalities.
    return true;
}

window.onload = function () {
  etc();
  slideshow();
  product_convert();
  product_sort();
  shortcode();
  cart();
  lazyload();
  lightbox();
  pop();
  popwin();
  timeago();
  translate();
  custom_js();
};
function cart() {
  var _0x168f81 = "        <fieldset>            <input type=\"text\" name=\"name\" placeholder=\"" + $_config.text.checkout_name + "\" required>            <input type=\"tel\" name=\"phone\" placeholder=\"" + $_config.text.checkout_phone + "\" required>        </fieldset>    ";
  if ($_config.checkout_form.email) {
    _0x168f81 += "            <input type=\"email\" name=\"email\" placeholder=\"" + $_config.text.checkout_email + "\" required>        ";
  }
  if ($_config.checkout_form.address) {
    _0x168f81 += "            <textarea name=\"address\" placeholder=\"" + $_config.text.checkout_address + "\" required></textarea>        ";
  }
  if ($_config.checkout_form.note) {
    _0x168f81 += "            <textarea name=\"note\" placeholder=\"" + $_config.text.checkout_note + "\"></textarea>        ";
  }
  if ($_config.checkout_form.shipping) {
    _0x168f81 += "            <select name=\"shipping\" required>                <option value=\"\" selected hidden>" + $_config.text.checkout_shipping + "</option>                <optgroup label=\"" + $_config.text.checkout_shipping + " :\">        ";
    for (var _0x3647ed in $_config.checkout_form_shipping) {
      var _0x100872 = $_config.checkout_form_shipping[_0x3647ed];
      if (_0x100872.status == true) {
        $("<img src=\"" + _0x100872.img + "\"/>").on("load", function () {});
        _0x168f81 += "                    <option value=\"" + _0x3647ed + "\" data-info=\"" + _0x100872.info + "\" data-img=\"" + _0x100872.img + "\">                        " + _0x3647ed + "                    </option>                ";
      }
    }
    _0x168f81 += "                </optgroup>            </select>        ";
  }
  if ($_config.checkout_form.payment) {
    $("#contact").append("<p class=\"shippay\"><b>" + $_config.text.checkout_payment + " :</b></p>");
    _0x168f81 += "            <select name=\"payment\" required>                <option value=\"\" selected hidden>" + $_config.text.checkout_payment + "</option>                <optgroup label=\"" + $_config.text.checkout_payment + " :\">        ";
    for (var _0x3647ed in $_config.checkout_form_payment) {
      var _0xb18196 = $_config.checkout_form_payment[_0x3647ed];
      if (_0xb18196.status == true) {
        $("#contact .shippay").append("<figure><img alt=\"" + _0x3647ed + "\" src=\"" + _0xb18196.img + "\" width=\"24\" height=\"24\"/><figcaption>" + _0x3647ed + "</figcaption></figure>");
        $("<img src=\"" + _0xb18196.img + "\"/>").on('load', function () {});
        _0x168f81 += "                    <option value=\"" + _0x3647ed + "\" data-info=\"" + _0xb18196.info + "\" data-img=\"" + _0xb18196.img + "\">                        " + _0x3647ed + "                    </option>                ";
      }
    }
    _0x168f81 += "                </optgroup>            </select>        ";
  }
  $("#cart .form").append(_0x168f81);
  $("#cart .form").on('change', "select", function () {
    var _0x438fd4 = $(this);
    var _0x170e4b = _0x438fd4.val();
    var _0x50656f = $("option:selected", _0x438fd4);
    var _0x5d91b6 = _0x50656f.attr("data-info");
    var _0x5da6b0 = _0x50656f.attr("data-img");
    _0x438fd4.prev('.detail').remove();
    $("<img src=\"" + _0x5da6b0 + "\"/>").on("load", function () {
      $("                <div class=\"detail\">                    <img src=\"" + _0x5da6b0 + "\">                    <h4>" + _0x170e4b + "</h4>                    <p>" + _0x5d91b6 + "</p>                </div>            ").insertBefore(_0x438fd4).hide().fadeIn();
    });
  });
  $("#cart .form").on("click", ".detail", function () {
    $(this).next("select").focus();
  });
  var _0x7b9705 = [];
  if (localStorage.cart) {
    _0x7b9705 = JSON.parse(localStorage.cart);
    _0xcbc99a();
  }
  $('.product').on("click", '.cart-add', function () {
    var _0x11cfbd = $(this).closest(".product");
    var _0x27c2a8 = Number(_0x11cfbd.attr('id'));
    var _0x5de058 = $(".img", _0x11cfbd).attr('src');
    var _0x4ee47c = location.href;
    var _0x42c0da = $(".title", _0x11cfbd).text().replace(/\n/g, '').replaceAll("  ", '');
    var _0x104fa4 = '';
    var _0x154ee0 = Number($(".price b", _0x11cfbd).attr("data-price"));
    var _0x5630f1 = Number($('.price', _0x11cfbd).attr("data-weight"));
    var _0xdd1fc8 = $('.price', _0x11cfbd).attr("data-unit");
    var _0x889a26 = Number($(".qty input", _0x11cfbd).val());
    if ($(".variant", _0x11cfbd).length) {
      if ($(".variant button.active", _0x11cfbd).length) {
        _0x27c2a8 = _0x27c2a8 + '|' + $(".variant label", _0x11cfbd).text().replace(/\n/g, '').replaceAll("  ", '') + " : " + $(".variant button.active", _0x11cfbd).text().replace(/\n/g, '').replaceAll("  ", '');
        _0x104fa4 = {
          'label': $(".variant label", _0x11cfbd).text().replace(/\n/g, '').replaceAll("  ", ''),
          'value': $(".variant button.active", _0x11cfbd).text().replace(/\n/g, '').replaceAll("  ", '')
        };
      }
    }
    $("#cart-btn").removeClass("open");
    setTimeout(function () {
      $('#cart-btn').addClass('open');
    }, 0x64);
    for (var _0x2113b2 in _0x7b9705) {
      if (_0x7b9705[_0x2113b2].id == _0x27c2a8) {
        _0x7b9705[_0x2113b2].qty = _0x889a26;
        _0x295e0d();
        _0xcbc99a();
        return;
      }
    }
    var _0x15360f = {
      'id': _0x27c2a8,
      'img': _0x5de058,
      'title': _0x42c0da,
      'link': _0x4ee47c,
      'variant': _0x104fa4,
      'price': _0x154ee0,
      'weight': _0x5630f1,
      'unit': _0xdd1fc8,
      'qty': _0x889a26
    };
    _0x7b9705.push(_0x15360f);
    _0x295e0d();
    _0xcbc99a();
  });
  $("#cart-btn, .cart-btn-head").on("click", function () {
    $("#cart").addClass('open');
    $('body').css('overflow', "hidden");
  });
  $("#cart-close").on("click", function () {
    $("#cart").removeClass('open');
    $("body").css("overflow", 'auto');
  });
  $("#cart").on('click', ".qty button", function () {
    var _0xecaa6c = $(this).closest(".item");
    var _0x354156 = Number($(".qty input", _0xecaa6c).val());
    if ($(this).text() == '-') {
      _0x354156 = _0x354156 - 0x1;
    } else {
      _0x354156 = _0x354156 + 0x1;
    }
    $(".qty input", _0xecaa6c).val(_0x354156).trigger('change');
  });
  $("#cart").on("change", ".item .qty input", function () {
    var _0x1d0c9b = $(this).closest('.item');
    var _0x69a49e = _0x1d0c9b.attr("data-index");
    var _0x6ca09c = Number($(this).val());
    if (_0x6ca09c > 0x0) {
      _0x7b9705[_0x69a49e].qty = _0x6ca09c;
      _0x295e0d();
      _0xcbc99a();
      return;
    } else if (!confirm($_config.text.cart_remove)) {
      _0x6ca09c = 0x1;
      $(".qty input", _0x1d0c9b).val(_0x6ca09c).trigger('change');
    } else {
      _0x7b9705.splice(_0x69a49e, 0x1);
      _0x295e0d();
      _0xcbc99a();
    }
  });
  $("#cart").on('change', ".item .note", function () {
    var _0x2fbc18 = $(this).closest(".item");
    var _0x2ade74 = _0x2fbc18.attr("data-index");
    var _0x21b736 = $(this).val();
    _0x7b9705[_0x2ade74].note = _0x21b736;
    _0x295e0d();
    _0xcbc99a();
  });
  var _0x329f2f = {};
  $("#cart").on("change", '[name]', function () {
    var _0x310afa = $(this).attr("name");
    var _0x4a9409 = $(this).val();
    if (_0x310afa != 'note' && _0x310afa != "shipping" && _0x310afa != "payment") {
      _0x329f2f[_0x310afa] = _0x4a9409;
      localStorage.buyer = JSON.stringify(_0x329f2f);
    }
  });
  if (localStorage.buyer) {
    var _0x329f2f = JSON.parse(localStorage.buyer);
    for (var _0x7dfe1b in _0x329f2f) {
      $("#cart .form [name=" + _0x7dfe1b + ']').val(_0x329f2f[_0x7dfe1b]).trigger('change');
    }
  }
  $("#cart").on("submit", function (_0xba4ae) {
    _0xba4ae.preventDefault();
    if (!confirm($_config.text.checkout_confirm)) {
      return;
    } else {
      var _0x52e68c = {};
      $('[name]:visible', this).each(function () {
        var _0x232134 = $(this).attr("name");
        var _0xe30a2f = $(this).val();
        _0x52e68c[_0x232134] = _0xe30a2f;
      });
      var _0x38c930 = $_config.text.checkout_intro + "\n\n";
      var _0x3b3318 = 0x0;
      var _0x2d32cc = 0x0;
      var _0x18e58d = 0x0;
      var _0xd9858d = 0x0;
      for (var _0x144444 in _0x7b9705) {
        _0xd9858d++;
        var _0x42a4eb = _0x7b9705[_0x144444];
        _0x38c930 += "                    " + (_0x7b9705.length > 0x1 ? _0xd9858d + ". " : '') + '*' + _0x42a4eb.title + "*\n\n                    " + (_0x42a4eb.variant ? '[tab]' + _0x42a4eb.variant.label + " : *" + _0x42a4eb.variant.value + "*\n" : '') + "                    [tab]" + $_config.text.cart_qty_n_price + " : *" + _0x42a4eb.qty + "* x " + separator(_0x42a4eb.price) + " = *" + separator(_0x42a4eb.price * _0x42a4eb.qty) + "*\n                    [tab]" + $_config.text.cart_note + " : " + (_0x42a4eb.note ? '*' + _0x42a4eb.note + '*' : '-') + "\n                    \n                ";
        _0x3b3318 = _0x3b3318 + Number(_0x42a4eb.qty);
        _0x2d32cc = _0x2d32cc + Number(_0x42a4eb.price * _0x42a4eb.qty);
        _0x18e58d = _0x18e58d + Number(_0x42a4eb.weight * _0x42a4eb.qty);
      }
      _0x38c930 += "                = = = = = = = = = = = = = = =\n                \n                " + (_0x18e58d ? $_config.text.cart_weight + " = *" + kg(_0x18e58d) + "*\n" : '') + "                " + $_config.text.cart_total + " ( " + _0x3b3318 + " " + $_config.text.cart_order + " ) = *" + separator(_0x2d32cc) + "*\n                \n                = = = = = = = = = = = = = = =\n                \n                " + $_config.text.checkout_info + " :\n                \n                *" + _0x52e68c.name + "* ( " + _0x52e68c.phone + " )\n                \n                " + (_0x52e68c.email ? '*' + $_config.text.checkout_email + "* : " + _0x52e68c.email + "\n\n" : '') + "                " + (_0x52e68c.address ? '*' + $_config.text.checkout_address + "* :\n\n" + _0x52e68c.address + "\n\n" : '') + "                *" + $_config.text.checkout_note + "* : " + (_0x52e68c.note ? "\n\n" + _0x52e68c.note : '-') + "\n\n                " + (_0x52e68c.shipping ? '*' + $_config.text.checkout_shipping + "* : " + _0x52e68c.shipping + "\n" + $_config.checkout_form_shipping[_0x52e68c.shipping].info + "\n\n" : '') + "                " + (_0x52e68c.payment ? '*' + $_config.text.checkout_payment + "* : " + _0x52e68c.payment + "\n" + $_config.checkout_form_payment[_0x52e68c.payment].info + "\n\n" : '') + "                via. " + location.protocol + '//' + location.hostname + "            ";
      _0x38c930 = _0x38c930.replaceAll("  ", '').replaceAll("[tab]", "    ");
      _0x38c930 = encodeURIComponent(_0x38c930);
      var _0x2fdd4a = "https://api.whatsapp.com/send?phone=" + $_config.whatsapp + "&text=" + _0x38c930;
      localStorage.removeItem('cart');
      location.href = _0x2fdd4a;
    }
  });
  function _0x295e0d() {
    if (window.localStorage) {
      localStorage.cart = JSON.stringify(_0x7b9705);
    }
  }
  function _0xcbc99a() {
    $("#cart .list").empty();
    if (_0x7b9705.length == 0x0) {
      $("#cart .list_n_form, #cart .cta").hide();
      $("#cart-btn").removeClass('open');
      $("#cart .empty").show();
      return;
    }
    $("#cart .list_n_form, #cart .cta").show();
    $("#cart-btn").addClass("open");
    $("#cart .empty").hide();
    var _0x462501 = 0x0;
    var _0x25b481 = 0x0;
    var _0x1c3f3e = 0x0;
    for (var _0x34f50b in _0x7b9705) {
      var _0x37360f = _0x7b9705[_0x34f50b];
      var _0x1e207f = "                <div class=\"item\" data-id=\"" + _0x37360f.id + "\" data-index=\"" + _0x34f50b + "\">                    <div class=\"left\">                        <b class=\"title\">" + _0x37360f.title + "</b>                        <br>                        " + (_0x37360f.variant ? _0x37360f.variant.label + " : <b class=\"variant\">" + _0x37360f.variant.value + '</b><br>' : '') + "                        <input class=\"note\" type=\"text\" placeholder=\"+ " + $_config.text.cart_note + "..\" value=\"" + (_0x37360f.note ? _0x37360f.note : '') + "\">                        <b class=\"total\">" + separator(_0x37360f.price) + '</b>' + (_0x37360f.unit ? " <span class=\"unit\">/" + _0x37360f.unit + "</span>" : '') + "                    </div>                    <div class=\"right\">                        <a class=\"link\" href=\"" + _0x37360f.link + "\">                            <img class=\"img\" src=\"" + _0x37360f.img + "\"/>                            " + (_0x37360f.weight ? "<small class=\"weight\" title=\"" + $_config.text.cart_weight + "\">" + kg(_0x37360f.weight) + '</small>' : '') + "                        </a>                        <fieldset class=\"qty\">                            <button type=\"button\">-</button>                            <input type=\"number\" value=\"" + _0x37360f.qty + "\">                            <button type=\"button\">+</button>                        </fieldset>                    </div>                </div>";
      $("#cart .list").prepend(_0x1e207f);
      _0x462501 = _0x462501 + Number(_0x37360f.qty);
      _0x25b481 = _0x25b481 + Number(_0x37360f.price * _0x37360f.qty);
      _0x1c3f3e = _0x1c3f3e + Number(_0x37360f.weight * _0x37360f.qty);
    }
    $("#cart .cta .subtotal .wrap .grid.weight").remove();
    if (_0x1c3f3e > 0x0) {
      $("#cart .cta .subtotal .wrap").prepend("                <div class=\"grid weight\">                    <span>                        " + $_config.text.cart_weight + "                    </span>                    <b>" + kg(_0x1c3f3e) + "</b>                </div>            ");
      $("#cart [name=shipping]").show().removeAttr("disabled");
      $("#cart [name=shipping]").prev('.detail').show();
    } else {
      $("#cart [name=shipping]").hide().attr("disabled", true);
      $("#cart [name=shipping]").prev('.detail').hide();
    }
    $("#cart .cta .subtotal .qty, #cart-btn .qty").text(_0x462501);
    $("#cart .cta .subtotal .sub, #cart-btn .sub").text(separator(_0x25b481));
    $('#cart-btn').removeClass("open");
    setTimeout(function () {
      $("#cart-btn").addClass('open');
    }, 0x64);
  }
}
function slideshow() {
  $(".slideshow").each(function () {
    var _0x27f72d = $(this);
    var _0x460ab4 = 0xfa0;
    var _0x73675f = parseInt(_0x27f72d.attr("data-delay"));
    var _0x84e28 = 0x3e8;
    var _0x1f123b = parseInt(_0x27f72d.attr('data-fade'));
    var _0x347e35;
    if (_0x73675f.length) {
      _0x460ab4 = _0x73675f;
    }
    if (_0x1f123b.length) {
      _0x84e28 = _0x1f123b;
    }
    if ($(".slideshow-item, .widget", _0x27f72d).length > 0x1) {
      _0x347e35 = setInterval(function () {
        $(".slideshow-item:visible, .widget:visible", _0x27f72d).each(function () {
          var _0x2a8f6e = $(this);
          _0x2a8f6e.hide();
          if (_0x2a8f6e.next(".slideshow-item, .widget").length) {
            _0x2a8f6e.next(".slideshow-item, .widget").fadeIn(_0x84e28);
          } else {
            _0x2a8f6e.closest(".slideshow").find(".slideshow-item, .widget").first().fadeIn(_0x84e28);
          }
        });
      }, _0x460ab4);
      $(this).append("  <button class=\"nav-left\" aria-label=\"Navigation\">    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z\"/></svg>  </button>  <button class=\"nav-right\" aria-label=\"Navigation\">    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z\"/></svg>  </button>   ");
    }
    $(".nav-left", _0x27f72d).on("click", function () {
      clearInterval(_0x347e35);
      $(".slideshow-item:visible, .widget:visible", _0x27f72d).each(function () {
        var _0xa9bd6b = $(this);
        _0xa9bd6b.hide();
        if (_0xa9bd6b.prev(".slideshow-item, .widget").length) {
          _0xa9bd6b.prev(".slideshow-item, .widget").fadeIn(_0x84e28);
        } else {
          _0xa9bd6b.closest('.slideshow').find(".slideshow-item, .widget").last().fadeIn(_0x84e28);
        }
      });
    });
    $(".nav-right", _0x27f72d).on("click", function () {
      clearInterval(_0x347e35);
      $(".slideshow-item:visible, .widget:visible", _0x27f72d).each(function () {
        var _0x517ff1 = $(this);
        _0x517ff1.hide();
        if (_0x517ff1.next(".slideshow-item, .widget").length) {
          _0x517ff1.next(".slideshow-item, .widget").fadeIn(_0x84e28);
        } else {
          _0x517ff1.closest(".slideshow").find(".slideshow-item, .widget").first().fadeIn(_0x84e28);
        }
      });
    });
  });
}
function product_sort() {
  $("#sort select").on("change", function () {
    $("#sort").addClass("loading");
    if ($(this).val() == 'terbaru') {
      var _0x180efc = $(".Blog article");
      _0x180efc.sort(function (_0x35d830, _0x53b453) {
        return new Date($("[itemprop=\"releaseDate\"]", _0x53b453).attr("content")).getTime() - new Date($("[itemprop=\"releaseDate\"]", _0x35d830).attr("content")).getTime();
      });
      setTimeout(function () {
        $(".Blog .is_loop").append(_0x180efc);
        $("#sort").removeClass("loading");
        lazyload();
      }, 0x1f4);
    }
    if ($(this).val() == "terlama") {
      var _0x180efc = $(".Blog article");
      _0x180efc.sort(function (_0x50c95c, _0x33ff6f) {
        return new Date($("[itemprop=\"releaseDate\"]", _0x50c95c).attr("content")).getTime() - new Date($("[itemprop=\"releaseDate\"]", _0x33ff6f).attr("content")).getTime();
      });
      setTimeout(function () {
        $(".Blog .is_loop").append(_0x180efc);
        $('#sort').removeClass("loading");
        lazyload();
      }, 0x1f4);
    }
    if ($(this).val() == "terendah") {
      var _0x180efc = $(".Blog article");
      _0x180efc.sort(function (_0x2610d9, _0x54f8cc) {
        return $(".price b", _0x2610d9).attr("data-price") - $(".price b", _0x54f8cc).attr("data-price");
      });
      setTimeout(function () {
        $(".Blog .is_loop").append(_0x180efc);
        $('#sort').removeClass('loading');
        lazyload();
      }, 0x1f4);
    }
    if ($(this).val() == 'tertinggi') {
      var _0x180efc = $(".Blog article");
      _0x180efc.sort(function (_0x151169, _0x29f04e) {
        return $(".price b", _0x29f04e).attr("data-price") - $(".price b", _0x151169).attr('data-price');
      });
      setTimeout(function () {
        $(".Blog .is_loop").append(_0x180efc);
        $("#sort").removeClass("loading");
        lazyload();
      }, 0x1f4);
    }
  });
  if ($("#sort select").val() != '') {
    $("#sort select").trigger('change');
  }
}
function product_convert() {
  $(".product:not(.field_loaded)").each(function () {
    var _0x1aea8b = $(this);
    _0x1aea8b.addClass("field_loaded");
    $("meta[itemprop=\"priceCurrency\"]", _0x1aea8b).attr("content", $_config.money.currency);
    if (_0x1aea8b.hasClass("is_post") && $(".image .gallery", this).length) {
      $(".image .gallery img", this).each(function (_0xbb9fc5) {
        var _0x3bc950 = $(this).attr("src").split('=')[0x0];
        var _0x19f79f = _0x3bc950.split('/')[0x7];
        var _0x2837ab = _0x3bc950.replace(_0x19f79f, "w150-h150-c") + "=w150-h150-c";
        var _0x194a58 = _0x3bc950.replace(_0x19f79f, 's800') + '=s800';
        $("figure.cover", _0x1aea8b).append("<a data-lightbox=\"gallery\" data-lightbox-title=\"" + $(".title", _0x1aea8b).text() + "\" href=\"" + _0x194a58 + "\"><img data-src=\"" + _0x2837ab + "\"/></a>");
      });
    }
    var _0x3cd353 = {};
    $(".field td[class]", _0x1aea8b).each(function () {
      var _0x147d08 = $(this).attr("class");
      if (_0x147d08 != 'img') {
        _0x3cd353[_0x147d08] = $(this).text().replaceAll(" ", '').replaceAll('.', '').replaceAll(',', '').replaceAll('%', '').replaceAll(/(?:\r\n|\r|\n)/g, '');
      }
    });
    if (_0x3cd353.status == 'off') {
      _0x1aea8b.addClass("empty");
      $("figure.cover a:first", _0x1aea8b).append("<span class=\"empty\"><b>" + $_config.text.product_empty + "</b></span>");
      $("[itemprop=\"availability\"]", _0x1aea8b).attr("content", "https://schema.org/OutOfStock");
    }
    var _0x142f07 = "            <div class=\"price\" data-price=\"" + Number(_0x3cd353.price) + "\" data-discount=\"" + Number(_0x3cd353.discount) + "\" data-unit=\"" + _0x3cd353.unit + "\" data-weight=\"" + Number(_0x3cd353.weight) + "\"></div>        ";
    if (_0x1aea8b.hasClass("is_post")) {
      _0x142f07 += "                <br>                <div class=\"option\">            ";
      var _0x43816b = $('.variant', _0x1aea8b);
      if ($('.status', _0x43816b).text() == 'on') {
        _0x142f07 += "                    <div class=\"item variant\">                        <label>                            " + $(".label", _0x43816b).text() + "                        </label>                        <fieldset>                ";
        $('.name', _0x43816b).each(function () {
          if ($(this).text()) {
            _0x142f07 += "                            <button " + ($(this).next(".price").text() ? "data-price=\"" + $(this).next(".price").text().replaceAll('.', '').replaceAll(',', '') + "\"" : '') + '>' + $(this).text() + "</button>                        ";
          }
        });
        _0x142f07 += "                        </fieldset>                    </div>                ";
      }
      _0x142f07 += "                <div class=\"item qty\">                    <label>                        " + $_config.text.product_qty + "                    </label>                    <fieldset>                        <button>-</button>                        <input type=\"number\" value=\"1\">                        <button>+</button>                    </fieldset>                </div>            ";
      _0x142f07 += "                </div>                <div class=\"cta " + (_0x3cd353.status == "off" ? 'disabled' : '') + "\">                    <button class=\"chat\" target=\"pop-chat\">                        <svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\">                            <path d=\"M260.062 32C138.605 32 40.134 129.701 40.134 250.232c0 41.23 11.532 79.79 31.559 112.687L32 480l121.764-38.682c31.508 17.285 67.745 27.146 106.298 27.146C381.535 468.464 480 370.749 480 250.232 480 129.701 381.535 32 260.062 32zm109.362 301.11c-5.174 12.827-28.574 24.533-38.899 25.072-10.314.547-10.608 7.994-66.84-16.434-56.225-24.434-90.052-83.844-92.719-87.67-2.669-3.812-21.78-31.047-20.749-58.455 1.038-27.413 16.047-40.346 21.404-45.725 5.351-5.387 11.486-6.352 15.232-6.413 4.428-.072 7.296-.132 10.573-.011 3.274.124 8.192-.685 12.45 10.639 4.256 11.323 14.443 39.153 15.746 41.989 1.302 2.839 2.108 6.126.102 9.771-2.012 3.653-3.042 5.935-5.961 9.083-2.935 3.148-6.174 7.042-8.792 9.449-2.92 2.665-5.97 5.572-2.9 11.269 3.068 5.693 13.653 24.356 29.779 39.736 20.725 19.771 38.598 26.329 44.098 29.317 5.515 3.004 8.806 2.67 12.226-.929 3.404-3.599 14.639-15.746 18.596-21.169 3.955-5.438 7.661-4.373 12.742-2.329 5.078 2.052 32.157 16.556 37.673 19.551 5.51 2.989 9.193 4.529 10.51 6.9 1.317 2.38.901 13.531-4.271 26.359z\"></path>                        </svg>                    </button>            ";
      _0x142f07 += "                <button class=\"cart-add\">                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">                        <path d=\"M387.9 373.7h49.2l17.5-75.4h-66.7zM387.9 448h.5c18.7 0 33.4-12.5 38.3-29.5l6-25.9h-44.8V448zM265.4 392.5h103.7V448H265.4zM75 373.7h49v-75.4H57.5zM142.9 192h103.7v87.5H142.9zM265.4 192h103.7v87.5H265.4zM85.5 418.3c4.7 17 19.4 29.7 38.1 29.7h.5v-55.5H79.4l6.1 25.8zM142.9 392.5h103.7V448H142.9zM265.4 298.3h103.7v75.4H265.4zM142.9 298.3h103.7v75.4H142.9z\" />                        <path d=\"M464 192h-47.9V96c0-17.6-14.4-32-32-32H127.9c-17.6 0-32 14.4-32 32v96H48c-10.3 0-17.9 9.6-15.6 19.6l19.7 67.9H124V106c0-7.7 6.3-14 14-14h236c7.7 0 14 6.3 14 14v173.5h72l19.6-67.9c2.3-10-5.3-19.6-15.6-19.6z\" />                    </svg>                    " + $_config.text.product_add + "                </button>            ";
      _0x142f07 += "                </div>            ";
      if (_0x3cd353.status == 'on') {
        var _0x497ca8 = $(".marketplace", _0x1aea8b);
        if ($(".status", _0x497ca8).text() == 'on') {
          _0x142f07 += "                        <div class=\"marketplace\">                            <small>" + $_config.text.product_via_marketplace + "</small>                            <br>                    ";
          $(".link", _0x497ca8).each(function () {
            if ($(this).text()) {
              _0x142f07 += "                                <a href=\"" + $(this).text() + "\" target=\"_blank\" title=\"" + $(this).text().split('/')[0x2].toLowerCase().replace("www.", '') + "\" rel=\"nofollow\">                                    <img src=\"https://www.google.com/s2/favicons?domain=" + $(this).text().split('/')[0x2] + "&sz=24\" alt=\"favicon\"/>                                </a>                            ";
            }
          });
          _0x142f07 += "                        </div>                    ";
        }
      }
    }
    var _0x4579f6 = $(".title", this);
    $(_0x142f07).insertAfter(_0x4579f6);
    var _0x1aea8b = $(this);
    var _0x1eb356 = $('.price', _0x1aea8b).attr("data-unit");
    var _0x448650 = Number($(".price", _0x1aea8b).attr('data-price'));
    var _0x5b9cf1 = Number($('.price', _0x1aea8b).attr('data-discount'));
    if (_0x5b9cf1) {
      var _0x24aa4e = _0x448650 - _0x448650 * _0x5b9cf1 / 0x64;
      if (_0x3cd353.mark) {
        $(".price", _0x1aea8b).html('<small>' + _0x3cd353.mark + "</small><s>" + separator(_0x448650) + "</s><b data-price=\"" + _0x24aa4e + "\">" + separator(_0x24aa4e) + "</b>" + (_0x1eb356 ? "<span>/" + _0x1eb356 + "</span>" : ''));
      } else {
        $(".price", _0x1aea8b).html("<small>-" + _0x5b9cf1 + '%</small><s>' + separator(_0x448650) + "</s><b data-price=\"" + _0x24aa4e + "\">" + separator(_0x24aa4e) + "</b>" + (_0x1eb356 ? "<span>/" + _0x1eb356 + "</span>" : ''));
      }
      $("[itemprop=\"price\"]", this).attr("content", _0x24aa4e);
    } else {
      if (_0x3cd353.mark) {
        $(".price", _0x1aea8b).html("<small>" + _0x3cd353.mark + "</small><b data-price=\"" + _0x448650 + "\">" + separator(_0x448650) + "</b>" + (_0x1eb356 ? '<span>/' + _0x1eb356 + "</span>" : ''));
      } else {
        $(".price", _0x1aea8b).html("<b data-price=\"" + _0x448650 + "\">" + separator(_0x448650) + "</b>" + (_0x1eb356 ? "<span>/" + _0x1eb356 + '</span>' : ''));
      }
      $("[itemprop=\"price\"]", this).attr("content", _0x448650);
    }
    $(".variant button", _0x1aea8b).each(function () {
      var _0x3b7d4b = $(this).attr("data-price");
      if (!_0x3b7d4b) {
        var _0x547eb8 = $(".price", _0x1aea8b).attr("data-price");
        $(this).attr('data-price', _0x547eb8);
      }
    });
    $(".variant button", _0x1aea8b).on("click", function () {
      $(".variant button", _0x1aea8b).removeClass("active");
      $(this).addClass("active");
      var _0x569efc = $(this).attr("data-price");
      if (_0x569efc) {
        if (_0x5b9cf1) {
          var _0x5a42d5 = _0x569efc - _0x569efc * _0x5b9cf1 / 0x64;
          if (_0x3cd353.mark) {
            $(".price", _0x1aea8b).html("<small>" + _0x3cd353.mark + "</small><s>" + separator(_0x569efc) + "</s><b data-price=\"" + _0x5a42d5 + "\">" + separator(_0x5a42d5) + "</b>" + (_0x1eb356 ? "<span>/" + _0x1eb356 + "</span>" : ''));
          } else {
            $('.price', _0x1aea8b).html("<small>-" + _0x5b9cf1 + "%</small><s>" + separator(_0x569efc) + "</s><b data-price=\"" + _0x5a42d5 + "\">" + separator(_0x5a42d5) + '</b>' + (_0x1eb356 ? "<span>/" + _0x1eb356 + '</span>' : ''));
          }
          $("[itemprop=\"price\"]", this).attr("content", _0x5a42d5);
        } else {
          if (_0x3cd353.mark) {
            $(".price", _0x1aea8b).html("<small>" + _0x3cd353.mark + "</small><b data-price=\"" + _0x569efc + "\">" + separator(_0x569efc) + '</b>' + (_0x1eb356 ? "<span>/" + _0x1eb356 + "</span>" : ''));
          } else {
            $('.price', _0x1aea8b).html("<b data-price=\"" + _0x569efc + "\">" + separator(_0x569efc) + '</b>' + (_0x1eb356 ? "<span>/" + _0x1eb356 + "</span>" : ''));
          }
          $("[itemprop=\"price\"]", this).attr("content", _0x569efc);
        }
      }
    });
    $(".variant button:first", _0x1aea8b).trigger("click");
    $(".qty input", _0x1aea8b).on("change", function () {
      var _0x360f12 = Number($(".qty input", _0x1aea8b).val());
      if (_0x360f12 < 0x1) {
        _0x360f12 = 0x1;
      }
      $(".qty input", _0x1aea8b).val(_0x360f12);
    });
    $(".qty button", _0x1aea8b).on("click", function () {
      var _0x2a66de = Number($(".qty input", _0x1aea8b).val());
      if ($(this).text() == '-') {
        _0x2a66de = _0x2a66de - 0x1;
      } else {
        _0x2a66de = _0x2a66de + 0x1;
      }
      $(".qty input", _0x1aea8b).val(_0x2a66de).trigger("change");
    });
  });
}
function popwin(_0x4a23dd = '', _0x1f6eca = '', _0x2796ad = '') {
  if (_0x4a23dd) {
    var _0x107b1b = 0x3c0;
    if (_0x1f6eca) {
      _0x107b1b = _0x1f6eca;
    }
    var _0x46888d = 0x21c;
    if (_0x2796ad) {
      _0x46888d = _0x2796ad;
    }
    var _0x242f3d = Number(screen.width / 0x2 - _0x107b1b / 0x2);
    var _0x371e83 = Number(screen.height / 0x2 - _0x46888d / 0x2);
    var _0x51cde8 = window.open(_0x4a23dd, '', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=" + _0x107b1b + ", height=" + _0x46888d + ", top=" + _0x371e83 + ", left=" + _0x242f3d);
    _0x51cde8.focus();
  } else {
    $(document).on("click", "[target=\"_popwin\"]", function (_0x4600d1) {
      _0x4600d1.stopPropagation();
      _0x4600d1.preventDefault();
      var _0x4cf4db = $(this).attr("href");
      var _0x229272 = $(this).attr('data-popwin-width');
      var _0x5b7dc4 = $(this).attr("data-popwin-height");
      var _0x573ddb = 0x3c0;
      if (_0x229272) {
        _0x573ddb = _0x229272;
      }
      var _0x2f0ed3 = 0x21c;
      if (_0x5b7dc4) {
        _0x2f0ed3 = _0x5b7dc4;
      }
      var _0x2abf91 = Number(screen.width / 0x2 - _0x573ddb / 0x2);
      var _0x378930 = Number(screen.height / 0x2 - _0x2f0ed3 / 0x2);
      var _0x20a174 = window.open(_0x4cf4db, '', "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=1, copyhistory=no, width=" + _0x573ddb + ", height=" + _0x2f0ed3 + ", top=" + _0x378930 + ", left=" + _0x2abf91);
      _0x20a174.focus();
    });
  }
}
function shortcode() {
  $(".post-body").each(function () {
    $(this).html($(this).html().replace(/\[youtube\]/g, "<div class=\"video\"><iframe allowfullscreen=\"true\" data-shortcode=\"youtube\" data-src=\"").replace(/\[\/youtube\]/g, "\"></iframe></div>").replace(/\[code\]/g, "<pre data-shortcode=\"code\"><code>").replace(/\[\/code\]/g, "</code></pre>").replace(/\[img\]/g, "<img style=\"display:block;width:100%;border-radius:10px;\" data-shortcode=\"img\" src=\"").replace(/\[\/img\]/g, "\" alt=\"image\"/>").replace(/\[url\]/g, "<a data-shortcode=\"url\" href=\"").replace(/\[\/url\]/g, "\" target=\"_blank\" rel=\"nofollow external\">Lihat Tautan</a>"));
  });
  $('[data-shortcode]').each(function () {
    var _0x2adec4 = $(this).attr("data-shortcode");
    if (_0x2adec4 == "img") {
      var _0x2dfa0c = $(this).attr('src');
      $(this).wrap("<a class=\"lightbox\" href=\"" + _0x2dfa0c + "\"></a>");
    }
    if (_0x2adec4 == 'youtube') {
      var _0x4f5fb2 = $(this).attr("data-src");
      var _0x30b8c2 = _0x4f5fb2.split('/')[0x3];
      if (_0x4f5fb2.indexOf("https://www.youtube.com/watch?v=") >= 0x0) {
        _0x30b8c2 = get_url_parameter('v', _0x4f5fb2);
      }
      $(this).attr('data-src', 'https://www.youtube.com/embed/' + _0x30b8c2 + "?rel=0");
    }
  });
}
function translate() {
  $('[data-text]').each(function () {
    var _0x367276 = $(this).attr("data-text");
    if ($_config.text[_0x367276]) {
      $(this).text($_config.text[_0x367276]);
    } else {
      $(this).text(_0x367276);
    }
  });
  $("[data-text-label]").each(function () {
    var _0x1c52c2 = $(this).attr("data-text-label");
    if ($_config.text[_0x1c52c2]) {
      $(this).attr('label', $_config.text[_0x1c52c2]);
    } else {
      $(this).attr('label', _0x1c52c2);
    }
  });
  $("[data-text-placeholder]").each(function () {
    var _0x548e29 = $(this).attr("data-text-placeholder");
    if ($_config.text[_0x548e29]) {
      $(this).attr('placeholder', $_config.text[_0x548e29]);
    } else {
      $(this).attr('placeholder', _0x548e29);
    }
  });
  $("[data-text-pop-title]").each(function () {
    var _0x3f5593 = $(this).attr('data-text-pop-title');
    if ($_config.text[_0x3f5593]) {
      $(this).attr("data-pop-title", $_config.text[_0x3f5593]);
    } else {
      $(this).attr("data-pop-title", _0x3f5593);
    }
  });
}
function etc() {
  $(window).on('beforeunload', function () {
    $("body").addClass('loading');
    setTimeout(function () {
      $("body").removeClass('loading');
    }, 0x7d0);
  });
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0x0) {
      $('#header').addClass("shadow");
    } else {
      $("#header").removeClass("shadow");
    }
  });
  $("#header a[target=pop-search]").on("click", function () {
    setTimeout(function () {
      $("#header #pop-search [type=search]").focus();
    }, 0x32);
  });
  $("#pop-chat").on("submit", 'form', function (_0x223109) {
    _0x223109.preventDefault();
    var _0x11c41b = $("input", this).val() + "\n\nvia. " + location.href;
    var _0x1a0b68 = 'https://api.whatsapp.com/send?phone=' + $_config.whatsapp + "&text=" + encodeURIComponent(_0x11c41b);
    popwin(_0x1a0b68);
  });
  $(".LinkList li a[href*=\"#\"]").each(function () {
    $(this).attr("href", "javascript:void(0)");
    $(this).append("<i class=\"icon right\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z\"/></svg></i>");
    var _0xce5f1 = $(this).parent('li');
    _0xce5f1.addClass("dropdown");
    _0xce5f1.wrapInner("<span class=\"dropdown-title\"></span>");
    _0xce5f1.append("<ul class=\"sub\"></ul>");
  });
  $(".LinkList li a:contains(\"_\")").each(function () {
    var _0x56d6ca = $(this).parent('li').prev(".dropdown").find('ul');
    $(this).parent('li').appendTo(_0x56d6ca);
    var _0x3ff809 = $(this).text().replaceAll('_', '').replaceAll("_ ", '');
    $(this).text(_0x3ff809);
  });
  $(".LinkList").on("click", 'li.dropdown', function () {
    $(this).find("ul:first").toggle();
    $(this).toggleClass("active");
  });
  if ($("[data-feed]").length) {
    $("[data-feed]").each(function () {
      var _0x3afcbb = $(this);
      var _0x17f74b = $(this).attr('data-feed').replace("?m=1", '').replace("&m=1", '').replaceAll(" ", "%20");
      _0x3afcbb.addClass('loading');
      _0x3afcbb.load(_0x17f74b + " .is_loop", function () {
        var _0x215aad = $(this).html();
        _0x3afcbb.html(_0x215aad);
        var _0x237214 = _0x3afcbb.attr('data-hide-id');
        if (_0x237214) {
          if (_0x3afcbb.find("article#" + _0x237214).length) {
            _0x3afcbb.find("article#" + _0x237214).remove();
          } else {
            _0x3afcbb.find("article:last-of-type").remove();
          }
        }
        product_convert();
        lazyload();
        timeago();
        _0x3afcbb.removeClass("loading");
        if (_0x3afcbb.find("article").length == 0x0) {
          _0x3afcbb.closest("#related").remove();
        }
      });
    });
  }
  $("#pop-bagikan .copy button").on("click", function (_0x42df07) {
    var _0x22f410 = $(this);
    _0x22f410.siblings('input').select();
    document.execCommand('copy');
    _0x22f410.text("Disalin!");
    setTimeout(function () {
      _0x22f410.text("Salin");
    }, 0x7d0);
  });
  if (window.location.hash) {
    if ($(window.location.hash).length) {
      var _0x390a00 = $("#header").outerHeight();
      var _0x1248e8 = $(".is_single article .attr-sticky").outerHeight();
      $("html, body").stop().animate({
        'scrollTop': $(window.location.hash).offset().top - _0x390a00 - _0x1248e8 - 0x14
      }, 0x1f4);
      $(window.location.hash).addClass("focus");
      setTimeout(function () {
        $(window.location.hash).removeClass("focus");
      }, 0x7d0);
    }
  }
  $(document).on("click", "a[href*=\"#\"]", function (_0x4e7a94) {
    var _0x8b6272 = '#' + $(this).attr('href').split('#')[0x1];
    if ($(_0x8b6272).length && $(this).attr("href").split('#')[0x0] === '') {
      _0x4e7a94.preventDefault();
      var _0x57e2d6 = $('#header').outerHeight();
      var _0x36bb38 = $(".is_single article .attr-sticky").outerHeight();
      if (_0x36bb38) {
        $("html, body").stop().animate({
          'scrollTop': $(_0x8b6272).offset().top - _0x57e2d6 - _0x36bb38 - 0x14
        }, 0x1f4);
      } else {
        $("html, body").stop().animate({
          'scrollTop': $(_0x8b6272).offset().top - _0x57e2d6 - 0x14
        }, 0x1f4);
      }
      $(_0x8b6272).addClass("focus");
      setTimeout(function () {
        $(_0x8b6272).removeClass("focus");
      }, 0x7d0);
    }
  });
  $(document).on("click", ".loadmore-btn", function (_0x3f5f38) {
    _0x3f5f38.preventDefault();
    let _0x59f9a5 = $(this).attr("href");
    let _0x1dbec5 = $("#blog-pager .loadmore-btn");
    if (_0x59f9a5) {
      $.ajax({
        'url': _0x59f9a5,
        'beforeSend': function () {
          _0x1dbec5.addClass('loading');
        },
        'complete': function () {
          _0x1dbec5.removeClass("loading");
        },
        'success': function (_0xf981f8) {
          let _0x5d5795 = $(_0xf981f8).find(".Blog .is_loop").html();
          let _0x438c2 = $(_0xf981f8).find(".loadmore-btn").attr("href");
          $(".Blog .is_loop").append(_0x5d5795);
          _0x1dbec5.show();
          product_convert();
          product_sort();
          lazyload();
          timeago();
          if (_0x438c2) {
            _0x1dbec5.attr("href", _0x438c2);
          } else {
            _0x1dbec5.fadeOut();
          }
        }
      });
    }
  });
  if ($_config.url.view == 'single') {
    var _0x1d00fa = $_config.text.product_prev;
    var _0x48719d = $('a.blog-pager-older-link').attr("href");
    $("a.blog-pager-older-link").load(_0x48719d + " article h1", function () {
      var _0x4a6320 = $('a.blog-pager-older-link').text();
      $("a.blog-pager-older-link").html("<figure class=\"loading\"></figure><div class=\"flex left\"><div class=\"wrap\"><small><b>" + _0x1d00fa + "</b></small><h3>" + _0x4a6320 + "</h3></div></div>");
      $("a.blog-pager-older-link > figure").load(_0x48719d + " article .post-body img:first-of-type", function () {
        var _0x1fde0e = $(this).html();
        var _0x2d89f0 = _0x1fde0e.split("src=\"")[0x1];
        var _0x20f769 = _0x2d89f0.split("\"")[0x0];
        var _0x4fa911 = _0x20f769.split('=')[0x0];
        var _0xe30810 = _0x4fa911.split('/')[0x7];
        _0x4fa911 = _0x4fa911.replace(_0xe30810, "w100-h100-c") + "=w100-h100-c";
        $("a.blog-pager-older-link > figure").html("<img src=\"" + _0x4fa911 + "\"/>").removeClass("loading");
      });
    });
    var _0x52fb79 = $_config.text.product_next;
    var _0x236ace = $('a.blog-pager-newer-link').attr("href");
    $('a.blog-pager-newer-link').load(_0x236ace + " article h1", function () {
      var _0x447746 = $('a.blog-pager-newer-link').text();
      $('a.blog-pager-newer-link').html("<figure class=\"loading\"></figure><div class=\"flex right\"><div class=\"wrap\"><small><b>" + _0x52fb79 + "</b></small><h3>" + _0x447746 + "</h3></div></div>");
      $("a.blog-pager-newer-link > figure").load(_0x236ace + " article .post-body img:first-of-type", function () {
        var _0x30b54 = $(this).html();
        var _0x4da520 = _0x30b54.split("src=\"")[0x1];
        var _0x3224b5 = _0x4da520.split("\"")[0x0];
        var _0x389005 = _0x3224b5.split('=')[0x0];
        var _0x266413 = _0x389005.split('/')[0x7];
        _0x389005 = _0x389005.replace(_0x266413, 'w100-h100-c') + "=w100-h100-c";
        $("a.blog-pager-newer-link > figure").html("<img src=\"" + _0x389005 + "\"/>").removeClass("loading");
      });
    });
  }
}
function timeago() {
  $("[datetime]:not(.timeago)").each(function () {
    var _0x1ec8a3 = $(this);
    var _0x3adefb = _0x1ec8a3.attr('datetime');
    _0x1ec8a3.addClass('timeago');
    if (!_0x1ec8a3.attr('title')) {
      _0x1ec8a3.attr("title", _0x3adefb);
    }
    _0x1ec8a3.text(_0x3c9fe2(_0x3adefb));
  });
  function _0x3c9fe2(_0x2b3966) {
    var _0x5a56ec = "ago";
    var _0x737518 = "seconds";
    var _0x4bda47 = "minutes";
    var _0x1aa6b1 = "hours";
    var _0x17778f = "days";
    var _0x4a9abe = "months";
    var _0x21bf7e = "years";
    if ($_config.money.country_id == "id-ID") {
      _0x5a56ec = "yang lalu";
      _0x737518 = "detik";
      _0x4bda47 = 'menit';
      _0x1aa6b1 = "jam";
      _0x17778f = "hari";
      _0x4a9abe = "bulan";
      _0x21bf7e = "tahun";
    }
    var _0x62e752 = new Date(_0x2b3966);
    var _0x4c3949 = _0x5a56ec;
    var _0x528548 = new Date() - _0x62e752;
    return _0x528548 < 0xea60 ? Math.round(_0x528548 / 0x3e8) + " " + _0x737518 + " " + _0x4c3949 : _0x528548 < 0x36ee80 ? Math.round(_0x528548 / 0xea60) + " " + _0x4bda47 + " " + _0x4c3949 : _0x528548 < 86400000 ? Math.round(_0x528548 / 0x36ee80) + " " + _0x1aa6b1 + " " + _0x4c3949 : _0x528548 < 2592000000 ? Math.round(_0x528548 / 86400000) + " " + _0x17778f + " " + _0x4c3949 : _0x528548 < 31536000000 ? Math.round(_0x528548 / 2592000000) + " " + _0x4a9abe + " " + _0x4c3949 : Math.round(_0x528548 / 31536000000) + " " + _0x21bf7e + " " + _0x4c3949;
  }
  $("#comments .datetime a:not(.timeago)").each(function () {
    var _0x3e53f7 = $(this);
    var _0x4700a8 = _0x3e53f7.text();
    _0x3e53f7.attr("datetime", _0x4700a8);
    var _0xdd3c27 = _0x3e53f7.attr("datetime");
    _0x3e53f7.addClass('timeago');
    _0x3e53f7.attr('title', _0xdd3c27);
    _0x3e53f7.text(_0x3c9fe2(_0xdd3c27));
  });
}
function separator(_0x1438d4) {
  var _0x3a46f1 = '';
  var _0x1fa800 = _0x1438d4.toString().split('').reverse().join('');
  for (var _0x32e66f = 0x0; _0x32e66f < _0x1fa800.length; _0x32e66f++) {
    if (_0x32e66f % 0x3 == 0x0) {
      _0x3a46f1 += _0x1fa800.substr(_0x32e66f, 0x3) + '.';
    }
  }
  return _0x3a46f1.split('', _0x3a46f1.length - 0x1).reverse().join('');
}
function kg(_0x3c29d0) {
  var _0x9ea652 = _0x3c29d0 + " Gram";
  if (_0x3c29d0 >= 0x3e8) {
    _0x9ea652 = _0x3c29d0 / 0x3e8 + " Kg";
  }
  return _0x9ea652;
}
function pop() {
  if ($("[target=pop-video]").length) {
    $pop_video_html = "             <div id=\"pop-video\" data-pop-title=\"Video\" data-pop-width=\"960\">               <div class=\"video\">              <iframe allowfullscreen=\"true\"></iframe>               </div>             </div>             ";
    $($pop_video_html).appendTo("body");
  }
  $("[id*=\"pop-\"]:not(\".pop-loaded\")").each(function () {
    var _0x8e6bbc = $(this);
    var _0x5cdaf1 = _0x8e6bbc.attr("data-pop-title");
    var _0x154450 = _0x8e6bbc.attr("data-pop-width");
    _0x8e6bbc.wrap("<div class=\"pop\"></div>");
    _0x8e6bbc.wrap("<div class=\"pop-wrap\"></div>");
    _0x8e6bbc.addClass("pop-content pop-loaded");
    var _0x37fc39 = "            <header class=\"pop-header\">                <div class=\"pop-title\">                    <h3>                           " + _0x5cdaf1 + "                    </h3>                </div>                <div class=\"pop-close\">                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z\"/></svg>                </div>            </header>        ";
    _0x8e6bbc.closest('.pop-wrap').prepend(_0x37fc39);
    if (_0x154450) {
      _0x8e6bbc.closest('.pop-wrap').css('width', _0x154450);
    }
  });
  $(".pop-close").on("click", function () {
    $(this).closest(".pop").removeClass('open');
    $('body').removeClass("pop-open");
    if ($("[id=pop-video] iframe").length) {
      $("[id=pop-video] iframe").attr("src", '');
    }
  });
  $(document).on("click", "[target*=\"pop-\"]", function (_0x333ba0) {
    _0x333ba0.preventDefault();
    var _0x26e57b = $(this);
    var _0x116534 = _0x26e57b.attr("target");
    var _0x351227 = _0x26e57b.attr("data-pop-title") ? _0x26e57b.attr("data-pop-title") : $('#' + _0x116534).attr("data-pop-title");
    _0x26e57b.closest(".pop").removeClass("open");
    $("body").removeClass("pop-open");
    if ($('#' + _0x116534).length) {
      $("body").addClass("pop-open");
      $('#' + _0x116534).closest(".pop").addClass("open");
      if (_0x26e57b.closest(".pop-content").length) {
        $back_id = _0x26e57b.closest(".pop-content").attr('id');
        _0x351227 = "<a target=\"" + $back_id + "\"><i class=\"pop-back\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z\"/></svg></i></a>" + _0x351227;
      }
      if (_0x351227) {
        $('#' + _0x116534).closest(".pop").find(".pop-title h3").html(_0x351227);
      }
      $("[data-src]").each(function () {
        var _0x3d9800 = $(this).attr("data-src");
        $(this).attr("src", _0x3d9800).removeAttr("data-src");
      });
    }
    if (_0x116534 == "pop-video") {
      $href = $(this).attr("href");
      var _0x136239 = $href.split('/')[0x3];
      if ($href.indexOf("https://www.youtube.com/watch?v=") >= 0x0) {
        _0x136239 = get_url_parameter('v', $href);
      }
      $("[id=pop-video] iframe").attr("src", 'https://www.youtube.com/embed/' + _0x136239 + "?autoplay=1&showinfo=0");
    }
  });
  $(document).on("click", ".pop.open", function () {
    $(this).find(".pop-close").trigger("click");
  });
  $(document).on("click", '.pop-wrap', function (_0x10b07b) {
    _0x10b07b.stopPropagation();
  });
}
function lightbox() {
  $("        <div id=\"lightbox\">            <div class=\"lb-wrap\">                <figure>                    <div class=\"lb-img\">                        <div class=\"lb-count\"></div>                    </div>                    <nav class=\"lb-nav\">                        <div class=\"lb-np lb-prev\"></div>                        <div class=\"lb-close\"></div>                        <div class=\"lb-np lb-next\"></div>                    </nav>                </figure>            </div>        </div>    ").appendTo("body");
  $('[data-lightbox]').each(function () {
    var _0x49f5cf = $(this).attr('data-lightbox');
    var _0x9e9618 = $('[data-lightbox=' + _0x49f5cf + ']').length;
    if (_0x9e9618 > 0x1) {
      $('[data-lightbox=' + _0x49f5cf + ']').each(function (_0x14af21) {
        $(this).attr("data-lightbox-index", _0x14af21 + 0x1 + " / " + _0x9e9618);
      });
    }
    $(this).on('mousedown', function () {
      return false;
    });
    $(this).on('contextmenu', function () {
      alert("ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© " + $_config.page.title);
      return false;
    });
  });
  $(document).on("click", "[data-lightbox]", function (_0x284a63) {
    _0x284a63.preventDefault();
    var _0x5a4348 = $(this);
    var _0xcc581c = _0x5a4348.attr("data-lightbox");
    var _0x2522d8 = _0x5a4348.attr("data-lightbox-index");
    var _0x75acce = _0x5a4348.attr("data-lightbox-title");
    var _0x2ac856 = _0x5a4348.attr("data-lightbox-desc");
    var _0x98a0d0 = _0x5a4348.attr("href");
    $("#lightbox").scrollTop(0x0);
    $("#lightbox .lb-close").hide();
    $("#lightbox .lb-wrap figure .lb-img img").remove();
    $("#lightbox .lb-count").hide();
    $("#lightbox .lb-wrap figure figcaption").remove();
    $("#lightbox .lb-np").hide();
    if (_0x98a0d0) {
      $("#lightbox .lb-wrap").addClass('lb-loading');
      $("#lightbox .lb-wrap figure .lb-img").prepend("<img data-src=\"" + _0x98a0d0 + "\"/>");
      $("#lightbox .lb-wrap figure .lb-img img").attr('src', _0x98a0d0).on("load", function () {
        $(this).removeAttr("data-src");
        $(this).on("mousedown", function () {
          return false;
        });
        $(this).on("contextmenu", function () {
          alert("ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© " + $_config.page.title);
          return false;
        });
        $("#lightbox .lb-wrap").removeClass('lb-loading');
        if (_0x75acce || _0x2ac856) {
          $("#lightbox .lb-wrap figure").append("<figcaption></figcaption>");
        }
        if (_0x75acce) {
          $("#lightbox .lb-wrap figure figcaption").append("<h4>" + _0x75acce + '</h4>');
        }
        if (_0x2ac856) {
          $("#lightbox .lb-wrap figure figcaption").append("<p>" + _0x2ac856 + '</p>');
        }
        if (_0x2522d8) {
          $("#lightbox .lb-count").html(_0x2522d8).show();
        }
        $("#lightbox .lb-np").show();
        if (_0x5a4348.prev("[data-lightbox=\"" + _0xcc581c + "\"]").length) {
          var _0x185cd5 = _0x5a4348.prev("[data-lightbox=\"" + _0xcc581c + "\"]").attr("href");
          $("#lightbox .lb-np.lb-prev").attr("data-id", _0xcc581c).attr("data-url", _0x185cd5).show();
          $("body").append("<img src=\"" + _0x185cd5 + "\" style=\"display:none;\"/>");
        } else {
          $("#lightbox .lb-np.lb-prev").hide();
        }
        if (_0x5a4348.next("[data-lightbox=\"" + _0xcc581c + "\"]").length) {
          var _0x185cd5 = _0x5a4348.next("[data-lightbox=\"" + _0xcc581c + "\"]").attr("href");
          $("#lightbox .lb-np.lb-next").attr("data-id", _0xcc581c).attr("data-url", _0x185cd5).show();
          $("body").append("<img src=\"" + _0x185cd5 + "\" style=\"display:none;\"/>");
        } else {
          $("#lightbox .lb-np.lb-next").hide();
        }
        $("#lightbox .lb-close").show();
      });
    }
    $('#lightbox').addClass("open");
    $("body").addClass('lightbox_open');
  });
  $("#lightbox .lb-np.lb-prev, #lightbox .lb-np.lb-next").on("click", function (_0x4fa0a2) {
    _0x4fa0a2.stopPropagation();
    var _0x1f7409 = $(this).attr("data-url");
    var _0x2138ee = $(this).attr('data-id');
    $("[href=\"" + _0x1f7409 + "\"][data-lightbox=\"" + _0x2138ee + "\"]").trigger("click");
  });
  $('#lightbox').click(function () {
    $("#lightbox").removeClass("open");
    $("body").removeClass("lightbox_open");
  });
  $("#lightbox .lb-wrap").on("click", function (_0x41b995) {
    _0x41b995.stopPropagation();
  });
  $("#lightbox .lb-close").on('click', function (_0x19fd53) {
    _0x19fd53.stopPropagation();
    $("#lightbox").removeClass("open");
    $("body").removeClass("lightbox_open");
  });
  $(document).on("keydown", function (_0x597b00) {
    var _0x327105 = _0x597b00.keyCode || _0x597b00.which;
    if (_0x597b00.key === "Escape") {
      $("#lightbox").removeClass("open");
      $("body").removeClass("lightbox_open");
    }
    if (_0x327105 === 0x25) {
      $("#lightbox .lb-np.lb-prev:visible").trigger("click");
    }
    if (_0x327105 === 0x27) {
      $("#lightbox .lb-np.lb-next:visible").trigger('click');
    }
    if (_0x327105 === 0x26) {
      $('#lightbox').scrollTop(0x0);
    }
    if (_0x327105 === 0x28) {
      var _0x18039d = $("#lightbox").height();
      $("#lightbox").scrollTop(_0x18039d);
    }
  });
}
function lazyload() {
  $('[data-bg]').each(function () {
    var _0x30e743 = $(this);
    var _0x2c4bca = _0x30e743.attr("data-bg");
    _0x30e743.css("background-image", "url(" + _0x2c4bca + ')').removeAttr("data-bg");
  });
  $("[data-src]:not([lazy=\"true\"])").each(function () {
    var _0x42afdc = $(this);
    var _0x404eff = $(window).height();
    var _0x483f7f = $(window).scrollTop();
    var _0x57387c = _0x483f7f + _0x404eff;
    var _0x56c985 = _0x42afdc.offset().top;
    _0x42afdc.attr("data-offset-top", _0x56c985);
    var _0x1d85b5 = _0x42afdc.attr("data-src");
    _0x1d85b5 = _0x1d85b5.replace("1.bp.blogspot.com", "lh3.googleusercontent.com");
    _0x1d85b5 = _0x1d85b5.replace("2.bp.blogspot.com", "lh3.googleusercontent.com");
    _0x1d85b5 = _0x1d85b5.replace('3.bp.blogspot.com', "lh3.googleusercontent.com");
    _0x1d85b5 = _0x1d85b5.replace("4.bp.blogspot.com", "lh3.googleusercontent.com");
    var _0x3fc66d = _0x42afdc.prop("tagName").toLowerCase();
    if (_0x56c985 <= _0x57387c) {
      if (_0x3fc66d == "img") {
        _0x42afdc.attr("src", _0x1d85b5).removeAttr("data-src");
        _0x42afdc.attr("lazy", "true");
      } else if (_0x3fc66d == "iframe") {
        _0x42afdc.attr("src", _0x1d85b5).removeAttr("data-src");
        _0x42afdc.attr("lazy", "true");
      }
    }
  });
  $(window).on("scroll", function () {
    var _0x52c391 = $(window).height();
    var _0x1c3074 = $(window).scrollTop();
    var _0x58da39 = _0x1c3074 + _0x52c391;
    $("[data-src]:not([lazy=\"true\"])").each(function () {
      var _0x1751f2 = $(this);
      var _0xe7d04d = _0x1751f2.offset().top;
      var _0x57fccc = _0x1751f2.attr("data-src");
      _0x57fccc = _0x57fccc.replace("1.bp.blogspot.com", 'lh3.googleusercontent.com');
      _0x57fccc = _0x57fccc.replace("2.bp.blogspot.com", "lh3.googleusercontent.com");
      _0x57fccc = _0x57fccc.replace("3.bp.blogspot.com", 'lh3.googleusercontent.com');
      _0x57fccc = _0x57fccc.replace('4.bp.blogspot.com', "lh3.googleusercontent.com");
      var _0x33f4fc = _0x1751f2.prop("tagName").toLowerCase();
      if (_0xe7d04d <= _0x58da39) {
        if (_0x33f4fc == "img") {
          _0x1751f2.attr("src", _0x57fccc).removeAttr("data-src");
          _0x1751f2.attr("lazy", 'true');
        } else if (_0x33f4fc == "iframe") {
          _0x1751f2.attr('src', _0x57fccc).removeAttr("data-src");
          _0x1751f2.attr("lazy", "true");
        }
      }
    });
  });
}
function titleCase(_0x233151) {
  _0x233151 = _0x233151.split(" ");
  for (var _0x37c6e2 = 0x0; _0x37c6e2 < _0x233151.length; _0x37c6e2++) {
    _0x233151[_0x37c6e2] = _0x233151[_0x37c6e2].charAt(0x0).toUpperCase() + _0x233151[_0x37c6e2].slice(0x1);
  }
  _0x233151 = _0x233151.join(" ");
  return _0x233151;
}
function $_GET(_0x1a0ff4) {
  var _0x2b47dd = window.location.search.substring(0x1);
  var _0x1ac13e = _0x2b47dd.split('&');
  var _0x277c77;
  var _0x14c21d;
  for (_0x14c21d = 0x0; _0x14c21d < _0x1ac13e.length; _0x14c21d++) {
    _0x277c77 = _0x1ac13e[_0x14c21d].split('=');
    if (_0x277c77[0x0] === _0x1a0ff4) {
      return _0x277c77[0x1] === undefined ? true : decodeURIComponent(_0x277c77[0x1]);
    }
  }
}
function get_url_parameter(_0x9e633b, _0x5371b5) {
  _0x9e633b = _0x9e633b.replace(/[\[\]]/g, "\\$&");
  var _0x2b5c20 = new RegExp("[?&]" + _0x9e633b + "(=([^&#]*)|&|#|$)");
  var _0x3167eb = _0x2b5c20.exec(_0x5371b5);
  if (!_0x3167eb) {
    return null;
  }
  if (!_0x3167eb[0x2]) {
    return '';
  }
  return decodeURIComponent(_0x3167eb[0x2].replace(/\+/g, " "));
}