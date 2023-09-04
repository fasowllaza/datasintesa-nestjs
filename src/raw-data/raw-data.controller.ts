import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RawDataService } from './raw-data.service';
import { RawData } from './raw-data.model';

@Controller('raw-data')
export class UploadController {
  constructor(private readonly rawDataService: RawDataService) {}
  
  @Get()
  async getRawData(
    @Query('enodebId') enodebId?: string,
    @Query('cellId') cellId?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<RawData[]> {
    return this.rawDataService.getGraph(
   {   enodebId,
      cellId,
      startDate,
      endDate,}
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.rawDataService.uploadAndInsertData(file);
  }

}
