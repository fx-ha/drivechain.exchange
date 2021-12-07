import { ObjectType, Field, ID } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity()
class CnbRequest extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column({ unique: true })
  mentionId!: string

  @Field()
  @Column()
  targetId!: string

  @Field()
  @Column()
  authorId!: string

  @Field()
  @Column()
  username!: string

  @Field()
  @Column()
  text!: string

  @Field()
  @Column({ default: false })
  hasDeposited!: boolean

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

export default CnbRequest
