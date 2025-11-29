import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { StatusRepository } from '@common/repositories/status.repository';

import { IntegrationsRepository } from '../repositories/integration.repository';
import { CreateIntegrationDto } from '../dto/create-integration.dto';
import { Integration } from '../entities/integration.entity';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly statusRepository: StatusRepository,
    private readonly integrationRepository: IntegrationsRepository,
  ) {}

  async create(
    createIntegrationDto: CreateIntegrationDto,
    userId: string,
  ): Promise<ObjectLiteral | null> {
    const status = await this.statusRepository.filterOneStatus({
      name: 'active',
    });

    if (!status) throw new NotFoundException('Status "active" not found');

    const record: QueryDeepPartialEntity<Integration> = {
      ...createIntegrationDto,
      apiKey: randomUUID().toString(),
      enabled: true,
      softRemoved: false,
      userId: { id: userId },
      statusId: { id: status.id },
    };

    const integration = await this.integrationRepository.create(record);

    return integration;
  }
}
