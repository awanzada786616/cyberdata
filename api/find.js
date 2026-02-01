// api/find.js

export default async function handler(req, res) {
    // 1. CORS Enable karein (Taka koi bhi website apka data fetch kar sakay)
    res.setHeader('Access-Control-Allow-Origin', '*'); // '*' sab ko allow karta hai
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Agar browser check kar raha hai k API on hai ya nahi (Pre-flight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. User se number lein (URL parameter se)
    const { number } = req.query;

    if (!number) {
        return res.status(400).json({ status: "error", message: "Number provide karein" });
    }

    // 3. Yahan apna Data rakhain (Agar data chota hai)
    // NOTE: Agar data bohot bara hai (millions mein), to Database use karein.
    
    const usersData = [
        { num: "03001234567", name: "Ali Khan", city: "Karachi", cnic: "42101-..." },
        { num: "03211234567", name: "Sara Ahmed", city: "Lahore", cnic: "35202-..." },
        { num: "03331234567", name: "Kamran", city: "Islamabad", cnic: "61101-..." }
    ];

    // 4. Data Search Logic
    const result = usersData.find(user => user.num === number);

    // 5. Result wapis bhejein
    if (result) {
        return res.status(200).json({ status: "success", data: result });
    } else {
        return res.status(404).json({ status: "failed", message: "Record nahi mila" });
    }
}
