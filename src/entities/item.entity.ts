import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemStatus } from '../items/item-status.enum';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.items) // userテーブルとのリレーション
  user: User;

  @Column()
  userId: string;
}
