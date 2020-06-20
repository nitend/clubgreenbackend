import {Resolver, Query, Arg, UseMiddleware, Mutation} from 'type-graphql'
import { Product } from '../entity/Product';
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { Products } from '../database';


@Resolver()
export class ProductResolver{

    db = Products

    @Query(() => Product, {nullable: true})
    async getProduct(
        @Arg("id") id: string
    ) {        
        return await this.db.findById(id);
    }

    @Query(() => Product)
    @UseMiddleware(isAuth)
    async getNewProduct(){ 
        return await this.db.insert(new Product())
    }

    @Query(() => [Product], {nullable: true})
    async getAllProducts() {
        return await this.db.getAll();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateProduct(
        @Arg("product") product: Product){ 
        return await this.db.replace(product)
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProduct(
        @Arg("id") id: string){    
        return await this.db.delete(id);      
    }
}

