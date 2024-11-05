import { Test, TestingModule } from '@nestjs/testing';
import { MusrifController } from './musrif.controller';

describe('MusrifController', () => {
  let controller: MusrifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusrifController],
    }).compile();

    controller = module.get<MusrifController>(MusrifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
