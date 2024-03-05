import { PartialType } from '@nestjs/mapped-types';
import { LoginAuthDto } from './login-auth.dto';
import { IsOptional } from 'class-validator';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsOptional()
    name:string;

    @IsOptional()
    lastname:string;
}