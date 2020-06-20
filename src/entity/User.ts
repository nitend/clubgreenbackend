import {Entity, Column} from "typeorm";
import {ObjectType, Field} from 'type-graphql'
import { EntityBase } from "./EntityBase";

@ObjectType()
@Entity("users")
export class User extends EntityBase{

    @Field()
    @Column("text", {default: ""})
    username: string;

    @Field()
    @Column("text")
    email: string;

    @Column()
    password: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    paymentServiceId: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    gender: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    firstname: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    surname: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    street: string;

    @Field({nullable: true})
    @Column("int", {nullable: true})
    streetNumber: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    town: string;

    @Field({nullable: true})
    @Column("text", {nullable: true})
    postalcode: string;

    @Field()
    @Column("int", {default: 0})
    tokenVersion: number;

    @Field()
    @Column("boolean", {default: false})
    email_verified: boolean;

}
