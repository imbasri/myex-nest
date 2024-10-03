import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {Exclude} from 'class-transformer'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // method hook setelah update dari user
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with ID: ', this.id);
  }

  // method hook setelah delete dari user
  @AfterRemove()
  logRemove() {
    console.log('Removed User with ID: ', this.id);
  }
  // method hook setelah insert dari user
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ID: ', this.id);
  }
}
