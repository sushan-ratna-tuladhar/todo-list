import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";

@Schema()
export class List {
   @Prop()
   sortOrder: number;

   @Prop()
   title: string;

   @Prop()
   details: string;

   @Prop({ type: String, enum: ['To do', 'In progress', 'Done'], default: 'To do', required: false })
   status: string;
   
   @Prop({ type: Date, default: new Date()})
   dateTimeCreated: Date;
   
   @Prop({ type: Date })
   dateTimeCompleted: Date;
}
export const ListSchema = SchemaFactory.createForClass(List);