import { Test, TestingModule } from '@nestjs/testing';
import { AbsenSantriService } from './absen-santri.service';

describe('AbsenSantriService', () => {
  let service: AbsenSantriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsenSantriService],
    }).compile();

    service = module.get<AbsenSantriService>(AbsenSantriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
