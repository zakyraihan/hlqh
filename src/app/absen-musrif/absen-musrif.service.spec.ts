import { Test, TestingModule } from '@nestjs/testing';
import { AbsenMusrifService } from './absen-musrif.service';

describe('AbsenMusrifService', () => {
  let service: AbsenMusrifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenMusrifService],
    }).compile();

    service = module.get<AbsenMusrifService>(AbsenMusrifService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
