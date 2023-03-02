import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSensorDto } from './sensor.dto';
import { SensorService } from './sensor.service';

@ApiTags('sensor')
@Controller()
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get(':search')
  searchSensors(@Param('search') search: string) {
    return this.sensorService.search(search);
  }

  @Post()
  createSensor(@Body() sensor: CreateSensorDto) {
    return this.sensorService.create(sensor);
  }
}
