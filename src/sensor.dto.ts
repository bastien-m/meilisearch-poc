import { OmitType } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class SensorDto {
  @MinLength(10)
  id: string;

  @MinLength(5)
  @MaxLength(50)
  name: string;

  @MinLength(5)
  @MaxLength(50)
  tag: string;

  @MinLength(1)
  @MaxLength(10)
  unit: string;
}

export class CreateSensorDto extends OmitType(SensorDto, ['id']) {}
