import { IsNumber, IsString } from "class-validator";
export class CreateHotelDto {
  @IsString()
  title: string

  @IsNumber()
  stars: number
}
