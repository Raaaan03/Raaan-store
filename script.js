// script.js
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function getFileName(url) {
  const m = decodeURIComponent(url).match(/\/([^\/?#]+\.apk)/i);
  return m ? m[1] : 'Unknown.apk';
}
function maskId(url) {
  const m = url.match(/\/file\/([^\/]+)\//);
  return m ? '*******' + m[1].slice(-7) : '⚙⚙unknown';
}
function showPopup() {
  document.getElementById('popup-gratis').style.display = 'flex';
}
function hidePopup() {
  document.getElementById('popup-gratis').style.display = 'none';
}
function copyStoreLink() {
  const txt = document.getElementById('store-link').textContent;
  navigator.clipboard.writeText(txt).then(()=>alert('Link disalin!'));
}

document.addEventListener('DOMContentLoaded', () => {
  // Navbar active link
  document.querySelectorAll('.navbar a').forEach(a => {
    if (a.href === location.href) a.classList.add('active');
  });

  // Universal popup for Free APK page
  if (window.location.pathname.endsWith('freeapk.html')) {
    if (!sessionStorage.getItem('popupShown')) {
      showPopup();
      sessionStorage.setItem('popupShown','true');
    }
    populateFileList();
  }

  // Populate Free APK list
  function populateFileList() {
    const apkLinks = [
   "https://www.mediafire.com/file/pb321lhdjs1sdpy/Temp_Mail_Premium.apk/file",
        "https://www.mediafire.com/file/669920atdl5bpkl/OrderKuota%2528SFILE.MOBI%2529.apk/file",
        "https://www.mediafire.com/file/xgqnit32ysvkmp2/Pixellab_Logo.apk/file",
        "https://www.mediafire.com/file/ke7ous4w9y6qtnj/KENON_WA_by_Raaan_Script.apk/file",
        "https://www.mediafire.com/file/b9ov3a4ljtas3qp/JPM.apk/file",
        "https://www.mediafire.com/file/i0eha6dgl073ln9/FAKE_DANA_NOTIFIKASI.apk/file",
        "https://www.mediafire.com/file/5tf8jbbb5iep44c/E-KTP_Simulasi.apk/file",
        "https://www.mediafire.com/file/tm7bdnkw5dveuty/BANNED_PRIVATE_2.23.1.11_r_sign.apk/file",
        "https://www.mediafire.com/file/9vn2g6pmsn3eef0/BANNED_GMAIL.apk/file",
        "https://www.mediafire.com/file/un8pblotchlveth/BANNED_UNBANNED_NUMBER.apk/file",
        "https://www.mediafire.com/file/iuvkimwm53z7bgo/BANIDO_ELIT.apk/file",
        "https://www.mediafire.com/file/5qvmthqm7pztht9/AutoSave_Contact.apk/file",
        "https://www.mediafire.com/file/hw3zuno6czy7faj/APK_KENON.apk/file",
        "https://www.mediafire.com/file/e3r0z0autawmpqv/Apk%25E2%2580%25A2Push%25E2%2580%25A2Kontak.apk/file",
        "https://www.mediafire.com/file/0fk2mcmxr08atv1/APK_BEKU_PAYMENT.apk/file",
    ];
    const list = document.getElementById('file-list');
    apkLinks.forEach(url => {
      const box = document.createElement('div');
      box.className = 'file-box';
      box.innerHTML = `<div class="file-name">${getFileName(url)}</div>` +
                      `<div class="file-url">https://www.mediafire.com/file/${maskId(url)}/${getFileName(url)}/file</div>`;
      box.onclick = showPopup;
      list.appendChild(box);
    });
  }

  // Populate Premium page
  if (window.location.pathname.endsWith('apkpremium.html')) {
    const premiumList = [
      { nama: "Alight Motion", jenis: "Video Editor", harga: "Rp10.000" },
      { nama: "CapCut Pro", jenis: "Video Editor", harga: "Rp8.000" },
      { nama: "VN Pro", jenis: "Video Editor", harga: "Rp7.000" },
      { nama: "Lightroom", jenis: "Photo Editor", harga: "Rp6.000" }
    ];
    const grid = document.getElementById('premium-grid');
    premiumList.forEach(it => {
      const card = document.createElement('div');
      card.className = 'premium-item';
      card.innerHTML = `<h3>${it.nama}</h3>
        <div class="premium-price"><span>${it.jenis}</span><span>${it.harga}</span></div>`;
      grid.appendChild(card);
    });
  }

  // Populate Social page
  if (window.location.pathname.endsWith('social.html')) {
    const premiumList = [
        { nama: "Alight Motion", jenis: "Video Editor", harga: "Rp10.000" },
        { nama: "CapCut Pro", jenis: "Video Editor", harga: "Rp8.000" },
        { nama: "VN Pro", jenis: "Video Editor", harga: "Rp7.000" },
        { nama: "Lightroom", jenis: "Photo Editor", harga: "Rp6.000" },
      ];
      const socialData = {
        tiktok: [
          { kategori: "Followers", layanan: "100 Followers", harga: "Rp1.000" },
          { kategori: "Followers", layanan: "200 Followers", harga: "Rp2.000" },
          { kategori: "Views", layanan: "1K Views", harga: "Rp1.500" },
          { kategori: "Likes", layanan: "100 Likes", harga: "Rp1.000" },
        ],
        instagram: [
          { kategori: "Followers", layanan: "100 Followers", harga: "Rp1.200" },
          { kategori: "Followers", layanan: "200 Followers", harga: "Rp2.200" },
          { kategori: "Likes", layanan: "100 Likes", harga: "Rp1.200" },
          { kategori: "Views", layanan: "1K Views", harga: "Rp1.800" },
        ],
        youtube: [
          { kategori: "Subscribers", layanan: "100 Subs", harga: "Rp2.000" },
          { kategori: "Views", layanan: "1K Views", harga: "Rp2.500" },
          { kategori: "Likes", layanan: "100 Likes", harga: "Rp1.500" },
        ],
      };

    const nav = document.getElementById('nav-socmed');
    nav.style.display = 'flex';
    nav.querySelectorAll('a').forEach(a => {
      a.onclick = e => {
        e.preventDefault();
        nav.querySelectorAll('a').forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
        renderSocial(a.dataset.platform);
        document.getElementById('sosial-title').textContent =
          'Layanan Sosial Media ' + cap(a.dataset.platform);
      };
    });
    // Inisialisasi TikTok
    nav.querySelector('a[data-platform="tiktok"]').classList.add('active');
    renderSocial('tiktok');
  }

  function renderSocial(platform) {
    const cont = document.getElementById('sosial-container');
    cont.innerHTML = '';
    let curr = '';
    socialData[platform].forEach(o => {
      if (o.kategori !== curr) {
        curr = o.kategori;
        const hdr = document.createElement('h3');
        hdr.textContent = curr;
        hdr.className = 'category-section';
        cont.appendChild(hdr);
      }
      const row = document.createElement('div');
      row.className = 'item';
      row.innerHTML = `<span>${o.layanan}</span><span>${o.harga}</span>`;
      cont.appendChild(row);
    });
  }

  // Populate NoKos page
  if (window.location.pathname.endsWith('nokos.html')) {
    const input = document.getElementById('search-layanan');
    const grid  = document.getElementById('nokos-grid');
    const blacklist = ['casino online','slot','judi','togel','yandex','poker'];
    function isBlacklisted(name) {
      const lower = name.toLowerCase();
      return blacklist.some(k=>lower.includes(k));
    }
    function renderItems(items) {
      grid.innerHTML = items.map(item =>
        `<div class="premium-item">
           <h3>${item.layanan}</h3>
           <div class="premium-price">
             <span>Rp${new Intl.NumberFormat('id-ID').format(item.hargaJual)}</span>
           </div>
         </div>`).join('');
    }
    let noKosData = [];
    fetch('/api/layanan')
      .then(r=>r.json())
      .then(list=>{
        noKosData = list.filter(i=>!isBlacklisted(i.layanan));
        renderItems(noKosData);
      });
    input.addEventListener('input',()=>{
      const q = input.value.toLowerCase();
      renderItems(noKosData.filter(it=>
        it.layanan.toLowerCase().includes(q) ||
        String(it.hargaJual).includes(q)
      ));
    });
  }
});
