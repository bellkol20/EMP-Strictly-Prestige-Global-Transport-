import { Injectable } from '@nestjs/common';
import { getCompanyName, COMPANY_NAME } from './brand/brand';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth() {
    let database: 'connected' | 'error' = 'connected';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'error';
    }

    return {
      ok: database === 'connected',
      company: getCompanyName(),
      canonicalCompanyName: COMPANY_NAME,
      service: 'espgt-api',
      database,
    };
  }
}
