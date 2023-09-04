import { Injectable, BadRequestException } from '@nestjs/common';
import { RawDataRepository } from './raw-data.repository';
import * as zlib from 'zlib';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { RawDataBody, RawDataResponse } from 'src/interface/interface';

@Injectable()
export class RawDataService {
  constructor(private readonly rawDataRepository: RawDataRepository) {}

  async getData(data: RawDataBody) {
      return await this.rawDataRepository.findAll(data);
  }

  async getGraph(body: RawDataBody) {
    return await this.rawDataRepository.findAll(body).then( datas => {
      let result = []
      datas.forEach((data:RawDataResponse) => {
        const availability = data.availDur*100/900
        const resultTime = data.resultTime
        result.push({
          availability,
          resultTime
        })
      })
      return result
    } )
}

  async uploadAndInsertData(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    const stream = Readable.from(file.buffer);
    const gunzip = zlib.createGunzip();
    const csvStream = stream.pipe(gunzip).pipe(csvParser());
    const uniqueRecords = new Set<string>();



    for await (const data of csvStream) {
      if(data['Result Time']) {
        const enodebId = data['Object Name'].split(', ')[3].split('=')[1]
        const cellId = data['Object Name'].split(', ')[1].split('=')[1]
        const resultTime = data['Result Time']
        const uniqueKey = `${enodebId}_${cellId}_${resultTime}`;

        const result = {
          enodebId: enodebId,
          cellId: cellId,
          resultTime: resultTime,
          availDur: data['L.Cell.Avail.Dur']
        }
        if (!uniqueRecords.has(uniqueKey)) {
          uniqueRecords.add(uniqueKey);
          await this.rawDataRepository.create(result);
        }
      }
    }
    return { message: 'Data successfully added' };
  }
}
