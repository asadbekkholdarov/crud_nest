import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private readonly cityRepo: Repository<City>,
  ) {}
  async create(createCityDto: CreateCityDto) {
    const { name } = createCityDto;
    const city = await this.cityRepo.findOneBy({name})
    if(city) throw new BadRequestException({message: 'City already exist'})
  const newCity = await this.cityRepo.create(createCityDto)
  return await this.cityRepo.save(newCity)
  }

  async findAll() {
    const cities = await this.cityRepo.find()
    return {
      length: cities.length,
      cities
    }
  }

 async findOne(id: number) {
  const existCity = await this.cityRepo.findOneBy({id})
  if(!existCity) throw new BadRequestException({message: 'City not found'})
  return existCity
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const existCity = await this.cityRepo.findOneBy({id})
    if(!existCity) throw new BadRequestException({message: 'City Not Found'})
    Object.assign(existCity, updateCityDto)
    return await this.cityRepo.save(existCity)
  }

 async remove(id: number) {
  const existCity = await this.cityRepo.findOneBy({id})
  if(!existCity) throw new BadRequestException({message: 'City not found'})
    await this.cityRepo.remove(existCity)
  return {
    message: 'successfully deleted'
  }
  }
}
