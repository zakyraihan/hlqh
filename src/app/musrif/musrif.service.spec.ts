import { Test, TestingModule } from '@nestjs/testing';
import { MusrifService } from './musrif.service';

describe('MusrifService', () => {
  let service: MusrifService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusrifService],
    }).compile();

    service = module.get<MusrifService>(MusrifService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
