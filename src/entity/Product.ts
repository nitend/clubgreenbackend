import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn} from "typeorm";
import {ObjectType, Field, InputType} from 'type-graphql'

@ObjectType()
@InputType("ProductInput")
@Entity("product")
export class Product extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;    

    @Field()
    @CreateDateColumn({type: 'timestamp'})
    creationDate: Date; 

    @Field()
    @Column("text", {default: ""})
    title: string;

    @Field()
    @Column("text", {default: ""})
    paymentPricePlan: string;

    @Field()
    @Column("float", {default: 0})
    price: number;

    @Field()
    @Column("int", {default: 0})
    minmonth: number;

    @Field()
    @Column("boolean", {default: false})
    deleted: boolean;

    @Field()
    @Column("boolean", {default: true})
    active: boolean;

}
