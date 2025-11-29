import { Controller, Post, Body } from '@nestjs/common';

import { IntegrationsService } from '../services/integrations.service';
import { CreateIntegrationDto } from '../dto/create-integration.dto';
import { ObjectLiteral } from 'typeorm';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post()
  create(
    @Body() createIntegrationDto: CreateIntegrationDto,
  ): Promise<ObjectLiteral | null> {
    return this.integrationsService.create(createIntegrationDto, '1');
  }
}
