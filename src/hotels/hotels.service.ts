import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(@InjectRepository(Hotel) private readonly hotelRepo: Repository<Hotel>){}

 async create(createHotelDto: CreateHotelDto) {
    const newHotel = this.hotelRepo.create(createHotelDto)
    return await this.hotelRepo.save(newHotel)
  }

  findAll() {
    return `This action returns all hotels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
