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
exports.articleResolvers = void 0;
const article_model_1 = __importDefault(require("../models/article.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
const pagination_1 = require("../helpers/pagination");
exports.articleResolvers = {
    Query: {
        getListArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue } = args;
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            const { currentPage, limitPage } = args;
            const skip = (0, pagination_1.pagination)(currentPage, limitPage);
            const { filterKey, filterValue } = args;
            const find = {
                deleted: false
            };
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            const { keyword } = args;
            if (keyword) {
                const regexKeyWord = new RegExp(keyword, "i");
                find["title"] = regexKeyWord;
            }
            const articles = yield article_model_1.default.find(find).sort(sort).limit(limitPage).skip(skip);
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const categoryId = article.categoryId;
            const category = yield category_model_1.default.findOne({
                _id: categoryId,
                deleted: false
            });
            return category;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        updateArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield article_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, article);
            const record = yield article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return record;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield article_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Đã xóa!";
        })
    }
};