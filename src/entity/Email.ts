import {ObjectType, Field} from 'type-graphql'
import { EntityBase } from "./EntityBase";

@ObjectType()
export class Email extends EntityBase{

    @Field()
    email: string;

    @Field()
    verified: boolean;

    @Field()
    verification_token: string;

    @Field()
    verification_date: number;

}
