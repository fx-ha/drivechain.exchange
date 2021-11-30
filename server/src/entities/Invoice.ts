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

  @Field({ nullable: true })
  @Column({ type: 'numeric', scale: 8, nullable: true })
  depositAmount?: number

  @Field()
  @Column({ default: false })
  hasDeposited!: boolean

  @OneToMany(() => Receiver, (receiver) => receiver.invoice, { cascade: true })
  receivers!: Receiver[]

  @Field({ nullable: true })
  @Column({ type: 'numeric', scale: 8, nullable: true })
  receiveEstimate?: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  extra?: string

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date
}

export default Invoice
