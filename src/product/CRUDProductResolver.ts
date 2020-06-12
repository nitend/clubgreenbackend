import {Resolver, Query, Mutation, Arg, UseMiddleware} from 'type-graphql'
import { Product } from '../entity/Product';
import { isAuth } from '../usermanagement/isAuthMiddleware';


@Resolver()
export class CRUDProductResolver {

    @Query(() => [Product], {nullable: true})
    async getAllProducts() {        
        const products = await Product.find({deleted: false});
        return products;
    }

    @Query(() => Product, {nullable: true})
    async getProduct(
        @Arg("id") id: string
    ) {        
        const products = await Product.findOne({id: id})
        return products;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateProduct(
        @Arg("product") product: Product){           
        const result = await Product.save(
            product
        )
        return result ? true : false
    }

    @Query(() => Product)
    @UseMiddleware(isAuth)
    async getNewProduct(){         
        return await Product.save(new Product);    
    }
  

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProduct(
        @Arg("id") id: string){    
            const product = await Product.findOne({id: id});
            if(product){
                product.deleted=true;
                Product.save(product);
                return true;
            }
        return false      
    }
}

