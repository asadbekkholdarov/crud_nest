import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { City } from './cities/entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HotelsModule } from './hotels/hotels.module';
import { Hotel } from './hotels/entities/hotel.entity';


@Module({
  imports: [CitiesModule,HotelsModule, ConfigModule.forRoot(), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService)=>({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      password: configService.get('DB_PASSWORD'),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_DATABASE'),
      entities: [City, Hotel],
      synchronize: true
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
