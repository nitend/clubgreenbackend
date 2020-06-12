import {Resolver, Query, Mutation, Arg, Ctx, UseMiddleware} from 'type-graphql'
import { Booking } from '../entity/Booking';
import {MyContext} from '../usermanagement/MyContext'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { BlockedDate } from './BookingObjectTypes';




@Resolver()
export class BookingResolver {

    @Query(() => Booking, {nullable: true})
    @UseMiddleware(isAuth)
    async myBooking(@Ctx() { payload }: MyContext ) {

        if(payload?.userId){
            const booking = await Booking.findOne({user: payload.userId, deleted: false}, {relations: ["property"]})
            return booking;
        }
        return null;
    }

    @Query(() => [Booking], {nullable: true})
    @UseMiddleware(isAuth)
    async allBooking(@Ctx() { payload }: MyContext ) {

        if(payload?.userId){
            const booking = await Booking.find()
            return booking;
        }
        return null;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async bookProperty(@Ctx() { payload }: MyContext,
        @Arg("propertyId") propertyId: string,
        @Arg("from")  from: number,
        @Arg("to") to: number){


        if(payload?.userId && propertyId){
            const newBooking = new Booking();
            newBooking.from = from;
            newBooking.to = to;
            newBooking.user = payload?.userId;
            newBooking.date = Date.now();
            newBooking.propertyId = propertyId;
            try{
                const result = await Booking.save(newBooking);
                console.log("newbooking" + result)
                return true

            }catch(err){
                return false
            }
        }   
        return false;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteBooking(@Ctx() { payload }: MyContext,
        @Arg("bookingId") bookingId: string){

        const bookingById = await Booking.findOne({id: bookingId});
        if(bookingById && (bookingById?.user == payload?.userId)){
            bookingById.deleted = true;
            Booking.save(bookingById);
            return true        
        }    
        return false;
    }

    @Query(() => [BlockedDate], {nullable: true})
    async getBlockedDatesFromProperty(        
        @Arg("propertyId")  propertyId: string) { 
            
        const blockedDates: BlockedDate[] = []

        if(propertyId){
            const booking = await Booking.find({propertyId: propertyId})
            booking.map((book) => {
                const arrivalDate: BlockedDate = {
                    bookingId: book.id,
                    dateTimeStamp: book.from,
                    type: 1
                }
                blockedDates.push(arrivalDate);
                const departureDate: BlockedDate = {
                    bookingId: book.id,
                    dateTimeStamp: book.to,
                    type: 2
                }
                blockedDates.push(departureDate);
                
                const oneDay: number = 1000*60*60*24
                var followingDay: number = +book.from + +oneDay;
                var lastDay: number = +book.to;

                while (followingDay < lastDay) {
                    blockedDates.push({
                        bookingId: book.id,
                        dateTimeStamp: followingDay,
                        type: 0
                    })
                    followingDay = +followingDay + +oneDay
                }
                
            } )
            return blockedDates;
        }
        return null;
    }


    @Query(() => [Booking], {nullable: true})
    propertiesEvalable(        
        @Arg("from")  from: number,
        @Arg("to") to: number) {   
        console.log(from + " to " + to)       
        return null;
    }
}

