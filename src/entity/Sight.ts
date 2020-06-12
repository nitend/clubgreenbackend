import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { __Type } from "graphql";




@ObjectType("Sight")
@InputType("SightInput")
@Entity("sight")
export class Sight extends BaseEntity{

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
    
    @Column("boolean", {default: false})
    deleted: boolean;

    @Field(() => [String])
    @Column("text", { array: true, default: null})
    images: string[];

}
