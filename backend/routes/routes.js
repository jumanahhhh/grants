const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Mongoose model
const Grant = require('../models/Grant')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_STRIPE);

// Middleware to check authentication
function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("You must be logged in!");
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send("Invalid or expired token. Please log in again.");
    }
}

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

// Backend login route
router.post('/login', async (req, res) => {
    try {        
        // Validate required fields
        if (!req.body.email || !req.body.password) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set token in the cookie
        res.cookie('token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Prevents CSRF attacks
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/dashboard', isLoggedIn, (req,res)=>{
    res.status(200).json({ message: `Welcome, user ${req.user.id}!` });
})

// fetching users paymentstatus
router.get("/user/me", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Replace with the actual logic to fetch user details
        res.json({ paymentStatus: user.paymentStatus }); // Send payment status
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post('/create-checkout-session', async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1]; // Get token from cookies or headers
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const userId = decoded.id; // Retrieve `userId` from payload

        // Now use `userId` to process the payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: 'cad',
            payment_method_types: ['card'],
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Payment failed' });
    }
});


router.post('/payment/success', async (req, res) => {
    const { email } = req.body; // Extract email from request body
    if (!email) {
        return res.status(400).send({ error: 'Email is required.' }); // Handle missing email
    }

    try {
        const user = await User.findOne({ email: email }); // Find user by email
        if (!user) {
            return res.status(404).send({ error: 'User not found.' }); // Handle user not found
        }

        // Update paymentStatus to true
        user.paymentStatus = true;
        await user.save();

        res.status(200).send({ message: 'Payment successful, status updated.' });
    } catch (error) {
        console.error('Payment status update failed:', error); // Log the error
        res.status(500).send({ error: 'Failed to update payment status.' });
    }
});

// Route to fetch logged-in user details
router.get('/user/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password for security
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// To fill the form and update the user details
router.post("/update-profile", async (req, res) => {
    try {
        // Log request body
        // console.log("Request body:", req.body);
        // Check if businessType is valid
        if (!req.body.businessType || !['Non-profit', 'For-profit', 'Startup'].includes(req.body.businessType)) {
            return res.status(400).json({ error: "Invalid business type" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const userId = decoded.id;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    businessDetails: {
                        name: req.body.businessName,
                        type: req.body.businessType,
                        size: req.body.businessSize,
                        sector: req.body.sector,
                    },
                    location: {
                        country: req.body.country,
                        state: req.body.state,
                        city: req.body.city,
                    },
                    grantObjectives: {
                        purpose: req.body.fundingPurpose,
                        fundingAmount: req.body.fundingAmount,
                    },
                    eligibilityDetails: {
                        yearsInOperation: req.body.yearsInOperation,
                        registrationStatus: req.body.registrationStatus,
                    },
                    specialCriteria: {
                        minorityOwnership: req.body.minorityOwnership,
                        impactFocus: req.body.impactFocus,
                        projectDeadline: req.body.projectDeadline,
                    },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating profile", error);
        res.status(500).json({ error: "Error updating profile" });
    }
});

// Function to match the available grants to business
async function matchGrants(user) {
    // Fetch all grants from the database
    const grants = await Grant.find();

    // Array to store grant matches with their eligibility score
    let matchedGrants = [];
    grants.forEach(grant => {
        let score = 0;

        // 1. Match Business Type
        if (grant.eligibilityRequirements.businessType === user.businessDetails.type) {
            score += 2; // Points for matching business type
        }

        // 2. Match Sector
        if (grant.eligibilityRequirements.sector === user.businessDetails.sector) {
            score += 3; // Points for matching sector
        }

        // 3. Match Location
        if (grant.eligibilityRequirements.location.country === user.location.country &&
            grant.eligibilityRequirements.location.state === user.location.state &&
            grant.eligibilityRequirements.location.city === user.location.city) {
            score += 2; // Points for matching location
        }

        // 4. Match Funding Purpose
        if (grant.eligibilityRequirements.fundingPurpose === user.grantObjectives.purpose) {
            score += 2; // Points for matching funding purpose
        }

        // 5. Match Years in Operation
        if (user.eligibilityDetails.yearsInOperation >= grant.eligibilityRequirements.minYearsInOperation) {
            score += 3; // Points for meeting years in operation requirement
        }

        // 6. Match Registration Status
        if (grant.eligibilityRequirements.registrationStatus === user.eligibilityDetails.registrationStatus) {
            score += 2; // Points for matching registration status
        }

        // 7. Special Criteria Matching
        if (grant.specialCriteria.minorityOwned === user.specialCriteria.minorityOwnership) {
            score += 1; // Points for minority-owned match
        }

        if (grant.specialCriteria.environmentalFocus === user.specialCriteria.impactFocus) {
            score += 1; // Points for environmental focus match
        }

        // Add grant and its score to the matchedGrants array
        matchedGrants.push({
            grant: grant,
            score: score
        });
    });
    matchedGrants.sort((a, b) => b.score - a.score);
    return matchedGrants;
}

// Route to display matched grants
router.get("/match-grants/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Call the matching function
    const matchedGrants = await matchGrants(user);
    const result = matchedGrants.map(match => ({
        grantName: match.grant.grantName,
        fundingAmount: match.grant.fundingAmount,
        applicationDeadline: match.grant.applicationDeadline,
        eligibilityScore: match.score
    }));
    res.json(result);
});

// Logout Route
router.get('/logout', (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0), // Expire the cookie immediately
    });
    res.status(200).json({ message: 'Logged out successfully' });
});

// Add this near your other routes
router.get('/debug/users', async (req, res) => {
    try {
        const users = await User.find({}, { email: 1, _id: 1 }); // Only fetch email and ID
        console.log('Found users:', users);
        res.json({ 
            count: users.length,
            users: users.map(u => ({ email: u.email }))
        });
    } catch (error) {
        console.error('Debug route error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;