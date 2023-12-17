"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typeDef_1 = require("./article.typeDef");
const category_typeDef_1 = require("./category.typeDef");
const user_typeDef_1 = require("./user.typeDef");
exports.typeDefs = [article_typeDef_1.articleTypeDefs, category_typeDef_1.categoryTypeDefs, user_typeDef_1.typeDefsUser];
