import {Entity, Column} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'
import { EntityBase } from "./EntityBase";

@ObjectType()
@InputType("ProductInput")
@Entity("product")
export class Product extends EntityBase{

    @Field({nullable: true})
    @Column("text", {default: ""})
    title: string;

    @Field({nullable: true})
    @Column("text", {default: ""})
    paymentPricePlan: string;

    @Field({nullable: true})
    @Column("float", {default: 0})
    price: number;

    @Field({nullable: true})
    @Column("int", {default: 0})
    minmonth: number;

    @Field({nullable: true})
    @Column("boolean", {default: true})
    active: boolean;

}
