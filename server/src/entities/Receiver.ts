import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Invoice } from '.'

@Entity()
class Receiver {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  receiveAddress!: string

  @Column()
  receiveChain!: string

  @Column('float')
  allocation!: number

  @ManyToOne(() => Invoice, (invoice) => invoice.receivers, {
    onDelete: 'CASCADE',
  })
  invoice!: Invoice
}

export default Receiver
