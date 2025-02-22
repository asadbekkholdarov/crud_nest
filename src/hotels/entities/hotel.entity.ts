import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  stars: number
}
