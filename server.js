// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;

// ambil daftar negara dari API Jasa OTP
async function fetchCountryData() {
  try {
    const res = await fetch("https://api.ditznesia.id/v2/negara.php");
    if (!res.ok) {
      console.error(`Error fetch countries: ${res.status} ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    const list = json.data || [];
    // map ke { id, name }
    return list.map(item => ({
      id: item.id_negara,
      name: item.nama_negara.charAt(0).toUpperCase() + item.nama_negara.slice(1)
    }));
  } catch (err) {
    console.error("Exception fetchCountryData:", err);
    return [];
  }
}

async function fetchLayananData(negaraId = 6) {
  try {
    const response = await fetch(
      `https://api.ditznesia.id/v2/layanan.php?negara=${negaraId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/json",
          Referer: "https://ditznesia.id/",
          Origin: "https://ditznesia.id",
        },
      }
    );
    if (!response.ok) {
      console.error(`API fetch error: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    const layananRaw = data[String(negaraId)] || {};
    return Object.values(layananRaw).map((item) => {
      const harga = parseInt(item.harga, 10) || 0;
      const hjualRaw = harga + 2000;
      const hargaJual = hjualRaw <= 2500
        ? 2500
        : Math.ceil(hjualRaw / 1000) * 1000;
      const admin = Math.floor(hargaJual / 1000) * 34;
      const untung = Math.max(hargaJual - harga - admin, 0);
      return {
        layanan: item.layanan,
        harga,
        stok: item.stok,
        hargaJual,
        untung,
        countryId: negaraId
      };
    });
  } catch (err) {
    console.error("Error in fetchLayananData:", err);
    return [];
  }
}

app.use(express.static("public"));

// daftar negara real
app.get("/api/countries", async (_, res) => {
  try {
    const countries = await fetchCountryData();
    res.json(countries);
  } catch (err) {
    console.error("Error in /api/countries:", err);
    res.status(500).json({ error: err.message });
  }
});

// layanan per negara
app.get("/api/layanan", async (req, res) => {
  const negaraId = parseInt(req.query.negara, 10) || 6;
  try {
    const daftar = await fetchLayananData(negaraId);
    res.json(daftar);
  } catch (err) {
    console.error("Error in /api/layanan:", err);
    res.status(500).json({ error: err.message });
  }
});

// admin detail
app.get("/gw", async (req, res) => {
  try {
    const negaraId = parseInt(req.query.negara, 10) || 6;
    const daftar = await fetchLayananData(negaraId);

    const rowsHtml = daftar.map(item =>
      `<tr>
        <td>${item.layanan}</td>
        <td>Rp${new Intl.NumberFormat('id-ID').format(item.harga)}</td>
        <td>${item.stok}</td>
        <td>Rp${new Intl.NumberFormat('id-ID').format(item.hargaJual)}</td>
        <td>Rp${new Intl.NumberFormat('id-ID').format(item.untung)}</td>
      </tr>`
    ).join('');

    const adminHtml = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>Admin Layanan Detail</title>
      <style>
        body {background:#111; color:#fff; font-family:Arial,sans-serif; padding:20px;}
        h1 {text-align:center; color:#4caf50; margin-bottom:20px;}
        table {width:100%; border-collapse:collapse; background:#1e1e1e;}
        th, td {padding:10px; border:1px solid #333; text-align:left;}
        th {background:#222;}
        tr:hover {background:#333;}
      </style>
    </head>
    <body>
      <h1>Detail Layanan Negara ${negaraId}</h1>
      <table>
        <thead>
          <tr>
            <th>Layanan</th><th>Harga</th><th>Stok</th>
            <th>Harga Jual</th><th>Untung</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </body>
    </html>`;
    res.send(adminHtml);
  } catch (err) {
    console.error("Error in /gw route:", err);
    res.status(500).send("Error fetch data: " + err.message);
  }
});

app.get("/", (_, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));