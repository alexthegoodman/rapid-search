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
exports.__esModule = true;
exports.SearchQuery = void 0;
var nexus_1 = require("nexus");
var extractKeywords_js_1 = require("../../../crawler/extractor/extractKeywords.js");
exports.SearchQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition: function (t) {
        var _this = this;
        t.field("search", {
            type: "SearchData",
            args: {
                // each query is parsed for keywords
                // two query fields allows keyword extraction from two different fields
                topicClassificationSlug: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                contextQuery: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                query: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve: function (_, _a, _b, x) {
                var topicClassificationSlug = _a.topicClassificationSlug, contextQuery = _a.contextQuery, query = _a.query;
                var prisma = _b.prisma;
                return __awaiter(_this, void 0, void 0, function () {
                    var _c, contextKeywords, contextKeywordsOnly, _d, keywords, keywordsOnly, filterByTopic, filterSummaryNarrowContext, filterSummaryWidePrimary, filterSummaryNarrowPrimary, filters, pageResults;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                console.info("incoming search");
                                contextQuery = contextQuery.replace(/&nbsp;/g, '');
                                query = query.replace(/&nbsp;/g, ' ');
                                return [4 /*yield*/, (0, extractKeywords_js_1.extractKeywords)(contextQuery, 3)];
                            case 1:
                                _c = _e.sent(), contextKeywords = _c.keywords, contextKeywordsOnly = _c.keywordsOnly;
                                return [4 /*yield*/, (0, extractKeywords_js_1.extractKeywords)(query, 3)];
                            case 2:
                                _d = _e.sent(), keywords = _d.keywords, keywordsOnly = _d.keywordsOnly;
                                console.info("queryKeywords", contextKeywords, keywords);
                                filterByTopic = {};
                                if (typeof topicClassificationSlug !== "undefined" &&
                                    topicClassificationSlug) {
                                    filterByTopic = {
                                        topicClassification: {
                                            generatedInterestSlug: {
                                                equals: topicClassificationSlug
                                            }
                                        }
                                    };
                                }
                                filterSummaryNarrowContext = {
                                    AND: [
                                        {
                                            summaryNormal: {
                                                contains: contextKeywordsOnly[0]
                                            }
                                        },
                                        {
                                            summaryNormal: {
                                                contains: contextKeywordsOnly[1]
                                            }
                                        },
                                        // {
                                        //   summaryNormal: {
                                        //     contains: contextKeywordsOnly[2],
                                        //   },
                                        // },
                                    ]
                                };
                                filterSummaryWidePrimary = {
                                    OR: [
                                        {
                                            summaryNormal: {
                                                contains: keywordsOnly[0]
                                            }
                                        },
                                        {
                                            summaryNormal: {
                                                contains: keywordsOnly[1]
                                            }
                                        },
                                        {
                                            summaryNormal: {
                                                contains: keywordsOnly[2]
                                            }
                                        },
                                    ]
                                };
                                filterSummaryNarrowPrimary = {
                                    AND: [
                                        {
                                            summaryNormal: {
                                                contains: keywordsOnly[0]
                                            }
                                        },
                                        {
                                            summaryNormal: {
                                                contains: keywordsOnly[1]
                                            }
                                        },
                                        // {
                                        //   summaryNormal: {
                                        //     contains: keywordsOnly[2],
                                        //   },
                                        // },
                                    ]
                                };
                                filters = [filterSummaryNarrowContext, filterSummaryWidePrimary];
                                if (contextQuery === "") {
                                    filters = [filterSummaryNarrowPrimary];
                                }
                                return [4 /*yield*/, prisma.page.findMany({
                                        where: __assign({ 
                                            // return pages where the summary contains the top 3 query keywords
                                            // OR: [
                                            //   filterByTitle, 
                                            //   filterBySummary, 
                                            //   filterByExcerpt
                                            // ],
                                            AND: filters }, filterByTopic),
                                        // orderBy: {
                                        //   // topicScore: "desc",
                                        //   loadSpeedScore: "asc",
                                        // },
                                        take: 20
                                    })];
                            case 3:
                                pageResults = _e.sent();
                                console.info("pageResults", pageResults);
                                return [2 /*return*/, {
                                        contextKeywords: contextKeywordsOnly,
                                        keywords: keywordsOnly,
                                        results: pageResults
                                    }];
                        }
                    });
                });
            }
        });
    }
});
//# sourceMappingURL=search.js.map