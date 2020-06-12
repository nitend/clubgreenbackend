import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {ObjectType, Field} from 'type-graphql'

@ObjectType()
@Entity("users")
export class User extends BaseEntity{

    @Field(() => String)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column("text", {default: ""})
    username: string;

    @Field()
    @Column("text")
    email: string;

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

    @Column()
    password: string;

    @Field()
    @Column("boolean", {default: false})
    email_verified: boolean;

}
