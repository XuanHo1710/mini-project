"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const pagination = (currentPage, limitItems) => {
    const Skip = (currentPage - 1) * limitItems;
    return Skip;
};
exports.pagination = pagination;
