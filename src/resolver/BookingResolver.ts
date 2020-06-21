import {Resolver, Query, Arg, UseMiddleware, Mutation, Ctx} from 'type-graphql'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { Bookings } from '../database';
import { Booking } from '../entity/Booking';
import { BlockedDate } from './ObjectTypes';
import { MyContext } from 'src/usermanagement/MyContext';


@Resolver()
export class BookingResolver{

    db = Bookings

    @Query(() => Booking, {nullable: true})
    async getBooking(
        @Arg("id") id: string
    ) {        
        return await this.db.findById(id);
    }

    @Query(() => Booking)
    @UseMiddleware(isAuth)
    async getNewBooking(){ 
        return await this.db.insert(new Booking())
    }

    @Query(() => [Booking], {nullable: true})
    async getAllBookings() {
        return await this.db.getAll();
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateBooking(
        @Arg("booking") booking: Booking){ 
        return await this.db.replace(booking)
    }
  
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteBooking(
        @Arg("id") id: string){    
        return await this.db.delete(id);      
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createBooking(
        @Arg("arrival") arrival: string,
        @Arg("departure") departure: string,
        @Arg("propertyId") propertyId: string,
        @Ctx() context: MyContext){ 
        
        if(context && context.payload){
            const newBooking = new Booking();
            newBooking.dateOfArrival = arrival;
            newBooking.dateOfDeparture = departure;
            newBooking.propertyId = propertyId;
            return await this.db.insert(newBooking);  
        } else {
            return false;
        }
    }

    /*
    @Mutation(() => [Bookings])
    @UseMiddleware(isAuth)
    async getAktiveBookingsForProperty(
        @Arg("propertyId") propertyId: string){    
        return await this.db.findByPropValue("property", propertyId)     
    }
    */

    @Query(() => [BlockedDate], {nullable: true})
    async getBlockedDatesFromProperty(        
        @Arg("propertyId")  propertyId: string) { 
            
        const blockedDates: BlockedDate[] = []

        if(propertyId){
            const booking = await this.db.findByPropValue("propertyId", propertyId)
            booking.map((book) => {
                const arrivalTimeStamp = (new Date(book.dateOfArrival)).valueOf()
                const departureTimeStamp = (new Date(book.dateOfDeparture)).valueOf()

                const arrivalDate: BlockedDate = {
                    bookingId: book.id,
                    dateTimeStamp: arrivalTimeStamp,
                    type: 1
                }
                blockedDates.push(arrivalDate);
                const departureDate: BlockedDate = {
                    bookingId: book.id,
                    dateTimeStamp: departureTimeStamp,
                    type: 2
                }
                blockedDates.push(departureDate);
                
                const oneDay: number = 1000*60*60*24
                var followingDay: number = +arrivalTimeStamp + +oneDay;
                var lastDay: number = +departureTimeStamp;

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

