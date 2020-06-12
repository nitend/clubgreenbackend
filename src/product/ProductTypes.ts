import { InputType, Field } from "type-graphql";

@InputType()
export class NewProduct{

    @Field()
    title: string;

    @Field()
    paymentPricePlan: string;

    @Field()
    price: number;

    @Field()
    minmonth: number;
}

