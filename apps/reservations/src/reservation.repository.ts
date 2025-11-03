import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/shared';
import { ReservationDocument } from './entities/reservation.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationDocument> {
  protected readonly logger = new Logger('ReservationRepository');
  constructor(@InjectModel(ReservationDocument.name) reservationModel: Model<ReservationDocument>) {
    super(reservationModel);
  }
}