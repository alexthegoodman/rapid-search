"use strict";
exports.__esModule = true;
exports.SearchData = void 0;
var nexus_1 = require("nexus");
exports.SearchData = (0, nexus_1.objectType)({
    name: "SearchData",
    definition: function (t) {
        t.nullable.list.field("contextKeywords", {
            type: "String"
        });
        t.nullable.list.field("keywords", {
            type: "String"
        });
        t.nullable.list.field("results", {
            type: "SearchResult"
        });
    }
});
//# sourceMappingURL=SearchData.js.map