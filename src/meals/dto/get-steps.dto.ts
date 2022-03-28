import { ApiResponseProperty } from '@nestjs/swagger';
import { Step } from '../entity/step.entity';

export class GetStepsDto {
  @ApiResponseProperty({ type: [Step] })
  steps: Step[];
}
