"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.extractKeywords = void 0;
var worker_threads_1 = require("worker_threads");
var keyword_extractor_1 = __importDefault(require("keyword-extractor"));
var getMostCommon = function (arr, size) {
    if (size === void 0) { size = 5; }
    var obj = {};
    arr.forEach(function (keyword) {
        if (typeof obj[keyword] === "undefined")
            obj[keyword] = 0;
        obj[keyword] = obj[keyword] + 1;
    });
    // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    var entries = Object.entries(obj);
    //console.info("most common", entries.sort(([, a], [, b]) => b - a))
    var sortable = entries
        .sort(function (_a, _b) {
        var a = _a[1];
        var b = _b[1];
        return b - a;
    })
        .slice(0, size)
        .reduce(function (r, _a) {
        var _b;
        var k = _a[0], v = _a[1];
        return (__assign(__assign({}, r), (_b = {}, _b[k] = v, _b)));
    }, {});
    var sortableArray = Object.entries(sortable);
    return sortableArray;
};
var extractKeywords = function (text, count) {
    if (count === void 0) { count = 5; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, mostCommonKeywords, keywordsOnly;
        return __generator(this, function (_a) {
            try {
                data = keyword_extractor_1["default"].extract(text, {
                    language: "english",
                    remove_digits: true,
                    return_changed_case: true,
                    remove_duplicates: false
                });
                mostCommonKeywords = getMostCommon(data, count);
                keywordsOnly = mostCommonKeywords.map(function (pair) {
                    return pair[0];
                });
                console.info("mostCommonKeywords", mostCommonKeywords, keywordsOnly);
                return [2 /*return*/, { keywords: mostCommonKeywords, keywordsOnly: keywordsOnly }];
            }
            catch (error) {
                console.error(error.message);
                worker_threads_1.parentPort.postMessage("workerFinished");
                process.exit(2);
            }
            return [2 /*return*/];
        });
    });
};
exports.extractKeywords = extractKeywords;
//# sourceMappingURL=extractKeywords.js.map