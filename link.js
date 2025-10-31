const $license_item = 'linkpage-blogger-template'; // Variabel ini tetap ada tetapi tidak digunakan untuk pengecekan

// Fungsi untuk inisialisasi setelah window dimuat
window.onload = function() {
    etc();
    custom_js(); // Diasumsikan 'custom_js' adalah fungsi yang Anda miliki
};

// Fungsi untuk fitur 'lazy load' gambar dan background, favicon media sosial, dan scroll horizontal
function etc() {
    // 1. Lazy Load Gambar (data-src ke src)
    $('[data-src]').each(function() {
        const $this = $(this);
        const dataSrc = $this.attr('data-src');

        // Set atribut src dan tambahkan event listener untuk menghapus data-src setelah gambar dimuat
        $this.attr('src', dataSrc);
        $(`img[src="${dataSrc}"]`).on('load', function() {
            $this.removeAttr('data-src');
        });
    });

    // 2. Lazy Load Background (data-bg ke background-image)
    $('[data-bg]').each(function() {
        const dataBg = $(this).attr('data-bg');
        $(this)
            .css('background-image', `url(${dataBg})`)
            .removeAttr('data-bg');
    });

    // 3. Mengambil Favicon untuk link media sosial/custom
    $('#socmed a, #custom a').each(function() {
        // Ekstrak domain dari atribut href
        let domain = $(this).attr('href').split('/')[2];
        
        // Hapus sub-domain 'www.', 'm.', 'web.', 'api.' jika ada
        domain = domain.replace('www.', '')
                       .replace('m.', '')
                       .replace('web.', '')
                       .replace('api.', '')
                       .replace('//', ''); 

        // Atur atribut 'src' pada elemen <img> di dalam link untuk favicon
        $('img', this).attr('src', `https://www.google.com/s2/favicons?domain=${domain}&sz=32`);
    });

    // 4. Horizontal Scroll (khusus untuk elemen #highlight)
    $('#highlight').each(function() {
        const scrollAmount = 120; // Jumlah scroll per putaran roda
        $(this).bind('DOMMouseScroll mousewheel', function(e) {
            const originalEvent = e.originalEvent;
            
            // Tentukan arah dan jumlah scroll
            const delta = originalEvent.wheelDelta ? 
                          originalEvent.wheelDelta : 
                          originalEvent.detail * -scrollAmount; // Untuk Firefox

            let currentScroll = $(this).scrollLeft();
            currentScroll += delta > 0 ? -scrollAmount : scrollAmount;

            // Lakukan scroll
            $(this).scrollLeft(currentScroll);
            
            // Cegah perilaku default (seperti scroll halaman)
            e.preventDefault();
        });
    });
}

// Tambahkan fungsi 'custom_js' kosong agar tidak terjadi error jika tidak didefinisikan di tempat lain
function custom_js() {
    // Tempat untuk kode JavaScript kustom Anda
}
