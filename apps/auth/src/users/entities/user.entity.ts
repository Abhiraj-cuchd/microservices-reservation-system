import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false, timestamps: true })
export class UserDocument extends AbstractDocument {
  @Prop()
  emailId: string;
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
