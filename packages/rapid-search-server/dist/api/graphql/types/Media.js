"use strict";
exports.__esModule = true;
exports.MediaType = void 0;
var nexus_1 = require("nexus");
exports.MediaType = (0, nexus_1.objectType)({
    name: "Media",
    definition: function (t) {
        t.field("url", {
            type: "String"
        });
        t.field("type", {
            type: "String"
        });
        t.field("mimeType", {
            type: "String"
        });
        t.field("lastAnalyzedDate", {
            type: "DateTime"
        });
        t.field("updatedAt", {
            type: "DateTime"
        });
        t.field("createdAt", {
            type: "DateTime"
        });
    }
});
//# sourceMappingURL=Media.js.map