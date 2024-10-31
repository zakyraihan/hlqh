import { Test, TestingModule } from '@nestjs/testing';
import { AbsenMusrifController } from './absen-musrif.controller';

describe('AbsenMusrifController', () => {
  let controller: AbsenMusrifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenMusrifController],
    }).compile();

    controller = module.get<AbsenMusrifController>(AbsenMusrifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
