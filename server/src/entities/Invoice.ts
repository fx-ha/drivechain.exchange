import { Field, ID, ObjectType } from 'type-graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Receiver } from '.'

@ObjectType()
@Entity()
class Invoice extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  depositChain!: string

  @Field()
  @Column()
  depositAddress!: string

  @Field()
  @Column({ default: false })
  hasDeposited!: boolean

  @OneToMany(() => Receiver, (receiver) => receiver.invoice, { cascade: true })
  receivers!: Receiver[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedat!: Date
}

export default Invoice
