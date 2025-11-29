import { EntityManager, ObjectLiteral } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { Integration } from '../entities/integration.entity';

@Injectable()
export class IntegrationsRepository {
  constructor(private readonly instance: EntityManager) {}

  async create(
    record: QueryDeepPartialEntity<Integration>,
  ): Promise<ObjectLiteral | null> {
    const result = await this.instance
      .getRepository(Integration)
      .insert(record);

    return result.identifiers[0];
  }
}
