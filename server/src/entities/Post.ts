import { ObjectType, Field, ID } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Topic } from '.'

@ObjectType()
@Entity()
class Post extends BaseEntity {
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

  @Field({ nullable: true })
  @Column({ type: 'numeric', scale: 8, nullable: true })
  depositAmount?: number

  @Field({ nullable: true })
  @Column({ type: 'numeric', scale: 8, nullable: true })
  coinNewsFee?: number

  @Field()
  @Column()
  text!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  txid?: string

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.posts)
  topic!: Topic

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedat!: Date
}

export default Post