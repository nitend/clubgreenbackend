import {ObjectType, Field, InputType} from 'type-graphql'
import { __Type } from "graphql";
import { EntityBase } from "./EntityBase";




@ObjectType("Sight")
@InputType("SightInput")
export class Sight extends EntityBase{

    @Field({nullable: true})
    title: string;

    @Field({nullable: true})
    type: string;

    @Field({nullable: true})
    subtext: string;

    @Field({nullable: true})
    location: string;

    @Field({nullable: true})
    long: number;

    @Field({nullable: true})
    lat: number; 

    @Field(() => [String])
    images: string[];

}
