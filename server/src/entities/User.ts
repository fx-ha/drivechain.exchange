import { ObjectType, Field, ID } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
} from 'typeorm'

@ObjectType()
@Entity()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Field()
  @Column()
  role!: string

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}

export default User
