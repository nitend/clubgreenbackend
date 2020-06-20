import {Entity, Column} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { __Type } from "graphql";
import { EntityBase } from "./EntityBase";




@ObjectType("Sight")
@InputType("SightInput")
@Entity("sight")
export class Sight extends EntityBase{

    @Field()
    @Column("text", {default: ""})
    title: string;

    @Field()
    @Column("text", {default: ""})
    type: string;

    @Field()
    @Column("text", {default: ""})
    subtext: string;

    @Field()
    @Column("text", {default: ""})
    location: string;

    @Field()
    @Column("float")
    long: number;

    @Field()
    @Column("float")
    lat: number; 

    @Field(() => [String])
    @Column("text", { array: true, default: null})
    images: string[];

}
