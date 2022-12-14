import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoreCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ name: 'external_id' })
  externalId: string;
}
