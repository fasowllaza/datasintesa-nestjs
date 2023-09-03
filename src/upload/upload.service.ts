import { Injectable, BadRequestException } from '@nestjs/common';
import { RawDataRepository } from './raw-data.repository';
import * as fs from 'fs';
import * as zlib from 'zlib';
import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  constructor(private readonly rawDataRepository: RawDataRepository) {}

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
