import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/shared';

@Schema({ versionKey: false, timestamps: true })
export class ReservationDocument extends AbstractDocument{
  startDate: Date;
  endDate: Date;
  guestName: string;
  roomNumber: number;
  userId: string;
  placeId: string;
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDocument);
