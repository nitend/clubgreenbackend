import {ObjectType, Field} from 'type-graphql'
import { EntityBase } from "./EntityBase";

@ObjectType()
export class User extends EntityBase{

    @Field({nullable: true})
    username: string;

    @Field({nullable: true})
    email: string;

    password: string;

    @Field({nullable: true})
    paymentServiceId: string;

    @Field({nullable: true})
    gender: string;

    @Field({nullable: true})
    firstname: string;

    @Field({nullable: true})
    surname: string;

    @Field({nullable: true})
    street: string;

    @Field({nullable: true})
    streetNumber: string;

    @Field({nullable: true})
    town: string;

    @Field({nullable: true})
    postalcode: string;

    @Field({nullable: true})
    tokenVersion: number;

    @Field()
    email_verified: boolean;

}
