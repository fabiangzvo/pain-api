import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Status } from '../entities/status.entity';

@Injectable()
export class StatusRepository {
  constructor(private readonly instance: EntityManager) {}

  async filterOneStatus(filters: Partial<Status>): Promise<Status | null> {
    const status = await this.instance.getRepository(Status).findOneBy(filters);

    return status ?? null;
  }
}
