// middleware/checkHeader.js
const checkHeader = (req, res, next) => {
    const keyHeader = req.header('authMod'); // Get the header value
    const myKey = process.env.MyKey; // Get the environment variable

    // Check if the header value matches the environment variable
    if (keyHeader === myKey) {
        next(); // If it matches, proceed to the next middleware/route
    } else {
        return res.status(403).json({
            message: "Forbidden: Invalid Header Value",
        }); // If it doesn't match, respond with an error
    }
};

export default checkHeader;
