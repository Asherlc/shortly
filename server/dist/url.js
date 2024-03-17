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
exports.createShortenedUrl = void 0;
const crypto_1 = require("crypto");
const postgres_1 = __importDefault(require("postgres"));
const sql = (0, postgres_1.default)();
function createShortenedUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const slug = (0, crypto_1.randomBytes)(5).toString("hex");
        yield sql `
    INSERT INTO urls
    (full_url, slug) VALUES
    (${url}, ${slug})
  `;
        const shortenedUrl = new URL(process.env.HOSTNAME);
        shortenedUrl.pathname = slug;
        return shortenedUrl.toString();
    });
}
exports.createShortenedUrl = createShortenedUrl;