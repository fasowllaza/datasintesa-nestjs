import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RawData, RawDataSchema } from './raw-data.schema';
import { RawDataRepository } from './raw-data.repository';

const dbName = process.env.DATABASE_NAME
const dbUrl = process.env.DATABASE_URL

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }]),
  ],

  controllers: [UploadController],
  providers: [ UploadService, RawDataRepository],
})
export class UploadModule {}
