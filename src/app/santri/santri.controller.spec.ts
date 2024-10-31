import { Test, TestingModule } from '@nestjs/testing';
import { SantriHalaqohController } from './santri.controller';

describe('SantriHalaqohController', () => {
  let controller: SantriHalaqohController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SantriHalaqohController],
    }).compile();

    controller = module.get<SantriHalaqohController>(SantriHalaqohController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
