import { IsEmail, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateUserDto {
    
    @IsEmail({}, {message:'El campo Email no es valido'})
    @IsNotEmpty({message:'El campo Email es requerido'})
    email:string;

    @Length(5,15)
    @IsNotEmpty()
    password:string;

    @IsOptional()
    name:string;

    @IsOptional()
    lastname:string;

}
