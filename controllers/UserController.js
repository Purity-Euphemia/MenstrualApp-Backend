const User = require('./models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7h" });

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(401).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json({ token: generateToken(user._id), user: user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "User already exists" });
    }
    res.json({ token: generateToken(user._id), user: user });
};

exports.getSettings = async (req, res) => {
    const user = await User.findById(req.user);
    res.json(user.cycleSettings);
};

exports.saveSettings = async (req, res) => {
    const user = await User.findById(req.user);
    user.cycleSettings = req.body;
    await user.save();
    res.json({ message: "Settings updated", cycleSettings: user.cycleSettings });
};