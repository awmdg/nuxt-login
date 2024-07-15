"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const config_1 = require("./config");
const app = (0, express_1.default)();
const port = config_1.config.port;
mongoose_1.default.connect(config_1.config.mongoURI, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/auth', auth_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
