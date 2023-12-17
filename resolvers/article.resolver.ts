import Article from "../models/article.model";
import Category from "../models/category.model";
import { pagination } from "../helpers/pagination";

export const articleResolvers = {
    Query: {
      getListArticle: async (_, args) => {
        const {sortKey, sortValue} = args;

        //Sort
        const sort = {};
        if(sortKey && sortValue){
          sort[sortKey] = sortValue;
        }
        //End sort

        //Page
        const {currentPage, limitPage} = args;
        const skip = pagination(currentPage, limitPage);
        //End Page

        //Filter
        const {filterKey, filterValue} = args;

        const find = {
          deleted: false
        };

        if (filterKey && filterValue) {
          find[filterKey] = filterValue;
        }
        //End Filter 


        //Find keyword
        const {keyword} = args;
        
        if(keyword){
          const regexKeyWord = new RegExp(keyword, "i");
          find["title"] = regexKeyWord;
        }
        //End Find keyword

        const articles = await Article.find(find).sort(sort).limit(limitPage).skip(skip);
  
        return articles;
      },
      getArticle: async (_, args) => {
        const { id } = args;
        const article = await Article.findOne({
          _id: id,
          deleted: false
        });
  
        return article;
      }
    },
    Article: {
      category: async (article) => {
        const categoryId = article.categoryId;

        const category = await Category.findOne({
          _id: categoryId,
          deleted: false
        });

        return category;
      }
    },
    Mutation: {
        createArticle: async (_, args) => {
          const { article } = args;
    
          const record = new Article(article);
          await record.save();
    
          return record;
        },
        updateArticle: async (_, args) => {
            const { id, article } = args;
      
            await Article.updateOne({
              _id: id,
              deleted: false
            }, article);
      
            const record = await Article.findOne({
              _id: id,
              deleted: false
            });
      
            return record;
        },
        deleteArticle: async (_, args) => {
            const { id } = args;
      
            await Article.updateOne({
              _id: id,
              deleted: false
            }, {
              deleted: true,
              deletedAt: new Date()
            });
      
            return "Đã xóa!";
        }
      }
  };