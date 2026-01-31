// api/search.js
export default async function handler(req, res) {
    // 1. Allow CORS (Taake frontend access kar sake)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // 2. Get Number from URL
    const { num } = req.query;

    if (!num) {
        return res.status(400).json({ status: "error", message: "Number required" });
    }

    // 3. Your API Token
    const token = "49021c666cde81315da33f1432c5322b3434cf061cf1520ec45c86cffbeb9a54"; 

    try {
        // 4. Server-to-Server Request (No CORS issue here)
        const targetUrl = `https://shadowdatabase.site/api.php?token=${token}&num=${num}`;
        
        const response = await fetch(targetUrl);
        const data = await response.json();

        // 5. Send Real Data back to Frontend
        res.status(200).json(data);

    } catch (error) {
        // Agar API fail hojaye
        res.status(500).json({ status: "error", message: "Server Error", details: error.message });
    }
}
