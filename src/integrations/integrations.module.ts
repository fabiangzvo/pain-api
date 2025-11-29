import { Module } from '@nestjs/common';

import { IntegrationsService } from './services/integrations.service';
import { IntegrationsController } from './controllers/integrations.controller';
import { StatusRepository } from '@common/repositories/status.repository';
import { IntegrationsRepository } from './repositories/integration.repository';

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, StatusRepository, IntegrationsRepository],
})
export class IntegrationsModule {}
