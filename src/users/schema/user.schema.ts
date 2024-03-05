import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({required:true, unique:true})
  email: string;

  @Prop({required:true})
  password: string;

  @Prop({required:false, default:'No Name'})
  name: string;

  @Prop({required:false})
  lastname: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);