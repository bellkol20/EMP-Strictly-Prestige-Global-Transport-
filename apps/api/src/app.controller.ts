import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getCompanyName } from './brand/brand';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('brand')
  getBrand() {
    return {
      companyName: getCompanyName(),
      displayName: getCompanyName(),
    };
  }

  /** Placeholder admin summary — brand shown in dashboard payloads */
  @Get('admin/overview')
  getAdminOverview() {
    return {
      dashboardTitle: `${getCompanyName()} Admin`,
      companyName: getCompanyName(),
      modules: ['bookings', 'customers', 'fleet', 'payments'],
    };
  }
}
