import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({default: false})
    isAdmin: boolean;
}

const schema = SchemaFactory.createForClass(User);

schema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        return ret;
    },
});

export const UserSchema = schema;
