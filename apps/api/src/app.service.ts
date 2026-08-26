import { Injectable } from '@nestjs/common';
import { getCompanyName, COMPANY_NAME } from './brand/brand';

@Injectable()
export class AppService {
  getHealth() {
    return {
      ok: true,
      company: getCompanyName(),
      canonicalCompanyName: COMPANY_NAME,
      service: 'espgt-api',
    };
  }
}
