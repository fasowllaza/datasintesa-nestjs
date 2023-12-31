import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RawData } from './raw-data.model';
import { RawDataBody } from 'src/interface/interface';

@Injectable()
export class RawDataRepository {
  constructor(@InjectModel('RawData') private readonly rawDataModel: Model<any>) {}

  async create(data: any): Promise<any> {
    const newData = new this.rawDataModel(data);
    return await newData.save();
  }

  async findAll(data: RawDataBody):Promise<RawData[]> {
    let queries:RawDataBody = {}
    for (const query in data) {
      if(data[query]) {
        if(query === 'startDate' || query ==='endDate') {
          queries['resultTime'] = { 
            $gte: new Date (data['startDate']),
            $lte: data['endDate'] ? new Date (data['endDate']) : new Date()
          }
        } else {
          queries[query] = data[query]
        }
      }
    }
    return await this.rawDataModel.find(queries).exec();
  }

}
