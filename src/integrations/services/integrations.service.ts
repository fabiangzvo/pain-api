import { randomUUID } from 'node:crypto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindOptionsWhere, Like, ObjectLiteral } from 'typeorm';
import { FindManyOptions } from 'typeorm';

import { StatusRepository } from '@common/repositories/status.repository';
import { UserRepository } from '@common/repositories/user.repository';
import { ProviderRepository } from '@common/repositories/provider.repository';

import { IntegrationsRepository } from '../repositories/integration.repository';
import { CreateIntegrationDto } from '../dto/create-integration.dto';
import { Integration } from '../entities/integration.entity';
import { PaginationQueryDto } from '../dto/filter-integration.dto';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly statusRepository: StatusRepository,
    private readonly integrationRepository: IntegrationsRepository,
    private readonly userRepository: UserRepository,
    private readonly providerRepository: ProviderRepository,
  ) {}

  async create(
    createIntegrationDto: CreateIntegrationDto,
  ): Promise<ObjectLiteral | null> {
    const status = await this.statusRepository.filterOneStatus({
      name: 'active',
    });

    if (!status) throw new NotFoundException('Status "active" not found');

    const user = await this.userRepository.getUserById(
      createIntegrationDto.userId,
    );

    if (!user)
      throw new NotFoundException(
        `User ${createIntegrationDto.userId} not found`,
      );

    const provider = await this.providerRepository.getProviderById(
      createIntegrationDto.providerId,
    );

    if (!provider)
      throw new NotFoundException(
        `Provider ${createIntegrationDto.providerId} not found`,
      );

    const record: QueryDeepPartialEntity<Integration> = {
      ...createIntegrationDto,
      apiKey: randomUUID().toString(),
      enabled: true,
      softRemoved: false,
      user: { id: user.id },
      status: { id: status.id },
      provider: { id: provider.id },
    };

    const integration = await this.integrationRepository.create(record);

    return integration;
  }

  find(filters: PaginationQueryDto): Promise<Integration[]> {
    const options: FindManyOptions<Integration> = {
      take: filters.limit,
      skip: (filters.page - 1) * filters.limit,
      order: {
        createdAt: filters.sort || 'desc',
      },
    };

    const conditions: FindOptionsWhere<Integration> = {};

    if (filters.search) conditions.name = Like(`%${filters.search}%`);

    if (Object.keys(conditions).length > 0) options.where = conditions;

    return this.integrationRepository.find(options);
  }
}
