import {Resolver, Query, Arg, UseMiddleware, Mutation} from 'type-graphql'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { Property } from '../entity/Property';
import { Properties } from '../database';


@Resolver()
export class PropertyResolver{

    db = Properties

    @Query(() => Property, {nullable: true})
    async getProperty(
        @Arg("id") id: string
    ) {        
        return await this.db.findById(id);
    }

    @Query(() => Property)
    @UseMiddleware(isAuth)
    async getNewProperty(){ 
        return await this.db.insert(new Property())
    }

    @Query(() => [Property], {nullable: true})
    async getAllProperties() {
        return await this.db.getAll();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateProperty(
        @Arg("property") property: Property){ 
        return await this.db.replace(property)
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteProperty(
        @Arg("id") id: string){    
        return await this.db.delete(id);      
    }

}

