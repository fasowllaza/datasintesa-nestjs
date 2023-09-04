import { Module } from '@nestjs/common';
import { UploadController } from './raw-data.controller';
import { RawDataService } from './raw-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RawData, RawDataSchema } from './raw-data.model';
import { RawDataRepository } from './raw-data.repository';

const dbName = process.env.DATABASE_NAME
const dbUrl = process.env.DATABASE_URL

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }]),
  ],
  controllers: [UploadController],
  providers: [ RawDataService, RawDataRepository ],
})
export class RawDataModule {}
