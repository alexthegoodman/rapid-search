"use strict";
exports.__esModule = true;
exports.BacklinkType = void 0;
var nexus_1 = require("nexus");
exports.BacklinkType = (0, nexus_1.objectType)({
    name: "Backlink",
    definition: function (t) {
        t.field("id", {
            type: "String"
        });
        t.field("targetUrl", {
            type: "String"
        });
        t.field("originUrl", {
            type: "String"
        });
        t.field("analyzedDate", {
            type: "DateTime"
        });
        t.field("count", {
            type: "Int"
        });
        t.field("updatedAt", {
            type: "DateTime"
        });
        t.field("createdAt", {
            type: "DateTime"
        });
    }
});
//# sourceMappingURL=Backlink.js.map