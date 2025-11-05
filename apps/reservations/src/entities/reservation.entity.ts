import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false, timestamps: true })
export class ReservationDocument extends AbstractDocument {
  @Prop()
  startDate: Date;
  @Prop()
  endDate: Date;
  @Prop()
  guestName: string;
  @Prop()
  roomNumber: number;
  @Prop()
  userId: string;
  @Prop()
  placeId: string;
  @Prop()
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
