import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Vacation } from './vacation'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  first_name: string

  @Column('text', { nullable: false })
  last_name: string

  @Column('varchar', { unique: true })
  username: string

  @Column('varchar', { nullable: false })
  password: string

  @Column('boolean', { default: false })
  is_admin: boolean

  @ManyToMany(() => Vacation)
  @JoinTable()
  following: Vacation[]
}
