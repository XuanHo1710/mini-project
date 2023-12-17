import { articleResolvers } from "./article.resolver";
import { categoryResolvers } from "./category.resolver";
import { resolversUser } from "./user.resolver";



export const resolvers = [articleResolvers, categoryResolvers, resolversUser];