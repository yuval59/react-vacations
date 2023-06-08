import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'

@Entity()
export class Vacation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: true })
  description: string

  @Column('text')
  destination: string

  @Column('text', { nullable: true })
  picture: string

  @Column('date')
  start_date: string

  @Column('date')
  end_date: string

  @Column('float', { nullable: true })
  price: number

  @ManyToMany(() => User, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'follows' })
  followers: User[]
}
