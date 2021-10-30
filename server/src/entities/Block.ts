import { ObjectType, Field } from 'type-graphql'
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { NewsItem } from '.'

@ObjectType()
@Entity()
class Block extends BaseEntity {
  @Field()
  @PrimaryColumn()
  hash!: string

  @Field()
  @Column({ unique: true })
  height!: number

  @Field(() => String)
  @Column({ type: 'timestamptz' })
  createdAt!: Date

  @OneToMany(() => NewsItem, (newsItem) => newsItem.block)
  newsItems?: NewsItem[]
}

export default Block
