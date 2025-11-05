import { AbstractDocument } from '@app/shared/database/abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    this.logger.log(`Creating a new document: ${JSON.stringify(document)}`);
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    this.logger.log(
      `Finding one document with filter: ${JSON.stringify(filterQuery)}`,
    );
    const document = await this.model.findOne(filterQuery).lean<TDocument>();
    if (!document) {
      this.logger.warn(
        `Document not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document was not Found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.log(
      `Finding one and updating document with filter: ${JSON.stringify(filterQuery)} and update: ${JSON.stringify(update)}`,
    );
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>();
    if (!document) {
      this.logger.warn(
        `Document not found for update with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Document was not Found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    this.logger.log(
      `Finding documents with filter: ${JSON.stringify(filterQuery)}`,
    );
    return this.model.find(filterQuery).lean<TDocument[]>();
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    this.logger.log(
      `Deleting document with filter: ${JSON.stringify(filterQuery)}`,
    );
    const doc = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>()
      .exec();
    if (!doc) {
      throw new Error(`Document not found`);
    }
    return doc;
  }
}
