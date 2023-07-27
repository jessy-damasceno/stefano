import {
	Table,
	PrimaryKey,
	Column, 
	Model, 
	DataType,
	HasMany 
} from 'sequelize-typescript';
import { Contact } from './contact.model';

@Table({
	tableName: 'users',
	underscored: true,
	timestamps: false,
})

export class User extends Model<User> {

	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
	})
  id!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
  username!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true,
	})
  email!: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
  password!: string;

	@HasMany(() => Contact, 'userId')
  contacts!: Contact[];
}