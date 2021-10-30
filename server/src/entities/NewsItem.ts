import { ObjectType, Field } from 'type-graphql'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Block } from '.'

@ObjectType()
@Entity()
class NewsItem extends BaseEntity {
  @Field()
  @PrimaryColumn()
  txid!: string

  @Field()
  @Column()
  fee!: number

  @Field()
  @Column()
  decode!: string

  @ManyToOne(() => Block, (block) => block.newsItems)
  block!: Block
}

export default NewsItem
