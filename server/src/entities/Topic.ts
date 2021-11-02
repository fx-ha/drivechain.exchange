import { ObjectType, Field } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { NewsItem } from '.'

@ObjectType()
@Entity()
class Topic extends BaseEntity {
  @Field()
  @PrimaryColumn()
  hex!: string

  @Field()
  @Column()
  name!: string

  @OneToMany(() => NewsItem, (newsItem) => newsItem.topic)
  newsItems?: NewsItem[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date
}

export default Topic