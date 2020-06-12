import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { __Type } from "graphql";




@ObjectType("Rating")
@InputType("RatingInput")
@Entity("rating")
export class Rating extends BaseEntity{

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    creationDate: number; 
    
    @Field()
    @Column("text", {default: ""})
    title: string;

    @Field()
    @Column("text", {default: ""})
    targettype: "property" | "sight";

    @Field()
    @Column("float")
    targetId: number; 

    @Field()
    @Column("float")
    rating: number; 

    @Field()
    @Column("float")
    userId: number;

    @Field()
    @Column("text", {default: ""})
    comment: string;
    
    @Column("boolean", {default: false})
    deleted: boolean;

}
