import { Test, TestingModule } from '@nestjs/testing';
import { RawDataService } from './raw-data.service';

describe('UploadCsvService', () => {
  let service: RawDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RawDataService],
    }).compile();

    service = module.get<RawDataService>(RawDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
