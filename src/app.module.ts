import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forRoot(`mongodb://127.0.0.1:27017/datasintesa-reza`),
      UploadModule,
],
  
})
export class AppModule {}
