    const jwt = require("jsonwebtoken");

    exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Cek apakah ada header Authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
        message: "Token tidak ditemukan. Harap login kembali.",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Simpan data user ke req.user
        req.user = decoded;

        next(); // lanjut ke controller
    } catch (err) {
        return res.status(401).json({
        message: "Token tidak valid atau sudah kedaluwarsa",
        error: err.message,
        });
    }
    };
