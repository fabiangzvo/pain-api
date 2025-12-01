import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';

import { IntegrationsService } from '../services/integrations.service';
import { CreateIntegrationDto } from '../dto/create-integration.dto';
import { Integration } from '../entities/integration.entity';
import { PaginationQueryDto } from '../dto/filter-integration.dto';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post()
  create(
    @Body() createIntegrationDto: CreateIntegrationDto,
  ): Promise<ObjectLiteral | null> {
    return this.integrationsService.create(createIntegrationDto);
  }

  @Get()
  find(@Query() query: PaginationQueryDto): Promise<Integration[]> {
    return this.integrationsService.find(query);
  }
}
