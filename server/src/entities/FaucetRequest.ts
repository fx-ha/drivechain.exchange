import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm'

@ObjectType()
@Entity()
class FaucetRequest extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  chain!: string

  @Field()
  @Column()
  address!: string

  @Field()
  @Column({ type: 'numeric', scale: 8 })
  amount!: number

  @Field()
  @Column({ default: false })
  isPaid!: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  txid?: string

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}

export default FaucetRequest
