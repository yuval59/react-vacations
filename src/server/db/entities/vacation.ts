import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Vacation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  description: string

  @Column('text', { nullable: false })
  destination: string

  @Column('text')
  picture: string

  @Column('date', { nullable: false })
  start_date: string

  @Column('date', { nullable: false })
  end_date: string

  @Column('float')
  price: number
}
