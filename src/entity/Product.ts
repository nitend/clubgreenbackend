import {ObjectType, Field, InputType} from 'type-graphql'
import { EntityBase } from './EntityBase';

@ObjectType()
@InputType("ProductInput")
export class Product extends EntityBase{

    @Field({nullable: true})
    title: string;

    @Field({nullable: true})
    paymentPricePlan: string;

    @Field({nullable: true})
    price: number;

    @Field({nullable: true})
    minmonth: number;

    @Field({nullable: true})
    active: boolean;

}
