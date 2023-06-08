import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  first_name: string

  @Column('text')
  last_name: string

  @Column('varchar', { unique: true })
  username: string

  @Column('varchar')
  password: string

  @Column('boolean', { default: false })
  is_admin: boolean
}
