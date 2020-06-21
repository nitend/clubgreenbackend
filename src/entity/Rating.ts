import {ObjectType, Field, InputType} from 'type-graphql'
import { __Type } from "graphql";
import { EntityBase } from "./EntityBase";




@ObjectType("Rating")
@InputType("RatingInput")
export class Rating extends EntityBase{
    
    @Field({nullable: true})
    title: string;

    @Field()
    targetId: number; 

    @Field({nullable: true})
    rating: number; 

    @Field({nullable: true})
    userId: number;

    @Field({nullable: true})
    comment: string;

}
