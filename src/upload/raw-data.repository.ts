import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RawDataRepository {
  constructor(@InjectModel('RawData') private readonly rawDataModel: Model<any>) {}

  async create(data: any): Promise<any> {
    const newData = new this.rawDataModel(data);
    return await newData.save();
  }
}
