import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cover_url' })
  coverUrl: string;

  @Column()
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  url: string;

  @Column({ name: 'external_id' })
  externalId: string;
}
