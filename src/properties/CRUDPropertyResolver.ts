import {Resolver, Query, Mutation, Arg, UseMiddleware} from 'type-graphql'
import { Property } from '../entity/Property';
import { isAuth } from '../usermanagement/isAuthMiddleware';


@Resolver()
export class CRUDPropertyResolver {

    @Query(() => [Property], {nullable: true})
    @UseMiddleware(isAuth)
    async getProperties() {        
        const properties = await Property.find({deleted: false});
        return properties;
    }

    @Query(() => Property, {nullable: true})
    @UseMiddleware(isAuth)
    async getProperty(
        @Arg("id") id: string
    ) {        
        const property = await Property.findOne({id: id})
        return property;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async saveProperty(
        @Arg("property") prop: Property){    
        if(prop){
            Property.save(
                prop
            )
        }       
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProperty(
        @Arg("id") id: string){    
            const prop = await Property.findOne({id: id});
            if(prop){
                prop.deleted=true;
                Property.save(prop);
                return true;
            }
        return false      
    }


}

