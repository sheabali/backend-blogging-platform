"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const global_ErrorHandler_1 = __importDefault(require("./app/middlewares/global.ErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'] }));
// application routes
app.use('/api', routes_1.router);
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`<div style="background: linear-gradient(135deg, #6a11cb, #2575fc); border-radius: 20px; width: 600px; height: 250px; margin: auto; margin-top: 50px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column; justify-content: center; align-items: center;">
       <h1 style="color: white; font-family: Arial, sans-serif; font-size: 24px; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);">Welcome to the Blog Server!</h1>
     
     </div>`);
});
app.get('/', test);
// console.log()
// Error-handling middleware
app.use(global_ErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
