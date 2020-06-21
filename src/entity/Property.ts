import {ObjectType, Field, InputType} from 'type-graphql'
import { __Type } from "graphql";
import { EntityBase } from './EntityBase';



@ObjectType("Property")
@InputType("PropertyInput")
export class Property extends EntityBase{

    @Field({nullable: true})
    title: string;

    @Field({nullable: true})
    subtext: string;

    @Field({nullable: true})
    location: string;

    @Field({nullable: true})
    long: number;

    @Field({nullable: true})
    lat: number; 
    
    @Field({nullable: true})
    beds_adult: number; 
    
    @Field({nullable: true})
    beds_kids: number;
    
    @Field({nullable: true})
    beds_tent: number;  

    @Field(() => [String])
    images: string[];
}
