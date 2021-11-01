import { ObjectType, Field } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Block, Topic } from '.'

@ObjectType()
@Entity()
class NewsItem extends BaseEntity {
  @Field()
  @PrimaryColumn()
  txid!: string

  @Field()
  @Column({ type: 'numeric', scale: 8 })
  fee!: number

  @Field()
  @Column()
  content!: string

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.newsItems)
  topic!: Topic

  @Field(() => Block)
  @ManyToOne(() => Block, (block) => block.newsItems)
  block!: Block
}

export default NewsItem
