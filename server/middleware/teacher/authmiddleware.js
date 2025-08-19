const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

function teacherAuthMiddleware(req, res, next) {
    console.log('=== TEACHER AUTH MIDDLEWARE ===');
    console.log('Request URL:', req.url);
    console.log('Request method:', req.method);
    console.log('Headers:', req.headers);
    
    const authHeader = req.headers["authorization"];
    console.log('Auth header:', authHeader);
    
    const token = authHeader && authHeader.split(" ")[1];
    console.log('Extracted token:', token ? token.substring(0, 20) + '...' : 'No token');

    if (!token) {
        console.log('No token provided - sending 401');
        return res.status(401).json({ 
            success: false,
            message: "Access Denied - No token provided" 
        });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        console.log('Token verified successfully, user:', user);
        
        // Verify that this is a teacher token
        if (user.role !== 'teacher' && user.role !== 'head_teacher') {
            console.log('Invalid role for teacher endpoint:', user.role);
            return res.status(403).json({ 
                success: false,
                message: "Access Denied - Invalid role" 
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(403).json({ 
            success: false,
            message: "Invalid Token" 
        });
    }
}

module.exports = teacherAuthMiddleware;
