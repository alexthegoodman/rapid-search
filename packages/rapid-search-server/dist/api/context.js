"use strict";
exports.__esModule = true;
exports.context = void 0;
var client_1 = require("@prisma/client");
// import { Request } from "express";
// import { setupMixpanel } from "../mixpanel";
var prisma = new client_1.PrismaClient();
exports.context = {
    prisma: prisma
};
//# sourceMappingURL=context.js.map