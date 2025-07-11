import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";


export function handleError (error: any) {
    console.log(error)
    // Duplicate key error
    if(error.code === 11000){
        const duplicatedField = Object.keys(error.keyValue).join(', ');
        throw new BadRequestException(`Duplicate key: ${duplicatedField}`);
    };

    // Mongoose validation error
    if(error.name === 'ValidationError'){
        throw new BadRequestException(error.message)
    };

    // NotFoundException error
    if(error.response.statusCode === 404){
        throw new NotFoundException(error.response.message)
    }

    // Unknown or unhandled error
  throw new InternalServerErrorException(error || 'Unexpected server error');
}