import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return EMP Strictly Prestige Global Transport health payload', () => {
      expect(appController.getHealth()).toEqual(
        expect.objectContaining({
          ok: true,
          company: 'EMP Strictly Prestige Global Transport',
        }),
      );
    });
  });
});
