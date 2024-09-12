import {
  AfterInsert,
  // AfterUpdate,
  // AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;

  // method hook setelah insert dari user
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ID: ', this.id);
  }
}
