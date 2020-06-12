import { imageUploadNode } from "./imageUploader";
import { Property } from "../entity/Property";
import { Sight } from "../entity/Sight";


export const getNodes = () => {

    const nodes: imageUploadNode[] = [

        {
            imageUrl: "properties/",
            uploadUrl: "/upload/property/image",
            handleFileSaved: updatePropertyImageData
        },
        {
            imageUrl: "sights/",
            uploadUrl: "/upload/sight/image",
            handleFileSaved: updateSightImageData
        }

    ]

    return nodes;

}



const updatePropertyImageData = async (propId: string, imageUrl: string) => {
    const prop = await Property.findOne({id: propId})
    pushImageData(prop, imageUrl)
 
}

const updateSightImageData = async (sightId: string, imageUrl: string) => {
    const prop = await Sight.findOne({id: sightId})
    pushImageData(prop, imageUrl)
 
}

const pushImageData = (entity: any, imageUrl: string) => {
    if(entity){
        if(!entity.images){
            entity.images = [imageUrl];
        } else {
            entity.images.push(imageUrl);
        }    
        entity.save();
    } else {
        console.log("no images property in object")
    }
}