import { Test, TestingModule } from '@nestjs/testing';
import { AbsenSantriController } from './absen-santri.controller';

describe('AbsenSantriController', () => {
  let controller: AbsenSantriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbsenSantriController],
    }).compile();

    controller = module.get<AbsenSantriController>(AbsenSantriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
