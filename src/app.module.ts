import { Module } from '@nestjs/common';
import { RawDataModule } from './raw-data/raw-data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://127.0.0.1:27017/datasintesa-reza`),
      RawDataModule,
],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
