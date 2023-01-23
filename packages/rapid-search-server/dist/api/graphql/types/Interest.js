"use strict";
exports.__esModule = true;
exports.InterestType = void 0;
var nexus_1 = require("nexus");
exports.InterestType = (0, nexus_1.objectType)({
    name: "Interest",
    definition: function (t) {
        t.field("id", {
            type: "String"
        });
        t.field("name", {
            type: "String"
        });
        t.field("generatedInterestSlug", {
            type: "String"
        });
    }
});
//# sourceMappingURL=Interest.js.map